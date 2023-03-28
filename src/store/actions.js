export default {
    registerCoach(context, payload) {
        context.commit('registerCoach', {
            ...payload,
            id: context.getters.userId,
        })
    }
};