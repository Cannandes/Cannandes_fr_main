<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg12>
                <!--  <h1>SIEMBRA</h1>-->
                <v-card elevation-15>
                    <v-card-title class="success white--text">
                        <v-icon dark x-large color="analogo4" left>mdi-flower-tulip-outline </v-icon>

                        <v-toolbar-title>
                            <h2>Seleccionar planta madre</h2>
                        </v-toolbar-title>
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>

                            <v-alert :value="alert" color="error" dark border="top" transition="scale-transition" elevation="20">
                                Debes cambiar el estado de una planta de : <v-chip small label color="white" text-color="error"><strong> Planta común </strong>&nbsp;&nbsp;<v-icon size="17">mdi-flower-tulip-outline</v-icon>
                                </v-chip> a <v-chip small label color="white" text-color="error"><strong>Planta Madre</strong> &nbsp;&nbsp;<v-icon size="25">mdi-flower-outline</v-icon>
                                </v-chip> utilizando el codigo <v-chip small label color="white" text-color="error"> <strong> QR </strong>&nbsp;&nbsp;<v-icon size="17">qr_code</v-icon>
                                </v-chip> o por su <v-chip small label color="white" text-color="error"><strong>ID</strong> &nbsp;&nbsp;<v-icon size="25">pin</v-icon>
                                </v-chip>

                            </v-alert>
                        </v-card-text><!-- fin alerta -->

                    </v-card-title>

                    <!--////////////////////////////////////     CAMBIO DE TIPO DE PLANTA  //////////////////////////////////-->

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
                                                <div v-else>
                                                    <v-icon large>qr_code</v-icon>
                                                </div>

                                            </v-tab>
                                        </v-tabs>
                                    </template>
                                </v-toolbar>
                                <v-tabs-items v-model="tabs">
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>

                                            <v-card-actions>
                                                <v-layout wrap row>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field type="number" append-icon="mdi-arrow-right-bold" class="mr-5 ml-5" v-model="idPlanta" label="ID Planta" autofocus v-on:keyup.enter="revisarPlanta(idPlanta)">

                                                        </v-text-field>
                                                    </v-flex>

                                                    <v-flex sm12 md6 lg6>
                                                        <v-switch v-model="switch1" inset @click="aparecedialogo()" label="Seleccionar" :disabled="!interuptor1">
                                                        </v-switch>

                                                    </v-flex>

                                                </v-layout>
                                            </v-card-actions>

                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card-text></v-card-text>
                                        <v-card flat color="green lighten-5">
                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field type="text" append-icon="mdi-arrow-right-bold" class="mr-5 ml-5" v-model="idPlantaqr" label="Código QR" autofocus v-on:keyup.enter="revisarPlantaxqr(idPlantaqr)">

                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex sm12 md6 lg6>
                                                        <!-- <v-text-field label="Ubicar en.." class="ml-2" append-icon="mdi-arrow-down-bold"></v-text-field>
                                                        <v-switch v-model="switch1" inset  @click="escribir(switch1)" :label="`Respuesta: ${switch1.toString()} `">-->
                                                        <v-switch v-model="switch2" inset @click="aparecedialogo2()" label="Seleccionar" :disabled="!interuptor2">
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
    <form v-on:submit.prevent="cambiarTipoPlantaxid">
        <v-dialog v-model="dialog" width="500" persistent>
            <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="yellow">mdi-flower-tulip-outline</v-icon>
                    &nbsp;Marcar como planta madre
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>
                <v-card-text>
                    <v-alert border="left" colored-border color="success accent-4" elevation="2">
                        La planta <v-chip label color="success"> {{this.idPlanta}} </v-chip> se marcará como planta madre.
                        <p>Y el prefijo que se usará para la clonación es <v-chip label color="success"> {{ prefijoLoteClonacion}}</v-chip>
                        </p>
                    </v-alert>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="dialog=false,cancelar1()">
                        Cancelar
                    </v-btn>
                    <v-btn color="success" @click="cambiarTipoPlantaxid(idPlanta)">
                        Marcar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
    <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
    <form v-on:submit.prevent="cambiarTipoPlantaxqr">
        <v-dialog v-model="dialog2" width="500" persistent>
            <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="yellow">mdi-flower-tulip-outline</v-icon>
                    &nbsp;Marcar como planta madre
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>
                <v-card-text>
                    <v-alert border="left" colored-border color="error accent-4" elevation="2">
                        La planta <v-chip label color="success">{{this.idPlantaqr}} </v-chip> se marcará como planta madre.
                    </v-alert>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="dialog2=false,cancelar2()">
                        Cancelar
                    </v-btn>
                    <v-btn color="success" @click="cambiarTipoPlantaxqr(idPlantaqr)">
                        Marcar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
    <div>
        <v-snackbar v-model="correcto">
            {{ mensajeCorrecto }}
            <template v-slot:action="{ attrs }">
                <v-btn color="primary" text v-bind="attrs" @click="correcto = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import plantaService from '@/services/produccion/planta.service.js'
import axios from 'axios'
export default {
    data() {
        return {
            alert: false,
            switch1: '',
            dialog: false,
            dialog2: false,
            tabs: null,
            //borrar
            codigoqr: '',
            idplanta: '',
            seleccion: '',
            //////////////
            interuptor1: false,
            interuptor2: false,
            switch2: '',
            /////////////////
            correcto: false,
            mensajeCorrecto: '',
            variablerevisionActProduccion: '',
            prefijoLoteClonacion: '',
            prefijoPlantaFinal: '',
            //////////////
            idPlanta: '',
            idPlantaqr: '',
            codigoQR: '',
            porcentajeThcPlanta: '',
            porcentajeCbdPlanta: '',
            numeroBandeja: '',
            clasificacionA: '',
            clasificacionB: '',
            clasificacionC: '',
            clasificacionD: '',
            idTipoPlanta: '',
            nombreTipoPlanta: '',
            detalleTipoPlanta: '',
            idEstadoPlanta: '',
            nombreEstadoPlanta: '',
            detalleEstadoPlanta: '',
            idUbicacion: '',
            estadoUbicacion: '',
            proTipoUbicacion: '',
            idTipoUbicacion: '',
            nombreTipoUbicacion: '',
            proPlantaActividad: [],

            elementosPlanta: [{

                    idPlanta: '',
                    codigoQR: '',
                    porcentajeThcPlanta: '',
                    porcentajeCbdPlanta: '',
                    numeroBandeja: '',
                    clasificacionA: '',
                    clasificacionB: '',
                    clasificacionC: '',
                    clasificacionD: '',
                    proPlanta: '',
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
                        proTipoUbicacion: '',
                        idTipoUbicacion: '',
                        nombreTipoUbicacion: ''
                    },
                    proRegistroSiembra: {
                        idRegistroSiembra: '',
                    }
                }

            ],

        }
    },
    methods: {
        escribir(switch1) {
            if (switch1) {
                //  this.dialog = true;
                if (res.status == 200) {
                    this.elementosPlanta = res.data;
                    if (this.elementosPlanta.proTipoPlanta.nombreTipoPlanta == 'Madre') {
                        this.encerar();
                        alert("Esta planta ya es de tipo \"Planta Madre\"  ");
                    } else {
                        alert(" \"NO EXISTE\"  ");
                    }
                }
            }
        },
        async nuevoPrefijoPlantaMadre() {
            this.prefijoLoteClonacion = '';
            //   this.prefijoPlantaFinal = '';
            try {
                await axios.get('http://localhost:12590/api/tucann/proPrefijoPlantaClonada/', {
                        headers: generalHeader()
                    })
                    .then(res => {

                        let a = res.data[0].detallePrefijoPlantaClonada[0];
                        let b = res.data[0].detallePrefijoPlantaClonada[1];
                        let c = res.data[0].detallePrefijoPlantaClonada[2];
                        // let prefijoLoteClonacion = '';

                        var ascii_code_a = a.charCodeAt(0);
                        var ascii_code_b = b.charCodeAt(0);
                        var ascii_code_c = c.charCodeAt(0);

                        ascii_code_c = ascii_code_c + 1;
                        if (ascii_code_c > 90) {
                            ascii_code_a = ascii_code_a;
                            ascii_code_b++;
                            ascii_code_c = 65;
                        }
                        if (ascii_code_b > 90) {
                            ascii_code_a++;
                            ascii_code_b = 65;
                        }
                        if (ascii_code_a > 90) {
                            ascii_code_a = 65;
                            ascii_code_b = 65;
                            ascii_code_c = 65;
                        }

                        var r = ascii_code_a.toString();
                        var code_a = String.fromCodePoint(r);

                        var s = ascii_code_b.toString();
                        var code_b = String.fromCodePoint(s);

                        var t = ascii_code_c.toString();
                        var code_c = String.fromCodePoint(t);

                        this.prefijoLoteClonacion = code_a + code_b + code_c;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            }

        },

        async cambiarTipoPlantaxid(idPlanta) {

            await axios.get('http://localhost:12590/api/tucann/proPlanta/' + idPlanta, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosPlanta = res.data;
                    if (res.data.proPlanta != null) {
                        let plantaMadre = {
                            idPlanta: res.data.idPlanta,
                            codigoQR: res.data.codigoQR,
                            porcentajeThcPlanta: res.data.porcentajeThcPlanta,
                            porcentajeCbdPlanta: res.data.porcentajeCbdPlanta,
                            numeroBandeja: res.data.numeroBandeja,

                            clasificacionA: res.data.clasificacionA,
                            clasificacionB: res.data.clasificacionB,
                            clasificacionC: res.data.clasificacionC,
                            clasificacionD: res.data.clasificacionD,

                            lotePlanta: res.data.lotePlanta,
                            prefijoPlanta: this.prefijoLoteClonacion,

                            proPlanta: {
                                idPlanta: res.data.proPlanta.idPlanta,
                            },

                            proTipoPlanta: {
                                idTipoPlanta: 2,
                            },
                            proEstadoPlanta: {
                                idEstadoPlanta: res.data.proEstadoPlanta.idEstadoPlanta,
                            },
                            proUbicacion: {
                                idUbicacion: '0-0-0',
                            },
                            proRegistroSiembra: {
                                idRegistroSiembra: res.data.proRegistroSiembra.idRegistroSiembra,
                            }
                        }

                        this.resolverCambioMadre(plantaMadre)

                    } else {
                        let plantaMadre = {
                            idPlanta: res.data.idPlanta,
                            codigoQR: res.data.codigoQR,
                            porcentajeThcPlanta: res.data.porcentajeThcPlanta,
                            porcentajeCbdPlanta: res.data.porcentajeCbdPlanta,
                            numeroBandeja: res.data.numeroBandeja,

                            clasificacionA: res.data.clasificacionA,
                            clasificacionB: res.data.clasificacionB,
                            clasificacionC: res.data.clasificacionC,
                            clasificacionD: res.data.clasificacionD,

                            lotePlanta: res.data.lotePlanta,
                            prefijoPlanta: this.prefijoLoteClonacion,
                            /*   proPlanta: {
                                   idPlanta: res.data.proPlanta.idPlanta,
                               },*/
                            proTipoPlanta: {
                                idTipoPlanta: 2,
                            },
                            proEstadoPlanta: {
                                idEstadoPlanta: res.data.proEstadoPlanta.idEstadoPlanta,
                            },
                            proUbicacion: {
                                idUbicacion: '0-0-0',
                            },
                            proRegistroSiembra: {
                                idRegistroSiembra: res.data.proRegistroSiembra.idRegistroSiembra,
                            }
                        }

                        this.resolverCambioMadre(plantaMadre)

                    }

                })
                .catch(err => {
                    console.error(err);
                })

        },

        async resolverCambioMadre(plantaMadre) {
            try {
                await plantaService.actualizarPlanta(plantaMadre).then((resp) => {
                    if (resp.status == 200) {
                        this.dialog = false;
                        this.correcto = true;
                        this.mensajeCorrecto = 'La planta ' + this.idPlanta + ' ha sido marcada como planta Madre.';
                        this.idPlanta = '';
                        this.encender1(2);
                        this.switch1 = false;
                    } else {
                        alert("Error en datos de planta!!");
                    }

                }).catch(err => {
                    console.error(err);
                })

            } catch (error) {

            } finally {
                let prefijo = {
                    idPrefijoPlantaClonada: 1,
                    detallePrefijoPlantaClonada: this.prefijoLoteClonacion
                }
                axios.put('http://localhost:12590/api/tucann/proPrefijoPlantaClonada/', prefijo, {
                        headers: generalHeader()
                    })
                    .then(res => {

                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },

        cambiarTipoPlantaxqr(idPlantaqr) {
            axios.get('http://localhost:12590/api/tucann/proPlanta/findbyQR/' + idPlantaqr, {
                    headers: generalHeader()
                }).then(res => {
                    this.elementosPlanta = res.data;
                    let json = {
                        idPlanta: this.elementosPlanta[0].idPlanta,
                        codigoQR: this.elementosPlanta[0].codigoQR,
                        porcentajeThcPlanta: this.elementosPlanta[0].porcentajeThcPlanta,
                        porcentajeCbdPlanta: this.elementosPlanta[0].porcentajeCbdPlanta,
                        numeroBandeja: this.elementosPlanta[0].numeroBandeja,
                        clasificacionA: this.elementosPlanta[0].clasificacionA,
                        clasificacionB: this.elementosPlanta[0].clasificacionB,
                        clasificacionC: this.elementosPlanta[0].clasificacionC,
                        clasificacionD: this.elementosPlanta[0].clasificacionD,

                        proTipoPlanta: {
                            idTipoPlanta: 2,
                        },
                        proEstadoPlanta: {
                            idEstadoPlanta: this.elementosPlanta[0].proEstadoPlanta.idEstadoPlanta,
                        },
                        proUbicacion: {
                            idUbicacion: '0-0-0',
                        },
                        /*  proSemilla: {
                              codigoSemilla: this.elementosPlanta[0].proSemilla.codigoSemilla,
                          },*/
                        proRegistroSiembra: {
                            idRegistroSiembra: this.elementosPlanta[0].proRegistroSiembra.idRegistroSiembra,
                        }
                    }

                    axios.put('http://localhost:12590/api/tucann/proPlanta/', json, {
                            headers: generalHeader()
                        })
                        .then(res => {

                            this.dialog2 = false;
                            this.correcto = true;
                            this.mensajeCorrecto = 'La planta ' + this.idPlantaqr + ' Ha sido marcada como planta Madre.';
                            this.idPlanta = '';
                            this.encender2(2);
                            this.switch2 = false;

                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
                .catch(err => {
                    console.error(err);
                })
        },
        cancelar1() {

            this.switch1 = '';
            this.encender1(2);
            this.idPlanta = '';
            this.dialog = false;
        },
        cancelar2() {
            this.switch2 = '';
            this.encender2(2);
            this.idPlantaqr = '';
            this.dialog = false;
        },
        encender1(a) {
            if (a == 1) {
                this.interuptor1 = true;
            }
            if (a == 2) {
                this.interuptor1 = false;
            }
        },
        encender2(a) {

            if (a == 1) {
                this.interuptor2 = true;
            }

            if (a == 2) {
                this.interuptor2 = false;
            }
        },
        encerar() {
            this.idPlanta = '';
        },
        aparecedialogo() {
            this.dialog = true;
        },
        aparecedialogo2() {
            this.dialog2 = true;
        },

        async valorMaxActividad(idPlanta) {

            await axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xidp/' + idPlanta, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.proPlantaActividad = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

            const resultadosOrdenados = this.proPlantaActividad.sort((a, b) => {
                return Number.parseInt(b.proActividad.idActividad) - Number.parseInt(a.proActividad.idActividad)
            })
            return resultadosOrdenados[0].proActividad.idActividad;
        },

        async revisarPlanta(idPlanta) {

            if (idPlanta <= 0 || idPlanta == '') {
                //  alert("Valor no permitido!");
                this.idPlanta = '';
                this.$fire({
                    title: '<strong class="u">Oops!!</strong>',
                    html: '<spam class="u">Valor no permitido!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {});
                this.idPlanta = '';
            } else {
                await this.valorMaxActividad(idPlanta)
                    .then(resp => {
                        if (resp < 4) {
                            this.variablerevisionActProduccion = resp;
                            this.$fire({
                                title: '<strong class="u">Oops!!</strong>',
                                html: '<spam class="u">El estado de la planta ' + '<strong class="u">' + idPlanta + '</strong>' + '<spam class="u"> no le permite realizar esta transacción.!</spam>' + '<p class="u"> La planta debe estar en estado <strong> vegetativo </strong> !</p>',

                                type: "error",
                                timer: 5000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                            });
                            this.idPlanta = '';
                        } else {

                            axios.get('http://localhost:12590/api/tucann/proPlanta/' + idPlanta, {
                                    headers: generalHeader()
                                })
                                .then(res => {

                                    if (res.data.proEstadoPlanta.idEstadoPlanta == 5 || res.data.proEstadoPlanta.idEstadoPlanta == 3 || res.data.proEstadoPlanta.idEstadoPlanta == 2 || res.data.proEstadoPlanta.idEstadoPlanta == 4) {
                                        this.$fire({
                                            title: '<strong class="u">Oops!</strong>',
                                            html: '<spam class="u">El estado de la planta ' + '<strong class="u">' + this.idPlanta + '</strong>' + '<spam class="u"> no permite realizar esta acción!</spam>',
                                            type: "error",
                                            timer: 4000,
                                            confirmButtonText: '<spam class="u" >OK</spam>',
                                            confirmButtonColor: '#4CAF50',
                                        }).then(r => {

                                        });
                                        this.idPlanta = '';
                                        this.variablerevisionActProduccion = '';
                                    } else {
                                        if (res.data.proTipoPlanta.nombreTipoPlanta == 'Madre') {
                                            this.$fire({
                                                title: '<strong class="u">Oops!</strong>',
                                                html: '<spam class="u">La planta ' + '<strong class="u">' + +this.idPlanta + '</strong>' + '<spam class="u"> ya es una planta madre!</spam>',
                                                type: "error",
                                                timer: 4000,
                                                confirmButtonText: '<spam class="u" >OK</spam>',
                                                confirmButtonColor: '#4CAF50',
                                            }).then(r => {
           
                                            });
                                            // alert("La planta " + this.idPlanta + ' ya es una planta madre');
                                            this.idPlanta = '';
                                            this.variablerevisionActProduccion = '';
                                        } else if (res.status == 200) {
                                            this.$fire({
                                                title: '<strong class="u">Excelente!</strong>',
                                                html: '<spam class="u">La planta ' + '<strong class="u">' + this.idPlanta + '</strong>' + '<spam class="u"> si existe y puede ser una planta madre!</spam>',
                                                type: "success",
                                                timer: 4000,
                                                confirmButtonText: '<spam class="u" >OK</spam>',
                                                confirmButtonColor: '#4CAF50',
                                            }).then(r => {
                                            });
                                            this.nuevoPrefijoPlantaMadre();
                                            this.encender1(1);
                                        }
                                    }
                                })
                                .catch(err => {

                                    if (err) {

                                        this.$fire({
                                            title: '<strong class="u">Oops!!</strong>',
                                            html: '<spam class="u">El código ' + '<strong class="u">' + idPlanta + '</strong>' + '<spam class="u"> no existe!</spam>',
                                            type: "error",
                                            timer: 4000,
                                            confirmButtonText: '<spam class="u" >OK</spam>',
                                            confirmButtonColor: '#4CAF50',
                                        }).then(r => {
 
                                        });
                                        this.idPlanta = '';
                                    }
                                })
                        }

                    })
                    .catch(err => {
                  
                        if (err) {

                            this.idPlanta = '';
                            this.$fire({
                                title: '<strong class="u">Oops!!</strong>',
                                html: '<spam class="u">El código ' + '<strong class="u">' + idPlanta + '</strong>' + '<spam class="u"> no existe!</spam>',
                                type: "error",
                                timer: 4000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                  
                            });
                        }

                    })
            }

        },
        revisarPlantaxqr(idPlantaqr) {

            if (idPlantaqr <= 0 || idPlantaqr == '' || idPlantaqr.length != 36) {

                alert("Valor no permitido!");
                this.idPlantaqr = '';
            } else {

                axios.get('http://localhost:12590/api/tucann/proPlanta/findbyQR/' + idPlantaqr, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        if (res.data[0].proTipoPlanta.idTipoPlanta == 2) {
                            alert("La planta \"" + this.idPlantaqr + '\" ya es una planta madre');
                            this.idPlantaqr = '';
                        } else if (res.data.length > 0) {
                            alert("Esta planta si existe y puede ser una planta madre.");

                            this.encender2(1);
                        } else {
                            // alert('El código qr \"' + idPlantaqr + '\" de esta planta no existe.');
                            // this.idPlantaqr = '';
                        }

                    })
                    .catch(err => {
                        if (err) {
                            alert("El código \"" + idPlantaqr + "\" no existe");
                            this.idPlantaqr = '';
                        }
                    })
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
