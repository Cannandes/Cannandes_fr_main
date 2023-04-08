<template>
<div>
    <v-container>
        <v-card elevation="15">
            <v-card-title class="success white--text">
                <v-icon size="40" color="analogo4">density_small</v-icon>
                &nbsp;
                <h2>Producción rango de fechas</h2>
                <v-spacer></v-spacer>
                <!--////////////////////////////////////// alerta -->
                <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                    <v-icon>mdi-information-variant</v-icon>
                </v-btn>
                <v-card-text>
                    <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                        Coloca el peso de cada una de las clasificaciónes del lote<br>
                        <ol>
                            <li>
                                Flor
                                <v-icon color="white">yard</v-icon>
                            </li>
                            <br>
                            <li>
                                Hojas y flores pequeñas
                                <v-icon>eco</v-icon>
                            </li> <br>
                            <li>
                                Ramas y talllos <v-icon color="white">spa</v-icon>
                            </li> <br>
                            <li>
                                Raices <v-icon color="white">grass</v-icon>
                            </li>
                        </ol><br>

                        Lote:

                    </v-alert>
                </v-card-text>
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md3></v-flex>
                    <v-flex md3>
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="fechaInicial" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="fechaInicial" label="Fecha inicial.." prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaInicial" scrollable :first-day-of-week="1" locale="es" color="primary">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(fechaInicial)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>
                    <v-flex md3>
                        <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="fechaFinal" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="fechaFinal" label="Fecha final.." prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaFinal" scrollable :first-day-of-week="1" locale="es" color="primary">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal2 = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialog2.save(fechaFinal)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>
                    <v-flex md3>
                        <v-btn class="primary" @click="produccionFechaInicioFin(fechaInicial, fechaFinal)">
                            <v-icon>list</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-data-table :items="elementosRegistroProduccion" :headers="cabecerasRegistroProduccion" dense>
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{item.idRegistroProduccion}}</td>
                        <td>{{item.fechaRegistroProduccion}}</td>
                        <td>{{item.proRegistroSiembra.loteRegistroSiembra}}</td>
                        <td>{{item.valorRegistroProduccionClasifA | numero}}</td>
                        <td>{{item.valorRegistroProduccionClasifB | numero}}</td>
                        <td>{{item.valorRegistroProduccionClasifC | numero}}</td>
                        <td>{{item.valorRegistroProduccionClasifD | numero}}</td>
                        <td>{{item.sumaProduccion | numero}}</td>
                    </tr>
                </template>
                <template slot="body.append">
                    <tr>
                        <td class="title" align="right"></td>
                        <td class="title" align="right"></td>
                        <td class="primary--text title">Totales :</td>
                        <td class="title"> {{sumaDeTotales('valorRegistroProduccionClasifA') | numero}}</td>
                        <td class="title"> {{sumaDeTotales('valorRegistroProduccionClasifB') | numero}}</td>
                        <td class="title"> {{sumaDeTotales('valorRegistroProduccionClasifC') | numero}}</td>
                        <td class="title"> {{sumaDeTotales('valorRegistroProduccionClasifD') | numero}}</td>
                        <td class="title"> {{sumaDeTotales('sumaProduccion') | numero}}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</div>
</template>

<script>
import regProdService from '@/services/poscosecha/registroproduccion.service.js'
export default {
    name: 'CannandesSaListaproduccioncomp',

    data() {
        return {
            alert: false,
            modal: false,
            modal2: false,
            elementosRegistroProduccionProv: [],
            fechaInicial: new Date().toISOString().substr(0, 10),
            fechaFinal: new Date().toISOString().substr(0, 10),
            elementosRegistroProduccion: [{
                idRegistroProduccion: '',
                fechaRegistroProduccion: '',
                valorRegistroProduccionClasifA: '',
                valorRegistroProduccionClasifB: '',
                valorRegistroProduccionClasifC: '',
                valorRegistroProduccionClasifD: '',
                proRegistroSiembra: {
                    loteRegistroSiembra: '',
                },
                sumaProduccion: '',
            }],
            cabecerasRegistroProduccion: [{
                    text: 'ID',
                    value: 'idRegistroProduccion'
                },
                {
                    text: 'Fecha',
                    value: 'fechaRegistroProduccion'
                },
                {
                    text: 'Registro',
                    value: 'proRegistroSiembra.loteRegistroSiembra'
                },
                {
                    text: 'Clase A',
                    value: 'valorRegistroProduccionClasifA'
                },
                {
                    text: 'Clase B',
                    value: 'valorRegistroProduccionClasifB'
                },
                {
                    text: 'Clase C',
                    value: 'valorRegistroProduccionClasifC'
                },
                {
                    text: 'Clase D',
                    value: 'valorRegistroProduccionClasifD'
                },
                {
                    text: 'Total',
                    value: 'sumaProduccion'
                },
            ]

        };
    },

    mounted() {
        let fi = new Date().toISOString().substr(0, 10);
           let ff = new Date().toISOString().substr(0, 10)
        this.produccionFechaInicioFin(fi,ff);
 
    },

    methods: {

        produccionFechaInicioFin(fechaInicial, fechaFinal) {
            try {
             this.elementosRegistroProduccionProv =[];
                regProdService.listarRegistrosProduccionFechas(fechaInicial, fechaFinal).then((result) => {
                    for (let index = 0; index < result.data.length; index++) {
                        let registro = {
                            idRegistroProduccion: result.data[index].idRegistroProduccion,
                            fechaRegistroProduccion: result.data[index].fechaRegistroProduccion,
                            valorRegistroProduccionClasifA: result.data[index].valorRegistroProduccionClasifA,
                            valorRegistroProduccionClasifB: result.data[index].valorRegistroProduccionClasifB,
                            valorRegistroProduccionClasifC: result.data[index].valorRegistroProduccionClasifC,
                            valorRegistroProduccionClasifD: result.data[index].valorRegistroProduccionClasifD,
                            proRegistroSiembra: {
                                loteRegistroSiembra: result.data[index].proRegistroSiembra.loteRegistroSiembra,
                            },
                            sumaProduccion: (result.data[index].valorRegistroProduccionClasifD * 1) + (result.data[index].valorRegistroProduccionClasifA * 1) + (result.data[index].valorRegistroProduccionClasifB * 1) + (result.data[index].valorRegistroProduccionClasifC * 1)
                        }

                        this.elementosRegistroProduccionProv.push(registro);

                    }

                })
            } catch (error) {

            }finally{
                   this.elementosRegistroProduccion = this.elementosRegistroProduccionProv;
            }

        },

    /*    async listaRegistrosProduccion() {
            try {
                 this.elementosRegistroProduccionProv= [];
                await regProdService.listarRegistrosProduccion().then((result) => {
                    for (let index = 0; index < result.data.length; index++) {
                        let registro = {
                            idRegistroProduccion: result.data[index].idRegistroProduccion,
                            fechaRegistroProduccion: result.data[index].fechaRegistroProduccion,
                            valorRegistroProduccionClasifA: result.data[index].valorRegistroProduccionClasifA,
                            valorRegistroProduccionClasifB: result.data[index].valorRegistroProduccionClasifB,
                            valorRegistroProduccionClasifC: result.data[index].valorRegistroProduccionClasifC,
                            valorRegistroProduccionClasifD: result.data[index].valorRegistroProduccionClasifD,
                            proRegistroSiembra: {
                                loteRegistroSiembra: result.data[index].proRegistroSiembra.loteRegistroSiembra,
                            },
                            sumaProduccion: (result.data[index].valorRegistroProduccionClasifD * 1) + (result.data[index].valorRegistroProduccionClasifA * 1) + (result.data[index].valorRegistroProduccionClasifB * 1) + (result.data[index].valorRegistroProduccionClasifC * 1)
                        }

                        this.elementosRegistroProduccionProv.push(registro);

                    }

                }).catch((err) => {

                });

            } catch (error) {

            } finally {
                this.elementosRegistroProduccion = this.elementosRegistroProduccionProv;

            }

        },*/
        sumaDeTotales(key) {
            if (key <= 0) {
                return 0;
            } else {
                return this.elementosRegistroProduccion.reduce((a, b) => parseFloat(a) + (parseFloat(b[key]) || 0), 0);
            }
        },

    },
};
</script>
