<template>
<div class="text-center">
      <v-progress-circular :size="40" :width="3" color="success" indeterminate></v-progress-circular>
</div>
</template>

<script>
export default {
    name: 'CannandesSaLoadingcomp',
    data() {
        return {
            interval: {},
            value: 0,
        };
    },
    mounted() {
    },

    methods: {
    },
};
</script>
