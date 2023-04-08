<template>
<div>
    <v-container>
        <v-layout>
            <v-flex xs12 sm12 lg12>
                <!-- TARJETA PROVEEDOR -->
                <v-card>
                    <!-- TARJETA PROVEEDOR -->
                    <v-card-title class="primary white--text">
                        <!-- alerta -->
                        PROVEEDOR
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                            Detalla un proveedor que se encarga de distribuir semillas para siembra .
                        </v-alert>
                    </v-card-text><!-- fin alerta -->

                    <!-- TARJETA PROVEEDOR -->
                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarProveedorSemilla">
                            <v-icon>list</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details success></v-text-field>
                    </v-card-actions>

                    <!-- TARJETA PROVEEDOR -->

                    <v-card-text>
                        <template>
                            <v-data-table :headers="tituloProveedorSemilla" :items="estadoProveedor" :items-per-page="5" class="elevation-1" :search="search" dense></v-data-table>
                        </template>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-form v-on:submit.prevent="nuevoProveedorSemilla" v-model="form">
                <v-dialog v-model="dialog" width="500" persistent>
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DE FAMILIA DE SEMILLA -->
                    <v-card>
                        <v-card-title class="success white--text">
                            Agregar Proveedor de Semillas
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreProveedorSemilla" :counter="30" label="Nombre Proveedor.." required success></v-text-field>
                            <v-text-field v-model="direccionProveedorSemilla" :counter="40" label="Direccion .." required success></v-text-field>
                            <v-text-field :rules="[rules.email]" v-model="correoProveedorSemilla" label="Correo electrónico.." required success></v-text-field>
                            <v-text-field v-model="paisProveedorSemilla" :counter="40" label="País Proveedor.." required success></v-text-field>
                            <v-text-field v-model="ciudadProveedorSemilla" :counter="40" label="Ciudad.." required success></v-text-field>
                            <v-text-field v-model="rucProveedorSemilla" :counter="13" label="Ruc.." required success></v-text-field>
                            <v-text-field v-model="telefonoFijoProveedorSemilla" :counter="9" label="Teléfono fijo.." required success></v-text-field>
                            <v-text-field v-model="telefonoCelularProveedorSemilla" :counter="10" label="Teléfono celular.." required success></v-text-field>
                            <v-text-field v-model="descripcionProveedorSemilla" :counter="60" label="Descripción.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="error" text @click="dialog = false,inicializarDatos()">
                                Cerrar
                            </v-btn>

                            <v-btn class="success" text @click="nuevoProveedorSemilla( nombreProveedorSemilla,direccionProveedorSemilla, correoProveedorSemilla, paisProveedorSemilla, ciudadProveedorSemilla, rucProveedorSemilla, telefonoFijoProveedorSemilla,telefonoCelularProveedorSemilla,descripcionProveedorSemilla)">
                                Guardar
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE FAMILIA DE SEMILLA-->

        </v-layout>
    </v-container>
    <template>
        <div class="text-center ma-2">
            <v-snackbar v-model="notificacionGuardado">
                {{ textoNotificacionGuardado }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="pink" text v-bind="attrs" @click="notificacionGuardado = false">
                        CERRAR
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </template>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from "axios";
import {
    json
} from "body-parser";
//import { isUndefined } from 'util';

export default {
    name: "Proveedorform",

    data() {

        return {
            alerta: false,
            textoNotificacionGuardado: '',
            notificacionGuardado: false,
            idProveedorSemilla: "",
            nombreProveedorSemilla: "",
            direccionProveedorSemilla: "",
            correoProveedorSemilla: "",
            paisProveedorSemilla: "",
            ciudadProveedorSemilla: "",
            rucProveedorSemilla: "",
            telefonoFijoProveedorSemilla: "",
            telefonoCelularProveedorSemilla: "",
            fechaCreacionProveedorSemilla: "",
            descripcionProveedorSemilla: "",

            dialog: false,
            form: false,
            search: '',
            rules: {
                email: v => !!(v || '').match(/@/) || 'Debes ingresar un correo válido.',
                required: v => !!v || 'Este campo es obligatorio',

            },

            tituloProveedorSemilla: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idProveedorSemilla"
                },
                {
                    text: "Nombre proveedor semilla",
                    value: "nombreProveedorSemilla"
                },
                {
                    text: "Direccion",
                    value: "direccionProveedorSemilla"
                },
                {
                    text: "Correo",
                    value: "correoProveedorSemilla"
                },
                {
                    text: "País",
                    value: "paisProveedorSemilla"
                },
                {
                    text: "Ciudad",
                    value: "ciudadProveedorSemilla"
                },
                {
                    text: "Ruc",
                    value: "rucProveedorSemilla"
                },
                {
                    text: "Tel. Fijo",
                    value: "telefonoFijoProveedorSemilla"
                },
                {
                    text: "Tel. Celular",
                    value: "telefonoCelularProveedorSemilla"
                },
                {
                    text: "Descripcion",
                    value: "descripcionProveedorSemilla"
                }
            ],
            estadoProveedor: [{
                idProveedorSemilla: "-",
                nombreProveedorSemilla: "-",
                direccionProveedorSemilla: "-",
                correoProveedorSemilla: "-",
                paisProveedorSemilla: "-",
                ciudadProveedorSemilla: "-",
                rucProveedorSemilla: "-",
                telefonoFijoProveedorSemilla: "-",
                telefonoCelularProveedorSemilla: "-",
                descripcionProveedorSemilla: "-"
            }]
        };
    },
    mounted() {

        this.listarProveedorSemilla()
    },

    methods: {
        listarProveedorSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proProveedorSemilla", {
                    headers: generalHeader()
                })
                .then(response => {
                    this.estadoProveedor = response.data;
                }).catch(error => {
                    console.log(error.response)
                });
        },
        inicializarDatos() {
            this.idProveedorSemilla = '';
            this.nombreProveedorSemilla = '';
            this.direccionProveedorSemilla = '';
            this.correoProveedorSemilla = '';
            this.paisProveedorSemilla = '';
            this.ciudadProveedorSemilla = '';
            this.rucProveedorSemilla = '';
            this.telefonoFijoProveedorSemilla = '';
            this.telefonoCelularProveedorSemilla = '';
            this.descripcionProveedorSemilla = '';

        },
        nuevoProveedorSemilla(nombreProveedorSemilla, direccionProveedorSemilla, correoProveedorSemilla, paisProveedorSemilla, ciudadProveedorSemilla, rucProveedorSemilla, telefonoFijoProveedorSemilla, telefonoCelularProveedorSemilla, descripcionProveedorSemilla) {

            if (nombreProveedorSemilla == '' || direccionProveedorSemilla == '' || correoProveedorSemilla == '' || paisProveedorSemilla == '' || ciudadProveedorSemilla == '' || rucProveedorSemilla == '' || telefonoFijoProveedorSemilla == '' || telefonoCelularProveedorSemilla == '' || descripcionProveedorSemilla == '') {
                alert("Los campos no pueden quedar vacíos!!");
            } else {
                let json = {
                    idProveedorSemilla: this.idProveedorSemilla,
                    nombreProveedorSemilla: this.nombreProveedorSemilla,
                    direccionProveedorSemilla: this.direccionProveedorSemilla,
                    correoProveedorSemilla: this.correoProveedorSemilla,
                    paisProveedorSemilla: this.paisProveedorSemilla,
                    ciudadProveedorSemilla: this.ciudadProveedorSemilla,
                    rucProveedorSemilla: this.rucProveedorSemilla,
                    telefonoFijoProveedorSemilla: this.telefonoFijoProveedorSemilla,
                    telefonoCelularProveedorSemilla: this.telefonoCelularProveedorSemilla,
                    descripcionProveedorSemilla: this.descripcionProveedorSemilla
                };

                axios
                    .post("http://localhost:12590/api/tucann/proProveedorSemilla", json, {
                        headers: generalHeader()
                    })
                    .then(data => {
                        // this.$router.push("home");

                        this.dialog = false;
                        this.listarProveedorSemilla();
                        this.inicializarDatos();
                        this.textoNotificacionGuardado = "Guardado correctamante!";
                        this.notificacionGuardado = false;

                    });
            }
        }

    }
};
</script>
