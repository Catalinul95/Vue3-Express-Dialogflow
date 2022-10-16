import { reactive } from "vue";

export const store = reactive({
    messages: [],
    createChatMessage(type, message) {
        let id = this.messages.length;
        this.messages.push({type, message, id});
    },
    createChatBotMessage(message) {
        this.createChatMessage('bot', message);
    },
    createChatClientMessage(message) {
        this.createChatMessage('client', message);
    },
    updateMessage(index, newMessage) {
        if (this.messages[index] !== undefined)
            this.messages[index].message = newMessage;
    },
    getLastMessageId() {
        if (this.messages.length)
            return this.messages[this.messages.length - 1].id;
    },
    getMessages() {
        return this.messages;
    },
});