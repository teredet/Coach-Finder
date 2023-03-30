export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
};