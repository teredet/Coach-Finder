import * as _ from 'lodash';

export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return !_.isEmpty(state.coaches);
    },
    userId(state) {
        return state.userId;
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
    }
};