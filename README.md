# Vue3-express-dialogflow

## This is just a learning application.

For the client we use vue3 with composition api, the chat UI is made by me and it's using a sound to alert the client when the answer comes back, edit to .env with your
backend host.

In order to use this you need a dialogflow account with api enabled and a service account created. This is expecting a default getWeather intent that has a parameter,
the city, which is of type @sys.geo-city. Of course, you don't need to actually use it, create your own intents and enable fullfilments for the intents you want. R

You also need ngrok to create a domain that forwards all requests to your machine, dialogflow does not work with localhost. You do this simply by opening ngrok and typing:
```ngrok http 3000```, now all requests will be sent to the server, which is listening on port 3000. Remember to add this domain to your fulfillment page in your dialogflow dashboard ( witht the webhook route part  ). You also need to active fulfillment for every intent you want to have fulfillment.

This is also using docker but you can work without it, just go in each folder and run ```npm install```.

In order to start the client, run ```npm run dev``` in the client directory and in order to start the servr run ```npm run dev``` in the server directory. The client
is running on port 4000 and the server on port 3000.

Add your service account details in server/service-account.json, this information is needed to work with dialogflow. Add your ngrok domain to the fullfilment. Check the .env
file from your server directory, if you also want to use the open weather map api, you can set it there, and of course, the port. The server has two routes, one for the client and the webook needed so that dialogflow can communicate with the server.

