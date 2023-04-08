<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="600" class="mx-auto">
        <v-card-title class="primary white--text ">
            TIPO DE PLANTA
        </v-card-title>
        <v-layout>
            <v-flex>
                <h1></h1>
                <v-card>
                    <v-card-title>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong>Crear tipo de planta</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-alert type="success">
                                        Tipo de planta que se va a sembrar ayudará a diferenciarlas.
                                    </v-alert>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialogotipoplanta = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarTipoPlanta()">
                            <v-icon>list</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table dense :headers="titulosTipoPlanta" :items="elementosTipoPlanta" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>
            </v-flex>
            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoTipoPlanta">
                <v-dialog v-model="dialogotipoplanta" width="700">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE PLANTA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear nuevo tipo de planta
                        </v-card-title>
                        <v-card-text>
                            <v-layout wrap>
                                <v-flex ml-1 mr-1 sm12>
                                    <v-text-field type="text" label="Tipo planta.." v-model="nombreTipoPlanta" success>

                                    </v-text-field>
                                </v-flex>
                                <v-flex ml-1 mr-1 sm12>
                                    <v-text-field type="text" label="Detalle tipo de planta.." v-model="detalleTipoPlanta" success>

                                    </v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialogotipoplanta=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoTipoPlanta(nombreTipoPlanta,detalleTipoPlanta)">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE PLANTA-->
        </v-layout>
    </v-card>
    <v-container>
        <v-snackbar v-model="notificacion">
            {{ alertaMensaje}}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="notificacion = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {
    data() {
        return {
            dialogotipoplanta: false,
            idTipoPlanta: '',
            nombreTipoPlanta: '',
            detalleTipoPlanta: '',
            //////////////////
            alertaMensaje: '',
            notificacion: false,
            titulosTipoPlanta: [{
                    text: "Id",
                    align: "start",
                    sortable: false,
                    value: "idTipoPlanta"
                },
                {
                    text: "Tipo de planta",
                    value: "nombreTipoPlanta"
                },
                {
                    text: "Detalle",
                    value: "detalleTipoPlanta"
                },
            ],
            elementosTipoPlanta: [{
                idTipoPlanta: '',
                nombreTipoPlanta: '',
                detalleTipoPlanta: ''
            }]
        }
    },
    mounted() {
        this.listarTipoPlanta()
    },
    methods: {
        listarTipoPlanta() {
            axios.get('http://localhost:12590/api/tucann/proTipoPlanta', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosTipoPlanta = res.data;

                })
                .catch(err => {
                    console.error(err);
                })
        },
        nuevoTipoPlanta(a, b) {
            let json = {

                nombreTipoPlanta: a,
                detalleTipoPlanta: b

            }
            axios.post('http://localhost:12590/api/tucann/proTipoPlanta/', json, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.dialogotipoplanta = false;
                    this.listarTipoPlanta();
                    this.nombreTipoPlanta = '';
                    this.detalleTipoPlanta = '';
                    this.alertaMensaje = 'Tipo de planta creado correctamente.';
                    this.notificacion = true;
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },

}
</script>
