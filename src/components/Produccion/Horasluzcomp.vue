<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg10>
                <v-card elevation-15>
                    <v-card-title class="success white--text">
                        <v-icon size="40" color="yellow">wb_incandescent</v-icon>
                        &nbsp;
                        <h2>Registro horas luz</h2>
                        <v-spacer></v-spacer>
                        <!--////////////////////////////////////// alerta -->
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="error" dark border="top" transition="scale-transition" elevation="20">
                                Selecciona el <strong>lite</strong> al que se va a registrar el tiempo de luz recibido por las plantas.<br>
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
                                            <v-tab v-for="n in 3" :key="n">
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
                                                        <v-autocomplete label="Lote de siembra.." :items="lotesSiembra" item-text="loteRegistroSiembra" item-value="loteRegistroSiembra" v-model="loteSiembraParaHorasluz"></v-autocomplete>
                                                    </v-flex>
                                                    <v-flex md4>
                                                        <v-btn class="ml-3 mt-3 primary" @click="preparacionHorasLuzMasivo(loteSiembraParaHorasluz)">
                                                            <v-icon>wb_incandescent</v-icon>
                                                        </v-btn>
                                                    </v-flex>
                                                    <v-flex xs12 sm12 md12 lg12>

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
    <v-container>
        <v-dialog v-model="dialogoHorasLuzMasivo" width="600" persistent>
            <!-- PANTALLA EMERGENETE PARA REGISTRAR CRECIMIENTO POR ID DE PLANTA-->
            <v-card>
                <v-card-title class="success white--text">
                    <v-icon color="yellow">wb_incandescent</v-icon>
                    &nbsp;Registrar horas luz de forma masiva
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text></v-card-text>
                <v-container>
                    <v-card elevation="15" success>
                        <v-layout wrap row>
                            <v-card-text>
                                <v-flex md12>
                                    <v-card-title>
                                        Lote : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-chip label color="primary white--text">{{this.loteHorasLuzMasivo}} </v-chip>
                                    </v-card-title>
                                </v-flex>
                                <v-flex md12>
                                    <v-card-title>
                                        N° plantas : &nbsp;&nbsp; <v-chip label color="primary white--text">{{this.numeroPlantasHorLuzMasivo}} </v-chip>
                                    </v-card-title>
                                </v-flex>
                                <v-flex md12>
                                    <v-card-title v-if="this.numeroPlantasHorLuzMasivo>0">

                                        Num horas: <v-text-field class="ml-5" type="number" label="Valor (cm).." v-model="regHorasLuzMasivo"></v-text-field>

                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                    <v-card-title v-else>
                                        Medición: <v-text-field disabled class="ml-5" type="number" label="Valor (horas)..." v-model="regHorasLuzMasivo"></v-text-field>
                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                </v-flex>
                            </v-card-text>
                            <v-card-text class="ml-3 mr-3">
                                <v-progress-linear color="primary accent-4" indeterminate bottom rounded height="6" :active="esperaDatos"></v-progress-linear>
                            </v-card-text>
                            <v-divider dark></v-divider>
                        </v-layout>
                        <v-card-actions>

                            <v-btn color="error" @click="dialogoHorasLuzMasivo=false,inicializarDatos()">
                                Cancelar
                            </v-btn>
                            <v-btn class="success" text @click="registrarHorasLuzMasivo(regHorasLuzMasivo,numeroPlantasHorLuzMasivo)">
                                Registrar <v-icon right size="22">wb_incandescent</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {
    name: 'CannandesSaHorasluzcomp',

    data() {
        return {
            alert: false,
            tabs: '',
            esperaDatos: false,
            dialogoHorasLuzMasivo: false,
            lotesSiembra: [{}],
            loteSiembraParaHorasluz: '',
            idPlanta: '',
            numeroBandeja: '',
            codigoQR: '',
            numeroPlantasHorLuzMasivo: '',
            loteHorasLuzMasivo: '',
            regHorasLuzMasivo: '',
            esperaDatos3: false,
            /////////
            interuptor1: false,
            interuptor2: '',
            interuptor3: '',
            ////////
            switch1: false,
            switch2: '',
            switch3: '',

        };
    },
    created() {
        this.listarLotesSiembra();
    },

    mounted() {

    },

    methods: {
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
        inicializarDatos() {

            // this.loteHorasLuzMasivo = '';
            //   this.numeroPlantasHorasLuz = '';
            //  this.regHorasLuzMasivo = '';

        },
        async preparacionHorasLuzMasivo2(loteSiembra) {
            console.log(loteSiembra);
        },

        async preparacionHorasLuzMasivo(loteSiembra) {
            //  console.log("Hola");
            //  this.loteSiembraParaCrecimiento = '';
            this.loteHorasLuzMasivo = loteSiembra;
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
                    this.dialogoHorasLuzMasivo = true;
                    this.esperaDatos = true;
                    this.identPlantasCrecmiento = [];
                    await axios.get('http://localhost:12590/api/tucann/proPlanta/bplxrs/' + loteSiembra,{
                        headers: generalHeader()
                    })
                        .then(res => {
                            this.numeroPlantasHorLuzMasivo = res.data.length;
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
        registrarHorasLuzMasivo(regHorasLuzMasivo,numeroPlantasHorLuzMasivo) {

            console.log(regHorasLuzMasivo);
             console.log(numeroPlantasHorLuzMasivo);

        }
    },
};
</script>
