<template>
    <section>
        <base-card>
            <h2>Register as a coach now!</h2>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{ invalid: invalidInput == 'firstName' }">
                    <label for="firstname">Firstname</label>
                    <input type="text" id="firstname" v-model.trim="newData.firstName" />
                    <p v-if="invalidInput == 'firstName'">Firstname most not be empty.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput == 'lastName' }">
                    <label for="lastname">Lastname</label>
                    <input type="text" id="lastname" v-model.trim="newData.lastName" />
                    <p v-if="invalidInput == 'lastName'">Lastname most not be empty.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput == 'description' }">
                    <label for="description">Description</label>
                    <textarea rows="5" id="description" v-model.trim="newData.description" />
                    <p v-if="invalidInput == 'description'">Description most not be empty.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput == 'hourlyRate' }">
                    <label for="hourlyRate">Hourly Rate</label>
                    <input type="number" id="hourlyRate" v-model.number="newData.hourlyRate" />
                    <p v-if="invalidInput == 'hourlyRate'">Rate most be greater than 0.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput == 'areas' }">
                    <h3>Areas of Expertise</h3>
                    <div>
                        <input type="checkbox" id="frontend" value="frontend" v-model="newData.areas" />
                        <label for="frontend">Frontend Development</label>
                    </div>
                    <div>
                        <input type="checkbox" id="backend" value="backend" v-model="newData.areas" />
                        <label for="backend">Backend Development</label>
                    </div>
                    <div>
                        <input type="checkbox" id="career" value="career" v-model="newData.areas" />
                        <label for="career">Career Advisory</label>
                    </div>
                    <p v-if="invalidInput == 'areas'">At least one areas must be selected.</p>
                </div>
                <p v-if="!formIsValid"> Please fix your form and submit again!</p>
                <base-button>Register</base-button>
            </form>
        </base-card>
    </section>
</template>


<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            formIsValid: true,
            invalidInput: '',
            newData: {
                firstName: '', lastName: '', description: '', hourlyRate: null, areas: []
            }
        }
    },
    methods: {
        ...mapActions(['registerCoach']),
        submitForm() {

            this.registerCoach(this.newData);
            this.$router.replace('/coaches');
        }
    }
}
</script>


<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid p {
    font-size: small;
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>
