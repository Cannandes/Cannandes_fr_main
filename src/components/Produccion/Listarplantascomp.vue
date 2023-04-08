<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg12>
                <v-card elevation-15>
                    <v-card-title class="success white--text">
                        <v-icon dark x-large color="analogo4" left>mdi-sprout-outline</v-icon>
                        <v-toolbar-title>
                            <h2>Listar plantas </h2>
                        </v-toolbar-title>
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Se mostrará un listado de las plantas por actividad escogida.
                            </v-alert>
                        </v-card-text><!-- fin alerta -->
                    </v-card-title>
                    <v-divider horizontal class="white"></v-divider>
                    <v-container success></v-container>
                    <v-container success>
                        <template>
                            <v-card>
                                <v-toolbar flat>
                                    <template v-slot:extension>
                                        <v-tabs v-model="tabs" fixed-tabs>
                                            <v-tab v-for="n in 3" :key="n">
                                                <div v-if="n==1">TODAS
                                                    <v-icon>mdi-sprout-outline</v-icon>
                                                </div>
                                                <div v-else-if="n==2">MADRES
                                                    <v-icon>mdi-spa-outline </v-icon>
                                                </div>
                                                <div v-else>LOTE
                                                    <v-icon>mdi-spa-outline </v-icon>
                                                </div>
                                            </v-tab>
                                        </v-tabs>
                                    </template>
                                </v-toolbar>
                                <v-tabs-items v-model="tabs">
                                    <!--//////////////// TODAS //////////////-->
                                    <!--//////////////// TODAS //////////////-->
                                    <!--//////////////// TODAS //////////////-->
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>
                                            <v-container>
                                                <v-card-actions>

                                                    <v-layout wrap>
                                                        <v-flex sm3>
                                                        </v-flex>
                                                        <v-flex sm4>
                                                            <v-select v-model="actividadseleccionada" item-text="nombreActividad" item-value="idActividad" label="Actividad.." :items="elementosActividad"></v-select>
                                                        </v-flex>
                                                        <v-flex sm4>

                                                            <v-tooltip bottom>
                                                                <template v-slot:activator="{ on, attrs }">

                                                                    <v-btn v-bind="attrs" v-on="on" color="success" @click="listarPlantasXPlantaActividad(actividadseleccionada)" class="mt-3 ml-5">
                                                                        <v-icon size="25">list</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <span>Listar plantas</span>
                                                            </v-tooltip>

                                                        </v-flex>
                                                        <v-flex sm12>
                                                            <v-progress-linear color="primary accent-4" indeterminate rounded height="6" :active="activarEsperaLinear"></v-progress-linear>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card-actions>
                                            </v-container>
                                            <v-container success>

                                                <v-card-text>
                                                    <template>
                                                        <v-data-table dense :sort-by="['idPlanta']" :sort-desc="[true]" :headers="titulosPlantaActividad" :items="elementosPlantaActividad" :items-per-page="5" class="elevation-15">

                                                        </v-data-table>
                                                    </template>

                                                </v-card-text>

                                            </v-container>

                                        </v-card>
                                    </v-tab-item>
                                    <!--//////////////// MADRES //////////////-->
                                    <!--//////////////// MADRES //////////////-->
                                    <!--//////////////// MADRES //////////////-->
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>
                                            <v-card-text>
                                                <v-layout wrap>
                                                    <v-flex md4></v-flex>
                                                    <v-flex md2>
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">

                                                                <v-btn color="success" @click="listarPlantasMadres()" v-bind="attrs" v-on="on">
                                                                    <v-icon>list</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Listar madres</span>
                                                        </v-tooltip>
                                                    </v-flex>
                                                    <v-flex md2>
                                                        <v-text-field label="Buscar planta.." append-icon="search" v-model="buscarPlanta"></v-text-field>
                                                    </v-flex>
                                                    <v-flex md4></v-flex>
                                                </v-layout>

                                            </v-card-text>

                                            <v-container success>
                                                <v-card-text>
                                                    <template>
                                                        <v-data-table dense :sort-by="['idPlanta']" :sort-desc="[true]" :headers="titulosPlantaMadre" :items="elementosPlantaMadre" :items-per-page="10" class="elevation-15" :search="buscarPlanta">

                                                        </v-data-table>
                                                    </template>
                                                </v-card-text>
                                            </v-container>

                                        </v-card>

                                    </v-tab-item>
                                    <!--//////////////// LOTE //////////////-->
                                    <!--//////////////// LOTE //////////////-->
                                    <!--//////////////// LOTE //////////////-->
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>
                                            <v-card-text>
                                                <v-layout wrap>
                                                    <v-flex md4></v-flex>
                                                    <v-flex md3>
                                                        <v-autocomplete label="Lote plantas.." :items="elementosRegisrtroSiembra" item-text="loteRegistroSiembra" item-value="loteRegistroSiembra" v-model="loteRegistroSiembra"></v-autocomplete>
                                                    </v-flex>
                                                    <v-flex md1>
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">

                                                                <v-btn color="success" @click="listarPlantasXLote(loteRegistroSiembra)" v-bind="attrs" v-on="on" class="ml-3 mt-2">
                                                                    <v-icon>list</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Listar plantas</span>
                                                        </v-tooltip>
                                                    </v-flex>
                                                    <v-flex md4></v-flex>
                                                </v-layout>

                                            </v-card-text>

                                            <v-container success>
                                                <v-card-text>
                                                    <template>
                                                        <v-data-table dense :sort-by="['idPlanta']" :sort-desc="[false]" :headers="titulosPlantaLote" :items="elementosPlantaLote" :items-per-page="10" class="elevation-15" :search="buscarPlantaLote">

                                                        </v-data-table>
                                                    </template>
                                                </v-card-text>
                                            </v-container>

                                        </v-card>

                                    </v-tab-item>

                                </v-tabs-items>
                            </v-card>
                        </template>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <!-- FIN DE CONTENEDOR -->
</div>
</template>

<script>
import registroService from '@/services/produccion/registrosiembra.service.js'
import plantaService from '@/services/produccion/planta.service.js'
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {
    created() {
        this.listarActiviadades();
        this.listarRegistros();

    },
    data() {
        return {
            loteRegistroSiembra: '',
            buscarPlantaLote: null,
            buscarPlanta: null,
            alerta: false,
            tabs: null,
            idTipoPlanta: 2,
            actividadseleccionada: '',
            idActividad: '',
            nombreActividad: '',
            detalleActividad: '',
            activarEsperaLinear: false,
            ////////////////////////////
            elementosActividad: [{
                idActividad: '',
                nombreActividad: '',
                detalleActividad: ''
            }],
            /////////////////////////////
            titulosPlantaActividad: [{
                    text: "Fecha actividad",
                    align: "start",
                    sortable: false,
                    value: "fechaPlantaActividad"
                }, {
                    text: "Lote",
                    align: "start",
                    sortable: false,
                    value: "loteSiembra"
                },
                {
                    text: "Tipo",
                    align: "start",
                    sortable: false,
                    value: "proPlanta.proTipoPlanta.nombreTipoPlanta"
                },
                {
                    text: "Id Planta",
                    align: "start",
                    sortable: false,
                    value: "proPlanta.idPlanta"
                },
                {
                    text: "Id Madre",
                    value: "proPlanta.proPlanta.idPlanta"
                },

                {
                    text: "Lugar",
                    value: "proPlanta.proUbicacion.proTipoUbicacion.nombreTipoUbicacion"
                },
                {
                    text: "Ubicación",
                    value: "proPlanta.proUbicacion.idUbicacion"
                },
            ],
            elementosPlantaActividad: [{
                idPlantaActividad: '',
                estadoActividad: '',
                fechaPlantaActividad: '',
                loteSiembra: '',
                proActividad: {
                    idActividad: '',
                    nombreActividad: '',
                    detalleActividad: '',
                },
                proPlanta: {
                    idPlanta: '',
                    codigoQR: '',
                    porcentajeThcPlanta: '',
                    porcentajeCbdPlanta: '',
                    numeroBandeja: '',
                    proPlanta: {
                        idPlanta: '',
                    },
                    proTipoPlanta: {
                        idTipoPlanta: '',
                        nombreTipoPlanta: '',
                        detalleTipoPlanta: '',
                    },
                    proEstadoPlanta: {
                        idEstadoPlanta: '',
                        nombreEstadoPlanta: '',
                        detalleEstadoPlanta: '',
                    },
                    proUbicacion: {
                        idUbicacion: '',
                        estadoUbicacion: '',
                        proTipoUbicacion: {
                            idTipoUbicacion: '',
                            nombreTipoUbicacion: '',
                        }
                    },
                    proSemilla: {
                        codigoSemilla: '',
                        nombreVariedadSemilla: '',
                        nombreInternoSemilla: '',
                        descripcionSemilla: '',
                        precioSemilla: '',
                        pesoSemilla: '',
                        porcentajeThcSemilla: '',
                        porcentajeCbdSemilla: '',
                        numeroLoteSemilla: '',
                        proProveedorSemilla: {
                            idProveedorSemilla: '',
                            nombreProveedorSemilla: '',
                            direccionProveedorSemilla: '',
                            correoProveedorSemilla: '',
                            paisProveedorSemilla: '',
                            ciudadProveedorSemilla: '',
                            rucProveedorSemilla: '',
                            telefonoFijoProveedorSemilla: '',
                            telefonoCelularProveedorSemilla: '',
                            fechaCreacionProveedorSemilla: '',
                            descripcionProveedorSemilla: '',
                        },
                        proFamiliaSemilla: {
                            idFamiliaSemilla: '',
                            nombreFamiliaSemilla: '',
                            descripcionFamiliaSemilla: '',
                        },
                        proAlmacen: {
                            idAlmacen: '',
                            nombreAlmacen: '',
                            detalleAlmacen: '',
                        },
                        proEstadoSemilla: {
                            idEstadoSemilla: '',
                            nombreEstadoSemilla: '',
                            descripcionEstadoSemilla: '',
                        }
                    }
                }
            }],

            titulosPlantaMadre: [

                {
                    text: "Id Planta",
                    align: "start",
                    sortable: true,
                    value: "idPlanta"
                },
                {
                    text: "Tipo planta",
                    value: "proTipoPlanta.nombreTipoPlanta",
                    sortable: false,
                },
                {
                    text: "Prefijo",
                    align: "start",
                    sortable: false,
                    value: "prefijoPlanta"
                },
                {
                    text: "Madre",
                    value: "proPlanta.idPlanta"
                },
                /*   {
                    text: "Bandeja",
                    value: "numeroBandeja"
                },*/
                {
                    text: "Lugar",
                    value: "proUbicacion.proTipoUbicacion.nombreTipoUbicacion"
                },
                {
                    text: "Ubicación",
                    value: "proUbicacion.idUbicacion"
                },

            ],
            elementosPlantaMadre: [{
                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
                numeroBandeja: '',
                proPlanta: {
                    idPlanta: ''
                },
                proTipoPlanta: {
                    idTipoPlanta: '',
                    nombreTipoPlanta: '',
                    detalleTipoPlanta: ''
                },
                proEstadoPlanta: {
                    idEstadoPlanta: '',
                    nombreEstadoPlanta: '',
                    detalleEstadoPlanta: ''
                },
                proUbicacion: {
                    idUbicacion: '',
                    estadoUbicacion: '',
                    proTipoUbicacion: {
                        idTipoUbicacion: '',
                        nombreTipoUbicacion: ''
                    }
                },
                proRegistroSiembra: {

                }
            }],
            titulosPlantaLote: [{
                    text: 'Id',
                    value: 'idPlanta'
                },
                {
                    text: 'Madre',
                    value: 'proPlanta.idPlanta'
                },
                {
                    text: 'Tipo',
                    value: 'proTipoPlanta.nombreTipoPlanta'
                },
                {
                    text: 'Estado',
                    value: 'proEstadoPlanta.nombreEstadoPlanta'
                },
                {
                    text: 'Ubicación',
                    value: 'proUbicacion.idUbicacion'
                },
                {
                    text: 'Lote',
                    value: 'proRegistroSiembra.loteRegistroSiembra'
                },
            ],
            elementosPlantaLote: [{
                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
                numeroBandeja: '',
                proPlanta: {
                    idPlanta: ''
                },
                proTipoPlanta: {
                    idTipoPlanta: '',
                    nombreTipoPlanta: '',
                    detalleTipoPlanta: ''
                },
                proEstadoPlanta: {
                    idEstadoPlanta: '',
                    nombreEstadoPlanta: '',
                    detalleEstadoPlanta: ''
                },
                proUbicacion: {
                    idUbicacion: '',
                    estadoUbicacion: '',
                    proTipoUbicacion: {
                        idTipoUbicacion: '',
                        nombreTipoUbicacion: ''
                    }
                },
                proRegistroSiembra: {
                    loteRegistroSiembra: '',

                }
            }],
            elementosRegisrtroSiembra: [{
                idRegistroSiembra: '',
                loteRegistroSiembra: ''
            }]

        }
    },
    methods: {
        listarRegistros() {
            registroService.traerRegistrosSiembraActivos().then((result) => {
                this.elementosRegisrtroSiembra = result.data;
            }).catch((err) => {

            });
        },
        listarPlantasXLote(idRegistroSiembra) {
            plantaService.listarPlantasXRegistroSiembra(idRegistroSiembra).then((result) => {
                this.elementosPlantaLote = result.data;
            }).catch((err) => {

            });
        },
        listarActiviadades() {
            axios.get('http://localhost:12590/api/tucann/proActividad', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosActividad = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },

        listarPlantas() {
            axios.get('http://localhost:12590/api/tucann/proPlanta', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosPlanta = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        listarPlantasMadres() {
            axios.get('http://localhost:12590/api/tucann/proPlanta/xidtp/' + this.idTipoPlanta, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosPlantaMadre = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        async listarPlantasXPlantaActividad(a) {
            if (a.length == 0) {
                alert("Debes ingresar una actividad.");
            } else {
                try {
                    this.activarEsperaLinear = true;
                    await axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xida/' + a, {
                            headers: generalHeader()
                        })
                        .then(res => {
                            this.elementosPlantaActividad = res.data;
                        })
                        .catch(err => {
                            console.error(err);
                        })
                } catch (error) {

                } finally {
                    this.activarEsperaLinear = false;
                }
            }
        }
    },
}
</script>
