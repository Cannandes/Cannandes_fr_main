<template>
<div>
    <v-container>
        <v-layout>
            <v-flex mx-auto lg10>
                <v-card elevation="15">
                    <v-card-title class="success white--text">
                        <h2>Revisar Bandeja </h2>
                        <!--////////////////////////////////////// alerta -->
                        <v-btn color="success" sm2 @click="ex()">
                            <v-icon>list </v-icon>
                            <v-spacer></v-spacer>EX
                        </v-btn>
                        <v-btn color="white" @click="alert = !alert" icon>
                            <v-icon right>report</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="15">
                                Ingresa el numero de bandeja para poder revisar el numero de plantas.
                            </v-alert>
                        </v-card-text>
                    </v-card-title>
                    <v-card-text>
                        <v-layout>
                            <v-flex sm6 mx-auto mt-5>
                                <v-text-field label="N° bandeja.." v-model="numBandeja">

                                </v-text-field>
                            </v-flex>
                            <v-flex sm6 mt-5>
                                <v-btn color="success" sm2 @click="mostrarBandejas()">
                                    <v-icon>list </v-icon>
                                    <v-spacer></v-spacer>Revisar
                                </v-btn>
                            </v-flex>

                        </v-layout>

                    </v-card-text>

                    <v-card-actions>
                        <v-layout>
                            <v-flex sm12>
                                <v-data-table :headers="titulosBandeja" :items="elementosBandeja" :items-per-page="5" class="elevation-15"></v-data-table>
                            </v-flex>

                        </v-layout>

                    </v-card-actions>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  <!--  <v-container>
        <v-snackbar v-model="notificacion">
            {{ mensajeNotificacion }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="notificacion = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>-->

    <template>
        <div class="text-center ma-2">
            <v-snackbar v-model="notificacion">
                {{ mensajeNotificacion }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="success" text v-bind="attrs" @click="notificacion = false">
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </template>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {
    data() {
        return {
            alert: false,
            numBandeja: '',
            casa: [{
                    a: 0,
                    value: false
                },
                {
                    a: 1,
                    value: false
                },
                {
                    a: 2,
                    value: false
                },
                {
                    a: 3,
                    value: false
                },
                {
                    a: 4,
                    value: false
                },
                {
                    a: 5,
                    value: false
                },
                {
                    a: 6,
                    value: true
                },
                {
                    a: 7,
                    value: false
                },
                {
                    a: 8,
                    value: false
                },
                {
                    a: 9,
                    value: false
                },
                {
                    a: 10,
                    value: false
                }
            ],
            /////////////
            notificacion: false,
            mensajeNotificacion: '',
            titulosBandeja: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "numeroBandeja"
                },
                {
                    text: "Semilla",
                    value: "proSemilla.nombreVariedadSemilla",
                    sortable: false,
                },
            ],

            elementosBandeja: [{

            }]

        }

    },
    methods: {
        mostrarBandejas() {

            if (this.numBandeja == '') {
                alert("EL campo no puede uedar vacio.");

            } else {
                axios.get('http://localhost:12590/api/tucann/proPlanta/xband/' + this.numBandeja,{
                        headers: generalHeader()
                    })
                    .then(res => {
                        console.log(res);
                        this.elementosBandeja = res.data;

                        for (let index = 0; index < res.data.length; index++) {

                            // console.log(res.data.length);
                        }
                        //  this.elementosBandeja = res.data;

                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        ex() {

            //  casa: [];

            let filas = 10,
                columnas = 5,
                baninicial = 50,
                bandejas = 100,
                cont = 0,
                contador = 0;

            let bandera = false;

            while (bandera != true) {

                baninicial++;
                console.log(baninicial);
                for (let i = 0; i < filas; i++) {
                    for (let j = 0; j < columnas; j++) {
                        console.log((baninicial) + '.' + i + '.' + j);
                    }
                }
                if (contador == (bandejas - 1)) {
                    bandera = true;
                }
                contador++;
                // console.log(baninicial);
            }
        }

    }
}
</script>
