<template>
<div>
    <v-card-text></v-card-text>
    <v-card class="mx-auto" width="1200">
        <v-card-title class="primary white--text">RESUMEN UBICACIONES</v-card-title>
        <v-card-text>
            <v-layout wrap>
                <v-flex md1>
                    <v-btn @click="listarUbiaccionesXTipoUbicacion()" class="primary mt-3">
                        <v-icon>list</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex md1>
                    <div class="mt-2" :style="mostrarEsperaCircular">
                        <compCircular></compCircular>
                    </div>
                </v-flex>
                <v-flex md4>

                </v-flex>
            </v-layout>

        </v-card-text>
        <v-card-text>
            <v-layout>

                <v-flex md3 sm3 xs3 v-for="ubitipo in vectorResultadosUbicacion" :key="ubitipo.idTipoUbicacion">
                    <v-flex md12>
                        <p class="text-md-center text-lg-center text-h6"></p>
                    </v-flex>
                    <v-flex md12>
                        <v-sheet class="pa-1">
                            <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                <p class="text-md-center text-lg-center text-h6 white--text">
                                    <span>
                                        <v-icon color="white" left="">mdi-scatter-plot</v-icon> {{ubitipo.valor1}} - {{ubitipo.valor2}}
                                    </span>
                                </p>
                                <p class="text-md-center text-lg-center text-h6 white--text">
                                    <span>
                                        <v-btn class="analogo3 text-h6 white--text" small @click="mostrarGestionarUbicacion(ubitipo.valor1,ubitipo.valor2,ubitipo.valor3,ubitipo.valor4)">
                                            <v-icon color="white"> grid_view </v-icon>
                                            <v-divider vertical class="white ml-2 mr-2"></v-divider> {{ubitipo.valor3}}
                                        </v-btn>
                                    </span>
                                </p>
                            </v-sheet>
                        </v-sheet>

                    </v-flex>
                </v-flex>
            </v-layout>

            <!--  <v-container>

                <v-row justify="space-around">
                    <v-col v-for="elemento in elementosUbicacion" :key="elemento.idUbicacion" cols="8" md="1">
                        <v-badge bordered color="error" dot offset-x="20" offset-y="10" v-if="elemento.proEstadoUbicacion.nombreEstadoUbicacion == 'Nula'">
                            <v-sheet elevation="15" height="35" width="75">
                                <v-sheet elevation="15" class="mx-auto" height="30" width="70">
                                    {{elemento.idUbicacion}}
                                </v-sheet>
                            </v-sheet>
                        </v-badge>
                        <v-badge bordered color="primary" dot offset-x="20" offset-y="10" v-if="elemento.proEstadoUbicacion.nombreEstadoUbicacion == 'Vacía'">
                            <v-sheet elevation="15" height="35" width="75">
                                <v-sheet elevation="15" class="mx-auto" height="30" width="70">
                                    {{elemento.idUbicacion}}
                                </v-sheet>
                            </v-sheet>
                        </v-badge>
                    </v-col>
                </v-row>

            </v-container>-->
            <!--   <v-card width="800" class="mx-auto">
                <span v-for="elemento in elementosUbicacion" :key="elemento.idUbicacion">
                    <v-layout wrap justify="space-around">
                        <v-flex md1>
                            <v-sheet color="white" elevation="1" height="60" width="60">
                                {{elemento.idUbicacion}}
                            </v-sheet>
                        </v-flex>
                    </v-layout>

                    <v-badge dot offset-x="18" offset-y="18" overlap v-if="elemento.estadoUbicacion== true" color="red">

                        <v-avatar size="45" color="secondary" class="white--text">
                            {{elemento.idUbicacion }}
                        </v-avatar>
                    </v-badge>

                </span>

            </v-card>-->
            <v-container>

                <v-row justify="space-around">
                    <v-col v-for="elemento in bandActRegistroSiembra" :key="elemento.idUbicacion" cols="8" md="1">
                        <v-badge bordered color="error" dot offset-x="20" offset-y="10">
                            <v-sheet elevation="15" height="35" width="75">
                                <v-sheet elevation="15" class="mx-auto" height="30" width="70">
                                    {{elemento.idUbicacion}}
                                </v-sheet>
                            </v-sheet>
                        </v-badge>

                    </v-col>
                </v-row>

            </v-container>
        </v-card-text>
    </v-card>

    <v-dialog v-model="dialogoTipoUbicacion" width="800">
        <v-card width="800">
            <v-card-title class="primary white--text">UBICACION <v-spacer></v-spacer> Tipo : {{tipoUbicacionAux}}
            </v-card-title>
            <v-card-text></v-card-text>
        </v-card>

    </v-dialog>

    <template>
        <v-dialog v-model="mostrarLayoutBanUbi" width="800" persistent>

            <v-card width="800" class="mx-auto" mx-auto>
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">grid_on</v-icon>Gestionar &nbsp; <span class="triada1--text">{{tipoUbicacionAux }}</span>
                </v-card-title>
                <v-card-text> </v-card-text>
                <v-card-text>
                    <v-layout wrap>

                        <v-flex md12 sm12 xs12>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">
                                    <v-icon size="40" class="ml-3" color="success">grid_on</v-icon>
                                </p>
                            </v-flex>
                            <v-flex md12>
                                <v-progress-linear height="6" rounded :active="esperaBandejas" :indeterminate="esperaBandejas" absolute color="primary"></v-progress-linear>
                            </v-flex>
                            <v-flex md4 mx-auto>
                                <!--<v-progress-linear :active="mostrarLoad2" :indeterminate="mostrarLoad2" rounded color="primary accent-4"></v-progress-linear>-->
                            </v-flex>
                            <v-card width="750" class="mx-auto">
                                <v-flex>
                                    <span v-for="item in mostrarLayoutBanUbiTotal " :key="item.idUbicacion">
                                        <v-avatar tile size="65" class="white--text ml-5">
                                            <v-btn @click="dialogoCambioEstadoPlanta(item.valor1,item.valor2)" color="success"> {{item.valor1}}</v-btn>
                                        </v-avatar>
                                    </span>
                                </v-flex>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn block dense error color="success" @click="mostrarLayoutBanUbi=false">cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <template>
        <v-dialog v-model="dialogoMostrarUbicacion" width="510">
            <v-btn @click="aaa()">mo</v-btn>
            <v-card>
                <v-card-title class="primary white--text">{{tipoUbiAux}} - {{bandejaAux}}</v-card-title>
                <v-card-text>
                    <v-card width="510" class="mx-auto">
                        <v-flex>
                            <v-chip-group multiple active-class="error white--text" column v-model="elementosCambiar">
                                <span v-for="item in mostrarLayoutBandeja " :key="item.valor1">
                                    <v-avatar tile size="65" class="white--text ml-5" v-if="item.valor2 == 1">

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">

                                                <v-btn class="primary" icon v-bind="attrs" v-on="on">
                                                    <v-icon color="white">check</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Vacía - {{item.valor1}} </span>
                                        </v-tooltip>
                                    </v-avatar>
                                    <v-avatar tile size="65" class="white--text ml-5" v-if="item.valor2 == 2">
                                        <v-chip label color="secondary">
                                            {{item.valor1}}
                                            <v-icon>yard</v-icon>
                                        </v-chip>
                                    </v-avatar>
                                    <v-avatar tile size="65" class="white--text ml-5" v-if="item.valor2 == 3">

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn class="error" icon v-bind="attrs" v-on="on">
                                                    <v-icon color="white">block </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Nula - {{item.valor1}}</span>
                                        </v-tooltip>
                                    </v-avatar>
                                </span>
                            </v-chip-group>

                        </v-flex>
                    </v-card>
                </v-card-text>

            </v-card>
        </v-dialog>
    </template>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import ubiService from '@/services/produccion/ubicacion.service';
import axios from 'axios'
import compCircular from '@/components/Sistema/Loadingcomp.vue'
export default {
    data() {
        return {
            elementosCambiar: [],
            mostrarEsperaCircular: 'display:none',
            esperaListaUbi: null,
            esperaBandejas: false,
            dialogoMostrarUbicacion: false,
            bandejaAux: '',
            tipoUbiAux: '',
            aa: [],
            layoutBand: [],
            mostrarLayoutBanUbi: false,
            tipoUbicacionAux: '',
            dialogoTipoUbicacion: false,
            bandActRegistroSiembra: [],
            vectorResultadosUbicacion: [],
            vectorIdentfResultadosUbicacion: [],
            mostrarLayoutBanUbiTotal: [],
            mostrarLayoutBandeja: [],
            elementosUbicacion: [{
                idUbicacion: '',
                ubiPrimeraParte: '',
                ubiSegundaParte: '',
                ubiTerceraParte: '',
                proEstadoUbicacion: {
                    idEstadoUbicacion: '',
                    nombreEstadoUbicacion: '',
                },
                proTipoUbicacion: {
                    idTipoUbicacion: '',
                    nombreTipoUbicacion: '',
                }
            }],
            elementosTipoUbicacion: [{
                idTipoUbicacion: '',
                nombreTipoUbicacion: ''
            }],
            layoutBandejaUbi: [{
                bandeja: ''
            }]

        }
    },
    computed: {

    },
    components: {
        compCircular
    },
    methods: {
        aaa() {
            console.log(this.elementosCambiar);
        },

        traerElementosTipoUbicacion() {
            ubiService.listarTipoUbicaciones().then((resp) => {
                this.elementosTipoUbicacion = resp.data;
            })
        },

        async listarUbiaccionesXTipoUbicacion() {
            try {
                this.mostrarEsperaCircular = 'display:block';
                this.traerElementosTipoUbicacion();
                this.vectorResultadosUbicacion = [];
                this.vectorIdentfResultadosUbicacion = [];
                await ubiService.listarUbicaciones().then((resp) => {
                    for (let index = 0; index < this.elementosTipoUbicacion.length; index++) {
                        ubiService.listarUbicacionesXTipo(this.elementosTipoUbicacion[index].idTipoUbicacion).then((resp) => {
                            for (let index = 0; index < resp.data.length; index++) {
                                this.vectorIdentfResultadosUbicacion.push(resp.data[index].ubiPrimeraParte);
                            }
                            //  console.log(this.prueba(this.vectorIdentfResultadosUbicacion));
                            let numPos = this.numeroPosiciones(this.vectorIdentfResultadosUbicacion);
                            //  console.log(a);
                            this.vectorIdentfResultadosUbicacion = [];
                            let json = {
                                valor1: this.elementosTipoUbicacion[index].nombreTipoUbicacion,
                                valor2: resp.data.length,
                                valor3: numPos,
                                valor4: this.elementosTipoUbicacion[index].idTipoUbicacion,
                            }
                            this.vectorResultadosUbicacion.push(json);
                        })
                    }
                })

            } catch (error) {
                console.error(error);
            } finally {
                this.mostrarEsperaCircular = 'display:none';
            }
        },

        async mostrarGestionarUbicacion(a, b, c, d) {
            try {
                this.esperaBandejas = true;
                this.layoutBand = [];
                this.mostrarLayoutBanUbiTotal = [];
                this.mostrarLayoutBanUbi = true;
                this.tipoUbicacionAux = a;
                await ubiService.listarUbicacionesXTipo(d).then((resp) => {
                    for (let index = 0; index < resp.data.length; index++) {
                        this.layoutBand.push(resp.data[index].ubiPrimeraParte);
                    }
                    this.mostrarLayoutBanUbi = ubiService.quitarElementosDuplicados(this.layoutBand);
                    for (let index = 0; index < this.mostrarLayoutBanUbi.length; index++) {
                        let json = {
                            valor1: this.mostrarLayoutBanUbi[index],
                            valor2: d,
                        }
                        this.mostrarLayoutBanUbiTotal.push(json);
                    }
                })
            } catch (error) {

            } finally {
                this.esperaBandejas = false;
            }
        },

        dialogoCambioEstadoPlanta(numBandeja, tipoUbicacion) {
            this.mostrarLayoutBandeja = [];
            ubiService.buscarXBandejaTipoUbicacion(numBandeja, tipoUbicacion).then((resp) => {
                console.log(resp.data[1]);
                this.bandejaAux = resp.data[0].ubiPrimeraParte;
                this.tipoUbiAux = resp.data[0].proTipoUbicacion.nombreTipoUbicacion;
                for (let index = 0; index < resp.data.length; index++) {
                    let json = {
                        valor1: index,
                        valor2: resp.data[index].proEstadoUbicacion.idEstadoUbicacion
                    }
                    this.mostrarLayoutBandeja.push(json);
                }
            })
            this.dialogoMostrarUbicacion = true;
            // console.log(numBandeja + ' - ' + tipoUbicacion);
        },

        numeroPosiciones(datos) {
            let a = ubiService.darNumeroElementosVector(datos);
            return a;
        },
    },
}
</script>
