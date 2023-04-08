<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg10>
                <v-card elevation-15>
                    <v-card-title class="success white--text">
                        <v-icon size="40" color="yellow">mdi-ruler</v-icon>
                        &nbsp;
                        <h2>Registro de Crecimiento</h2>
                        <v-spacer></v-spacer>
                        <!--////////////////////////////////////// alerta -->
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>
                            <v-alert :value="alert" color="error" dark border="top" transition="scale-transition" elevation="20">
                                Selecciona la <strong>planta</strong> a la que deseas registrar su crecimiento, luego ingresa el valor y guardalo. <br>
                                Esto podrá realizarce mediante : <br><br>
                                <ol>
                                    <li>
                                        El <v-chip small label color="white" text-color="error"><strong>lote</strong></v-chip> de siembra <v-chip small label color="white" text-color="error">
                                            <v-icon>open_in_full</v-icon>
                                        </v-chip>
                                    </li>
                                    <br>
                                    <li>
                                        El <v-chip small label color="white" text-color="error"> <strong>ID</strong> </v-chip> de la planta <v-icon large error>pin</v-icon>
                                    </li>
                                    <br>
                                    <li>
                                        El número de <v-chip small label color="white" text-color="error"> <strong>Bandeja</strong> </v-chip> de la planta <v-chip small label color="white" text-color="error">
                                            <v-icon size="20" error>apps</v-icon>
                                        </v-chip>
                                    </li> <br>
                                    <li>
                                        El <v-chip small label color="white" text-color="error"> <strong>QR</strong> </v-chip> de la planta <v-chip small label color="white" text-color="error">
                                            <v-icon size="20" error>qr_code</v-icon>
                                        </v-chip>
                                    </li>
                                </ol>
                            </v-alert>
                        </v-card-text>
                    </v-card-title>
                    <v-divider horizontal red></v-divider>
                    <v-container success>
                        <template>
                            <v-card>
                                <v-toolbar flat>

                                    <v-spacer></v-spacer>

                                    <template v-slot:extension>
                                        <v-tabs v-model="tabs" fixed-tabs>
                                            <v-tab v-for="n in 4" :key="n">
                                                <div v-if="n==1">

                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon large v-bind="attrs" v-on="on">open_in_full</v-icon>
                                                        </template>
                                                        <span>Forma masiva</span>
                                                    </v-tooltip>
                                                </div>
                                                <div v-else-if="n==2">
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon large v-bind="attrs" v-on="on">pin</v-icon>
                                                        </template>
                                                        <span>Forma individual</span>
                                                    </v-tooltip>

                                                </div>

                                                <div v-else-if="n==3">
                                                    <v-icon large>apps</v-icon>
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
                                                <v-layout wrap>
                                                    <v-flex md3>

                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-autocomplete label="Lote de siembra.." :items="lotesSiembra" item-text="loteRegistroSiembra" item-value="loteRegistroSiembra" v-model="loteSiembraParaCrecimiento"></v-autocomplete>
                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-btn class="ml-3 mt-3 primary" @click="dialogoCreacimientoMasivo(loteSiembraParaCrecimiento)">
                                                            <v-icon>mdi-ruler</v-icon>
                                                        </v-btn>
                                                    </v-flex>
                                                    <v-flex md12>
                                                        <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaDatos"></v-progress-linear>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-actions>

                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>

                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field type="number" append-icon="mdi-arrow-right-bold" class="mr-2 " v-model="idPlanta" label="Id planta.." autofocus v-on:keyup.enter="existePlanta(idPlanta) ">

                                                        </v-text-field>

                                                    </v-flex>
                                                    <v-flex sm12 lg3 md3>

                                                        <v-switch v-model="switch1" inset @click="dialogo1=true" label="Seleccionar" :disabled="!interuptor1">
                                                        </v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-actions>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>

                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field type="number" append-icon="mdi-arrow-right-bold" class="mr-2 " v-model="numeroBandeja" label="Número de bandeja.." autofocus v-on:keyup.enter="buscarxnumban(numeroBandeja)">

                                                        </v-text-field>

                                                    </v-flex>
                                                    <v-flex sm12 lg3 md3>

                                                        <v-switch v-model="switch3" inset @click="dialogo3=true" label="Seleccionar" :disabled="!interuptor3">
                                                        </v-switch>
                                                    </v-flex>

                                                </v-layout>
                                            </v-card-actions>

                                        </v-card>

                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>

                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex sm12 md6 lg6>
                                                        <v-text-field type="text" append-icon="mdi-arrow-right-bold" class="mr-2 " v-model="codigoQR" label="Qr planta.." autofocus v-on:keyup.enter="buscarxqr(codigoQR)">

                                                        </v-text-field>

                                                    </v-flex>
                                                    <v-flex sm12 lg3 md3>

                                                        <v-switch v-model="switch2" inset @click="dialogo2=true" label="Seleccionar" :disabled="!interuptor2">
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
        <v-dialog v-model="dialogo1" width="600">
            <!-- PANTALLA EMERGENETE PARA REGISTRAR CRECIMIENTO POR ID DE PLANTA-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="yellow">mdi-ruler</v-icon>
                    &nbsp;Registrar crecimiento
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>

                <v-container>

                    <v-card elevation="15" success>
                        <v-layout wrap row>
                            <v-card-text>
                                <v-flex md12>
                                    <v-card-title>
                                        Planta : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-chip label color="" v-model="sss">{{this.idPlanta}} </v-chip>
                                    </v-card-title>
                                </v-flex>
                                <v-flex md12>
                                    <v-card-title>
                                        Ubicación : &nbsp;&nbsp; <v-chip label color="" v-model="sss2">{{this.ubi}} </v-chip>
                                    </v-card-title>
                                </v-flex>
                                <v-flex md12>
                                    <v-card-title>
                                        Medición: <v-text-field class="" type="number" label="Valor (cm).." v-model="registroCrecimiento"></v-text-field>
                                    </v-card-title>

                                </v-flex>
                                <v-flex md12>
                                    <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaDatos2 "></v-progress-linear>
                                </v-flex>

                            </v-card-text>
                            <v-divider dark></v-divider>

                        </v-layout>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialogo1=false,cancelar()">
                                Cancelar
                            </v-btn>
                            <v-btn class="success" text @click="registrarCrecimiento(registroCrecimiento)">
                                Guardar <v-icon right size="22">mdi-content-save-outline</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-container>

            </v-card>
        </v-dialog>

    </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR REGISTRO DE CRECIMIENTO-->
    <form v-on:submit.prevent="cambiarTipoPlantaMasivo">
        <v-dialog v-model="dialogoCrecimientoMasivo" width="600" persistent>
            <!-- PANTALLA EMERGENETE PARA REGISTRAR CRECIMIENTO POR ID DE PLANTA-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="yellow">mdi-ruler</v-icon>
                    &nbsp;Registrar crecimiento de forma masiva
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>
                <v-container>
                    <v-card elevation="15" success>
                        <v-layout wrap row>
                            <v-card-text>
                                <v-flex md12>
                                    <v-card-title>
                                        Lote : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-chip label color="primary white--text">{{this.loteCrecimientoMasivo}} </v-chip>
                                    </v-card-title>
                                </v-flex>
                                <v-flex md12>
                                    <v-card-title>
                                        N° plantas : &nbsp;&nbsp; <v-chip label color="primary white--text">{{this.numeroPlantasCreciMasivo}} </v-chip>
                                    </v-card-title>
                                </v-flex>
                                <v-flex md12>
                                    <v-card-title v-if="this.numeroPlantasCreciMasivo>0">

                                        Medición: <v-text-field class="ml-5" type="number" label="Valor (cm).." v-model="regCrecimientoMasivo"></v-text-field>

                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                    <v-card-title v-else>

                                        Medición: <v-text-field disabled class="ml-5" type="number" label="Valor (cm)..." v-model="regCrecimientoMasivo"></v-text-field>

                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                </v-flex>
                            </v-card-text>
                            <v-card-text>
                                <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaDatos3"></v-progress-linear>
                            </v-card-text>
                            <v-divider dark></v-divider>
                        </v-layout>
                        <v-card-actions>

                            <v-btn color="error" @click="dialogoCrecimientoMasivo=false,inicializarDatos()">
                                Cancelar
                            </v-btn>
                            <v-btn class="success" text @click="registrarCrecimientoMasivo(regCrecimientoMasivo,numeroPlantasCreciMasivo)">
                                Registrar <v-icon right size="22">mdi-ruler</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-card>
        </v-dialog>

    </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR REGISTRO DE CRECIMIENTO-->

    <v-snackbar v-model="correcto" :multi-line="multiLine">
        {{ mensajecorrecto }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="correcto = false">
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
    data() {
        return {
            alert: false,
            ////////
            switch1: false,
            switch2: '',
            switch3: '',
            //////////
            dialogo1: false,
            dialogo2: false,
            dialogo3: false,
            dialogoCrecimientoMasivo: false,
            /////////
            interuptor1: false,
            interuptor2: '',
            interuptor3: '',
            ///////////
            tabs: '',
            ubi: '',
            sss2: '',
            esperaDatos: false,
            esperaDatos2: false,
            esperaDatos3: false,
            ///////////
            idPlanta: '',
            codigoQR: '',
            numeroBandeja: '',
            /////////////////////
            registroCrecimiento: '',
            lotesSiembra: [{}],
            identPlantasCrecmiento: [],
            loteSiembraParaCrecimiento: '',
            loteCrecimientoMasivo: '',
            numeroPlantasCreciMasivo: '',
            regCrecimientoMasivo: '',
            //////////////////
            correcto: false,
            mensajecorrecto: '',
            ////////////////
            semana: '',
            multiLine: true,
            bandera: '',
            ///////////////
            idPlanta: '',
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

            idTipoUbicacion: '',
            nombreTipoUbicacion: '',

            codigoSemilla: '',
            nombreVariedadSemilla: '',
            nombreInternoSemilla: '',
            descripcionSemilla: '',
            precioSemilla: '',
            pesoSemilla: '',
            porcentajeThcSemilla: '',
            porcentajeCbdSemilla: '',
            numeroLoteSemilla: '',

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
            /////////// elementos planta
            elementosPlanta: [{

                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
                clasificacionA: '',
                clasificacionB: '',
                clasificacionC: '',
                clasificacionD: '',
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

        existePlanta(idPlanta) {

            if (idPlanta == '') {
                alert("Identificador no válido de planta.");
            } else {
                axios.get('http://localhost:12590/api/tucann/proPlanta/' + idPlanta,{
                        headers: generalHeader()
                    })
                    .then(res => {
                        if (res.status == 200) {

                            this.elementosPlanta = res.data;
                            this.ubi = this.elementosPlanta.proUbicacion.idUbicacion;
                            this.interuptor1 = true;
                            // console.log(res.data.proUbicacion.idUbicacion);
                            // console.log(this.elementosPlanta.proUbicacion.idUbicacion = res.data.proUbicacion.idUbicacion);
                        }
                    })
                    .catch(err => {
                        //   console.error(err);
                        if (err) {
                            this.idPlanta = '';
                            this.interuptor1 = false;
                            this.switch1 = false;
                            alert("Identificador no permitido.");
                        }
                    })
            }
        },
        listarLotesSiembra() {
            try {
                this.lotesSiembra = [];
                axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/',{
                        headers: generalHeader()
                    })
                    .then(res => {
                        // console.log(res.data.length);
                        for (let index = 0; index < res.data.length; index++) {
                            if (res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra == 2) {
                                //  console.log(res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra);
                                this.lotesSiembra.push(res.data[index].loteRegistroSiembra);
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            }

        },
        async dialogoCreacimientoMasivo(loteSiembra) {
            this.esperaDatos = true;
        //    this.loteSiembraParaCrecimiento = '';
            this.loteCrecimientoMasivo = loteSiembra;
            if (loteSiembra == '') {
                this.esperaDatos = false;
                this.$fire({
                    title: '<strong class="u">Oops!!</strong>',
                    html: '<spam class="u">Debe seleccionar un lote de siembra!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });
            } else {
                try {
                    this.identPlantasCrecmiento = [];
                    await axios.get('http://localhost:12590/api/tucann/proPlanta/bplxrs/' + loteSiembra,{
                        headers: generalHeader()
                    })
                        .then(res => {
                            this.numeroPlantasCreciMasivo = res.data.length;
                            for (let index = 0; index < res.data.length; index++) {
                                this.identPlantasCrecmiento.push(res.data[index].idPlanta);
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })

                } catch (error) {

                } finally {

                    this.esperaDatos = false;
                    this.dialogoCrecimientoMasivo = true;
                     this.loteSiembraParaCrecimiento = '';
                }
            }

        },
        async revisar(lote, semana) {

            /*    let contador = 0;

                //  console.log("REV 1");

                await axios.get('http://localhost:12590/api/tucann/proPlanta/bplxrs/' + lote)
                    .then(res => {

                        for (let index = 0; index < res.data.length; index++) {
                            //  console.log(res.data[index].idPlanta)
                            axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/bxidp&sr/' + res.data[index].idPlanta + '/' + semana)
                                .then(res => {
                                    //  console.log(res.data.length)

                                    if (res.data.length > 0) {

                                        console.log("bandera : ", bandera + "  -   " + res.data.length);
                                        console.log(index);

                                    }

                                })
                                .catch(err => {
                                    console.error(err);
                                })
                            contador++;
                        }
                        // return this.bandera;
                    })
                    .catch(err => {
                        console.error(err);
                    })
                //   console.log("Respuesta : ", this.bandera);*/

        },
        async registrarCrecimientoMasivo(registroCrecimiento, numeroPlantasCreciMasivo) {
            //    console.log(registroCrecimiento);
            //    console.log(numeroPlantasCreciMasivo);

            if (registroCrecimiento == '' || registroCrecimiento <= 0) {
                this.$fire({
                    title: '<strong class="u">Oops!!</strong>',
                    html: '<spam class="u">Valor no permitido!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });

            } else {

                //     this.esperaDatos2 = true;
                this.semana = this.semanaDelAnioEnCurso(new Date());

                await axios.get('http://localhost:12590/api/tucann/proPlanta/bplxrs/' + this.loteCrecimientoMasivo,{
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.revisarLoteCre(res.data, registroCrecimiento, numeroPlantasCreciMasivo, this.semana, this.loteCrecimientoMasivo);
                    })
                    .catch(err => {
                        console.error(err);
                    })

                //   console.log(this.loteCrecimientoMasivo);

                /*  this.revisar(this.loteCrecimientoMasivo, this.semana).then(resp => {
                      console.log(resp);
                  })*/

                /*     axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/bxidp&sr/', )
                         .then(res => {
                             console.log(res)
                         })
                         .catch(err => {
                             console.error(err);
                         })*/

                /*    for (let index = 0; index < this.identPlantasCrecmiento.length; index++) {
                        let json = {
                            idRegistro: '',
                            valorRegistro: parseInt(registroCrecimiento),
                            fechaRegistro: '',
                            semanaRegistro: this.semana,
                            proPlanta: {
                                idPlanta: this.identPlantasCrecmiento[index],
                            }
                        }
                        //  console.log(json);;

                        await axios.post('http://localhost:12590/api/tucann/proRegistroCrecimiento/', json)
                            .then(res => {
                                console.log(res.data);

                            })
                            .catch(err => {
                                console.error(err);
                            })

                    }*/

                /*   this.esperaDatos2 = false;
                   this.dialogoCrecimientoMasivo = false;
                   this.inicializarDatos();
                   this.$fire({
                       title: '<strong class="u">Excelente!!</strong>',
                       html: '<spam class="u">Se registro de forma masiva el crecimiento en el lote :  </spam>' + '<strong>' +
                           this.loteCrecimientoMasivo + '</sotrong>',
                       type: "success",
                       timer: 4000,
                       confirmButtonText: '<spam class="u" >OK</spam>',
                       confirmButtonColor: '#4CAF50',
                   }).then(r => {
                       // console.log(r);
                   });*/
            }

        },
        async revisarLoteCre(datos, registroCrecimiento, numeroPlantasCreciMasivo, semana, loteCrecimientoMasivo) {
            let bandera = false;
            let contador = 0;
            let tamanio = (datos.length)

            //   console.log(tamanio);
            //      console.log(contador);

            while (contador < tamanio) {
                //  console.log(contador);
                let a = datos[contador].idPlanta;
                await axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/bxidp&sr/' + a + '/' + semana,{
                        headers: generalHeader()
                    })
                    .then(res => {
                        //    console.log(res.data.length)
                        if (res.data.length > 0 || bandera != false) {

                            contador = tamanio + 1;
                            this.dialogoCrecimientoMasivo = false;
                            this.regCrecimientoMasivo = '';

                            this.$fire({
                                title: '<strong class="u">Oops!!</strong>',
                                html: '<spam class="u">Esta semana ya se registro el crecimiento para el lote : </spam>' + '<strong class="u">' + loteCrecimientoMasivo + '</strong>',
                                type: "error",
                                timer: 5000,
                                confirmButtonText: '<spam class="u" >OK</spam>',
                                confirmButtonColor: '#4CAF50',
                            }).then(r => {
                                // console.log(r);
                            });

                        } else {
                            // console.log(this.identPlantasCrecmiento.length);
                            this.registrarCrecimientoConLote(registroCrecimiento, this.identPlantasCrecmiento.length, loteCrecimientoMasivo, semana);
                            bandera = true;
                            contador = tamanio + 1;

                            /*  for (let index = 0; index < this.identPlantasCrecmiento.length; index++) {
                                  let json = {
                                      idRegistro: '',
                                      valorRegistro: parseInt(registroCrecimiento),
                                      fechaRegistro: '',
                                      semanaRegistro: this.semana,
                                      proPlanta: {
                                          idPlanta: this.identPlantasCrecmiento[index],
                                      }
                                  }
                                 //   console.log(json);;

                                  await axios.post('http://localhost:12590/api/tucann/proRegistroCrecimiento/', json)
                                      .then(res => {
                                          console.log(res.data);

                                      })
                                      .catch(err => {
                                          console.error(err);
                                      })

                              }*/

                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })

                contador++;
            }

            /*    while (contador <= tamanio || bandera != true) {
                let a = datos[contador - 1].idPlanta;

               console.log(contador + ' - ' + tamanio);
                console.log('http://localhost:12590/api/tucann/proRegistroCrecimiento/bxidp&sr/' + a + '/' + semana);

             await axios.get('http://localhost:12590/api/tucann/proRegistroCrecimiento/bxidp&sr/' + a + '/' + semana)
                    .then(resp => {

                        console.log(resp.data);

                        if (resp.data > 0) {
                            console.log("Existen registros");
                            bandera = true;
                            console.log(bandera);
                        }

                    })
                    .catch(err => {
                        console.error(err);
                    })
                //  console.log(contador);
                if (contador > tamanio) {
                    bandera = true;
                }

                contador++;

            }*/

        },
        async registrarCrecimientoConLote(registroCrecimiento, identPlantasCrecmiento, loteCrecimientoMasivo, semana) {
            try {
                if (registroCrecimiento == '' || identPlantasCrecmiento == '' || loteCrecimientoMasivo == '') {
                    this.regCrecimientoMasivo = '';
                    this.$fire({
                        title: '<strong class="u">Oops!!</strong>',
                        html: '<spam class="u">Los campos no deben estar vacios </spam>',
                        type: "error",
                        timer: 5000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',
                    }).then(r => {
                        // console.log(r);
                    });
                } else {
                    this.esperaDatos3 = true;
                    for (let index = 0; index < identPlantasCrecmiento; index++) {
                        let json = {
                            idRegistro: '',
                            valorRegistro: parseInt(registroCrecimiento),
                            fechaRegistro: '',
                            semanaRegistro: semana,
                            proPlanta: {
                                idPlanta: this.identPlantasCrecmiento[index],
                            }
                        }
                        // console.log(json);;

                        await axios.post('http://localhost:12590/api/tucann/proRegistroCrecimiento/', json,{
                        headers: generalHeader()
                    })
                            .then(res => {
                           //     console.log(res.data);

                            })
                            .catch(err => {
                                console.error(err);
                            })

                    }

                }

            } catch (error) {

            } finally {
                this.esperaDatos3 = false;
                this.dialogoCrecimientoMasivo = false;
                this.regCrecimientoMasivo = '';
                this.$fire({
                    title: '<strong class="u">Excelente!!</strong>',
                    html: '<spam class="u">Registro de crecimiento para el lote :  </spam>' + '<strong>' + loteCrecimientoMasivo + '</strong>' + '<spam class="u"> realizado.</spam>',
                    type: "success",
                    timer: 5000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });
            }

        },
        semanaDelAnioEnCurso(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            var dayNum = d.getUTCDay() + 1 || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        },
        inicializarDatos() {

            this.loteCrecimientoMasivo = '';
            this.numeroPlantasCreciMasivo = '';
            this.regCrecimientoMasivo = '';

        },
        registrarCrecimiento(registroCrecimiento) {
            let json = {
                idRegistro: this.idRegistro,
                valorRegistro: registroCrecimiento,
                fechaRegistro: this.fechaRegistro,
                proPlanta: {
                    idPlanta: this.idPlanta,
                }
            }

            //  console.log(json);
            axios.post('http://localhost:12590/api/tucann/proRegistroCrecimiento/', json,{
                        headers: generalHeader()
                    })
                .then(res => {
                    // console.log(res)
                    this.correcto = true;
                    this.idPlanta = '';
                    this.interuptor1 = false;
                    this.switch1 = false;
                    this.ubi = '';
                    this.dialogo1 = false;
                    this.mensajecorrecto = 'Medición guardada correctamente. \" ' + registroCrecimiento + '\" (cm)';

                })
                .catch(err => {
                    console.error(err);
                })
        },

        buscarxnumban(numeroBandeja) {},

        buscarxqr(buscarxqr) {},
        cancelar() {
            this.idPlanta = '';
            this.interuptor1 = false;
            this.switch1 = false;
            this.ubi = '';
        },
        sss() {}

    },
    created() {
        this.listarLotesSiembra();
    },
    components: {

    }
}
</script>

<style>
.uuu {
    display: none;
}

.u {
    /*font-style: italic;*/
    font-family: Roboto, sans-serif;
}
</style>
