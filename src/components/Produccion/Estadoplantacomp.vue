<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="600" class="mx-auto">
        <v-card-title class="primary white--text ">
            ESTADO PLANTA <v-spacer></v-spacer>
            <v-btn class="primary" elevation="15" icon @click="alerta = !alerta">
                <v-icon color="white">mdi-information-variant</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-alert v-model="alerta" color="">
                Este estado le dara a la planta una clasificación para poder ser manejada.
            </v-alert>
        </v-card-text>
        <v-card-text>
            <v-layout>
                <!-- INGRESO DE ESPACIO PARA TARJETAS-->
                <v-flex xs12 sm10 lg10 mx-auto>
                    <!-- TARJETA ESTADO DE SEMILLA -->
                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialogoestadoplanta = true,listarGestionaEstadoPlanta()">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarEstadoPlanta">
                            <v-icon>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
            <v-card-text>
                <v-data-table dense :headers="tituloEstadoPlanta" :items="elementosEstadoPlanta" :items-per-page="5"></v-data-table>
            </v-card-text>

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoEstadoSemilla">
                <v-dialog v-model="dialogoestadoplanta" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE ESTADO PLANTA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Estado Planta
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="nombreEstadoPlanta" :counter="12" label="Nombre Estado Planta.." required success></v-text-field>
                            <v-text-field v-model="detalleEstadoPlanta" :counter="50" label="Observacion Estado Planta.." required success></v-text-field>

                            <v-select v-model="idGestionEstadoPlanta" item-text="nombGestionarEstadoPlanta" item-value="idGestionarEstadoPlanta" label="Donde mostrar.." :items="elementosGestionarEstaPlanta" success></v-select>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialogoestadoplanta=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoEstadoPlanta(nombreEstadoPlanta,detalleEstadoPlanta,idGestionEstadoPlanta)">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->

        </v-card-text>

    </v-card>
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
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert"
export default {
    data() {
        return {
            alerta: false,
            dialogoestadoplanta: false,
            idEstadoPlanta: '',
            nombreEstadoPlanta: '',
            detalleEstadoPlanta: '',
            idGestionEstadoPlanta: '',
            ////////////////////////
            respuesta: false,
            textorespuesta: '',
            ////////////////////////
            tituloEstadoPlanta: [{
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'idEstadoPlanta'
                },
                {
                    text: 'Nombre estado planta',
                    value: 'nombreEstadoPlanta'
                },
                {
                    text: 'Detalle de estado planta',
                    value: 'detalleEstadoPlanta'
                },
                {
                    text: 'Restricción',
                    value: 'proGestionarEstadoPlanta.nombGestionarEstadoPlanta'
                },
            ],
            elementosEstadoPlanta: [{
                idEstadoPlanta: '',
                nombreEstadoPlanta: '',
                detalleEstadoPlanta: '',
                proGestionarEstadoPlanta: {
                    idGestionarEstadoPlanta: '',
                    nombGestionarEstadoPlanta: ''
                }
            }],
            elementosGestionarEstaPlanta: [{
                idGestionarEstadoPlanta: '',
                nombGestionarEstadoPlanta: ''
            }]

        }
    },
    mounted() {
        this.listarEstadoPlanta();
    },
    methods: {
        listarEstadoPlanta() {
            axios.get('http://localhost:12590/api/tucann/proEstadoPlanta', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosEstadoPlanta = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

        },
        nuevoEstadoPlanta(nombreEstadoPlanta, detalleEstadoPlanta, idGestionEstadoPlanta) {

            if (nombreEstadoPlanta == '' || detalleEstadoPlanta == '' || idGestionEstadoPlanta == '') {

                //  alert("Los campos no deben quedar vacios");
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Pilas!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Los campos no deben quedar vacíos!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                    /*
                      title: '<strong style="color:blue;font-style: italic; font-family: Roboto,sans-serif" >HTML <u>example</u></strong>',
                    html: 'You can use <b>bold text</b>, ' +
                        '<a href="//sweetalert2.github.io">links</a> ' +
                        'and other HTML tags',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: '<spam style=" font-family: Roboto,sans-serif">Chevere</spam>',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText: '<spam style="color:blue;font-style: italic; font-family: Roboto,sans-serif"></spam>',
                    cancelButtonAriaLabel: 'Thumbs down' */
                }).then(r => {
                    // console.log(r);
                });

            } else {
                let json = {
                    nombreEstadoPlanta: nombreEstadoPlanta,
                    detalleEstadoPlanta: detalleEstadoPlanta,
                    proGestionarEstadoPlanta: {
                        idGestionarEstadoPlanta: idGestionEstadoPlanta,
                    }
                }
                axios.post('http://localhost:12590/api/tucann/proEstadoPlanta/', json, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.dialogoestadoplanta = false;
                        this.respuesta = true;
                        this.textorespuesta = 'Estado guardado correctamante';
                        this.listarEstadoPlanta();
                        this.nombreEstadoPlanta = '';
                        this.detalleEstadoPlanta = '';

                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        listarGestionaEstadoPlanta() {
            axios.get('http://localhost:12590/api/tucann/proGestionarEstadoPlanta', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosGestionarEstaPlanta = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
}
</script>
