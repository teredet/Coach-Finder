import axios from 'axios';
import keys  from '../keys.js'

const dbURL = 'https://vue-course-d4c98-default-rtdb.europe-west1.firebasedatabase.app';

export default {
    async registerCoach(context, payload) {
        const currentUserId = context.getters.userId;

        const response = await axios.put(`${dbURL}/coaches/${currentUserId}.json`, payload);
        if (response.status != 200) {
            throw new Error("Data don't saved");
        }

        context.commit('registerCoach', {
            ...payload,
            id: currentUserId,
        });
    },
    async loadCoaches(context) {
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
        context.commit('setFetchCoachesTime')
    },
    async addRequest(context, payload) {

        const response = await axios.post(`${dbURL}/requests/${payload.coachId}.json`, { email: payload.email, message: payload.message });
        if (response.status != 200) {
            throw new Error("Data don't saved");
        }

        context.commit('addRequest', {
            ...payload,
            id: response.data.name,
        });
    },
    async fetchRequests(context) {
        const currentUserId = context.getters.userId;

        const response = await axios.get(`${dbURL}/requests/${currentUserId}.json`);
        if (response.status != 200) {
            throw new Error("Data don't saved");
        }
        
        const requests = [];
        for (const key in response.data) {
            requests.push({
                id: key,
                coachId: currentUserId,
                ...response.data[key]
            })
        }

        context.commit('setRequests', requests);
    },
    login() {},
    async signup(context, payload) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.googleAPIKey}`;
        const data = {
            email: payload.email, 
            password: payload.password,
            returnSecurityToken: true
        }
        const response = await axios.post(url, data);
        if (response.status != 200) {
            throw new Error("Data don't saved");
        }
        context.commit('setUser', {
            token: response.data.idToken,
            userId: response.data.localId,
            tokenExpiration: response.data.expiresIn
        })
    }
};