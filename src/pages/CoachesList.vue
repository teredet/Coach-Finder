<template>
    <section>
        <base-card class="filters">
            <h2>Find your coach!</h2>
            <span class="filter-option">
                <input type="checkbox" id="frontend" checked @change="setFilter" />
                <label for="frontend">Frontend</label>
            </span>
            <span class="filter-option">
                <input type="checkbox" id="backend" checked @change="setFilter" />
                <label for="backend">Backend</label>
            </span>
            <span class="filter-option">
                <input type="checkbox" id="career" checked @change="setFilter" />
                <label for="career">Career</label>
            </span>
        </base-card>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button link v-if="!isCoach && !isLoading" to="/register">Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <div v-else-if="!!error">
                <h3>Error!</h3>
                <h4>{{ error }}</h4>
            </div>
            <ul v-else-if="hasCoaches && !isLoading">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coach="coach"></coach-item>
            </ul>
            <h3 v-else>No coaches found.</h3>
        </base-card>
    </section>
</template>


<script>
import CoachItem from '../components/CoachItem.vue';
import { mapGetters } from 'vuex';

export default {
    components: { CoachItem },
    data() {
        return {
            isLoading: false,
            error: null,
            filters: { frontend: true, backend: true, career: true },
        }
    },
    computed: {
        ...mapGetters(['coaches', 'hasCoaches', 'isCoach', 'shouldUpdate']),
        filteredCoaches() {
            return this.coaches.filter(coach => {
                for (let key in this.filters) {
                    if (this.filters[key] && coach.areas.includes(key)) return true
                }
            })
        }
    },
    created() {
        if (this.shouldUpdate) this.loadCoaches();
    },
    methods: {
        setFilter(event) {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const undatedFilters = {
                ...this.filters,
                [inputId]: isActive
            };
            this.filters = undatedFilters;
        },
        async loadCoaches() {

            this.isLoading = true;
            try {
                await this.$store.dispatch('loadCoaches');
            } catch (err) {
                console.log(err);
                this.error = err.message ? err.message : "Somthing went wrong!";
                this.isLoading = false;

            }
            this.isLoading = false;
        }
    },
}
</script>


<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}

.filters h2 {
    margin: 0.5rem 0;
}

.filters .filter-option {
    margin-right: 1rem;
}

.filters .filter-option label,
.filters .filter-option input {
    vertical-align: middle;
}

.filter-option label {
    margin-left: 0.25rem;
}

.filter-option.active label {
    font-weight: bold;
}

h3, h4 {
    text-align: center;
}
</style>
