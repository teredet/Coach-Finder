<template>
    <section>
        <base-card>
            <header>
                <h3>Request Received</h3>
            </header>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <div v-else-if="!!error">
                <h3>Error!</h3>
                <h4>{{ error }}</h4>
            </div>
            <ul v-else-if="hasRequests">
                <request-item v-for="req in requests" :key="req.id" :email="req.email"
                    :message="req.message"></request-item>
            </ul>
            <h3 v-else>You haven't received any request yet!</h3>
        </base-card>
    </section>
</template>


<script>
import { mapGetters } from 'vuex';
import RequestItem from '../components/RequestItem.vue';

export default {
    components: { RequestItem },
    data() {
        return {
            isLoading: false,
            error: null,
        }
    },
    created() {
        this.loadRequests();
    },
    computed: {
        ...mapGetters(['requests', 'hasRequests']),
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('fetchRequests');
            } catch (err) {
                console.log(err);
                this.error = err.message ? err.message : "Somthing went wrong!";
                this.isLoading = false;

            }
            this.isLoading = false;
        }
    }
}
</script>


<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3, h4 {
    text-align: center;
}
</style>
