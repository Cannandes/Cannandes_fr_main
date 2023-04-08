<template>
<div>
    <v-container grid-list-md>

        <v-layout row wrap>
            <v-flex xs12 sm12 lg6 mx-auto>
                <h1>PRUEBA1</h1>
                <v-card class="mx-auto mt-5" wrap>
                    <v-card-title>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong> Crear PRUEBA</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    PRUEBA.
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-title>
                    <v-btn @click="semanaDelAnioEnCurso('2022-03-23')">zxx</v-btn>
                    <v-card-actions>
                        <v-btn icon class="success ml-3" dark @click="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="secondary" dark @click="listarFlor">
                            <v-icon>list</v-icon>
                        </v-btn>
                        <v-btn icon class="error" dark>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn @click="uuidv4()">
                            VARIOS
                        </v-btn>
                    </v-card-actions>

                    <v-card-text>

                        <template>
                            <v-data-table :headers="tituloFlor" :items="estadoFlor" :items-per-page="5" class="elevation-1"></v-data-table>
                        </template>

                    </v-card-text>
                </v-card>
            </v-flex>

            <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
            <form v-on:submit.prevent="nuevaFlor">
                <v-dialog v-model="dialog" width="500">
                    <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Flor
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreFlor" :counter="12" label="Nombre Flor.." required success></v-text-field>
                            <v-text-field v-model="variedadFlor" :counter="50 " label="Variedad Flor.." required success></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevaFlor(30)">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->

        </v-layout>
    </v-container>
    <!-- ////////////////////////////////////////////////////////////////// -->

    <v-container>
        <v-btn @click="cambiarCirculo()">ds</v-btn>
        <v-progress-circular :rotate="360" :size="120" :width="15" :value="valor" color="success">
            {{valor}}
        </v-progress-circular>
    </v-container>
    <Bandejascomp></Bandejascomp>

</div>
</template>

<script type="text/javascript" src="@/components/js/script.js"></script><script>
import Bandejascomp from '@/components/Produccion/Bandejascomp.vue'
import axios from 'axios'
import {
    json
} from 'body-parser';

import {
    v4 as uuidv4
} from 'uuid' // Import uuid  

export default {
    name: 'Semillaform',
    components: {},
    directives: {},
    data() {
        return {
            valor: 0,
            dialog: false,
            form: false,

            idFlor: '',
            nombreFlor: '',
            variedadFlor: '',
            fechaCreacionFlor: '',
            qr: '',
            tituloFlor: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idFlor"
                },
                {
                    text: 'Nombre',
                    value: 'nombreFlor'
                },
                {
                    text: 'Variedad',
                    value: 'variedadFlor'
                },
                {
                    text: 'Fecha',
                    value: 'fechaCreacionFlor'
                },
                {
                    text: 'QR',
                    value: 'qr'
                },

            ],
            estadoFlor: [{
                idFlor: '',
                nombreFlor: '',
                variedadFlor: '',
                fechaCreacionFlor: '',
                qr: '',
            }],

        };
    },
    mounted() {

    },
    components: {
        Bandejascomp
    },
    methods: {

        pruebFuncionJS() {

            console.log("UUU  ");

            console.log(semanaDelAnioEnCurso(1));

        },

        cambiarCirculo() {
            for (let index = 0; index < 100000; index++) {

                if (index % 10 == 0) {
                    this.valor += 10;
                }

            }
        },

        nuevaFlor(oo) {
            for (let index = 0; index < oo; index++) {
                let json = {
                    idFlor: this.idFlor,
                    nombreFlor: this.nombreFlor,
                    variedadFlor: this.variedadFlor,
                    fechaCreacionFlor: this.fechaCreacionFlor,
                    qr: uuidv4(),

                }

                axios.post('http://localhost:7000/api/p8/flor', json)
                    .then(res => {

                        this.dialog = false;
                        this.listarFlor();

                        this.idFlor = '';
                        this.nombreFlor = '';
                        this.variedadFlor = '';
                        this.fechaCreacionFlor = '';
                        this.qr = '';
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },

        listarFlor() {
            axios.get('http://localhost:7000/api/p8/flor')
                .then(res => {
                    this.estadoFlor = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },

        prueba11(cantidad) {

            for (let index = 0; index < cantidad; index++) {
                //const element = array[index];
                // console.log(index);
                this.nuevaFlor();

            }

        },

        uuidv4() {

        }

    }
};
</script>
