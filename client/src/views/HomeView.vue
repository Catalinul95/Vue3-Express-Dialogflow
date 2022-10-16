<script setup>
  import axios from 'axios';
  import Chat from '../components/Chat/Chat.vue';
  import { store } from '../store/store.js';

  function processSendMessage(message) {
    // store the submitted client message
    store.createChatClientMessage(message);

    // send axios request to get bot's message
    axios.post(import.meta.env.VITE_BACKEND_URL, {queryInput: message})
      .then((response) => {
        // deconstruct response
        const data = response.data;
        const queryResult = data.queryResult;
        const fulfillmentMessages = queryResult.fulfillmentMessages;
        const chatBotMessage = fulfillmentMessages[0].text.text[0];

        // add a bot message that tells the user the bot is preparing to answer
        // set a delay
        if (chatBotMessage) {
          setTimeout(() => {
            store.createChatBotMessage('...');
          }, 500)

          // update the bot message that correct message received
          // set a delay
          setTimeout(() => {
            store.updateMessage(store.getLastMessageId(), chatBotMessage)
            // some music
            const audio = new Audio('https://soundbible.com/mp3/sms-alert-4-daniel_simon.mp3');
            audio.play();
          }, 1000)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
</script>

<template>
  <main>
    <Chat @sendMessage="processSendMessage"/>
  </main>
</template>
