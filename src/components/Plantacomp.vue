<template>
<div>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs6>
                <h1>TIPO PLANTA</h1>
                <v-card>
                    <v-card-title>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong>Tipo de planta</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-alert type="success">
                                        Desde su siembra hasta su cosecha esta planta irá cambiando de estados.
                                    </v-alert>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn icon class="success ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="secondary" dark @click="listarTipoPlanta">
                            <v-icon>list</v-icon>
                        </v-btn>
                        <v-btn icon class="error" dark>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table :headers="tituloTipoPlanta" :items="estadoTipoPlanta" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>

            </v-flex>

            <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
            <v-flex xs6>
                <h1>ESTADO PLANTA</h1>
                <v-card>
                    <v-card-title>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong>Estado Planta</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-alert type="success">
                                        Se configura segun el estado por ejemplo una planta en estado "activa" o para saber que la planta fue procesada "procesada".
                                    </v-alert>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn icon class="success ml-3" dark @click="dialog2 = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="secondary" dark @click="listarEstadoPlanta">
                            <v-icon>list</v-icon>
                        </v-btn>
                        <v-btn icon class="error" dark>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table :headers="tituloEstadoPlanta" :items="estadoEstadoPlanta" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>

            </v-flex>

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoTipoPlanta">
                <v-dialog v-model="dialog" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE PLANTA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear tipo de Planta
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreTipoPlanta" :counter="12" label="Nombre tipo planta.." required success></v-text-field>
                            <v-text-field v-model="detalleTipoPlanta" :counter="60
                            " label="Descripción tipo de planta.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoTipoPlanta">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE PLANTA-->

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoEstadoPlanta">
                <v-dialog v-model="dialog2" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE ESTADO DE PLANTA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear tipo de Planta
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreEstadoPlanta" :counter="12" label="Nombre estado planta.." required success></v-text-field>
                            <v-text-field v-model="detalleEstadoPlanta" :counter="60
                            " label="Descripción estado de planta.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog2=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoEstadoPlanta">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE ESTADO DE PLANTA-->

        </v-layout>
    </v-container>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from "axios";
export default {
    name: 'Plantaform',
    components: {},
    directives: {},
    data() {
        return {
            idTipoPlanta: '',
            nombreTipoPlanta: '',
            detalleTipoPlanta: '',
            idEstadoPlanta: '',

            idEstadoPlanta: '',
            nombreEstadoPlanta: '',
            detalleEstadoPlanta: '',
            dialog: false,
            dialog2: false,

            tituloTipoPlanta: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idTipoPlanta"
                },
                {
                    text: "Nombre",
                    value: "nombreTipoPlanta"
                },
                {
                    text: "Detalle",
                    value: "detalleTipoPlanta"
                }
            ],
            estadoTipoPlanta: [{
                idTipoPlanta: '-',
                nombreTipoPlanta: '-',
                detalleTipoPlanta: '-',

            }],
            tituloEstadoPlanta: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idEstadoPlanta"
                },
                {
                    text: "Nombre",
                    value: "nombreEstadoPlanta"
                },
                {
                    text: "Detalle",
                    value: "detalleEstadoPlanta"
                }
            ],
            estadoEstadoPlanta: [{
                idEstadoPlanta: '-',
                nombreEstadoPlanta: '-',
                detalleEstadoPlanta: '-',

            }],

        };
    },
    mounted() {
        this.listarTipoPlanta();
        this.listarEstadoPlanta();

    },
    methods: {

        ///////////////////////////////TIPO PLANTA///////////////////////////////////////////////////////
        listarTipoPlanta() {

            axios
                .get('http://localhost:12590/api/tucann/proTipoPlanta',{
                        headers: generalHeader()
                    })
                .then(response => {
                    this.estadoTipoPlanta = response.data;
                })
                .catch(err => {
                    console.error(err);
                })

        },

        nuevoTipoPlanta() {
            let json = {
                nombreTipoPlanta: this.nombreTipoPlanta,
                detalleTipoPlanta: this.detalleTipoPlanta,
            };
            axios
                .post('http://localhost:12590/api/tucann/proTipoPlanta', json,{
                        headers: generalHeader()
                    })
                .then(res => {
                    this.listarTipoPlanta();
                    this.dialog = false;
                    this.nombreTipoPlanta = '';
                    this.detalleTipoPlanta = '';

                })
                .catch(err => {
                    console.error(err);
                })

        },

        //////////////////////////////////////////////////////
        ////////////////////ESTADO PLANTA/////////////////////
        listarEstadoPlanta() {

            axios
                .get('http://localhost:12590/api/tucann/proEstadoPlanta',{
                        headers: generalHeader()
                    })
                .then(response => {
                    this.estadoEstadoPlanta = response.data;
                })
                .catch(err => {
                    console.error(err);
                })

        },

        nuevoEstadoPlanta() {
            let json = {
                nombreEstadoPlanta: this.nombreEstadoPlanta,
                detalleEstadoPlanta: this.detalleEstadoPlanta,
            };
            axios
                .post('http://localhost:12590/api/tucann/proEstadoPlanta', json,{
                        headers: generalHeader()
                    })
                .then(res => {
                    this.listarEstadoPlanta();
                    this.dialog2 = false;
                    this.nombreEstadoPlanta = '';
                    this.detalleEstadoPlanta = '';

                })
                .catch(err => {
                    console.error(err);
                })

        },

    },
};
</script>
