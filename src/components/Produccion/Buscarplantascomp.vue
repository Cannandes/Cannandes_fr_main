<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg12>
                <v-card elevation="15" width="1200" class="mx-auto">
                    <v-card-title class="success white--text">
                        <v-icon dark x-large color="yellow" left>mdi-data-matrix-scan</v-icon>
                        <h2>Ficha de plantas</h2>
                        <!--////////////////////////////////////// alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                <ul>
                                    <li>Se puede buscar una planta por ID <v-chip label color="white" small class="secondary--text dense">
                                            <v-icon size="25">pin</v-icon>
                                        </v-chip>
                                    </li>
                                    <li>Se puede buscar una planta por QR <v-chip label color="white" small class="secondary--text dense">
                                            <v-icon size="20">qr_code</v-icon>
                                        </v-chip>
                                    </li>
                                </ul>
                            </v-alert>
                        </v-card-text>

                    </v-card-title>
                    <v-divider horizontal red></v-divider>
                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <template v-slot:extension>
                            <v-tabs v-model="tabs" fixed-tabs>
                                <v-tab v-for="n in 2" :key="n">
                                    <div v-if="n==1">
                                        <v-icon large>pin</v-icon>
                                    </div>
                                    <div v-else>
                                        <v-icon large>qr_code</v-icon>
                                    </div>
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <Buscarplantaxidcomp></Buscarplantaxidcomp>
                        </v-tab-item>
                        <v-tab-item>
                            <Buscarplantaxqrcomp></Buscarplantaxqrcomp>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>

</div>
</template>

<script>
import Buscarplantaxqrcomp from '@/components/Produccion/Buscarplantaxqrcomp.vue';
import Buscarplantaxidcomp from '@/components/Produccion/Buscarplantaxidcomp.vue';
export default {
    name: 'CannandesSaBuscarplantascomp',

    data() {
        return {
            alert: false,
            tabs: null,
        };
    },

    mounted() {

    },

    methods: {

    },
    components: {
        Buscarplantaxqrcomp,
        Buscarplantaxidcomp
    },
};
</script>

<style>
.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>
