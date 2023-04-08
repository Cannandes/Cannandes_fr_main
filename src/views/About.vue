<template>
<div class="about">

    <h1>ABOUT</h1>

  <!--  <v-container grid-list-md>
        <h1>SEMILLAS</h1>
        <v-layout row wrap>
            INGRESO DE ESPACIO PARA TARJETAS//////////
           
                TARJETA ESTADO DE SEMILLA////////
                <v-card class="mx-auto mt-5" wrap>
                    <v-card-subtitle>

                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong> Estado Semilla</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    Este estado le dará a la semilla
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>

                    </v-card-subtitle>

                    <v-card-actions>
                        <v-btn icon class="success ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="secondary" dark @click="listarEstadoSemilla">
                            <v-icon>list</v-icon>
                        </v-btn>
                        <v-btn icon class="error" dark>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>

                        <template>
                            <v-data-table :headers="tituloEstadoSemilla" :items="estadoSemilla" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>
            </v-flex>

            <v-flex xs12 sm6 lg6>
            TARJETA FAMILIA DE SEMILLA 
                <v-card class="mx-auto mt-5" wrap>
                    <v-card-subtitle>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong> Familia Semilla</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    Para saber cuales son sus raices.
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn icon class="success ml-3" dark @click="dialog2 = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="secondary" dark @click="listarFamiliaSemilla">
                            <v-icon>list</v-icon>
                        </v-btn>
                        <v-btn icon class="error" dark>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table :headers="tituloFamiliaSemilla" :items="familiaSemilla" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>

            </v-flex>

            PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS
            <form v-on:submit.prevent="nuevoEstadoSemilla">
                <v-dialog v-model="dialog" width="500">
                    PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Estado Semilla
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreEstadoSemilla" :counter="12" label="Nombre Estado.." required success></v-text-field>
                            <v-text-field v-model="descripcionEstadoSemilla" :counter="50
                            " label="Observacion Estado.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoEstadoSemilla">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form>FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA

            <form v-on:submit.prevent="nuevoFamiliaSemilla">
                <v-dialog v-model="dialog2" width="500">
                    PANTALLA EMERGENETE PARA INGRESAR NUEVO DE FAMILIA DE SEMILLA
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Familia Semilla
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreFamiliaSemilla" :counter="12" label="Nombre Familia.." required success></v-text-field>
                            <v-text-field v-model="descripcionFamiliaSemilla" :counter="40" label="Observacion Familia.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog2=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoFamiliaSemilla">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form>FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE FAMILIA DE SEMILLA

        </v-layout>

    </v-container>-->
</div>
</template>

<script>/*
import axios from "axios";
import {
    json
} from "body-parser";

export default {
    data() {
        return {
            idEstadoSemilla: 0,
            nombreEstadoSemilla: "",
            descripcionEstadoSemilla: "",
            nombreFamiliaSemilla: "",
            descripcionFamiliaSemilla: "",
            idFamiliaSemilla: "",

            dialog: false,
            dialog2: false,

            tituloEstadoSemilla: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idEstadoSemilla"
                },
                {
                    text: "Nombre estado semilla",
                    value: "nombreEstadoSemilla"
                },
                {
                    text: "Descripcion",
                    value: "descripcionEstadoSemilla"
                }
            ],
            estadoSemilla: [{
                idEstadoSemilla: "-",
                nombreEstadoSemilla: "-",
                descripcionEstadoSemilla: "-"
            }],
            ///////////////////////////////////////////////////////////////////////////
            tituloFamiliaSemilla: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idFamiliaSemilla"
                },
                {
                    text: "Nombre familia semilla",
                    value: "nombreFamiliaSemilla"
                },
                {
                    text: "Descripcion",
                    value: "descripcionFamiliaSemilla"
                }
            ],
            familiaSemilla: [{
                idFamiliaSemilla: "-",
                nombreFamiliaSemilla: "-",
                descripcionFamiliaSemilla: "-"
            }]
        };
    },
    mounted() {
        this.listarFamiliaSemilla(), this.listarEstadoSemilla();
    },

    methods: {
        listarEstadoSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proEstadoSemilla")
                .then(response => {
                    this.estadoSemilla = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        nuevoEstadoSemilla() {
            let json = {
                nombreEstadoSemilla: this.nombreEstadoSemilla,
                descripcionEstadoSemilla: this.descripcionEstadoSemilla
            };

            axios
                .post("http://localhost:12590/api/tucann/proEstadoSemilla", json)
                .then(data => {
                    // this.$router.push("home");
                    this.dialog = false;
                    this.listarEstadoSemilla();
                }).catch(error => {
                    console.log(error);
                    return res.status(500).json({
                        error: "Upps, algo fue mal"
                    });
                })

        },
        listarFamiliaSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proFamiliaSemilla")
                .then(response => {
                    this.familiaSemilla = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        nuevoFamiliaSemilla() {
            let json = {
                nombreFamiliaSemilla: this.nombreFamiliaSemilla,
                descripcionFamiliaSemilla: this.descripcionFamiliaSemilla
            };

            axios
                .post("http://localhost:12590/api/tucann/proFamiliaSemilla", json)
                .then(data => {
                    //  this.$router.push("home");
                    this.dialog2 = false;
                    this.listarFamiliaSemilla();
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
};*/
</script>
