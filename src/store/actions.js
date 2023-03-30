import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const dbURL = 'https://vue-course-d4c98-default-rtdb.europe-west1.firebasedatabase.app';

export default {
    async registerCoach(context, payload) {
        const userId = context.getters.userId;

        try {
            const response = await axios.put(`${dbURL}/coaches/${userId}.json`, payload);
            if (response.status != 200) {
                throw new Error("Data don't saved");
            }
        } catch (err) {
            console.log(err);
        }

        context.commit('registerCoach', {
            ...payload,
            id: userId,
        });
    },
    async loadCoaches(context) {
        try {
            const response = await axios.get(`${dbURL}/coaches.json`);

            if (response.status != 200) {
                throw new Error("Data don't saved");
            }

            const coaches = [];
            for (const key in response.data) {
                coaches.push({
                    id: key,
                    ...response.data[key]
                })
            }
            context.commit('setCoaches', coaches)
        } catch (err) {
            console.log(err);
        }

    },
    addRequest(context, payload) {
        context.commit('addRequest', {
            ...payload,
            id: uuidv4(),
        });
    }
};