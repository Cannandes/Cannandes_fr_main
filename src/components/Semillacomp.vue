<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="1500" class="mx-auto">
        <v-layout>
            <v-flex xs12 sm12 ld12 class="mx-auto">
                <v-card>
                    <v-card-title class="primary white--text">
                        SEMILLA
                        <!-- alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <!-- fin alerta -->
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                            Crear Variedad de Semilla
                        </v-alert>
                    </v-card-text>

                    <!-- TARJETA SEMILLA -->
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex md4>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon class="analogo1 ml-3" dark @click="dialog = true" v-bind="attrs" v-on="on">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Agregar semilla</span>
                                </v-tooltip>
                                &nbsp;
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon class="analogo3" dark @click="listarSemilla" v-bind="attrs" v-on="on">
                                            <v-icon>list</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Listar semillas</span>
                                </v-tooltip>

                            </v-flex>
                            <v-flex md4>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details success></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
                    <!-- FIN TARJETA SEMILLA -->

                    <v-card-text>
                        <template>
                            <v-data-table :headers="tituloSemilla" :items="estadoSemilla" :items-per-page="10" class="elevation-1" :search="search" dense></v-data-table>
                        </template>
                    </v-card-text>
                </v-card>
            </v-flex>

            <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DE FAMILIA DE SEMILLA -->
            <v-form v-on:submit.prevent="nuevaSemilla" v-model="form">
                <v-dialog v-model="dialog" width="600" persistent>

                    <v-card ref="form">
                        <v-card-title class="success white--text">
                            Agregar Semilla de Cannabis
                        </v-card-title>

                        <v-card-text>

                            <v-text-field v-model="nombreVariedadSemilla" :counter="30" label="Nombre variedad.." required success></v-text-field>
                            <v-text-field v-model="nombreInternoSemilla" :counter="40" label="Nombre interno.." required success></v-text-field>
                            <v-text-field v-model="descripcionSemilla" label="Descripción.." required success></v-text-field>
                            <v-text-field v-model="precioSemilla" :counter="40" label="Precio.." required success></v-text-field>
                            <v-text-field v-model="pesoSemilla" :counter="40" label="Peso (gr).." required success></v-text-field>
                            <v-text-field v-model="porcentajeThcSemilla" :counter="13" label="% THC.." required success></v-text-field>
                            <v-text-field v-model="porcentajeCbdSemilla" :counter="9" label="% CBD.." required success></v-text-field>
                            <v-text-field v-model="numeroLoteSemilla" :counter="10" label="Lote.." required success></v-text-field>
                            <v-text-field v-model="prefijoSemilla" :counter="2" label="Prefijo.." required success></v-text-field>

                            <v-select v-model="idProveedorSemilla" item-text="nombreProveedorSemilla" item-value="idProveedorSemilla" label="Proveedor de semilla.." :items="elementosProveedor"></v-select>
                            <v-select v-model="idFamiliaSemilla" item-text="nombreFamiliaSemilla" item-value="idFamiliaSemilla" label="Familia semilla.." :items="elementosFamilia"></v-select>
                            <v-select v-model="idAlmacen" item-text="nombreAlmacen" item-value="idAlmacen" label="Almacén.." :items="elementosAlmacen"></v-select>
                            <v-select v-model="idEstadoSemilla" item-text="nombreEstadoSemilla" item-value="idEstadoSemilla" label="Estado de semilla.." :items="elementosEstadoSemilla"></v-select>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="error" text @click="dialog = false, inicializarDatos()">
                                cancelar
                            </v-btn>

                            <v-btn class="primary" text @click="nuevaSemilla(nombreVariedadSemilla,nombreInternoSemilla,descripcionSemilla,precioSemilla,pesoSemilla,porcentajeThcSemilla,porcentajeCbdSemilla,numeroLoteSemilla,prefijoSemilla,idProveedorSemilla,idFamiliaSemilla,idAlmacen,idEstadoSemilla)">
                                Guardar
                            </v-btn>
                            <!-- 
                            <v-btn text @click="$refs.form.reset()">
                                Clear
                            </v-btn>
-->
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE FAMILIA DE SEMILLA-->

        </v-layout>
    </v-card>
</div>
</template>

<script>
import axios from 'axios'
import generalHeader from '@/services/general-header';
export default {

    name: 'Semillaform',
    components: {},
    directives: {},
    created() {
        let api1, api2, api3, api4;
        api1 = 'http://localhost:12590/api/tucann/proProveedorSemilla';
        api2 = 'http://localhost:12590/api/tucann/proFamiliaSemilla';
        api3 = 'http://localhost:12590/api/tucann/proAlmacen';
        api4 = 'http://localhost:12590/api/tucann/proEstadoSemilla';
        const requestOne = axios.get(api1, {
            headers: generalHeader()
        });
        const requestTwo = axios.get(api2, {
            headers: generalHeader()
        });
        const requestThree = axios.get(api3, {
            headers: generalHeader()
        });
        const requestFour = axios.get(api4, {
            headers: generalHeader()
        });

        axios.all([requestOne, requestTwo, requestThree, requestFour])
            .then(axios.spread((res1, res2, res3, res4) => {
                this.elementosProveedor = res1.data;
                this.elementosFamilia = res2.data;
                this.elementosAlmacen = res3.data;
                this.elementosEstadoSemilla = res4.data;
            }))
    },
    data() {
        return {
            alerta: false,

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
            idFamiliaSemilla: '',
            idAlmacen: '',
            idEstadoSemilla: '',

            dialog: false,
            form: false,
            search: '',
            elementosProveedor: [{
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
            }],
            elementosFamilia: [{
                idFamiliaSemilla: '',
                nombreFamiliaSemilla: '',
                descripcionFamiliaSemilla: ''
            }],
            elementosAlmacen: [{
                idAlmacen: '',
                nombreAlmacen: '',
                detalleAlmacen: ''
            }],
            elementosEstadoSemilla: [{
                idEstadoSemilla: '',
                nombreEstadoSemilla: '',
                descripcionEstadoSemilla: ''
            }],

            tituloSemilla: [{
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "codigoSemilla"
                },
                {
                    text: "Nombre variedad",
                    value: "nombreVariedadSemilla"
                },
                {
                    text: "Nombre interno",
                    value: "nombreInternoSemilla"
                },
                {
                    text: "Descripción",
                    value: "descripcionSemilla"
                },
                {
                    text: "Precio ($)",
                    value: "precioSemilla"
                },
                {
                    text: "Peso (gr.)",
                    value: "pesoSemilla"
                },
                {
                    text: "% CBD",
                    value: "porcentajeCbdSemilla"
                },
                {
                    text: "% THC",
                    value: "porcentajeThcSemilla"
                },
                {
                    text: "Lote",
                    value: "numeroLoteSemilla"
                },
                {
                    text: "Prefijo",
                    value: "prefijoSemilla"
                },
                {
                    text: "Proveedor",
                    value: "proProveedorSemilla.nombreProveedorSemilla"
                },
                {
                    text: "Familia",
                    value: "proFamiliaSemilla.nombreFamiliaSemilla"
                },
                {
                    text: "Almacén",
                    value: "proAlmacen.nombreAlmacen"
                },
                {
                    text: "Estado",
                    value: "proEstadoSemilla.nombreEstadoSemilla"
                }
            ],
            estadoSemilla: [{
                codigoSemilla: '-',
                nombreVariedadSemilla: '-',
                nombreInternoSemilla: '-',
                descripcionSemilla: '-',
                precioSemilla: '-',
                pesoSemilla: '-',
                porcentajeThcSemilla: '-',
                porcentajeCbdSemilla: '-',
                numeroLoteSemilla: '-',
                prefijoSemilla: '-',

                proProveedorSemilla: {
                    idProveedorSemilla: '-',
                },
                proFamiliaSemilla: {
                    idFamiliaSemilla: '-',
                },
                proAlmacen: {
                    idAlmacen: '-',
                },
                proEstadoSemilla: {
                    idEstadoSemilla: '-',
                },
            }]
        };
    },
    mounted() {
        this.listarSemilla();
    },
    methods: {

        listarSemilla() {
            axios.get('http://localhost:12590/api/tucann/proSemilla/', {
                    headers: generalHeader()
                })
                .then(response => {
                    this.estadoSemilla = response.data;
                });
        },
        nuevaSemilla(nombreVariedadSemilla, nombreInternoSemilla, descripcionSemilla, precioSemilla, pesoSemilla, porcentajeThcSemilla, porcentajeCbdSemilla, numeroLoteSemilla, prefijoSemilla, idProveedorSemilla, idFamiliaSemilla, idAlmacen, idEstadoSemilla) {

            if (nombreVariedadSemilla == '' || nombreInternoSemilla == '' || descripcionSemilla == '' || precioSemilla == '' || pesoSemilla == '' || porcentajeThcSemilla == '' || porcentajeCbdSemilla == '' || numeroLoteSemilla == '' || prefijoSemilla == '' || idProveedorSemilla == '' || idFamiliaSemilla == '' || idAlmacen == '' || idEstadoSemilla == '') {
                alert("Los campos no pueden quedar vacíos!!");
            } else {
                let json = {
                    nombreVariedadSemilla: this.nombreVariedadSemilla,
                    nombreInternoSemilla: this.nombreInternoSemilla,
                    descripcionSemilla: this.descripcionSemilla,
                    precioSemilla: this.precioSemilla,
                    pesoSemilla: this.pesoSemilla,
                    porcentajeThcSemilla: this.porcentajeThcSemilla,
                    porcentajeCbdSemilla: this.porcentajeCbdSemilla,
                    numeroLoteSemilla: this.numeroLoteSemilla,
                    prefijoSemilla: this.prefijoSemilla,
                    proProveedorSemilla: {
                        idProveedorSemilla: this.idProveedorSemilla,
                    },
                    proFamiliaSemilla: {
                        idFamiliaSemilla: this.idFamiliaSemilla,
                    },
                    proAlmacen: {
                        idAlmacen: this.idAlmacen,
                    },
                    proEstadoSemilla: {
                        idEstadoSemilla: this.idEstadoSemilla,
                    },
                };
                axios.post('http://localhost:12590/api/tucann/proSemilla', json, {
                        headers: generalHeader()
                    })
                    .then(data => {
                        this.dialog = false;
                        this.listarSemilla();
                        // console.log(res);
                        this.inicializarDatos();
                    });
            }
        },
        inicializarDatos() {
            this.codigoSemilla = '';
            this.nombreVariedadSemilla = '';
            this.nombreInternoSemilla = '';
            this.descripcionSemilla = '';
            this.precioSemilla = '';
            this.pesoSemilla = '';
            this.porcentajeThcSemilla = '';
            this.porcentajeCbdSemilla = '';
            this.numeroLoteSemilla = '';
            this.prefijoSemilla = '';

            this.idProveedorSemilla = '';
            this.idFamiliaSemilla = '';
            this.idAlmacen = '';
            this.idEstadoSemilla = '';
        }
    }
};
</script>
