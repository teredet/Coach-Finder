import axios from 'axios';
import keys  from '../keys.js'

const dbURL = 'https://vue-course-d4c98-default-rtdb.europe-west1.firebasedatabase.app';

export default {
    async registerCoach(context, payload) {
        const currentUserId = context.getters.userId;
        const token = context.getters.token;

        const response = await axios.put(`${dbURL}/coaches/${currentUserId}.json?auth=${token}`, payload);
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
        const token = context.getters.token;

        const response = await axios.get(`${dbURL}/requests/${currentUserId}.json?auth=${token}`);
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
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keys.googleAPIKey}`;
        if (mode == 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.googleAPIKey}`
        }
        const data = {
            email: payload.email, 
            password: payload.password,
            returnSecurityToken: true
        }
        const response = await axios.post(url, data);
        if (response.status != 200) {
            throw new Error("Data don't saved");
        }
        console.log(response.data)

        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        
        context.commit('setUser', {
            token: response.data.idToken,
            userId: response.data.localId,
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) return;
        
        context.commit('setUser', {
            token: token,
            userId: userId,
        })
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        context.commit('setUser', {
            token: null,
            userId: null,
        })
    }
};