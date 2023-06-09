export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    setFetchCoachesTime(state) {
        state.lastFetchCoaches = new Date().getTime();
    },
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setRequests(state, payload) {
        state.requests = payload;
    },
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
    },
};