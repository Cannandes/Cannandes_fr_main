<template>
<div>
    <Buscarplantaxqrcomp></Buscarplantaxqrcomp>
    <Buscarplantaxidcomp></Buscarplantaxidcomp>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg10>
                <v-card elevation="15">

                    <v-card-title class="success white--text">
                        <v-icon dark x-large color="yellow" left>mdi-data-matrix-scan</v-icon>
                        <h2>Ficha de plantas..</h2>

                        <!--////////////////////////////////////// alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>
                            <v-alert :value="alert" color="error" dark border="top" transition="scale-transition" elevation="20">
                                <ol>
                                    <ul>Ingresa su codigo ID</ul>
                                    <ul>Ingresa su código QR</ul>
                                </ol>
                            </v-alert>
                        </v-card-text>

                    </v-card-title>
                    <v-divider horizontal red></v-divider>
                    <v-container>
                        <template>
                            <v-card>
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
                                        <v-card flat>
                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex>
                                                        <Buscarplantaxidcomp></Buscarplantaxidcomp>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-actions>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex>
                                                        <Buscarplantaxqrcomp></Buscarplantaxqrcomp>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-actions>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </template>
                    </v-container>
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
    data() {
        return {
            alert: false,
            tabs: null,
            ///////////
            
        }
    },
    components: {
        Buscarplantaxqrcomp,
        Buscarplantaxidcomp
    },
    methods: {

    },
}
</script>
