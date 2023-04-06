import * as _ from 'lodash';

export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    }, 
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return !_.isEmpty(state.coaches);
    },
    isCoach(state) {
        return state.coaches.some(coach => coach.id === state.userId);
    },
    requests(state, getters) {
        const curentUserId = getters.userId;
        return state.requests.filter(req => req.coachId === curentUserId);
    },
    hasRequests(_1, getters) {
        return !_.isEmpty(getters.requests);
    },
    shouldUpdate(state) {
        if (!state.lastFetchCoaches) return true;
        const currentTime = new Date().getTime();
        return (currentTime - state.lastFetchCoaches) / 1000 > 60;
    }
};