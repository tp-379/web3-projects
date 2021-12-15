import { reactive } from 'vue'

const state = reactive({
    message: 'Hello World'
})

const methods = {
    connectBlockchain() {
        console.log("connected from store")
    },
    retrieveMessage() {
        state.message = 'New Hello'
    },
    storeMessage(message) {
        console.log('storing value: ', message)
    }

}

export default {
    state,
    methods
}