<template>
<div>
<v-card-text></v-card-text>

    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg12>
                <v-card elevation-15>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex md3></v-flex>
                            <v-flex md4>
                                <v-text-field v-model="codigoqr" label="Codigo QR" append-icon="qr_code" autofocus v-on:keyup.enter="buscarxqr(codigoqr)">
                                </v-text-field>
                            </v-flex>
                            <v-flex md2>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" text-xs-left class="success ml-5 mt-3" @click="dialogo=true, buscarxqr(codigoqr)">
                                            <v-icon>qr_code</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Busqueda por QR Planta</span>
                                </v-tooltip>
                            </v-flex>
                        </v-layout>
                    </v-card-text>

                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
    <v-divider horizontal red></v-divider>
    <v-container>
        <v-card>

            <!--////////////////////////////////////     DIALOGO  //////////////////////////////////-->

            <v-dialog v-model="dialogo">

                <v-card>

                    <v-container fluid success>
                        <v-img src="@/assets/canna_com_white.png" width="400"></v-img>
                    </v-container>

                    <v-layout wrap>
                        <v-flex lg4 md4 sm12>
                            <v-card elevation="15" class="mt-5 mb-5">
                                <v-container white>

                                    <div class="d-flex flex-column justify-space-between align-center mt-3">
                                        <v-img src="@/assets/canna.jpg">

                                        </v-img>
                                    </div>

                                </v-container>
                            </v-card>

                        </v-flex>

                        <v-flex lg8 md8 sm8 mt-5>
                            <v-card-title class="success white--text">FICHA TÉCNICA PLANTA &nbsp;&nbsp;&nbsp;
                                <div class="text-center" v-if=" nombreEstadoPlanta === 'Activa'">
                                    <v-chip label dark color="monocromatico4">
                                        {{ nombreEstadoPlanta }}&nbsp;<v-icon size=20>
                                            mdi-check-bold
                                        </v-icon>

                                    </v-chip>
                                </div>
                                <div class="text-center" v-if=" nombreEstadoPlanta === 'Procesada'">
                                    <v-chip label dark color="orange">
                                        {{ nombreEstadoPlanta }}&nbsp;<v-icon size=20>
                                            mdi-check-all
                                        </v-icon>

                                    </v-chip>
                                </div>
                            </v-card-title>
                            <!--//////////////////////////////////////////  FICHA   ///////////////////////////////////////////-->
                            <v-card-text>
                                <v-layout class="uii">
                                    <v-flex sm12 xs12 md6 mt-3>
                                        <!--//////////////////////////////////////////  DATOS  IZQUIERDA  ///////////////////////////////////////////-->
                                        <div class="text-center mb-3">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Id planta : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal">&nbsp;

                                                {{ idPlanta }} &nbsp; &nbsp;
                                                <v-icon size=20>mdi-sprout-outline </v-icon>
                                            </v-chip>

                                        </div>
                                        <div class="text-center mb-3">&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Lote siembra : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal"> {{ loteRegistroSiembra }} &nbsp;&nbsp;<v-icon size=20> mdi-seed-outline </v-icon>
                                            </v-chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                        <div class="text-center mb-3">Tipo de planta : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal"> {{ nombreTipoPlanta }} &nbsp; &nbsp;<v-icon size=20> mdi-seed </v-icon>
                                            </v-chip>
                                        </div>

                                        <div class="text-center mb-3"> &nbsp;&nbsp; &nbsp;% THC : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal">
                                                <v-icon size=24>mdi-label-percent-outline</v-icon> &nbsp; &nbsp; {{ porcentajeThcPlanta }} %
                                            </v-chip>
                                        </div>
                                        <div class="text-center mb-3"> &nbsp;&nbsp; &nbsp;% CBD : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal">
                                                <v-icon size=24>mdi-label-percent-outline</v-icon> &nbsp; &nbsp; {{ porcentajeCbdPlanta }} %
                                            </v-chip>
                                        </div>
                                        <div class="text-center mb-3"> &nbsp; &nbsp; Ubicación : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal">
                                                {{ idUbicacion }}&nbsp;&nbsp;<v-icon size=20>
                                                    mdi-map-marker-multiple
                                                </v-icon>

                                            </v-chip>
                                        </div>
                                        <div class="text-center mb-3" v-if=" nombreEstadoPlanta === 'Activa'"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Estado : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="success">
                                                {{ nombreEstadoPlanta }}&nbsp;&nbsp;<v-icon size=20>
                                                    mdi-check
                                                </v-icon>

                                            </v-chip>
                                        </div>
                                        <div class="text-center mb-3" v-if=" nombreEstadoPlanta === 'Procesada'">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Estado : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="orange">
                                                {{ nombreEstadoPlanta }}&nbsp;&nbsp;<v-icon size=20> mdi-check-all </v-icon>
                                            </v-chip>
                                        </div>
                                        <div class="text-center mb-3">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Familia : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal">
                                                {{ nombreFamiliaSemilla }}&nbsp;&nbsp;<v-icon size=20> mdi-seed </v-icon>
                                            </v-chip>
                                        </div>
                                        <div class="text-center mb-3">Nombre interno : &nbsp; &nbsp;
                                            <v-chip outlined label dark color="teal"> {{ nombreInternoSemilla }} &nbsp;&nbsp;<v-icon size=20> mdi-seed-outline </v-icon>
                                            </v-chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>

                                    </v-flex>
                                    <!--//////////////////////////////////////////  DATOS  DERECHA  ///////////////////////////////////////////-->
                                    <v-divider vertical></v-divider>
                                    <v-flex sm12 xs12 md6 mt-3>
                                        <v-card-text></v-card-text>
                                        <div class="text-center">

                                            <vue-qr :text='codigoQR' :size="200" :margin="4" class="red"></vue-qr>

                                        </div>
                                    </v-flex>
                                </v-layout>

                            </v-card-text>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap>
                        <v-flex sm6>
                            <v-card elevation="15" class="mt-5 mb-5 ml-5 mr-5">
                                <v-card-title class="monocromatico2 white--text">Registro de crecimiento</v-card-title>
                                <v-card-text>
                                    <v-data-table hide-default-footer :headers="titulosCrecimiento" :items="elementosCrecimiento" :items-per-page="10" class="elevation-1" dense></v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-flex>

                        <v-flex sm6>

                            <v-card elevation="15" class="mt-5 mb-5 ml-5 mr-5">
                                <v-card-title class="monocromatico2 white--text">Fecha Actividades</v-card-title>
                                <v-card-text>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        Actividad
                                                    </th>
                                                    <th class="text-left">
                                                        Fecha
                                                    </th>
                                                    <th class="text-left">
                                                        Estado
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in actividades" :key="item.name">
                                                    <td>{{ item.proActividad.nombreActividad }}</td>
                                                    <td>{{ item.fechaPlantaActividad  }}</td>
                                                    <td>
                                                        <div v-if="item.estadoActividad == true">
                                                            <v-chip color="analogo1" dark label small>
                                                                OK &nbsp;<v-icon dense size=20>
                                                                    mdi-check-bold
                                                                </v-icon>
                                                            </v-chip>
                                                        </div>
                                                        <div v-else-if="item.estadoActividad == false">
                                                            <v-chip color="analogo3" dark label small>
                                                                ACT &nbsp;<v-icon size=20>
                                                                    remove
                                                                </v-icon>
                                                            </v-chip>
                                                        </div>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card-text>

                            </v-card>

                        </v-flex>

                        <v-data-table>

                        </v-data-table>

                    </v-layout>
                    <v-card-actions>
                        <v-btn @click="dialogo=false,cerrar()" color="monocromatico2" class="white--text" block>Cerrar <v-icon size="25" right>close</v-icon>
                        </v-btn>

                    </v-card-actions>

                </v-card>

            </v-dialog>

        </v-card>

    </v-container>
</div>
</template>

<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
]

import axios from 'axios'
import generalHeader from '@/services/general-header';
import VueQr from 'vue-qr'
export default {
    data() {
        return {
            alert: false,
            dialogo: false,
            codigoqr: '',
            identificador: '',
            tabs: null,
            /////////////////////////////////////////////

            itemsPerPage: 1,
            actividades: [{
                idPlantaActividad: '',
                estadoActividad: '',
                fechaPlantaActividad: '',
                loteSiembra: '',
                proActividad: {
                    idActividad: '',
                    nombreActividad: '',
                    detalleActividad: '',
                }

            }],
            ///////////////////////////////////////////
            width: 2,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            gradientDirection: 'top',
            gradients,
            fill: false,
            type: 'trend',
            autoLineWidth: false,

            /////////////////////////////////////////////
            singleExpand: false,
            ///////////////////////////////
            ////////////////////////////////////////
            idPlanta: '',
            codigoQR: '',
            porcentajeThcPlanta: '',
            porcentajeCbdPlanta: '',
            numeroBandeja: "1",
            clasificacionA: '',
            clasificacionB: '',
            clasificacionC: '',
            clasificacionD: '',
            lotePlanta: '',
            prefijoPlanta: '',
            proPlanta: '',

            idTipoPlanta: '',
            nombreTipoPlanta: '',
            detalleTipoPlanta: '',

            idEstadoPlanta: '',
            nombreEstadoPlanta: '',
            detalleEstadoPlanta: '',

            idUbicacion: '',
            ubiPrimeraParte: '',
            ubiSegundaParte: '',
            ubiTerceraParte: '',

            idEstadoUbicacion: '',
            nombreEstadoUbicacion: '',

            idTipoUbicacion: '',
            nombreTipoUbicacion: '',

            idRegistroSiembra: '',
            loteRegistroSiembra: '',
            semanaRegistroSiembra: '',
            pesoImpuresasRegistroSiembra: '',
            pesoSemillasRegistroSiembra: '',
            semillasSembradasRegistroSiembra: '',
            esquejesSembradosRegistroSiembra: '',
            idPlantaClonada: '',
            fechaRegistroSiembra: '',

            idDiaSemana: '',
            nombreDiaSemana: '',

            codigoSemilla: '',
            nombreVariedadSemilla: '',
            nombreInternoSemilla: '',
            descripcionSemilla: '',
            precioSemilla: '',
            pesoSemilla: '',
            porcentajeThcSemilla: '',
            porcentajeCbdSemilla: '',
            numeroLoteSemilla: '',
            prefijoSemilla: '',

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

            idFamiliaSemilla: '',
            nombreFamiliaSemilla: '',
            descripcionFamiliaSemilla: '',

            idAlmacen: '',
            nombreAlmacen: '',
            detalleAlmacen: '',

            idEstadoSemilla: '',
            nombreEstadoSemilla: '',
            descripcionEstadoSemilla: '',

            idEstadoRegistroSiembra: '',
            nombreEstadoRegistroSiembra: '',
            detalleEstadoRegistroSiembra: '',

            idTipoRegistroSiembra: '',
            nombreTipoRegistroSiembra: '',
            detalleTipoRegistroSiembra: '',
            /////////////////////////////////////////////
            elementosCrecimiento: [{
                idRegistro: '',
                valorRegistro: '',
                fechaRegistro: '',
                proPlanta: {
                    idPlanta: '',
                }
            }],
            //////////////////////////////////////////////////
            titulosPlanta: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "idPlanta"
                },
                {
                    text: "Semilla",
                    value: "proSemilla.nombreVariedadSemilla",
                    sortable: false,
                },
            ],

            elementosPlanta: [{
                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
                numeroBandeja: "1",
                clasificacionA: '',
                clasificacionB: '',
                clasificacionC: '',
                clasificacionD: '',
                lotePlanta: '',
                prefijoPlanta: '',
                proPlanta: '',
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
                },
                proRegistroSiembra: {
                    idRegistroSiembra: 2,
                    loteRegistroSiembra: "C112216401",
                    semanaRegistroSiembra: "16",
                    pesoImpuresasRegistroSiembra: null,
                    pesoSemillasRegistroSiembra: 0.02,
                    semillasSembradasRegistroSiembra: 100.0,
                    esquejesSembradosRegistroSiembra: null,
                    idPlantaClonada: null,
                    fechaRegistroSiembra: "2022-04-21T14:09:58.642-0500",
                    proDiaSemana: {
                        idDiaSemana: 4,
                        nombreDiaSemana: "Jueves"
                    },
                    proSemilla: {
                        codigoSemilla: 1,
                        nombreVariedadSemilla: "Oregon Cherry",
                        nombreInternoSemilla: "SA-1",
                        descripcionSemilla: "Semilla con alto grado de CBD",
                        precioSemilla: 1.0,
                        pesoSemilla: 0.02,
                        porcentajeThcSemilla: 0.23,
                        porcentajeCbdSemilla: 18.5,
                        numeroLoteSemilla: "DS4568789",
                        prefijoSemilla: "01",
                        proProveedorSemilla: {
                            idProveedorSemilla: 1,
                            nombreProveedorSemilla: "Semillas Chicago",
                            direccionProveedorSemilla: "Avenida siempre viva",
                            correoProveedorSemilla: "semillas@gmail.com\"",
                            paisProveedorSemilla: "EEUU",
                            ciudadProveedorSemilla: "Chicago",
                            rucProveedorSemilla: "1002712857001",
                            telefonoFijoProveedorSemilla: "022369852",
                            telefonoCelularProveedorSemilla: "0997418529",
                            fechaCreacionProveedorSemilla: "2021-05-28",
                            descripcionProveedorSemilla: "De calidad alta"
                        },
                        proFamiliaSemilla: {
                            idFamiliaSemilla: 1,
                            nombreFamiliaSemilla: "Sativa",
                            descripcionFamiliaSemilla: "Contenido de CBD / THC"
                        },
                        proAlmacen: {
                            idAlmacen: 1,
                            nombreAlmacen: "C1",
                            detalleAlmacen: "Almacen Cannandes S.A."
                        },
                        proEstadoSemilla: {
                            idEstadoSemilla: 1,
                            nombreEstadoSemilla: "Germinada",
                            descripcionEstadoSemilla: "Semilla que si germina y continua proceso de producción"
                        }
                    },
                    proEstadoRegistroSiembra: {
                        idEstadoRegistroSiembra: 2,
                        nombreEstadoRegistroSiembra: "Procesado",
                        detalleEstadoRegistroSiembra: "Indica que el registro proceso semillas."
                    },
                    proTipoRegistroSiembra: {
                        idTipoRegistroSiembra: 1,
                        nombreTipoRegistroSiembra: "Común",
                        detalleTipoRegistroSiembra: "Tipo de registro de un lote de planta común F1"
                    }

                }
            }],

        }
    },
    methods: {
        buscarxqr(qr) {
            // console.log(qr);

            if (qr == '') {
                this.dialogo = false;
                this.codigoqr = '';
                alert("Debes ingresar un codigo QR");

            } else if (qr.length < 36 || qr.length > 36) {

                this.dialogo = false;
                this.codigoqr = '';
                alert("Este no parece un código QR");
            } else {

                /*   let api1, api2;
                    api1 = 'http://localhost:12590/api/tucann/proPlanta/findbyQR/';
                    api2 = 'http://localhost:12590/api/tucann/proRegistroCrecimiento/xidpcr/';

                    console.log(api1);

                    const requestOne = axios.get(api1 +qr);
                    const requestTwo = axios.get(api2 + 298);

                    axios.all([requestOne, requestTwo])
                        .then(axios.spread((res1, res2) => {

                            this.elementosPlanta = res1.data;
                            this.elementosCrecimiento = res2.data;

                            console.log(res1.data);
                            console.log(res2.data);

                        }))*/

                axios.get('http://localhost:12590/api/tucann/proPlanta/findbyQR/' + qr, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        this.dialogo = true;
                        this.elementosPlanta = res.data;
                        console.log(res.data);
                        this.idPlanta = res.data.idPlanta;
                        this.mostrarActividades(this.idPlanta);
                        this.mostrarCrecimiento(this.idPlanta);
                        ///////////////////////////////////////////////////////////////////////////
                        /*    this.idPlanta = res.data.idPlanta;
                            this.codigoQR = res.data.codigoQR;
                            this.porcentajeThcPlanta = res.data.porcentajeThcPlanta;
                            this.porcentajeCbdPlanta = res.data.porcentajeCbdPlanta;
                            this.numeroBandeja = res.data.numeroBandeja;
                            this.clasificacionA = res.data.clasificacionA;
                            this.clasificacionB = res.data.clasificacionB;
                            this.clasificacionC = res.data.clasificacionC;
                            this.clasificacionD = res.data.clasificacionD;
                            this.lotePlanta = res.data.lotePlanta;
                            this.prefijoPlanta = res.data.prefijoPlanta;*/
                        this.codigoQR = res.data.codigoQR;
                        this.nombreTipoPlanta = res.data.proTipoPlanta.nombreTipoPlanta;
                        this.idEstadoPlanta = res.data.proEstadoPlanta.idEstadoPlanta;
                        this.nombreEstadoPlanta = res.data.proEstadoPlanta.nombreEstadoPlanta;
                        this.detalleEstadoPlanta = res.data.proEstadoPlanta.detalleEstadoPlanta;
                        this.idUbicacion = res.data.proUbicacion.idUbicacion;
                        this.nombreFamiliaSemilla = res.data.proRegistroSiembra.proSemilla.proFamiliaSemilla.nombreFamiliaSemilla;
                        this.nombreInternoSemilla = res.data.proRegistroSiembra.proSemilla.nombreInternoSemilla;
                        this.loteRegistroSiembra = res.data.proRegistroSiembra.loteRegistroSiembra;
                        /*     
                         this.proUbicacion.ubiPrimeraParte = res.data.ubiPrimeraParte;
                         this.proUbicacion.ubiSegundaParte = res.data.ubiSegundaParte;
                         this.proUbicacion.ubiTerceraParte = res.data.ubiTerceraParte;

                         this.proUbicacion.proEstadoUbicacion.idEstadoUbicacion = res.data.idEstadoUbicacion;
                         this.proUbicacion.proEstadoUbicacion.nombreEstadoUbicacion = res.data.nombreEstadoUbicacion;

                         this.proUbicacion.proTipoUbicacion.idTipoUbicacion = res.data.idTipoUbicacion;
                         this.proUbicacion.proTipoUbicacion.nombreTipoUbicacion = res.data.nombreTipoUbicacion;

                         this.proRegistroSiembra.idRegistroSiembra = res.data.idRegistroSiembra;
                         this.proRegistroSiembra.loteRegistroSiembra = res.data.loteRegistroSiembra;
                         this.semanaRegistroSiembra = res.data.semanaRegistroSiembra;
                         this.proRegistroSiembra.pesoImpuresasRegistroSiembra = res.data.pesoImpuresasRegistroSiembra;
                         this.proRegistroSiembra.pesoSemillasRegistroSiembra = res.data.pesoSemillasRegistroSiembra;
                         this.proRegistroSiembra.semillasSembradasRegistroSiembra = res.data.semillasSembradasRegistroSiembra;
                         this.proRegistroSiembra.esquejesSembradosRegistroSiembra = res.data.esquejesSembradosRegistroSiembra;
                         this.proRegistroSiembra.idPlantaClonada = res.data.idPlantaClonada;
                         this.proRegistroSiembra.fechaRegistroSiembra = res.data.fechaRegistroSiembra;

                         this.proRegistroSiembra.idDiaSemana = res.data.idDiaSemana;
                         this.proRegistroSiembra.nombreDiaSemana = res.data.nombreDiaSemana;

                         this.proRegistroSiembra.codigoSemilla = res.data.codigoSemilla;
                         this.proRegistroSiembra.nombreVariedadSemilla = res.data.nombreVariedadSemilla;
                         this.proRegistroSiembra.nombreInternoSemilla = res.data.nombreInternoSemilla;
                         this.proRegistroSiembra.descripcionSemilla = res.data.descripcionSemilla;
                         this.proRegistroSiembra.precioSemilla = res.data.precioSemilla;
                         this.proRegistroSiembra.pesoSemilla = res.data.pesoSemilla;
                         this.proRegistroSiembra.porcentajeThcSemilla = res.data.porcentajeThcSemilla;
                         this.proRegistroSiembra.porcentajeCbdSemilla = res.data.porcentajeCbdSemilla;
                         this.proRegistroSiembra.numeroLoteSemilla = res.data.numeroLoteSemilla;
                         this.proRegistroSiembra.prefijoSemilla = res.data.prefijoSemilla;

                         this.proRegistroSiembra.idProveedorSemilla = res.data.idProveedorSemilla;
                         this.proRegistroSiembra.nombreProveedorSemilla = res.data.nombreProveedorSemilla;
                         this.proRegistroSiembra.direccionProveedorSemilla = res.data.direccionProveedorSemilla;
                         this.proRegistroSiembra.correoProveedorSemilla = res.data.correoProveedorSemilla;
                         this.proRegistroSiembra.paisProveedorSemilla = res.data.paisProveedorSemilla;
                         this.proRegistroSiembra.ciudadProveedorSemilla = res.data.ciudadProveedorSemilla;
                         this.proRegistroSiembra.rucProveedorSemilla = res.data.rucProveedorSemilla;
                         this.proRegistroSiembra.telefonoFijoProveedorSemilla = res.data.telefonoFijoProveedorSemilla;
                         this.proRegistroSiembra.telefonoCelularProveedorSemilla = res.data.telefonoCelularProveedorSemilla;
                         this.proRegistroSiembra.fechaCreacionProveedorSemilla = res.data.fechaCreacionProveedorSemilla;
                         this.proRegistroSiembra.descripcionProveedorSemilla = res.data.descripcionProveedorSemilla;

                         this.proRegistroSiembra.idFamiliaSemilla = res.data.idFamiliaSemilla;

                         this.proRegistroSiembra.descripcionFamiliaSemilla = res.data.descripcionFamiliaSemilla;

                         this.proRegistroSiembra.idAlmacen = res.data.idAlmacen;
                         this.proRegistroSiembra.nombreAlmacen = res.data.nombreAlmacen;
                         this.proRegistroSiembra.detalleAlmacen = res.data.detalleAlmacen;

                         this.proRegistroSiembra.idEstadoSemilla = res.data.idEstadoSemilla;
                         this.proRegistroSiembra.nombreEstadoSemilla = res.data.nombreEstadoSemilla;
                         this.proRegistroSiembra.descripcionEstadoSemilla = res.data.descripcionEstadoSemilla;

                         this.proRegistroSiembra.idEstadoRegistroSiembra = res.data.idEstadoRegistroSiembra;
                         this.proRegistroSiembra.nombreEstadoRegistroSiembra = res.data.nombreEstadoRegistroSiembra;
                         this.proRegistroSiembra.detalleEstadoRegistroSiembra = res.data.detalleEstadoRegistroSiembra;
                         this.proRegistroSiembra.idTipoRegistroSiembra = res.data.idTipoRegistroSiembra;
                         this.proRegistroSiembra.nombreTipoRegistroSiembra = res.data.nombreTipoRegistroSiembra;
                         this.proRegistroSiembra.detalleTipoRegistroSiembra = res.data.detalleTipoRegistroSiembra;*/
                        //    this.mostrarActividades(identificador);
                        //   this.mostrarCrecimiento(identificador);

                        //   console.log(res.data);

                        /*   if (res.status == 200) {

                                this.elementosPlanta = res.data;
                                //console.log(res);
                                // console.log(res.status);
                                //  console.log(this.elementosPlanta[0].idPlanta);
                                //  console.log(res.data[0].codigoQR);
                                //  console.log("HOOOOLA");
                                axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/xidpcr/' + this.elementosPlanta[0].idPlanta)
                                    .then(res => {

                                        //   console.log(res);

                                        if (res.status == 200) {

                                            this.elementosCrecimiento = res.data;
                                            this.mostrarActividades(this.elementosPlanta[0].idPlanta);

                                            // console.log(res.status);
                                            // console.log(res.data[0].idPlanta);
                                            //  console.log(res.data[0].codigoQR);
                                            //  console.log("HOOOOLA");

                                        } else {
                                            alert("Registro no encontrado");
                                        }

                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })

                            } else {
                                alert("Registro no encontrado");
                            }*/

                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        },

        cerrar() {
            this.codigoqr = ''
            this.idPlanta = ''
        },
        mostrarActividades(a) {
            if (a == '') {
                alert('Campo vacio!');

            } else {
                axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xidp/' + a, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        this.actividades = res.data;

                    })
                    .catch(err => {
                        console.error(err);
                    })

            }
        },
        mostrarCrecimiento(a) {
            axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/xidpcr/' + a, {
                    headers: generalHeader()
                })
                .then(res => {

                    //   console.log(res);

                    if (res.status == 200) {

                        this.elementosCrecimiento = res.data;

                        // console.log(res.status);
                        // console.log(res.data[0].idPlanta);
                        //  console.log(res.data[0].codigoQR);
                        //  console.log("HOOOOLA");

                    } else {
                        alert("Registro no encontrado");
                    }

                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    components: {
        VueQr
    }
}
</script>

<style>
.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>
