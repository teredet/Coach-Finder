import { v4 as uuidv4 } from 'uuid';


export default {
    registerCoach(context, payload) {
        context.commit('registerCoach', {
            ...payload,
            id: context.getters.userId,
        })
    },
    addRequest(context, payload) {
        context.commit('addRequest', {
            ...payload,
            id: uuidv4(),
        });
    }
};