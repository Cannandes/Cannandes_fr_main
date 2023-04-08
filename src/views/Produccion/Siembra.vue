<template>
    <div>
        <v-container>
            <Siembracomp></Siembracomp>
          <!--  <Bandejascomp></Bandejascomp>-->
        </v-container>
        
    </div>
</template>

<script>
import Siembracomp from '@/components/Produccion/Siembracomp.vue';
import Bandejascomp from '@/components/Produccion/Bandejascomp.vue';
export default {
    name: 'Siembra',
    components: { 
        Siembracomp,
        Bandejascomp
     },
    directives: {  },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>