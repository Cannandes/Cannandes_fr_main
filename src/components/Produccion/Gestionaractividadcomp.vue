<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg12>
                <v-card elevation="15">
                    <v-card-title class="success white--text">
                        <v-icon color="analogo4">mdi-seed-outline </v-icon> &nbsp; <h2>Gestionar actividad de plantas</h2>
                        <!--////////////////////////////////////// alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Ingresa el <strong>ID</strong> de la planta selecciona la <strong>actividad</strong> de la planta. <br>
                                <ol>
                                    <li>Siembra</li>
                                    <li>Germinación</li>
                                    <li>Enraizamiento</li>
                                    <li>Vegetativo</li>
                                    <li>Floración</li>
                                    <li>Cosecha</li>
                                    <li>Secado</li>
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
                                            <v-tab v-for="n in 3" :key="n">
                                                <div v-if="n==1">

                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon large v-bind="attrs" v-on="on">select_all</v-icon>
                                                        </template>
                                                        <span>Forma masiva</span>
                                                    </v-tooltip>
                                                </div>
                                                <div v-else-if="n==2">
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon large v-bind="attrs" v-on="on">highlight_alt</v-icon>
                                                        </template>
                                                        <span>Forma individual</span>
                                                    </v-tooltip>

                                                </div>

                                                <div v-else>
                                                    <v-icon large>apps</v-icon>
                                                </div>

                                            </v-tab>
                                        </v-tabs>
                                    </template>
                                </v-toolbar>
                                <v-tabs-items v-model="tabs">
                                    <v-tab-item>
                                        <v-card>
                                            <v-card-text></v-card-text>
                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex md3>

                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-autocomplete label="Lote de siembra.." :items="lotesSiembra" item-text="loteRegistroSiembra" item-value="loteRegistroSiembra" v-model="loteSiembraPGestAct"></v-autocomplete>
                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">

                                                                <v-btn class="ml-3 mt-3 primary" @click="dialogoPCambioActiv(loteSiembraPGestAct)" v-bind="attrs" v-on="on">
                                                                    <v-icon>select_all</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Cambiar actividad</span>
                                                        </v-tooltip>
                                                    </v-flex>
                                                    <v-flex md12>
                                                        <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaDatos"></v-progress-linear>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-actions>
                                        </v-card>
                                    </v-tab-item>
                                    <!-- /////////////////////////////////////////////////////////////////////////////////////// -->
                                    <v-tab-item>
                                        <v-card>
                                            <v-card-text></v-card-text>
                                            <v-card-actions>
                                                <v-layout wrap>
                                                    <v-flex md3>

                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-text-field label="ID Planta.." v-model="idPlanta" class="ml-5" type="number">

                                                        </v-text-field>
                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">

                                                                <v-btn @click="mostrarActividades(idPlanta)" class="ml-5 success" v-bind="attrs" v-on="on">
                                                                    <v-icon size="25">visibility</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Mostrar actividades</span>
                                                        </v-tooltip>
                                                    </v-flex>
                                                    <v-flex md12>

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

        <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
        <v-dialog v-model="dialog" width="1200" persistent>
            <!-- PANTALLA EMERGENETE PARA -->
            <v-card width="1200">
                <template>
                    <v-flex sm12>
                        <v-card-title class="monocromatico2 white--text">Fecha Actividades
                            <v-spacer></v-spacer>
                            <v-btn icon @click="inicializarDatosIndividual()">
                                <v-icon color="white">close</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>

                            <v-simple-table>
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
                                                    <v-chip color="analogo1" dark label>
                                                        OK &nbsp;<v-icon size=20>
                                                            mdi-check-bold
                                                        </v-icon>
                                                    </v-chip>
                                                </div>
                                                <div v-else-if="item.estadoActividad == false">
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-chip color="analogo3" dark label v-bind="attrs" v-on="on">
                                                                <v-btn icon @click="cambioActividadPlanta(item.idPlantaActividad)">
                                                                    ACT &nbsp;<v-icon size=20>
                                                                        remove
                                                                    </v-icon>
                                                                </v-btn>
                                                            </v-chip>
                                                        </template>
                                                        <span>Cambiar de actividad</span>
                                                    </v-tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-flex>
                </template>

            </v-card>
        </v-dialog>

        <!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVA ACTIVIDAD-->
        <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
        <v-dialog v-model="dialogoCambioActMasivo" width="800" persistent>
            <!-- PANTALLA EMERGENETE PARA REGISTRAR CAMBIO DE ACTIVIDAD DE FORMA MASIVA-->
            <v-card width="800">
                <v-card-title class="success white--text">
                    <v-icon color="yellow">select_all</v-icon>
                    &nbsp;Registrar cambio de actividad de forma masiva
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>
                <v-container>
                    <v-card elevation="15" success>
                        <v-layout wrap row>
                            <v-card-text>
                                <v-flex md12>
                                    <v-card-title class="primary--text">
                                        Lote : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-chip label color="primary white--text">{{this.loteSiembraPGestAct}} </v-chip>
                                    </v-card-title>
                                </v-flex>

                                <!--  <v-flex md12>
                                    <v-card-title>
                                        N° plantas : &nbsp;&nbsp; <v-chip label color="primary white--text">{{this.numeroPlantasActMasivo}} </v-chip>
                                    </v-card-title>
                                </v-flex> -->
                                <v-flex md12>
                                    <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaCambioActividad"></v-progress-linear>
                                </v-flex>
                            </v-card-text>
                            <v-card-text class="ml-3 mr-3">
                                <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaDatos2"></v-progress-linear>
                            </v-card-text>
                            <v-divider dark></v-divider>
                        </v-layout>
                        <v-card-text>
                            <v-data-table :items="actividadMasivaMostrar" :headers="cabeceraActividadMasivaMostrar" :sort-by="['fechaActividadMom']" :sort-desc="[false]" dense>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{item.fechaActividadMom}}</td>
                                        <td>{{item.nombreActividadMom}}</td>
                                        <td>{{item.loteActividadMom}}</td>
                                        <td>
                                            <div v-if="item.estadoActividadMom == true">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">

                                                        <v-chip color="analogo1" label v-bind="attrs" v-on="on" small>

                                                            <v-icon size=20 color="white">
                                                                mdi-check-bold
                                                            </v-icon>

                                                        </v-chip>
                                                    </template>
                                                    <span>Actividad Realizada / {{ item.fechaActividadMom }}</span>
                                                </v-tooltip>

                                            </div>
                                            <div v-else-if="item.estadoActividadMom == false">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">

                                                        <v-chip color="analogo3" dark label small v-bind="attrs" v-on="on">
                                                            <v-btn icon @click="prepararActividadPlantasPCambioMasivo(item.loteActividadMom,item.identificadorActividadMom)" :disabled=activdesBoton>
                                                                <v-icon size=20>
                                                                    published_with_changes
                                                                </v-icon>
                                                            </v-btn>

                                                        </v-chip>
                                                    </template>
                                                    <span>Realizar cambio actividad</span>
                                                </v-tooltip>

                                            </div>
                                        </td>

                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card-text>
                        <v-divider class="success"></v-divider>
                        <v-card-actions>
                            <v-btn color="error" @click="inicializarDatos()" block>
                                cerrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
    <v-container>
        <v-dialog v-model="dialogoConfirmacionCambio" width="700">
            <v-card class="mx-auto" width="700">
                <v-card-text>
                    <v-icon size="30">yard</v-icon>
                </v-card-text>
            </v-card>

        </v-dialog>
    </v-container>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import plantaActividadService from '@/services/produccion/plantaactividad.service.js'
import registroSiembraService from '@/services/produccion/registrosiembra.service.js'
import axios from 'axios'
export default {

    data() {
        return {
            idRegistroAux: '',
            alert: false,
            banderaIdicadorActividad: true,
            /////////////////////
            dialog: false,
            tabs: null,
            esperaDatos: false,
            esperaDatos2: false,
            esperaCambioActividad: false,
            dialogoCambioActMasivo: false,
            activdesBoton: false,
            loteSiembraPGestAct: '',
            numeroPlantasActMasivo: '',
            dialogoConfirmacionCambio: false,
            lote: '',
            planta: '',
            pp: [],
            ////////////////////
            /*  alignments: [
                  'start',
                  'center',
                  'end',
              ],*/
            vectorPlantasActividadCambiar: [],
            //////////////////
            loteSiembraPGestAct: '',
            idPlanta: '',
            idPlantaActividad: '',
            estadoActividad: '',
            fechaPlantaActividad: '',
            idActividad: '',
            //   nombreActividad: '',
            detalleActividad: '',
            lotesSiembra: [{}],
            identPlantasCrecmiento: [],
            cabeceraActividadMasivaMostrar: [{
                    text: 'Fecha',
                    value: 'fechaActividadMom'
                },
                {
                    text: 'Actividad',
                    value: 'nombreActividadMom'
                },
                {
                    text: 'Lote',
                    value: 'loteActividadMom'
                },
                {
                    text: 'Estado',
                    value: ''
                },
            ],
            actividadMasivaMostrar: [{
                estadoActividadMom: '',
                fechaActividadMom: '',
                identificadorActividadMom: '',
                loteActividadMom: '',
                nombreActividadMom: '',
                numeroPlantasActividadMom: '',
            }],
            ///////////////////////
            valordeactividad: '',
            //////////////////////
            itemsPerPage: 1,
            /////////////////////////
            vectorQuitarDuplicados: [],
            actividades: [{
                idPlantaActividad: '',
                estadoActividad: '',
                fechaPlantaActividad: '',
                loteSiembra: '',
                proActividad: {
                    idActividad: '',
                    nombreActividad: '',
                    detalleActividad: ''
                }
            }],
        }
    },
    created() {
        this.listarLotesSiembra()
    },
    methods: {
        mostrarActividades(idPlanta) {
            if (idPlanta == '') {

                this.$fire({
                    title: '<strong class="u">Oops!</strong>',
                    html: '<spam class="u">Campo vacío!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {});

            } else {
                axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xidp/' + idPlanta, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.actividades = res.data;
                        this.dialog = true;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        inicializarDatos() {
            this.dialogoCambioActMasivo = false;
            this.loteSiembraPGestAct = '';
            this.numeroPlantasActMasivo = '';
        },
        inicializarDatosIndividual() {
            this.dialog = false;
            this.idPlanta = '';
        },
        async cambioActividadPlanta(idPlantaActividad) {
            try {
                if (idPlantaActividad == '') {

                    this.$fire({
                        title: '<strong class="u">Oops!</strong>',
                        html: '<spam class="u">Valor no permitido!</spam>',
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',
                    }).then(r => {
                        // console.log(r);
                    });
                } else {
                    axios.get('http://localhost:12590/api/tucann/proPlantaActividad/' + idPlantaActividad, {
                            headers: generalHeader()
                        })
                        .then(res => {
                            if (res.data.proActividad.idActividad == 1) {
                                this.valordeactividad = res.data.proActividad.idActividad;
                                let json = {
                                    idPlantaActividad: res.data.idPlantaActividad,
                                    estadoActividad: true,
                                    fechaPlantaActividad: res.data.fechaPlantaActividad,
                                    loteSiembra: res.data.loteSiembra,
                                    proActividad: {
                                        idActividad: res.data.proActividad.idActividad,
                                    },
                                    proPlanta: {
                                        idPlanta: res.data.proPlanta.idPlanta,
                                    }
                                }

                                axios.put('http://localhost:12590/api/tucann/proPlantaActividad/', json, {
                                        headers: generalHeader()
                                    })
                                    .then(res => {
                                        this.mostrarActividades(this.actividades[0].proPlanta.idPlanta);

                                        let json2 = {
                                            idPlantaActividad: '',
                                            estadoActividad: false,
                                            fechaPlantaActividad: '',
                                            loteSiembra: this.actividades[0].loteSiembra,
                                            proActividad: {
                                                idActividad: this.valordeactividad + 1,
                                            },
                                            proPlanta: {
                                                idPlanta: this.actividades[0].proPlanta.idPlanta,
                                            }
                                        }
                                        axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json2, {
                                                headers: generalHeader()
                                            })
                                            .then(res => {})
                                            .catch(err => {
                                                console.error(err);
                                            })
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })
                            }
                            if (res.data.proActividad.idActividad > 1) {
                                let fechadehoy = this.fechahoy();
                                this.valordeactividad = res.data.proActividad.idActividad;
                                let json = {
                                    idPlantaActividad: res.data.idPlantaActividad,
                                    estadoActividad: true,
                                    fechaPlantaActividad: fechadehoy,
                                    loteSiembra: res.data.loteSiembra,
                                    proActividad: {
                                        idActividad: res.data.proActividad.idActividad,
                                    },
                                    proPlanta: {
                                        idPlanta: res.data.proPlanta.idPlanta,
                                    }
                                }
                                axios.put('http://localhost:12590/api/tucann/proPlantaActividad/', json, {
                                        headers: generalHeader()
                                    })
                                    .then(res => {
                                        this.mostrarActividades(this.actividades[0].proPlanta.idPlanta);
                                        let json2 = {
                                            idPlantaActividad: '',
                                            estadoActividad: false,
                                            fechaPlantaActividad: '',
                                            loteSiembra: this.actividades[0].loteSiembra,
                                            proActividad: {
                                                idActividad: this.valordeactividad + 1,
                                            },
                                            proPlanta: {
                                                idPlanta: this.actividades[0].proPlanta.idPlanta,
                                            }
                                        }

                                        axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json2, {
                                                headers: generalHeader()
                                            })
                                            .then(res => {

                                            })
                                            .catch(err => {
                                                console.error(err);
                                            })
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }
            } catch (error) {

            } finally {

            }
        },
        cambiarestadoplanta(a) {
            axios.get('http://localhost:12590/api/tucann/proPlanta/' + a, {
                    headers: generalHeader()
                })
                .then(res => {

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
                            idEstadoPlanta: res.data.proEstadoPlanta.idEstadoPlanta,
                        },
                        proUbicacion: {
                            idUbicacion: res.data.proUbicacion.idUbicacion,
                        },
                        proSemilla: {
                            codigoSemilla: res.data.proSemilla.codigoSemilla,

                        }
                    }

                    axios.put('http://localhost:12590/api/tucann/proPlanta/', json, {
                            headers: generalHeader()
                        })
                        .then(res => {

                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
                .catch(err => {
                    console.error(err);
                })
        },

        async dialogoPCambioActiv(loteSiembraPGestAct) {
            if (loteSiembraPGestAct == '') {
                this.$fire({
                    title: '<strong class="u">Oops!</strong>',
                    html: '<spam class="u">Campo vacío!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });

            } else {

                this.dialogoCambioActMasivo = true;
                this.esperaDatos2 = true;
                this.actividadMasivaMostrar = [];
                try {
                    this.identPlantasCrecmiento = [];

                    await axios.get('http://localhost:12590/api/tucann/proPlantaActividad/plxlt/' + loteSiembraPGestAct, {
                            headers: generalHeader()
                        })
                        .then(res => {
                            this.vectorQuitarDuplicados = [];
                            for (let index = 0; index < res.data.length; index++) {

                                if (res.data[index].proActividad.idActividad < 10) {
                                    let json = {

                                        identificadorActividadMom: res.data[index].proActividad.idActividad,
                                        nombreActividadMom: res.data[index].proActividad.nombreActividad,
                                        loteActividadMom: res.data[index].loteSiembra,
                                        fechaActividadMom: res.data[index].fechaPlantaActividad,
                                        estadoActividadMom: res.data[index].estadoActividad,
                                        numeroPlantasActividadMom: this.numeroPlantasActMasivo,
                                    }
                                    this.vectorQuitarDuplicados.push(json);
                                } else {
                                    index = 100000;
                                    this.banderaIdicadorActividad = false;
                                    this.dialogoCambioActMasivo = false;
                                    alert("La actividad sobrepasa la clasificación!");
                                }
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })

                } catch (error) {

                } finally {
                    if (!this.banderaIdicadorActividad) {
                        this.esperaDatos = false;
                        this.esperaDatos2 = false;
                    } else {
                        this.esperaDatos = false;
                        this.dialogoCambioActMasivo = true;
                        this.esperaDatos2 = false;
                        this.removeDuplicates(this.vectorQuitarDuplicados);
                    }

                }
            }
        },
        cambiarBandera() {
            this.banderaIdicadorActividad = false
        },

        removeDuplicates(arrayIn) {

            const arrayMon1 = arrayIn;
            let arrayMap = arrayMon1.map(item => {
                return [item.identificadorActividadMom, item]
            });
            var arrayMapArr = new Map(arrayMap);
            let unicos = [...arrayMapArr.values()];
            this.actividadMasivaMostrar = unicos;
        },

        async prepararActividadPlantasPCambioMasivo(loteActividadMom, identificadorActividadMom) {

            try {
                this.esperaCambioActividad = true;
                this.vectorPlantasActividadCambiar = [];
                this.activdesBoton = true;

                await axios.get('http://localhost:12590/api/tucann/proPlanta/lpxrsm/' + loteActividadMom, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        for (let index = 0; index < res.data.length; index++) {
                            if ((res.data[index].proTipoPlanta.idTipoPlanta == 1 || res.data[index].proTipoPlanta.idTipoPlanta == 3 || res.data[index].proTipoPlanta.idTipoPlanta == 2) && (res.data[index].proEstadoPlanta.idEstadoPlanta == 1 || res.data[index].proEstadoPlanta.idEstadoPlanta == 4)) {
                                this.vectorPlantasActividadCambiar.push(res.data[index].idPlanta);
                            } else if ((res.data[index].proTipoPlanta.idTipoPlanta == 1 || res.data[index].proTipoPlanta.idTipoPlanta == 3 || res.data[index].proTipoPlanta.idTipoPlanta == 2) && res.data[index].proEstadoPlanta.idEstadoPlanta != 1) {

                                this.finalizarTareaPlanta(res.data[index].idPlanta, identificadorActividadMom, loteActividadMom);

                            } else {}
                        }
                        this.pp = this.vectorPlantasActividadCambiar.sort(function (a, b) {
                            return a - b
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    })

            } catch (error) {

            } finally {

                this.cambiarActividadPlantasxLoteMasivo(identificadorActividadMom, loteActividadMom);
            }
        },
        finalizarTareaPlanta(idPlanta, idActividadMom, loteActividadMom) {
            plantaActividadService.buscarPlantaActividad(idPlanta, idActividadMom, loteActividadMom).then((resp) => {

                if (resp.data[0].estadoActividad == false) {
                    let plantaActividad = {
                        estadoActividad: true,
                        fechaPlantaActividad: resp.data[0].fechaPlantaActividad,
                        idPlantaActividad: resp.data[0].idPlantaActividad,
                        loteSiembra: resp.data[0].loteSiembra,
                        proActividad: {
                            idActividad: resp.data[0].proActividad.idActividad,
                        },
                        proPlanta: {
                            idPlanta: resp.data[0].proPlanta.idPlanta,
                        }
                    }
                    plantaActividadService.actualizarPlantaActividad(plantaActividad).then(() => {})
                } else {}
            })
        },
        async cambiarActividadPlantasxLoteMasivo(identificadorActividadMom, loteActividadMom) {
            try {

                this.idRegistroAux = 0;
                registroSiembraService.obtenerIdRegistroSiembra(loteActividadMom).then((result) => {
                    this.idRegistroAux = result.data;

                }).catch((err) => {});

                for (let index = 0; index < this.pp.length; index++) {
                    let idPlantaIter = this.pp[index];

                    await axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xidp/' + idPlantaIter, {
                            headers: generalHeader()
                        })
                        .then(res => {
                            for (let index = 0; index < res.data.length; index++) {
                                if (res.data[index].proActividad.idActividad == identificadorActividadMom) {
                                    let json = {
                                        estadoActividad: true,
                                        fechaPlantaActividad: res.data[index].fechaPlantaActividad,
                                        idPlantaActividad: res.data[index].idPlantaActividad,
                                        loteSiembra: res.data[index].loteSiembra,
                                        proActividad: {
                                            idActividad: res.data[index].proActividad.idActividad,
                                        },
                                        proPlanta: {
                                            idPlanta: res.data[index].proPlanta.idPlanta
                                        }
                                    }

                                    axios.put('http://localhost:12590/api/tucann/proPlantaActividad/', json, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {})
                                        .catch(err => {
                                            console.error(err);
                                        })
                                }
                            }
                            let plantaActividad = {
                                estadoActividad: false,
                                fechaPlantaActividad: '',
                                idPlantaActividad: '',
                                loteSiembra: loteActividadMom,
                                proActividad: {
                                    idActividad: identificadorActividadMom + 1,
                                },
                                proPlanta: {
                                    idPlanta: idPlantaIter,
                                }
                            }
                            axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', plantaActividad, {
                                    headers: generalHeader()
                                })
                                .then(res => {})
                                .catch(err => {
                                    console.error(err);
                                })
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.esperaCambioActividad = false;
                this.activdesBoton = false;
                this.dialogoCambioActMasivo = false;
                this.crearRegistroSiembraActividad(this.idRegistroAux, (identificadorActividadMom + 1), loteActividadMom);
            }
        },

        crearRegistroSiembraActividad(idRegistroAux, identificadorActividadMom, loteActividadMom) {

            let registroActividad = {
                idRegistroSiembraActividad: '',
                fechaRegistroSiembraActividad: '',
                proRegistroSiembra: {
                    idRegistroSiembra: idRegistroAux
                },
                proActividad: {
                    idActividad: identificadorActividadMom
                }
            }
            registroSiembraService.crearRegistroSiembraActividad(registroActividad).then((result) => {
                if (result.status == 200) {
                    this.$fire({
                        title: '<strong class="u">Excelente!</strong>',
                        type: "success",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',
                        html: '<spam class="u">La actividad para el lote </spam>' + '<strong>' + loteActividadMom + '</strong>' + '<span> se realizó con éxito!!</span>',
                    }).then(r => {});

                } else {
                    this.$fire({
                        title: '<strong class="u">Error!</strong>',
                        type: "error",
                        timer: 5000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',
                        html: '<spam class="u">Error en creación de registro siembra - actividad!!</span>',
                    }).then(r => {});
                }
            }).catch((err) => {});

        },
        listarLotesSiembra() {
            try {
                this.lotesSiembra = [];
                axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/', {
                        headers: generalHeader()
                    })
                    .then(res => {
                        for (let index = 0; index < res.data.length; index++) {
                            if (res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra == 2) {
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
            var j = f.getFullYear() + "-" + z + "-" + w;
            return j;
        },
    },
}
</script>

<style>
.u {
    /*font-style: italic;*/
    font-family: Roboto, sans-serif;
}

.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>
