<template>
    <base-card>
        <div v-if="isLoading">
            <p>Authenticating...</p>
            <base-spinner></base-spinner>
        </div>
        <div v-else-if="!!error" id="errorContainer">
            <h3>Error!</h3>
            <h4>{{ error }}</h4>
            <base-button @click="error=null">Try again</base-button>
        </div>
        <form v-else @submit.prevent="submitForm">
            <div class="form-control" :class="{ invalid: invalidInput.has('email') }">
                <label for="email">E-Mail</label>
                <input type="email" id="email" v-model.trim="email" />
                <p v-if="invalidInput.has('email')">Please, enter valid e-mail.</p>
            </div>
            <div class="form-control" :class="{ invalid: invalidInput.has('password') }">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
                <p v-if="invalidInput.has('password')">Password must be 6 characters or more.</p>
            </div>
            <base-button>{{ submitButtonCaption }}</base-button>
            <base-button type="button" mode="flat" @click="switchAuthMode">Or {{ switchButtonCaption }}</base-button>
        </form>
    </base-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            mode: 'login',
            invalidInput: new Set(),
            isLoading: false,
            error: null,
        }
    },
    watch: {
        email() { this.ValidateEmail('email') },
        password() { this.validatePassword('password') },
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? 'Login' : 'SignUp';
        },
        switchButtonCaption() {
            return this.mode === 'login' ? 'SignUp' : 'Login';
        }
    },
    methods: {
        ...mapActions(['signup', 'login']),
        validatePassword(field) {
            if (this[field].length < 6) {
                this.invalidInput.add(`${field}`)
            } else {
                this.invalidInput.delete(`${field}`)
            }
        },
        ValidateEmail(field) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this[field])) {
                this.invalidInput.delete(`${field}`)
            } else {
                this.invalidInput.add(`${field}`);
            }
        },
        async submitForm() {
            this.ValidateEmail('email');
            this.validatePassword('password');
            if (this.invalidInput.size > 0) {
                return
            }

            this.isLoading = true;

            try {
                if (this.mode == 'login') {
                    await this.login({
                        email: this.email,
                        password: this.password
                    })
                } else {
                    await this.signup({
                        email: this.email,
                        password: this.password
                    })
                }

                this.$router.replace('/coaches');
            } catch (err) {
                this.error = err.message || 'Feiled to authenticate.'
            }

            this.isLoading = false;
        },
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login';
        }
    }
}
</script>


<style scoped>
form {
    margin: 1rem;
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

#errorContainer {
    text-align: center; 
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