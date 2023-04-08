<template>
<div>
    <Clonacioncomp></Clonacioncomp>
</div>
</template>

<script>
import Clonacioncomp from '@/components/Produccion/Clonacioncomp.vue'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/");
        }
    },
    components: {
        Clonacioncomp
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    }

}
</script>
