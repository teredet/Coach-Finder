<template>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>{{ selectedCoach.hourlyRate }}/hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2>Reach out now!</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in selectedCoach.areas" :key="area" :title="area" :type="area"></base-badge>
            <p>{{ selectedCoach.description }}</p>
        </base-card>
    </section>
</template>


<script>
import { mapGetters } from 'vuex';


export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null,
        }
    },
    computed: {
        ...mapGetters(['coaches']),
        contactLink() {
            return `/coaches/${this.id}/contact`
        },
        fullName() {
            return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
        }

    },
    created() {
        this.selectedCoach = this.coaches.find(coach => coach.id == this.id);
    }
}
</script>

