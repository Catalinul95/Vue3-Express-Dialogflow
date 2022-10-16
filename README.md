# Vue3-express-dialogflow

## This is just a learning application.

For the client we use vue3 with composition api, the chat UI is made by me and it's using a sound to alert the client when the answer comes back, edit to .env with your
backend host.

In order to use this you need a dialogflow account with api enabled and a service account created. This is expecting a default getWeather intent that has a parameter,
the city, which is of type @sys.geo-city. Of course, you don't need to actually use it, create your own intents and enable fullfilments for the intents you want.

You also need ngrok to create a domain that forwards all requests to your machine, dialogflow does not work with localhost. You do this simply by opening ngrock and typing:
```ngrock http 3000```, now all requests will be sent to the server, which is listening on port 3000.

This is also using docker but you can work without it, just go in each folder and run ```npm install```.

In order to start the client, run ```npm run dev``` in the client directory and in order to start the servr run ```npm run dev``` in the server directory. The client
is running on port 4000 and the server on port 3000.

Add your service account details in server/service-account.json, this information is need to work with dialogflow. Add your ngrok domain to the fullfilment. Check the .env
file from your server directory, if you also want to use the open weather map api, you can set it there, and of course, the port.

