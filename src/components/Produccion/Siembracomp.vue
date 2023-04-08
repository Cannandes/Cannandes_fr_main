<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg10>
                <!--  <h1>SIEMBRA</h1>-->
                <v-card elevation-15>
                    <v-card-title class="success white--text">
                        <v-icon color="analogo3">mdi-seed-outline </v-icon> &nbsp; <h2>Siembra de semillas</h2>

                        <!--////////////////////////////////////// alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Selecciona el <strong>número de bandeja,</strong> la <strong>cantidad a sembrar</strong> y luego la <strong>variedad</strong> de semilla.
                            </v-alert>
                        </v-card-text>

                        <!--////////////////////////////////////// fin alerta -->
                        <!--
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2><strong>Sembrar</strong></h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-alert type="success" dense>
                                        Ingresa la semilla o semillas a sembrar , no olvides darle una ubicación.
                                    </v-alert>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels> -->

                    </v-card-title>
                    <v-card-text>
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                                <!--////////////////////////////////////// CAbecera 1 -->
                                <v-stepper-step :complete="e1 > 1" step="1">
                                    Siembra
                                </v-stepper-step>
                                <v-divider></v-divider>
                                <!--////////////////////////////////////// Cabecera 2 -->
                                <!--
                                <v-stepper-step :complete="e1 > 2" step="2">
                                    Ubicación
                                </v-stepper-step>
                                <v-divider></v-divider>-->
                                <!--////////////////////////////////////// Cabecera 3 -->
                                <v-stepper-step step="2">
                                    Listo
                                </v-stepper-step>

                            </v-stepper-header>
                            <!--///////////////////////////////////////////////////////////////////////////////// ITEMS o formularios del paso 1 -->
                            <v-stepper-items>
                                <v-stepper-content step="1">
                                    <v-form v-on:submit.prevent="crearPlantas">

                                        <v-card>
                                            <v-card-text></v-card-text>
                                            <v-card-text>
                                                <v-layout row wrap>
                                                    <v-flex sm12 md4 lg4 xl12>

                                                        <v-text-field type="number" label="N° Bandeja" v-model="numBandeja" append-icon="qr_code_scanner" class="mr-5">

                                                        </v-text-field>
                                                    </v-flex>

                                                    <v-spacer></v-spacer>

                                                    <v-flex sm12 md8 lg8 xl12>
                                                        <v-slider v-model="slider" class="align-center mt-5" :max="max" :min="min" hide-details label="Cantidad" mt-5 thumb-label="always">
                                                            <template v-slot:append>
                                                                <v-text-field v-model="slider" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                                                            </template>
                                                        </v-slider>

                                                    </v-flex>
                                                </v-layout>

                                            </v-card-text>

                                            <v-card-text>

                                                <v-layout>
                                                    <v-flex sm12 mx-auto>
                                                        <!-- <v-select v-model="select" :hint="`${select.value}, ${select.text}`" :items="items" item-text="text" item-value="value" label="Select" persistent-hint return-object single-line></v-select>-->
                                                        <v-select v-model="select" item-text="nombreVariedadSemilla" item-value="codigoSemilla" label="Variedad de semilla.." :items="elementosSemilla"></v-select>
                                                    </v-flex>
                                                </v-layout>

                                            </v-card-text>

                                            <v-card-actions>
                                                <v-btn color="primary" @click="e1 = 2,crearPlanta(numBandeja,slider,select)">
                                                    <v-icon left>
                                                        yard
                                                    </v-icon>
                                                    Crear plantas
                                                </v-btn>
                                            </v-card-actions>

                                            <!--
                                    <v-btn text>
                                        Cancel
                                    </v-btn>-->
                                        </v-card>
                                    </v-form>
                                </v-stepper-content>
                            </v-stepper-items>

                            <!--////////////////////////////////////////////////////////////////////////////////////////////////////// Items o formularios del paso 2 -->
                            <!--   <v-stepper-items>
                                <v-stepper-content step="2">

                                    <v-card>

                                        <v-card-title>Ubicacion</v-card-title>
                                        <v-card-text>
                                            <v-btn @click="listarPlantasBandeja()">
                                                <v-icon left>list</v-icon>Listar
                                            </v-btn>
                                        </v-card-text>
                                        <v-card-text>
                                            <v-data-table :headers="titulosPlanta" :items="elementosPlanta" :items-per-page="5" class="elevation-1">
                                                <template v-slot:item="{ item }">
                                                    <tr>

                                                        <td>{{item.idPlanta}}</td>
                                                        <td>{{item.proSemilla.nombreVariedadSemilla}}</td>
                                                        <td>{{item.numeroBandeja}}</td>
                                                        <td>
                                                            <v-btn icon color="info">
                                                                <v-icon info large>edit_location</v-icon>

                                                            </v-btn>
                                                            <v-btn icon large color="error">
                                                                <v-icon>delete</v-icon>
                                                            </v-btn>

                                                        </td>
                                                    </tr>

                                                </template>

                                            </v-data-table>
                                        </v-card-text>

                                        <v-btn color="primary" @click="e1 = 3">
                                            <v-icon left>
                                                yard
                                            </v-icon>
                                            Crear plantas
                                        </v-btn>
                                    </v-card>

                                </v-stepper-content>
                            </v-stepper-items>-->
                            <!--//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Items o formularios del paso 3 -->
                            <v-stepper-items>
                                <v-stepper-content step="2">

                                    <v-card>
                                        <v-layout wrap>
                                            <v-flex sm12 mx-auto>
                                                <v-container grid-list-sm>
                                                    <v-card mx-auto color="success" dark elevation="10">
                                                        <v-card-title>Detalle</v-card-title>
                                                        <v-card-text>
                                                            {{ this.mensaje }}
                                                        </v-card-text>

                                                    </v-card>

                                                </v-container>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex>
                                                <v-card>

                                                    <v-card-text>
                                                        <v-btn color="success" @click="listarPlantasBandeja()">
                                                            <v-icon left>list</v-icon>Listar siembra
                                                        </v-btn>
                                                    </v-card-text>
                                                    <v-card-text>
                                                        <v-data-table :headers="titulosPlanta" :items="elementosPlanta" :items-per-page="5" class="elevation-1">
                                                            <template v-slot:item="{ item }">
                                                                <tr>

                                                                    <td>{{item.idPlanta}}</td>
                                                                    <td></td>
                                                                    <!--<td>{{item.proRegistroSiembra.proSemilla.nombreVariedadSemilla}}</td>-->
                                                                    <td>{{item.numeroBandeja}}</td>
                                                                    <!--    <td>{{item.codigoQR}}</td>
                                                                     <td>
                                                                        <v-icon large>qr_code_2</v-icon>
                                                                    </td>-->
                                                                    <td>
                                                                        <v-btn icon>
                                                                            <v-icon color="red">qr_code_2</v-icon>
                                                                        </v-btn>
                                                                    </td>
                                                                    <!--  <td>
                                                                        <vue-qrcode v-bind:value="item.codigoQR"></vue-qrcode>
                                                                    </td>-->

                                                                    <td>
                                                                        <!--  <v-btn icon color="info" @click="mostrarPlanta(item.idPlanta,item.proSemilla.nombreVariedadSemilla,item.numeroBandeja,item.codigoQR) ">
                                                                            <v-icon info fab>visibility</v-icon>

                                                                        </v-btn>-->
                                                                        <div v-if="item.estadoActividad== false">
                                                                            <v-icon>yard</v-icon>

                                                                        </div>
                                                                        <v-btn icon color="info" @click="actividadSiembra(item.idPlanta),mensajerespuesta()">
                                                                            <v-icon size="28">mdi-sprout</v-icon>
                                                                        </v-btn>
                                                                        &nbsp;&nbsp;
                                                                        <v-btn icon color="error" @click="eliminarUnaPlanta(item.idPlanta),mensajerespuesta()">
                                                                            <v-icon size="28">delete</v-icon>
                                                                        </v-btn>

                                                                    </td>
                                                                </tr>

                                                            </template>

                                                        </v-data-table>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>

                                        <v-card-actions>
                                            <v-btn color="primary" @click="e1 = 1,encerarDatos()">
                                                <v-icon left>
                                                    grid_on
                                                </v-icon>
                                                Seguir sembrando
                                            </v-btn>

                                        </v-card-actions>

                                        <v-snackbar v-model="notificacion">
                                            {{ mensajeNotificacion }}

                                            <template v-slot:action="{ attrs }">
                                                <v-btn color="success" text v-bind="attrs" @click="notificacion = false">
                                                    Cerrar
                                                </v-btn>
                                            </template>
                                        </v-snackbar>
                                    </v-card>

                                </v-stepper-content>
                            </v-stepper-items>

                        </v-stepper>

                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
    <v-divider success class="mt-3" light></v-divider>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import {
    v4 as uuidv4
} from 'uuid' // Import uuid  
import axios from "axios";
import {
    json
} from 'body-parser';

export default {
    name: 'Siembraform',

    components: {

    },
    directives: {},
    created() {
        axios
            .get('http://localhost:12590/api/tucann/proSemilla',{
                        headers: generalHeader()
                    })
            .then(res => {
                this.elementosSemilla = res.data;
                //console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    },
    data() {
        return {
            e1: 1,
            min: 0,
            max: 50,
            slider: 0,
            ss: '',
            //  items: [{text:'SA-01', value:'a' } , {text:'SA-02', value:'b' }],
            //mensaje respuesta

            notificacion: false,
            mensajeNotificacion: '',

            alert: false,
            numBandeja: '',
            mensaje: '',
            select: '',

            //     select: {
            //         text: '-',
            //         value: '-'
            //     },

            idPlanta: '',
            codigoQR: '',
            porcentajeThcPlanta: '',
            porcentajeCbdPlanta: '',
            numeroBandeja: '',
            clasificacionA: '',
            clasificacionB: '',
            clasificacionC: '',
            clasificacionD: '',
            lotePlanta: '',
            idPlantaMadre: '',
            idTipoPlanta: '',
            idEstadoPlanta: '',
            idUbicacion: '',
            codigoSemilla: '',
            idEstadoSemilla: '',

            ubicacionprincipal: '0000000001', /////ubicacion principal

            titulosPlanta: [{
                    text: "ID",
                    align: "start",
                    //  sortable: false,
                    value: "idPlanta"
                },
                {
                    text: "Semilla",
                    value: "proSemilla.nombreVariedadSemilla",
                    sortable: false,
                },
                {
                    text: "N° bandeja",
                    value: "numeroBandeja",
                    sortable: false,
                },
                {
                    text: "Qr",
                    value: "codigoQR",
                    sortable: false,
                },
                {
                    text: "Acciones",
                    value: "",
                    sortable: false,
                }

            ],

            ////////////////////////////////////////// PLANTA
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

                lotePlanta: '',

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
            ////elementos semilla
            elementosSemilla: [{
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
            }],

        };
    },
    mounted() {

    },
    computed: {
        /* traerSemillas() {
              return Object.values(this.semillas);
          },*/
    },
    methods: {
        /*
// plantas sembradas en la ubicacion 000000001
        listarPlantasSembradas() {
            // console.log(this.semillas);
            axios.get('http://localhost:12590/api/tucann/proPlanta/xubi/' + this.ubicacionprincipal)
                .then(res => {
                    //console.log(res)        
                    this.elementosPlanta = res.data;

                })
                .catch(err => {
                    console.error(err);
                })
        },*/
        listarPlantasBandeja() {
            // console.log(this.semillas);
            let bandeja = this.numBandeja;
            axios.get('http://localhost:12590/api/tucann/proPlanta/xband/' + bandeja,{
                        headers: generalHeader()
                    })
                .then(res => {
                    //console.log(res)        
                    this.elementosPlanta = res.data;
                    this.mensaje = 'Se han sembrado  ' + this.slider + ' plantas en la bandeja  ' + this.numBandeja + ' de la semilla  ' + this.select + ' .';

                })
                .catch(err => {
                    console.error(err);
                })
        },
        encerarDatos() {
            this.slider = 0;
            this.numBandeja = '';
            this.select = '';

        },
        mensajerespuesta(a) {
            this.alertaMensaje = true;
        },

        listarSemillas() {
            axios.get('http://localhost:12590/api/tucann/proSemilla',{
                        headers: generalHeader()
                    })
                .then(res => {
                    // 
                    this.elementosSemilla = res.data;
                    // console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                })
        },

        eliminarUnaPlanta(a) {

            axios.delete('http://localhost:12590/api/tucann/proPlanta/' + a,{
                        headers: generalHeader()
                    })
                .then(res => {
                    console.log(res.data);
                    this.mensajeNotificacion = "Planta " + a + " eliminada.";
                    this.notificacion = true;
                    this.listarPlantasBandeja();
                })
                .catch(err => {
                    console.error(err);
                })

        },
        crearPlanta(a, b, c) {

            if (a == '') {
                alert("Debes seleccionar una bandeja.");
                this.e1 = 1;

            } else if (b == 0) {
                alert("Debes sembrar por lo menos 1 semilla..");
                this.e1 = 1;
            } else if (c == '') {
                alert("Selecciona una semilla..");
                this.e1 = 1;
            } else {

                //    console.log(typeof this.select);
                for (let index = 0; index < this.slider; index++) {
                    // const element = array[index];
                    //  console.log(this.select.value);
                    //  console.log(this.numBandeja);

                    let json = {

                        idPlanta: 0,
                        codigoQR: uuidv4(),

                        porcentajeThcPlanta: 0,
                        porcentajeCbdPlanta: 0,
                        numeroBandeja: this.numBandeja,
                        clasificacionA: 0,
                        clasificacionB: 0,
                        clasificacionC: 0,
                        clasificacionD: 0,
                        lotePlanta: '',

                        /////// funcion recursiva para la planta madre
                        /*   proPlanta: {
                                idPlanta: 0,
                            },*/

                        proTipoPlanta: {
                            idTipoPlanta: 1,

                        },
                        proEstadoPlanta: {
                            idEstadoPlanta: 4,
                        },
                        proUbicacion: {
                            idUbicacion: "000000001",

                        },
                        proSemilla: {
                            codigoSemilla: this.select,

                        }
                    }

                    axios.post('http://localhost:12590/api/tucann/proPlanta/', json,{
                        headers: generalHeader()
                    })
                        .then(res => {

                        })
                        .catch(err => {
                            console.error(err);
                        })
                }
            }

        },
        actividadSiembra(a) {
            //  console.log(a);

            if (a == '') {
                alerta("NO existe registro!!");

            } else {

                /*   for (let index = 0; index < 2; index++) {
                       if (index == 0) {
                           let json = {

                               idPlantaActividad: '',
                               fechaPlantaActividad: '',
                               estadoActividad: true,
                               proActividad: {
                                   idActividad: 1,

                               },
                               proPlanta: {
                                   idPlanta: a,

                               }
                           }
                           // console.log(json);
                           axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json)
                               .then(res => {
                                   // console.log(res);

                                   this.mensajeNotificacion = "Se registro la siembra de la planta " + a;
                                   this.notificacion = true;
                               })
                               .catch(err => {
                                   console.error(err);
                               })

                       }
                       if (index == 1) {
                           let json = {

                               idPlantaActividad: '',
                               fechaPlantaActividad: '',
                               estadoActividad: false,
                               proActividad: {
                                   idActividad: 2,

                               },
                               proPlanta: {
                                   idPlanta: a,

                               }
                           }
                           // console.log(json);
                           axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json)
                               .then(res => {
                                   // console.log(res);

                                   this.mensajeNotificacion = "Se registro la siembra de la planta " + a;
                                   this.notificacion = true;
                               })
                               .catch(err => {
                                   console.error(err);
                               })

                       }
                   }*/

                let json = {

                    idPlantaActividad: '',
                    fechaPlantaActividad: '',
                    estadoActividad: false,
                    proActividad: {
                        idActividad: 1,

                    },
                    proPlanta: {
                        idPlanta: a,

                    }
                }
                // console.log(json);
                axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json,{
                        headers: generalHeader()
                    })
                    .then(res => {
                        // console.log(res);
                        this.cambiarestadoplanta(a);
                        this.mensajeNotificacion = "Se registro la siembra de la planta " + a;
                        this.notificacion = true;
                        this.listarPlantasBandeja();

                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        },
        cambiarestadoplanta(a) {
            axios.get('http://localhost:12590/api/tucann/proPlanta/' + a,{
                        headers: generalHeader()
                    })
                .then(res => {
                    console.log(res.data);
                    //console.log( res.data.idPlanta);
                    //console.log(res.data.proPlanta);

                    let json = {

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
                        proPlanta: res.data.proPlanta,

                        proTipoPlanta: {
                            idTipoPlanta: res.data.proTipoPlanta.idTipoPlanta,
                        },
                        proEstadoPlanta: {
                            idEstadoPlanta: 1,
                        },
                        proUbicacion: {
                            idUbicacion: res.data.proUbicacion.idUbicacion,
                        },
                        proSemilla: {
                            codigoSemilla: res.data.proSemilla.codigoSemilla,
                        }
                    }

                    // console.log(json);        

                    axios.put('http://localhost:12590/api/tucann/proPlanta/', json,{
                        headers: generalHeader()
                    })
                        .then(res => {
                            this.listarPlantasBandeja();

                        })
                        .catch(err => {
                            console.error(err);
                        })

                })
                .catch(err => {
                    console.error(err);
                })

        },
        fechahoy() {
            var f = new Date();
            var g = f.getFullYear();
            var h = f.getMonth() + 1;
            var i = f.getDate();
            var z = '',
                w = '';
            if (h < 10) {
                h.toString();
                z = ('0' + h);
            } else {
                z = f.getMonth();
            }
            if (i < 10) {
                i.toString();
                w = '0' + i;
            } else {
                w = i;
            }
            var j = f.getFullYear() + "-" + z + "-" + i;
            // console.log(j);
            return j;
        },
    }
};
</script>
