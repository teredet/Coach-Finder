export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setRequests(state, payload) {
        state.requests = payload;
    },
};