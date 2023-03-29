<template>
    <section>
        <base-card>
            <h2>Register as a coach now!</h2>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{ invalid: invalidInput.has('firstName') }">
                    <label for="firstname">Firstname</label>
                    <input type="text" id="firstname" v-model.trim="firstName" />
                    <p v-if="invalidInput.has('firstName')">Firstname must not be empty.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput.has('lastName') }">
                    <label for="lastname">Lastname</label>
                    <input type="text" id="lastname" v-model.trim="lastName" />
                    <p v-if="invalidInput.has('lastName')">Lastname must not be empty.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput.has('description') }">
                    <label for="description">Description</label>
                    <textarea rows="5" id="description" v-model.trim="description" />
                    <p v-if="invalidInput.has('description')">Description must not be empty.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput.has('hourlyRate') }">
                    <label for="hourlyRate">Hourly Rate</label>
                    <input type="number" id="hourlyRate" v-model.number="hourlyRate" />
                    <p v-if="invalidInput.has('hourlyRate')">Rate must be greater than 0.</p>
                </div>
                <div class="form-control" :class="{ invalid: invalidInput.has('areas') }">
                    <h3>Areas of Expertise</h3>
                    <div>
                        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
                        <label for="frontend">Frontend Development</label>
                    </div>
                    <div>
                        <input type="checkbox" id="backend" value="backend" v-model="areas" />
                        <label for="backend">Backend Development</label>
                    </div>
                    <div>
                        <input type="checkbox" id="career" value="career" v-model="areas" />
                        <label for="career">Career Advisory</label>
                    </div>
                    <p v-if="invalidInput.has('areas')">At least one areas must be selected.</p>
                </div>
                <base-button>Register</base-button>
            </form>
        </base-card>
    </section>
</template>


<script>
import { mapActions } from 'vuex';
import * as _ from 'lodash';

export default {
    data() {
        return {
            invalidInput: new Set(),
            firstName: '', lastName: '', description: '', hourlyRate: null, areas: []
        }
    },
    watch: {
        firstName() { this.validateInput('firstName') },
        lastName() { this.validateInput('lastName') },
        description() { this.validateInput('description') },
        hourlyRate() { this.validateInputNumber('hourlyRate') },
        areas() { this.validateInput('areas') },
    },
    methods: {
        ...mapActions(['registerCoach']),
        validateInput(field) {
            if (_.isEmpty(this[field])) {
                this.invalidInput.add(`${field}`)
            } else {
                this.invalidInput.delete(`${field}`)
            }
        },
        validateInputNumber(field) {
            if (!_.isNumber(this[field]) || this[field] <= 0) {
                this.invalidInput.add(`${field}`)
            } else {
                this.invalidInput.delete(`${field}`)
            }
        },
        validateForm() {
            this.validateInput('firstName');
            this.validateInput('lastName');
            this.validateInput('description');
            this.validateInputNumber('hourlyRate');
            this.validateInput('areas')
        },
        submitForm() {
            this.validateForm()
            if (this.invalidInput.size > 0) {
                return
            }

            this.registerCoach({
                firstName: this.firstName,
                lastName: this.lastName,
                description: this.description,
                hourlyRate: this.hourlyRate,
                areas: this.areas
            });
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
