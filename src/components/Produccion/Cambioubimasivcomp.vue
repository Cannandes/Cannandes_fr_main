<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg10>
                <!--  <h1>SIEMBRA</h1>-->
                <v-card elevation-15>

                    <v-card-title class="success white--text">
                        <v-icon dark x-large color="analogo4" left>mdi-map-marker-path</v-icon>

                        <h2>Cambio masivo de ubicación</h2>
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>

                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Puedes cambiar de ubicacion de forma masiva usando el <v-chip small label color="white" text-color="error"><strong> LOTE : J662210501</strong>
                                </v-chip> y de bandeja en bandeja <v-chip small label color="white" text-color="error">
                                    <v-icon size="25">pivot_table_chart</v-icon>
                                </v-chip>
                            </v-alert>
                        </v-card-text><!-- fin alerta -->
                    </v-card-title>
                    <!--////////////////////////////////////     CAMBIO UBICACION  //////////////////////////////////-->
                    <v-divider horizontal red></v-divider>
                    <v-container success>
                        <template> </template>
                        <v-card>
                            <v-card-title></v-card-title>
                            <v-card-text></v-card-text>
                        </v-card>
                    </v-container>
                    <v-container success>
                        <v-data-table :items="elementosRegistroSiembra" :headers="titulosRegistroSiembra" dense>
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{item.loteRegistroSiembra}}</td>
                                    <td>{{item.proDiaSemana.nombreDiaSemana}}</td>
                                    <td>{{item.semanaRegistroSiembra}}</td>
                                    <td>{{item.semillasSembradasRegistroSiembra}}</td>
                                    <td>{{item.proSemilla.nombreInternoSemilla}}</td>
                                    <td>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on" @click="mostrarCambioUbiMas(item.loteRegistroSiembra,item.semillasSembradasRegistroSiembra) , mostrarCambioMasivoUbi=true">
                                                    <v-icon color="analogo1"> pivot_table_chart</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Reubicar plantas</span>
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-container>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <!--////////////// DIALOGO DE CAMBIO DE ESTADO DE PLANTA  ////////////////// -->
    <template>
        <v-dialog v-model="mostrarCambioMasivoUbi" width="800">

            <v-card width="800" class="mx-auto" mx-auto>

                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">pivot_table_chart</v-icon>Cambiar de ubicación <v-spacer></v-spacer>Lote : {{lotemostrar}}
                </v-card-title>

                <v-card-text>
                    <v-layout wrap>
                        <v-flex md3 sm3 xs3>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6"></p>
                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">

                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <span v-bind="attrs" v-on="on">
                                                        <v-icon color="white" left="">mdi-scatter-plot</v-icon> {{lotemostrar}}
                                                    </span>

                                                </template>
                                                <span>Lote</span>
                                            </v-tooltip>
                                        </p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                        <v-flex md2 sm2 xs2>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6"></p>
                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">

                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <span v-bind="attrs" v-on="on">
                                                        <v-icon color="white" left="">mdi-sprout</v-icon> {{plantactivas}}
                                                    </span>

                                                </template>
                                                <span>Plantas activas</span>
                                            </v-tooltip>
                                        </p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                        <v-flex md2 sm2 xs2>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6"></p>
                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">

                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <span v-bind="attrs" v-on="on">
                                                        <v-icon color="error" left="">mdi-sprout</v-icon> {{plantnogermi}}
                                                    </span>

                                                </template>
                                                <span>Plantas no germinadas</span>
                                            </v-tooltip>
                                        </p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                        <v-flex md2 sm2 xs2>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6"></p>
                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">

                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <span v-bind="attrs" v-on="on">
                                                        <v-icon color="error" left="">percent</v-icon>
                                                        <span v-if=" promedioGerminacion > 0">{{promedioGerminacion}}</span>
                                                        <span v-else-if=" promedioGerminacion == 0">{{cumplidoalcien}} </span>
                                                        <span v-else-if=" plantactivas == 0">{{cumplidoalcero}} </span>
                                                    </span>

                                                </template>
                                                <span>Porentaje de germinación</span>
                                            </v-tooltip>
                                        </p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text>
                    <v-progress-linear color="primary accent-4" indeterminate rounded height="6" :active="activarEsperaLinear"></v-progress-linear>
                </v-card-text>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex md5>
                            <v-card>
                                <v-card-title>Plantas</v-card-title>
                            </v-card>
                        </v-flex>
                        <v-flex md2>
                            <v-card>
                               <v-icon>yard</v-icon>
                            </v-card>
                        </v-flex>
                        <v-flex md5>
                            <v-card>
                                <v-card-title>Ubicaciones</v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-card-actions>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn dense color="error" @click=" mostrarCambioMasivoUbi = false " v-bind="attrs" v-on="on">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </template>
                        <span>Cerrar</span>
                    </v-tooltip>
                    &nbsp;&nbsp;
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn dense color="success" v-bind="attrs" v-on="on">
                                <v-icon>save</v-icon>
                            </v-btn>
                        </template>
                        <span>Guardar</span>
                    </v-tooltip>

                </v-card-actions>

            </v-card>
        </v-dialog>
    </template>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {
    name: 'Cambioubimasivcomp',

    data() {
        return {
            alert: false,
            activarEsperaLinear: false,
            mostrarCambioMasivoUbi: false,
            lotemostrar: '',
            plantactivas: '',
            plantnogermi: '',
            promedioGerminacion: '',
            cumplidoalcien: '',
            cumplidoalcero: '',
            elementosRegistroSiembra: [{
                idRegistroSiembra: '',
                loteRegistroSiembra: '',
                semanaRegistroSiembra: '',
                pesoImpuresasRegistroSiembra: '',
                pesoSemillasRegistroSiembra: '',
                semillasSembradasRegistroSiembra: '',
                fechaRegistroSiembra: '',
                proDiaSemana: {
                    idDiaSemana: '',
                    nombreDiaSemana: ''
                },
                proSemilla: {
                    codigoSemilla: ''
                },
                proEstadoRegistroSiembra: {
                    idEstadoRegistroSiembra: ''
                }
            }],
            titulosRegistroSiembra: [{
                    text: 'Lote',
                    value: 'loteRegistroSiembra'
                },
                {
                    text: 'Día',
                    value: 'proDiaSemana.nombreDiaSemana'
                },
                {
                    text: 'Semana',
                    value: 'semanaRegistroSiembra'
                },
                {
                    text: 'N° Semillas',
                    value: 'semillasSembradasRegistroSiembra'
                },

                {
                    text: 'Semilla',
                    value: 'proSemilla.nombreInternoSemilla'
                },
                {
                    text: 'Acciones',
                    value: ''
                }
            ],
            elementosCambioEstadoPlanta: [{}],
        }

    },

    mounted() {
        this.listaRegistroSiembra();
    },

    methods: {
        listaRegistroSiembra() {
            axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/bxiders/2', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosRegistroSiembra = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        async mostrarCambioUbiMas(loteRegistroSiembra, semillasSembradasRegistroSiembra) {
            this.lotemostrar = loteRegistroSiembra;
            try {
                this.activarEsperaLinear = true;
                this.inicializarValores();
                await axios.get('http://localhost:12590/api/tucann/proPlanta/lpxru/' + loteRegistroSiembra, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        let contactivas = 0,
                            contnogerm = 0;
                        for (let index = 0; index < res.data.length; index++) {
                            if (res.data[index].proEstadoPlanta.idEstadoPlanta == 1) {
                                contactivas++;

                            } else if (res.data[index].proEstadoPlanta.idEstadoPlanta == 3) {
                                contnogerm++;
                            }
                        }
  

                        this.plantactivas = contactivas;
                        this.plantnogermi = contnogerm;
                        this.cumplidoalcien = 100;
                        this.cumplidoalcero = 0;
                        let ger = (((this.plantnogermi / semillasSembradasRegistroSiembra) * 100).toFixed(2));
                        ger = parseFloat(ger);
                        let g = 100;
                        g = parseFloat(g);

                        this.promedioGerminacion = g - ger;

                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            } finally {
                this.activarEsperaLinear = false;
                //    this.inicializarValores();
            }

        },
        inicializarValores() {
            this.plantactivas = '';
            this.plantnogermi = '';
            this.promedioGerminacion = '';
            this.cumplidoalcien = '';
            this.cumplidoalcero = '';
        }

    },
};
</script>
