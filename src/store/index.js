import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';


import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default createStore({
    state() {
        return {
            userId: uuidv4(),
            // userId: '363577af-de58-4e0f-ba57-780c32eba231',
            coaches: [
                {
                    id: 'ed611200-4815-49a1-9b6f-9107556e4a39',
                    firstName: 'Test',
                    lastName: 'Testovish',
                    areas: ['frontend', 'backend', 'career'],
                    description: 'Universal men',
                    hourlyRate: 30
                },
                {
                    id: '32473f66-a518-4cf9-9567-068cb239f810',
                    firstName: 'Test2',
                    lastName: 'Testovish2',
                    areas: ['frontend'],
                    description: 'Man who paints buttons',
                    hourlyRate: 10
                },
            ],
            requests: []
        }
    },
    mutations,
    actions,
    getters
});