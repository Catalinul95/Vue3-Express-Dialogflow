const dialogflow = require('@google-cloud/dialogflow');
const { TokenCache } = require('google-oauth-jwt');
const serviceAccount = require('../service-account');



/*
EXAMPLE:

createIntent(serviceAccount.project_id, 'getName', [
  {parts: [{text: 'Who is '}, { text: 'person', alias: 'person', entityType: '@sys.person'}]},
  {parts: [ { text: 'Do you know '},{text: 'person', alias: 'person',entityType: '@sys.person'}]}
], 
  [{displayName: 'person', entityTypeDisplayName: '@sys.person', value: '$person', mandatory: true, prompts: ['Please enter the name of the person']}], 
  ['$person is a famous person!']
);

*/
const createIntent = async(projectId, displayName, trainingPhrasesParts, parameters, messageTextResponses) => {
    // Instantiates the Intent Client
    const intentsClient = new dialogflow.IntentsClient({credentials: serviceAccount});

    // the path to identify agent that owns the created intent
    const agentPath = intentsClient.projectAgentPath(projectId);

    const trainingPhrases = [];

    // build the training phrases
    trainingPhrasesParts.forEach(trainingPhrasesPart => {
        const trainingPhrase = {
            type: 'EXAMPLE',
            parts: trainingPhrasesPart.parts,
        };
        trainingPhrases.push(trainingPhrase);
    });

    const messageText = {
        text: messageTextResponses,
    }

    const message = {
        text: messageText,
    };

    const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message],
        parameters: parameters,
    };

    const createIntentRequest = {
        parent: agentPath,
        intent: intent,
    };

    // create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    console.log(`Intent ${response.name} created`);
}

function generateAccessToken() {
    return new Promise((resolve, reject) => {
      const tokens = new TokenCache();
      tokens.get({
        // client_email from .json file 
        email: serviceAccount.client_email,
        // private key from .json file
        key: serviceAccount.private_key,
        // you can put scope ['https://www.googleapis.com/auth/cloud-platform']
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      }, function (err, token) {
        if(err){
          reject(err);
        }
          resolve(token);
      });
    });
  }

module.exports = createIntent;