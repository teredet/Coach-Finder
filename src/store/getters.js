export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return !!state.coaches.length;
    },
    userId(state) {
        return state.userId;
    },
    isCoach(state) {
        return state.coaches.some(coach => coach.id === state.userId);
    }
};