<template>
    <form @submit.prevent="submitForm">
        <div :class="{ invalid: invalidInput.has('email') }">
            <label for="email">Your E-Mail</label>
            <input type="email" id="email" v-model.trim="email" />
            <p v-if="invalidInput.has('email')">Please, enter valid e-mail.</p>
        </div>
        <div :class="{ invalid: invalidInput.has('message') }">
            <label for="message">Message</label>
            <textarea rows="5" id="message" v-model.trim="message"></textarea>
            <p v-if="invalidInput.has('message')">Message must not be empty.</p>
        </div>
        <div class="actions">
            <base-button>Send Message</base-button>
        </div>
    </form>
</template>


<script>
import * as _ from 'lodash';
import { mapActions } from 'vuex';


export default {
    data() {
        return {
            email: '',
            message: '',
            invalidInput: new Set(),
        }
    },
    watch: {
        email() { this.ValidateEmail('email') },
        message() { this.validateInput('message') },
    },
    methods: {
        ...mapActions(['addRequest']),
        ValidateEmail(field) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this[field])) {
                this.invalidInput.delete(`${field}`)
            } else {
                this.invalidInput.add(`${field}`);
            }
        },
        validateInput(field) {
            if (_.isEmpty(this[field])) {
                this.invalidInput.add(`${field}`)
            } else {
                this.invalidInput.delete(`${field}`)
            }
        },
        submitForm() {
            this.validateInput('message');
            this.ValidateEmail('email');
            if (this.invalidInput.size > 0) {
                return
            }

            this.addRequest({
                email: this.email,
                message: this.message,
                coachId: this.$route.params.id
            });
            this.$router.replace('/coaches');
        }
    }
} 
</script>


<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}


.invalid label {
    color: red;
}

.invalid p {
    font-size: small;
    color: red;
}

.actions {
    text-align: center;
}
</style>
