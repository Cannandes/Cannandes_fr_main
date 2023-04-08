<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm12 md12 lg12>
                <v-card width="800" class="mx-auto">
                    <v-card-title class="primary white--text">
                        TIPO UBICACIÓN
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <!-- fin alerta -->
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                            Puede estar ubicada en un bloque,galpon, bandeja,pote.
                        </v-alert>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarTipoUbicacion()">
                            <v-icon>list</v-icon>
                        </v-btn>

                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table :headers="tituloTipoUbicacion" :items="elementosTipoUbicacion" :items-per-page="5" class="elevation-1" dense>
                                <template v-slot:item="{ item }">
                                    <tr>

                                        <td>{{item.idTipoUbicacion}}</td>
                                        <td>{{item.nombreTipoUbicacion}}</td>
                                        <td>
                                            <v-btn icon color="primary" @click="editarTipoUbicacion(item.idTipoUbicacion) ">
                                                <v-icon success fab>edit</v-icon>
                                            </v-btn>
                                            <v-btn icon color="analogo4" @click="eliminarTipoUbicacion(item.idTipoUbicacion)">
                                                <v-icon>delete</v-icon>
                                            </v-btn>

                                        </td>
                                    </tr>

                                </template>
                            </v-data-table>
                        </template>

                    </v-card-text>

                </v-card>

            </v-flex>

            <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoTipoUbicacion">
                <v-dialog v-model="dialog" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE UBICACION-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear tipo de Ubicación
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreTipoUbicacion" :counter="12" label="Nombre tipo ubicacion.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoTipoUbicacion()">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE UBICACION-->
        </v-layout>
    </v-container>
    <v-container>
        <v-snackbar v-model="notificacion">
            {{ mensajenotificacion }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="notificacion = false">
                    Close
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

            alerta: false,
            idTipoUbicacion: '',
            nombreTipoUbicacion: '',
            notificacion: false,
            mensajenotificacion: '',
            dialog: false,

            tituloTipoUbicacion: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idTipoUbicacion"
                },
                {
                    text: "Nombre",
                    value: "nombreTipoUbicacion"
                },
                {
                    text: "Acciones",
                    value: ""
                }
            ],
            elementosTipoUbicacion: [{
                idEstadoUbicacion: '',
                nombreEstadoUbicacion: '',

            }],

        }
    },
    mounted() {
        this.listarTipoUbicacion();
    },
    methods: {
        editarTipoUbicacion() {},
        listarTipoUbicacion() {
            axios
                .get('http://localhost:12590/api/tucann/proTipoUbicacion/', {
                    headers: generalHeader()
                })
                .then(response => {
                    this.elementosTipoUbicacion = response.data;

                })
                .catch(err => {
                    console.error(err);
                })
        },

        nuevoTipoUbicacion() {
            let json = {
                idTipoUbicacion: '',
                nombreTipoUbicacion: this.nombreTipoUbicacion,

            };
            axios.post('http://localhost:12590/api/tucann/proTipoUbicacion/', json, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.listarTipoUbicacion();
                    this.nombreTipoUbicacion = '';
                    this.dialog = false;

                })
                .catch(err => {
                    console.error(err);
                })
        },
        eliminarTipoUbicacion(codigo) {
            axios.delete('http://localhost:12590/api/tucann/proTipoUbicacion/' + codigo, {
                    headers: generalHeader()
                })
                .then(res => {
                 
                  
                })
                .catch(err => {
                    console.error(err);
                    alert("Esta acción se puede realizar, debido a que este tipo se encuentra referida en otra tabla!!");
                })

        },

    },
}
</script>
