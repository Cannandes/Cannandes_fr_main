<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg10>
                <!--  <h1>SIEMBRA</h1>-->
                <v-card elevation-15>

                    <v-card-title class="success white--text">
                        <v-icon dark x-large color="analogo4" left>mdi-map-marker-distance</v-icon>

                        <v-toolbar-title>CAMBIO DE UBICACIÓN PLANTAS</v-toolbar-title>
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>

                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Puedes cambiar de ubicacion a una planta utilizando su código<v-chip small label color="white" text-color="error"><strong> QR </strong>&nbsp;&nbsp;<v-icon size="17">qr_code</v-icon>
                                </v-chip> y tambien por su <v-chip small label color="white" text-color="error"><strong>ID</strong> &nbsp;&nbsp;<v-icon size="25">pin</v-icon>
                                </v-chip>
                            </v-alert>
                        </v-card-text><!-- fin alerta -->

                    </v-card-title>

                    <!--////////////////////////////////////     CAMBIO UBICACION  //////////////////////////////////-->

                    <v-divider horizontal red></v-divider>
                    <v-container success>
                        <template>
                            <v-card>
                                <v-toolbar flat>

                                    <v-spacer></v-spacer>

                                    <template v-slot:extension>
                                        <v-tabs v-model="tabs" fixed-tabs>
                                            <v-tab v-for="n in 2" :key="n">
                                                <div v-if="n==1">
                                                    <v-icon large>pin</v-icon>
                                                </div>
                                                <div v-else-if="n==2">
                                                    <v-icon large>qr_code</v-icon>
                                                </div>
                                            </v-tab>
                                        </v-tabs>
                                    </template>
                                </v-toolbar>
                                <v-tabs-items v-model="tabs">

                                    <!-- CAMBIO CODIGO ID -->
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>

                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field type="number" append-icon="mdi-arrow-right-bold" class="mr-2 " v-model="codigo" label="ID planta.." autofocus v-on:keyup.enter="buscarxid(codigo)">

                                                        </v-text-field>

                                                    </v-flex>
                                                    <v-flex sm12 lg3 md3>

                                                        <v-switch v-model="switch2" inset @click="dialogo2=true" label="Seleccionar" :disabled="!interuptor3">
                                                        </v-switch>
                                                    </v-flex>

                                                </v-layout>
                                            </v-card-actions>

                                        </v-card>

                                    </v-tab-item>
                                    <!-- CAMBIO POR CODIGO QR -->
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>

                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field append-icon="mdi-arrow-right-bold" class="mr-2 " v-model="codigoqr" label="QR planta.." autofocus v-on:keyup.enter="buscarxqr(codigoqr)">

                                                        </v-text-field>

                                                    </v-flex>
                                                    <v-flex sm12 lg3 md3>

                                                        <v-switch v-model="switch1" inset @click="dialogo=true" label="Seleccionar" :disabled="!interuptor2">
                                                        </v-switch>
                                                    </v-flex>

                                                </v-layout>
                                            </v-card-actions>

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
    <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
    <form v-on:submit.prevent="cambiarTipoPlantaxqr">
        <v-dialog v-model="dialogo" width="600">
            <!-- PANTALLA EMERGENETE PARA CAMBIAR DE UBICACION pPOR QR-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="analogo4">mdi-map-marker-distance</v-icon>
                    &nbsp;Cambio de ubicación de planta
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>

                <v-container>

                    <v-card elevation="15" success>
                        <v-layout wrap row>
                            <v-card-text>
                                <v-flex md12>
                                    <v-card-title class="success  white--text">
                                        QR Planta
                                    </v-card-title>
                                </v-flex>

                                <v-flex md12 class="success">

                                    <v-chip label color="" v-model="sss">{{this.codigoqr}} </v-chip>

                                </v-flex>
                            </v-card-text>
                            <v-divider dark></v-divider>

                            <v-card-text>
                                <v-flex>
                                    <v-card-title class="success white--text">
                                        Ubicación actual : &nbsp; <v-chip label color="error">
                                            <h2>{{this.ubicacionanterior}} </h2>
                                        </v-chip>
                                    </v-card-title>
                                </v-flex>

                            </v-card-text>
                            <v-card-text>
                                <v-card-title class="success white--text">
                                    Ubicación destino : &nbsp; <v-select v-model="seleccion" item-text="idUbicacion" item-value="idUbicacion" label="Ubicar en.." :items="elementosUbicacion"></v-select>
                                </v-card-title>

                            </v-card-text>

                        </v-layout>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialogo=false,cancelar()">
                                Cancelar
                            </v-btn>
                            <v-btn class="success" text @click="cambiarUbicacionPlanta()">
                                Cambiar<v-icon>trending_flat</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-container>

            </v-card>
        </v-dialog>

    </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR una ubicacion por qr-->
    <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
    <form v-on:submit.prevent="cambiarTipoPlantaxqr">
        <v-dialog v-model="dialogo2" width="600" persistent>
            <!-- PANTALLA EMERGENETE PARA CAMBIAR DE UBICACION POR ID-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="analogo4">mdi-map-marker-distance</v-icon>
                    &nbsp;Cambio de ubicación de planta
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>

                <v-container>

                    <v-card elevation="15" success>
                        <v-layout wrap row>
                            <v-card-text>
                                <v-flex md12>
                                    <v-card-title class="success  white--text">
                                        ID Planta : &nbsp; <v-chip label color="analogo4" v-model="sss">
                                            <h2 class="white--text">{{this.codigo}}</h2>
                                        </v-chip>
                                    </v-card-title>
                                </v-flex>

                            </v-card-text>
                            <v-divider dark></v-divider>

                            <v-card-text>
                                <v-flex>
                                    <v-card-title class="success white--text">
                                        Ubicación actual : &nbsp; <v-chip label color="analogo4">
                                            <h2 class="white--text">{{this.ubicacionanterior2}} </h2>
                                        </v-chip>
                                    </v-card-title>
                                </v-flex>

                            </v-card-text>
                            <v-divider></v-divider>

                            <!--   <v-card-text>
                                <v-card-title class="success white--text">
                                    Ubicación destino : &nbsp; <v-chip label color="analogo4">
                                        <v-select v-model="seleccion2" color="white--text" item-text="idUbicacion" item-value="idUbicacion" label="Ubicar en.." :items="elementosUbicacion"></v-select>
                                    </v-chip>
                                </v-card-title>

                            </v-card-text>-->
                            <v-card-text>
                                <v-card-title class="success white--text">
                                    Ubicación destino : &nbsp; <v-chip label color="analogo4">
                                        <v-autocomplete v-model="seleccion2" :disabled="false" :items="elementosUbicacion" white--text class="white--text" color="white" item-text="idUbicacion" label="Ubicar en.."></v-autocomplete>
                                    </v-chip>
                                </v-card-title>

                            </v-card-text>

                        </v-layout>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialogo2=false,cancelar2()">
                                Cancelar
                            </v-btn>
                            <v-btn class="success" text @click="cambiarUbicacionPlantaxid(seleccion2,codigo)">
                                Cambiar<v-icon>trending_flat</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-container>

            </v-card>
        </v-dialog>

    </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->

    <v-snackbar v-model="correcto" :multi-line="multiLine">
        {{ mensajecambio }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="correcto = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
    <v-snackbar v-model="correcto2" :multi-line="multiLine">
        {{ mensajecambio2 }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="correcto2 = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {

    created() {
        this.activ = false;
        axios.get('http://localhost:12590/api/tucann/proUbicacion/', {
                headers: generalHeader()
            })
            .then(res => {
                this.elementosUbicacion = res.data;

            })
            .catch(err => {
                console.error(err);
            })
    },
    data() {
        return {
            alert: false,
            text: 'dasdasdas',
            tabs: null,
            ubicacionInicial: '',
            ubicacionDestino: '',
            //////////
            ubicacionanterior: '',
            ubicacionanterior2: '',
            //////////
            seleccion: '',
            seleccion2: '',
            codigoqr: '',
            codigo: '',
            /////////////////////////
            idUbicacion: '',
            estadoUbicacion: '',
            idTipoUbicacion: '',
            nombreTipoUbicacion: '',
            //////////////////////////
            idplanta: '',
            /////////////////////
            sss: '',
            //////////////////
            correcto: false,
            mensajecambio: '',
            correcto2: false,
            mensajecambio2: '',
            multiLine: true,
            ///////////////////
            switch1: false,
            interuptor2: '',
            switch2: false,
            interuptor3: '',
            /////////////////////
            dialogo: false,
            dialogo2: false,
            /////////////////////
            elementosUbicacion: [{
                idUbicacion: '',
                estadoUbicacion: '',
                proTipoUbicacion: {
                    idTipoUbicacion: '',
                    nombreTipoUbicacion: ''
                }
            }],
            /////////// elementos planta
            elementosPlanta: [{

                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
                numeroBandeja: '',

                proTipoPlanta: {
                    idTipoPlanta: '',
                    nombreTipoPlanta: '',
                    detalleTipoPlanta: '',
                },
                proPlanta: {
                    idPlanta: '',
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
                        descripcionProveedorSemilla: ''
                    },
                    proFamiliaSemilla: {
                        idFamiliaSemilla: '',
                        nombreFamiliaSemilla: '',
                        descripcionFamiliaSemilla: ''
                    },
                    proAlmacen: {
                        idAlmacen: '',
                        nombreAlmacen: '',
                        detalleAlmacen: ''
                    },
                    proEstadoSemilla: {
                        idEstadoSemilla: '',
                        nombreEstadoSemilla: '',
                        descripcionEstadoSemilla: ''
                    }
                }

            }],
        }
    },
    methods: {

        buscarxqr(qr) {
            if (qr == '') {
                this.dialogo = false;
                this.codigoqr = '';
                this.$fire({
                    title: '<strong class="u">Oops!</strong>',
                    html: '<spam class="u">Debes ingresar un codigo QR!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });

            } else if (qr.length < 36 || qr.length > 36) {

                this.dialogo = false;
                this.codigoqr = '';

                this.$fire({
                    title: '<strong class="u">Oops!</strong>',
                    html: '<spam class="u">Este no parece un código QR!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });
            } else {

                axios.get('http://localhost:12590/api/tucann/proPlanta/findbyQR/' + qr, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        if (res.status == 200) {

                            this.elementosPlanta = res.data;

                            //console.log(res.status);
                            // console.log(res.data[0].idPlanta);
                            // console.log(res.data[0].codigoQR);

                            this.$fire({
                                title: '<strong class="u">Excelente!</strong>',
                                html: '<spam class="u">La planta existe y puede ser ubicada!</spam>',
                                type: "success",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });
                            this.encender(1);
                            this.ubicacionanterior = res.data[0].proUbicacion.idUbicacion;
                            //  console.log(ss);

                        } else {

                            this.$fire({
                                title: '<strong class="u">Oops!</strong>',
                                html: '<spam class="u">Registro no encontrado!</spam>',
                                type: "error",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });
                        }

                    })
                    .catch(err => {
                        //console.error(err);

                        if (err) {
                            this.codigoqr = '';
                            this.$fire({
                                title: '<strong class="u">Oops!</strong>',
                                html: '<spam class="u">Ingresa un codigo válido!</spam>',
                                type: "error",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });

                        }
                    })
            }
        },

        buscarxid(id) {

            if (id == '') {
                this.dialogo2 = false;
                this.codigo = '';
                this.$fire({
                    title: '<strong class="u">Oops!</strong>',
                    html: '<spam class="u">Debes ingresar un Id de planta!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });

            } else if (id.length > 12) {

                this.dialogo2 = false;
                this.codigo = '';
                this.$fire({
                    title: '<strong class="u">Oops!</strong>',
                    html: '<spam class="u">Este no parece un Id de planta!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });
            } else {

                axios.get('http://localhost:12590/api/tucann/proPlanta/' + id, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        if (res.data.proEstadoPlanta.idEstadoPlanta == 3) {
                            this.$fire({
                                title: '<strong class="u">Oops!</strong>',
                                html: '<spam class="u">El estado de esta planta no le permite realizar esta operación!</spam>',
                                type: "error",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });
                        } else {

                            this.elementosPlanta = res.data;
                            // console.log(this.elementosPlanta.proUbicacion.idUbicacion);

                            //     console.log(res.data);

                            this.$fire({
                                title: '<strong class="u">Excelente!</strong>',
                                html: '<spam class="u">La planta existe y puede ser ubicada!</spam>',
                                type: "success",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });
                            this.ubicacionanterior2 = res.data.proUbicacion.idUbicacion;

                            //   console.log(this.ubicacionanterior2 );
                            this.encender2(1);

                        }

                    })
                    .catch(err => {
                        if (err) {
                            this.codigo = '';

                            this.$fire({
                                title: '<strong class="u">Oops!</strong>',
                                html: '<spam class="u">Ingresa un codigo válido!</spam>',
                                type: "error",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });

                        }
                    })

            }
        },
        encender(a) {

            if (a == 1) {
                this.interuptor2 = true;
            }

            if (a == 2) {
                this.interuptor2 = false;
            }

        },
        encender2(a) {

            if (a == 1) {
                this.interuptor3 = true;
            }

            if (a == 2) {
                this.interuptor3 = false;
            }

        },
        cancelar() {
            this.dialogo = false;
            this.switch1 = false;
            this.interuptor2 = false;
        },
        cancelar2() {
            this.dialogo2 = false;
            this.switch2 = false;
            this.interuptor3 = false;
            this.codigo = '';
            this.seleccion2 = '';
            this.ubicacionInicial = '';
            this.ubicacionDestino = '';
        },
        cambiarUbicacionPlanta() {
            //   console.log(this.codigoqr);
            //    console.log(this.seleccion);

            axios.get('http://localhost:12590/api/tucann/proPlanta/findbyQR/' + this.codigoqr, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosPlanta = res.data;
                    // console.log(this.seleccion);
                    // console.log(res.data[0].idPlanta);
                    //  console.log(this.elementosPlanta[0].proTipoPlanta.idTipoPlanta);

                    let json = {
                        idPlanta: this.elementosPlanta[0].idPlanta,
                        codigoQR: this.elementosPlanta[0].codigoQR,
                        porcentajeThcPlanta: this.elementosPlanta[0].porcentajeThcPlanta,
                        porcentajeCbdPlanta: this.elementosPlanta[0].porcentajeCbdPlanta,
                        numeroBandeja: this.elementosPlanta[0].numeroBandeja,

                        proTipoPlanta: {
                            idTipoPlanta: this.elementosPlanta[0].proTipoPlanta.idTipoPlanta,

                        },
                        proEstadoPlanta: {
                            idEstadoPlanta: this.elementosPlanta[0].proEstadoPlanta.idEstadoPlanta,

                        },
                        proUbicacion: {
                            idUbicacion: this.seleccion,

                        },
                        proSemilla: {
                            codigoSemilla: this.elementosPlanta[0].proSemilla.codigoSemilla,
                        }

                    }

                    //     console.log(json);

                    axios.put('http://localhost:12590/api/tucann/proPlanta/', json, {
                            headers: generalHeader()
                        })
                        .then(res => {
                            // console.log(res)
                            this.dialogo = false;
                            this.mensajecambio = 'La planta \"' + this.codigoqr + '\" ha sido cambiado a la ubicación ' + this.seleccion;
                            this.correcto = true;
                            this.codigoqr = '';
                            this.encender(2);
                            this.switch1 = false;

                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
                .catch(err => {
                    console.error(err);
                })

        },
        async cambiarUbicacionPlantaxid(seleccion2, codigo) {

            if (seleccion2 == '') {
                this.$fire({
                    title: '<strong class="u">Ups!</strong>',
                    html: '<spam class="u">El campo ubicación destino debe contener una ubicación válida!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',

                }).then(r => {
                    // console.log(r);
                });

            } else {

                try {

                    let api1, api2;

                    api1 = 'http://localhost:12590/api/tucann/proPlanta/' + codigo;
                    api2 = 'http://localhost:12590/api/tucann/proUbicacion/' + seleccion2;
                    const requestOne = await axios.get(api1, {
                        headers: generalHeader()
                    });
                    const requestTwo = await axios.get(api2, {
                        headers: generalHeader()
                    });

                    axios.all([requestOne, requestTwo])
                        .then(axios.spread((res1, res2) => {

                            this.ubicacionInicial = res1.data.proUbicacion.idUbicacion;
                            this.ubicacionDestino = res2.data.idUbicacion;

                            console.log(this.ubicacionInicial);
                            console.log(this.ubicacionDestino);

                            if (res2.data.proEstadoUbicacion.idEstadoUbicacion == 1 && res2.data.proTipoUbicacion.idTipoUbicacion == 4) {
                                //   axios.get('http://localhost:12590/api/tucann/proPlanta/' + codigo)
                                ///       .then(res => {
                                //    this.elementosPlanta = res.data;
                                // console.log(res.data);
                                // console.log(res.data[0].idPlanta);
                                //   console.log(this.elementosPlanta[0].proTipoPlanta.idTipoPlanta);
                                //  console.log(res.data);

                                let json = {
                                    idPlanta: res1.data.idPlanta,
                                    codigoQR: res1.data.codigoQR,
                                    porcentajeThcPlanta: res1.data.porcentajeThcPlanta,
                                    porcentajeCbdPlanta: res1.data.porcentajeCbdPlanta,
                                    numeroBandeja: res1.data.numeroBandeja,

                                    proTipoPlanta: {
                                        idTipoPlanta: res1.data.proTipoPlanta.idTipoPlanta,

                                    },
                                    proEstadoPlanta: {
                                        idEstadoPlanta: res1.data.proEstadoPlanta.idEstadoPlanta,

                                    },
                                    proUbicacion: {
                                        idUbicacion: seleccion2,

                                    },
                                    proRegistroSiembra: {
                                        idRegistroSiembra: res1.data.proRegistroSiembra.idRegistroSiembra,
                                    }

                                }

                                //  console.log(json);

                                axios.put('http://localhost:12590/api/tucann/proPlanta/', json, {
                                        headers: generalHeader()
                                    })
                                    .then(res => {
                                        // console.log(res)
                                        this.dialogo2 = false;
                                        // this.mensajecambio2 = 'La planta \"' + this.codigo + '\" ha sido cambiado a la ubicación ' + this.seleccion2;
                                        // this.correcto2 = true;

                                        this.codigo = '';
                                        this.encender2(2);
                                        this.switch2 = false;

                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })
                                //    })
                                //    .catch(err => {
                                //      console.error(err);
                                //    })

                                let api11, api22;

                                api11 = 'http://localhost:12590/api/tucann/proUbicacion/' + this.ubicacionInicial;
                                api22 = 'http://localhost:12590/api/tucann/proUbicacion/' + this.ubicacionDestino;
                                const requestThree = axios.get(api11, {
                                    headers: generalHeader()
                                });
                                const requestFour = axios.get(api22, {
                                    headers: generalHeader()
                                });

                                axios.all([requestThree, requestFour])
                                    .then(axios.spread((res11, res22) => {

                                        //  console.log(res11.data);
                                        //  console.log(res22.data);

                                        let json1 = {
                                            idUbicacion: res11.data.idUbicacion,
                                            ubiPrimeraParte: res11.data.ubiPrimeraParte,
                                            ubiSegundaParte: res11.data.ubiSegundaParte,
                                            ubiTerceraParte: res11.data.ubiTerceraParte,
                                            proEstadoUbicacion: {
                                                idEstadoUbicacion: 1,

                                            },
                                            proTipoUbicacion: {
                                                idTipoUbicacion: res11.data.proTipoUbicacion.idTipoUbicacion,
                                                nombreTipoUbicacion: res11.data.proTipoUbicacion.nombreTipoUbicacion,
                                            }
                                        }
                                        console.log(json1);

                                        axios.put('http://localhost:12590/api/tucann/proUbicacion/', json1)
                                            .then(res => {
                                                //console.log(res)
                                            })
                                            .catch(err => {
                                                console.error(err);
                                            })

                                        let json2 = {
                                            idUbicacion: res22.data.idUbicacion,
                                            ubiPrimeraParte: res22.data.ubiPrimeraParte,
                                            ubiSegundaParte: res22.data.ubiSegundaParte,
                                            ubiTerceraParte: res22.data.ubiTerceraParte,
                                            proEstadoUbicacion: {
                                                idEstadoUbicacion: 2,

                                            },
                                            proTipoUbicacion: {
                                                idTipoUbicacion: res22.data.proTipoUbicacion.idTipoUbicacion,
                                                nombreTipoUbicacion: res22.data.proTipoUbicacion.nombreTipoUbicacion,
                                            }
                                        }

                                        console.log(json2);
                                        axios.put('http://localhost:12590/api/tucann/proUbicacion/', json2, {
                                                headers: generalHeader()
                                            })
                                            .then(res => {
                                                // console.log(res)
                                            })
                                            .catch(err => {
                                                console.error(err);
                                            })

                                    }))
                            } else if ((res2.data.proEstadoUbicacion.idEstadoUbicacion == 2 || res2.data.proEstadoUbicacion.idEstadoUbicacion == 3) && res2.data.proTipoUbicacion.idTipoUbicacion == 4) {

                                this.$fire({
                                    title: '<strong class="u">Ups!</strong>',
                                    html: '<spam class="u">La ubicación de destino está en uso!</spam>',
                                    type: "error",
                                    timer: 4000,
                                    confirmButtonText: '<spam class="u" >OK</spam>',
                                    confirmButtonColor: '#4CAF50',

                                }).then(r => {
                                    // console.log(r);
                                });

                            } else if ((res2.data.proEstadoUbicacion.idEstadoUbicacion == 2 || res2.data.proEstadoUbicacion.idEstadoUbicacion == 3) && res2.data.proTipoUbicacion.idTipoUbicacion == 3) {
                                this.$fire({
                                    title: '<strong class="u">Ups!</strong>',
                                    html: '<spam class="u">La ubicación &nbsp; &quot; </spam>' + seleccion2 + '<spam class="u">&quot; &nbsp; esta ocupada!</spam>',
                                    type: "error",
                                    timer: 4000,
                                    confirmButtonText: '<spam class="u" >OK</spam>',
                                    confirmButtonColor: '#4CAF50',

                                }).then(r => {
                                    // console.log(r);
                                });

                            } else if ((res2.data.proEstadoUbicacion.idEstadoUbicacion == 1) && res2.data.proTipoUbicacion.idTipoUbicacion != 4) {
                                this.$fire({
                                    title: '<strong class="u">Ups!</strong>',
                                    html: '<spam class="u">Debe cambiar de ubicación de una bandeja a un pote para que la acción pueda ejecutarse!</spam>',
                                    type: "error",
                                    timer: 5000,
                                    confirmButtonText: '<spam class="u" >OK</spam>',
                                    confirmButtonColor: '#4CAF50',

                                }).then(r => {
                                    // console.log(r);
                                });
                            }

                        }))

                } catch (error) {

                } finally {
                    this.$fire({
                        title: '<strong class="u">Excelente!</strong>',
                        html: '<spam class="u">La planta </spam>' + this.codigo + '<spam class="u"> ha sido cambiado a la ubicación : </spam>' + this.seleccion2,
                        type: "success",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',

                    }).then(r => {
                        // console.log(r);
                    });
                }

            }

        },
    },
}
</script>

<style>
.u {
    /*font-style: italic;*/
    font-family: Roboto, sans-serif;
}
</style>
