<template>
    <h3>Coach Details</h3>
    <router-link :to="contactLink">Contact</router-link>
    <router-view></router-view>
</template>


<script>
export default {
    computed: {
        contactLink() {
            return {path: `/coaches/${'id'}/contact`}
        }
    }
}
</script>


<style scoped>

</style>
