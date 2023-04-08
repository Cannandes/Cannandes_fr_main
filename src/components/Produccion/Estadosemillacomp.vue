<template>
<div class="about">

    <v-container grid-list-md>

        <v-layout>
            <!-- INGRESO DE ESPACIO PARA TARJETAS-->
            <v-flex xs12 sm8 lg8 mx-auto>
                <!-- TARJETA ESTADO DE SEMILLA -->
                <v-card class="mx-auto mt-5">

                    <v-card-title class="primary white--text">
                        ESTADO SEMILLA
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <!-- fin alerta -->
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                            Este estado le dará a la semilla
                        </v-alert>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarEstadoSemilla">
                            <v-icon>list</v-icon>
                        </v-btn>

                    </v-card-actions>
                    <v-card-text>

                        <template>
                            <v-data-table dense :headers="tituloEstadoSemilla" :items="estadoSemilla" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>
            </v-flex>

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoEstadoSemilla">
                <v-dialog v-model="dialog" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
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
                            <v-btn class="error" text @click="dialog=false,inicializarDatos()">
                                Cerrar
                            </v-btn>
                            <v-btn class="primary" text @click="nuevoEstadoSemilla(nombreEstadoSemilla,descripcionEstadoSemilla)">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->

        </v-layout>

    </v-container>
    <v-container>
        <v-snackbar v-model="respuesta">
            {{ textorespuesta }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="respuesta = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from "axios";
import {
    json
} from "body-parser";

export default {
    data() {
        return {
            alerta: false,
            idEstadoSemilla: 0,
            nombreEstadoSemilla: "",
            descripcionEstadoSemilla: "",
            nombreFamiliaSemilla: "",
            descripcionFamiliaSemilla: "",
            idFamiliaSemilla: "",
            //////////////////////
            respuesta: false,
            textorespuesta: '',
            /////////////////////
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

        };
    },
    mounted() {
        this.listarEstadoSemilla();
    },

    methods: {
        inicializarDatos() {
            this.nombreEstadoSemilla = "";
            this.descripcionEstadoSemilla = "";
        },
        listarEstadoSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proEstadoSemilla", {
                    headers: generalHeader()
                })
                .then(response => {
                    this.estadoSemilla = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        nuevoEstadoSemilla(nombreEstadoSemilla, descripcionEstadoSemilla) {
            if (nombreEstadoSemilla == '' || descripcionEstadoSemilla == '') {
                alert("Los campos no pueden quedar vacíos!!");
            } else {
                let json = {
                    nombreEstadoSemilla: this.nombreEstadoSemilla,
                    descripcionEstadoSemilla: this.descripcionEstadoSemilla
                };

                axios
                    .post("http://localhost:12590/api/tucann/proEstadoSemilla", json, {
                        headers: generalHeader()
                    })
                    .then(data => {
                        // this.$router.push("home");
                        this.dialog = false;
                        this.respuesta = true;
                        this.textorespuesta = 'Estado guardado correctamente';
                        this.listarEstadoSemilla();
                    }).catch(error => {
                        console.log(error);
                        return res.status(500).json({
                            error: "Upps, algo fue mal"
                        });
                    })
            }

        },

    }
};
</script>
