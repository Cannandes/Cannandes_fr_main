<template>
<div>
    <v-container grid-list-md >

        <v-layout row wrap >
            <v-flex xs12 sm12 lg8 mx-auto>
                <h1>Actividad de producción</h1>
                <v-card class="mx-auto mt-5" >
                    <v-card-title>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong> Crear actividad de producción</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                   
                                     <v-alert type="analogo1" dense>
                                        Son las fases que la planta pasa hasta convertirse en un producto.
                                    </v-alert>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-title>

                    <v-card-actions>
                       <!-- <v-btn icon class="analogo1 ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>-->
                        <v-btn icon class="analogo3 ml-3" dark @click="listarActividades">
                            <v-icon>list</v-icon>
                        </v-btn>
                       <!-- <v-btn icon class="analogo4" dark>
                            <v-icon>edit</v-icon>
                        </v-btn>-->
                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table dense :headers="tituloActividad" :items="estadoActividad" :items-per-page="7" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>
                </v-card>
            </v-flex>

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevaActividad">
                <v-dialog v-model="dialog" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Actividad de Producción
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreActividad" :counter="12" label="Nombre Actividad.." required success></v-text-field>
                            <v-text-field v-model="detalleActividad" :counter="50
                            " label="Descripción Actividad.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevaActividad">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVA ACTIVIDAD-->

        </v-layout>
    </v-container>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from "axios"
import json from "body-parser"
export default {
    name: 'Produccioncomp',
    components: {},
    directives: {},
    data() {
        return {
            idActividad: 0,
            nombreActividad: '',
            detalleActividad: '',

            dialog: false,

            tituloActividad: [{
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'idActividad'

                },
                {
                    text: 'Nombre Actividad',
                    value: 'nombreActividad'
                },
                {
                    text: 'Descripcion actividad',
                    value: 'detalleActividad'
                }
            ],
            estadoActividad: [{
                idActividad: '-',
                nombreActividad: '-',
                detalleActividad: '-',
            }]
/////////////////////////////////////////////////////////////////////////////////////
        };
    },
    mounted() {
        this.listarActividades();
    },
    methods: {
        listarActividades() {
            axios
            .get('http://localhost:12590/api/tucann/proActividad',{
                        headers: generalHeader()
                    })
            .then(res => {
                    this.estadoActividad = res.data;
                    // console.log(res)
                })
                .catch(err => {
                    console.error(err);
                });
        },

        nuevaActividad() {
          /*  let json = {
                nombreActividad: this.nombreActividad,
                detalleActividad: this.detalleActividad
            };
            axios
            .post('http://localhost:12590/api/tucann/proActividad/',json)
            .then(data => {
                this. listarActividades();
                this.dialog= false;
                this.nombreActividad='';
                this.detalleActividad='';

              //  console.log(res)
            })*/

        }

    },
};
</script>
