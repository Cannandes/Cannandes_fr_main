<template>
<div>
    <v-container grid-list-md>
        <v-layout>
            <v-flex xs12 sm8 lg8 mx-auto>
                <!-- TARJETA FAMILIA DE SEMILLA -->
                <v-card class="mx-auto mt-5" wrap>

                    <v-card-title class="primary white--text">
                        FAMILIA SEMILLA
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <!-- fin alerta -->
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                            Para saber cuales son sus raices.
                        </v-alert>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn icon class="analogo1 ml-3" dark @click="dialog2 = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="analogo3" dark @click="listarFamiliaSemilla">
                            <v-icon>list</v-icon>
                        </v-btn>

                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table dense :headers="tituloFamiliaSemilla" :items="familiaSemilla" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>

                </v-card>

            </v-flex>

            <form v-on:submit.prevent="nuevoFamiliaSemilla">
                <v-dialog v-model="dialog2" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DE FAMILIA DE SEMILLA -->
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

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE FAMILIA DE SEMILLA-->
        </v-layout>
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
            dialog2: false,
            idFamiliaSemilla: "-",
            nombreFamiliaSemilla: "-",
            descripcionFamiliaSemilla: "-",
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
        }
    },
    mounted() {
        this.listarFamiliaSemilla()
    },
    methods: {
        listarFamiliaSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proFamiliaSemilla", {
                    headers: generalHeader()
                })
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
                .post("http://localhost:12590/api/tucann/proFamiliaSemilla", json, {
                    headers: generalHeader()
                })
                .then(data => {
                    //  this.$router.push("home");
                    this.dialog2 = false;
                    this.listarFamiliaSemilla();
                })
                .catch(error => {
                    console.log(error);
                })
        }

    },
}
</script>
