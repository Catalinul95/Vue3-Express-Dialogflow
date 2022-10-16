const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
const uuid = require('uuid');
const axios = require('axios');
const serviceAccount = require('../service-account');

module.exports = class EndPointsController {
    async clientEndPoint(req, res) {
        // unique identifier for given session
        const sessionId = uuid.v4();
        // data from our client
        const { queryInput } = req.body;

        // create a new client session
        const sessionClient = new dialogflow.SessionsClient({credentials: serviceAccount});

        //The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.projectAgentSessionPath(
            serviceAccount.project_id, sessionId
        );

        // the text query request sent to dialogflow
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: queryInput,
                    languageCode: 'en-Us',
                }
            }
        };
        
        // send request and log result
        await sessionClient.detectIntent(request)
            .then((responses) => {
                res.status(200).json(responses[0]);
            })
            .catch((err) => {
                res.status(500).json({error: err})
            })
    }
    async webHookEndPoint(req, res) {
        // the agent
        const agent = new WebhookClient({request: req, response: res});
        const queryResult = req.body.queryResult;
        const fulfillmentMessages = queryResult.fulfillmentMessages;

        // get the city parameter
        const city = agent.contexts[0].parameters['geo-city'];

        async function handleIntent(agent) {
            if (queryResult.intent.displayName == 'getWeather') {
                // url for openweathermap api
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
                let weatherResponse = '';
                await axios.get(weatherUrl)
                    .then((response) => {
                        const data = response.data;
                        // convert to celsius
                        const celsiusDegree = parseInt(300 - data.main.temp);
                        weatherResponse = `In ${city} we have ${data.weather[0].description} and a temperature of ${celsiusDegree} degrees celsius.`;
                    })
                    .catch (error => {
                        console.log(error);
                    })
                    
                agent.add(weatherResponse);
            }
        }

        const intentMap = new Map();
        intentMap.set('getWeather', handleIntent);
        agent.handleRequest(intentMap);
    }
};