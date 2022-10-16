<script setup>
    import { ref, defineEmits, onUpdated } from 'vue';
    import { store } from '../../store/store.js'

    // define emit
    const emit = defineEmits(['sendMessage']);

    // emit to parent when press enter
    const send = (e) => {
        emit('sendMessage', e.target.value);
        e.target.value = '';
        e.target.focus();
    };

    // add default chat message
    store.createChatBotMessage('Human presence detected! How can I be of assistance?');

    // get a ref to messages container div
    const messagesContainer = ref();
    const scrollIntoView = () => {
        messagesContainer.value.scrollTop = messagesContainer.value.lastElementChild.offsetTop + 200;

    }
    onUpdated(() => {
        // whenever data changes and the component re-renders, this is called.
        scrollIntoView();
    });
</script>

<template>
    <div>
        <div class="chatbot-container">
            <div class="chatbot-header-container">
                <div class="chatbot-header">
                    <h1 class="chatbot-header-title">ZenoChat</h1>
                </div>
            </div>
            <div class="chatbot-messages-container" ref="messagesContainer">
                <div class="chatbot-messages">
                    <div class="chatbot-message"  v-for="(message, index) in store.messages" :key="index"  :class="(message.type == 'client') ? 'chatbot-user-message' : ''">
                        <p> {{ message.message }} </p>
                    </div>
                </div>
            </div>
            <div class="chatbot-form-container">
                <input @keydown.enter="send" type="text" placeholder="Enter a message..." class="chatbot-form-input">
            </div>
        </div>
    </div>
</template>

<style scoped>

.chatbot-container {
    width: 390px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.chatbot-header-container {
    border-bottom: 1px solid #ccc;
}

.chatbot-header {
    padding: 0 20px;
    background-color: rgb(29, 26, 56);
    height: 70px;
    display: flex;
    align-items: center;
}

.chatbot-header-title {
    font-size: 20px;
    font-family: sans-serif;
    color: #fff;
    font-weight: 500;
}

.chatbot-messages-container {
    padding: 20px;
    height: 400px;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.chatbot-messages {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: auto;
}

.chatbot-message {
    background-color: #4ade80;
    color: #fff;
    padding: 13px 20px;
    border-radius: 5px;
    position: relative;
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    font-size: 17px;
    line-height: 1.3;
    margin-top: 30px;
    align-self: flex-end;
}

.chatbot-user-message {
    background-color: #a3a3a3;
    align-self: flex-start;
}

.chatbot-form-container {
    display: flex;
}

.chatbot-form-input {
    flex-basis: 100%;
    padding: 18px 20px;
    border: 1px solid #d5d5d5;
    font-size: 17px;
    font-weight: light;
    color: #333;
    background-color: #fff;
    outline: none;
}

input::placeholder {
    color: #999;
}
</style>