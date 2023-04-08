<template>
<div>
    <v-container grid-list-md>

        <v-layout row wrap>
            <v-flex xs12 sm8 lg8 mx-auto>
                <v-card class="mx-auto mt-5" wrap>

                    <v-card-title class="primary white--text">
                        ALMACEN
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <!-- fin alerta -->
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                            Lugar físico donde se almacenan las semillas.
                        </v-alert>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarAlmacenSemilla">
                            <v-icon>list</v-icon>
                        </v-btn>

                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table dense :headers="tituloAlmacenSemilla" :items="estadoAlmacen" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>
                </v-card>
            </v-flex>

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevoAlmacenSemilla">
                <v-dialog v-model="dialog" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Almacen Semilla
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreAlmacen" :counter="12" label="Nombre Almacén.." required success></v-text-field>
                            <v-text-field v-model="detalleAlmacen" :counter="50
                            " label="Descripción Almacén.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevoAlmacenSemilla">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->

        </v-layout>
    </v-container>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from "axios"
import json from "body-parser"

export default {
    name: 'Almacenform',
    data() {
        return {
            alerta: false,
            idAlmacen: 0,
            nombreAlmacen: '',
            detalleAlmacen: '',

            dialog: false,

            tituloAlmacenSemilla: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idAlmacen"
                },
                {
                    text: "Nombre almacén",
                    value: "nombreAlmacen"
                },
                {
                    text: "Descripcion almacén",
                    value: "detalleAlmacen"
                }
            ],

            estadoAlmacen: [{
                idAlmacen: '-',
                nombreAlmacen: '-',
                detalleAlmacen: '-',
            }],
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            
        }
    },
    mounted() {
        this.listarAlmacenSemilla();
    },

    methods: {
        listarAlmacenSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proAlmacen", {
                    headers: generalHeader()
                })
                .then(response => {
                    this.estadoAlmacen = response.data;
                });
        },
        nuevoAlmacenSemilla() {
            let json = {
                nombreAlmacen: this.nombreAlmacen,
                detalleAlmacen: this.detalleAlmacen
            };
            axios
                .post("http://localhost:12590/api/tucann/proAlmacen", json, {
                    headers: generalHeader()
                })
                .then(data => {
                    this.listarAlmacenSemilla();
                    this.dialog = false;
                    this.nombreAlmacen = '';
                    this.detalleAlmacen = '';
                })

        }

    }

}
</script>
