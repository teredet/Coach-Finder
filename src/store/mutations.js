export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    addRequest(state, payload) {
        state.requests.push(payload);
    }
};