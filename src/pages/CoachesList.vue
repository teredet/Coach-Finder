<template>
    <h3>Coaches</h3>
    <section>
        FILTER
    </section>
    <section>
        <div class="controls">
            <button>Refresh</button>
        </div>
        <ul v-if="hasCoaches">
            <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coach="coach"></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
    </section>
</template>


<script>
import CoachItem from '../components/CoachItem.vue';

export default {
    components: { CoachItem },
    computed: {
        filteredCoaches() {
            return this.$store.getters["coaches"];
        },
        hasCoaches() {
            return this.$store.getters["hasCoaches"];
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
</style>
