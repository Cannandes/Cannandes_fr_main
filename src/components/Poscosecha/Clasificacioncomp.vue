<template>
<div>
    <v-container>
        <v-card elevation="15">
            <v-card-title class="success white--text">
                <v-icon size="40" color="analogo4">mdi-arrange-bring-to-front</v-icon>
                &nbsp;
                <h2>Clasificación</h2>

                <v-spacer></v-spacer>
                <v-btn color="white" @click="alerta = !alerta" elevation="15" icon>
                    <v-icon>mdi-information-variant</v-icon>
                </v-btn>
                <v-card-text>
                    <v-alert :value="alerta" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                        Coloca el peso de cada una de las clasificaciónes del lote<br>
                        <ol>
                            <li>
                                Flor
                                <v-icon color="white">yard</v-icon>
                            </li>
                            <br>
                            <li>
                                Hojas y flores pequeñas
                                <v-icon>eco</v-icon>
                            </li> <br>
                            <li>
                                Ramas y talllos <v-icon color="white">spa</v-icon>
                            </li> <br>
                            <li>
                                Raices <v-icon color="white">grass</v-icon>
                            </li>
                        </ol><br>

                    </v-alert>
                </v-card-text>

            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md4>

                    </v-flex>
                    <v-flex md4>
                        <v-autocomplete :disabled="!interuptor" class="ml-3 mr-3" label="Registro siembra.." :items="elementosRegistroSiembra" item-text="loteRegistroSiembra" item-value="idRegistroSiembra" v-model="registroSiembra"></v-autocomplete>
                    </v-flex>
                    <v-flex md4>

                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-text v-if="registroSiembra>0">

                <v-layout wrap>
                    <v-flex sm3>

                        <v-chip class="primary" label>
                            <label class="mr-5 ml-5">Clasificación A</label>
                        </v-chip>
                        <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifA" class="mr-5 ml-5" type="number" label="Flor (Kg)"></v-text-field>
                    </v-flex>
                    <v-flex sm3>
                        <v-chip class="primary" label>
                            <label class="mr-5 ml-5">Clasificación B</label>
                        </v-chip>
                        <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifB" class="mr-5 ml-5" type="number" label="Biomasa (Kg)"></v-text-field>
                    </v-flex>
                    <v-flex sm3>
                        <v-chip class="primary" label>
                            <label class="mr-5 ml-5">Clasificación C</label>
                        </v-chip>
                        <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifC" class="mr-5 ml-5" type="number" label="Ramas y tallos (Kg)"></v-text-field>
                    </v-flex>
                    <v-flex sm3>
                        <v-chip class="primary" label>
                            <label class="mr-5 ml-5">Clasificación D</label>
                        </v-chip>
                        <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifD" class="mr-5 ml-5" type="number" label="Raíces (Kg)"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card-text>

            <v-card-text>
                <v-btn class="primary" v-if="editarElementosRegistroProduccion.valorRegistroProduccionClasifA >0 || editarElementosRegistroProduccion.valorRegistroProduccionClasifB > 0 || editarElementosRegistroProduccion.valorRegistroProduccionClasifC > 0 || editarElementosRegistroProduccion.valorRegistroProduccionClasifD > 0" @click="guardarRegistroProduccion(editarElementosRegistroProduccion.valorRegistroProduccionClasifA, editarElementosRegistroProduccion.valorRegistroProduccionClasifB ,editarElementosRegistroProduccion.valorRegistroProduccionClasifC ,editarElementosRegistroProduccion.valorRegistroProduccionClasifD,registroSiembra)">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
    <v-container>
        <v-card elevation="15">
            <v-card-title class="primary white--text">
                <h2>Producción diaria</h2>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="cabecerasRegistroProduccion" :items="elementosRegistroProduccion" dense>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{item.idRegistroProduccion}}</td>
                            <td>{{item.fechaRegistroProduccion}}</td>
                            <td>{{item.proRegistroSiembra.loteRegistroSiembra}}</td>
                            <td class="text-endtext-lg-right">{{item.valorRegistroProduccionClasifA | numero}}</td>
                            <td class="text-endtext-lg-right">{{item.valorRegistroProduccionClasifB | numero}}</td>
                            <td class="text-endtext-lg-right">{{item.valorRegistroProduccionClasifC | numero}}</td>
                            <td class="text-endtext-lg-right">{{item.valorRegistroProduccionClasifD | numero}}</td>
                            <td>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on" @click="editarRegistroProduccion(item)" small>
                                            <v-icon color="primary">edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on" @click="eliminarRegistroProduccion(item.idRegistroProduccion)" small>
                                            <v-icon color="error">delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Eliminar registro</span>
                                </v-tooltip>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
    <!-- <v-container>
        <v-layout wrap>
            <v-flex sm10 mx-auto>
                <v-card>
                    <v-card-title class="success white--text">
                        <v-icon size="40" color="analogo4">mdi-arrange-bring-to-front</v-icon>
                        &nbsp;
                        <h2>Clasificación</h2>
                        <v-spacer></v-spacer>
                
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Coloca el peso de cada una de las clasificaciónes de la planta<br>
                                <ol>
                                    <li>
                                        Flor <v-chip small label color="white" text-color="error"> </v-chip>
                                    </li>
                                    <br>
                                    <li>
                                        Hojas y flores pequeñas <v-chip small label color="white" text-color="error"> </v-chip>

                                    </li> <br>
                                    <li>
                                        Ramas y talllos <v-chip small label color="white" text-color="error"> </v-chip>

                                    </li> <br>
                                    <li>
                                        Raices <v-chip small label color="white" text-color="error"> </v-chip>

                                    </li>
                                </ol><br>

                                Lote:

                                <ol>
                                    <li>
                                        <v-chip label color="analogo4" class="white--text">{{almacen}}</v-chip> Coresponde al establecimiento donde se encuentra la planta.
                                    </li>
                                    <li>
                                        <v-chip label color="analogo4" class="white--text">{{anio2}}</v-chip> Coresponde al año en curso.
                                    </li>
                                    <li>
                                        <v-chip label color="analogo4" class="white--text">{{dia}}</v-chip> Corresponde al dia juliano del año en curso
                                    </li>
                                    <li>
                                        <v-chip label color="analogo4" class="white--text">{{usuario}}</v-chip> Corresponde al usuario que realiza la transacción.
                                    </li>
                                </ol>
                            </v-alert>
                        </v-card-text>
                    </v-card-title>

                    <v-divider horizontal red></v-divider>
                    <v-card>
                        <v-layout>
                            <v-flex>
                                <v-card-title class="white success--text">Lote: &nbsp; <v-chip label color="success">
                                        <strong class="white--text"> {{almacen}}-{{anio2}}-{{dia}}-{{usuario}}</strong>
                                    </v-chip>
                                </v-card-title>
                            </v-flex>

                        </v-layout>
                    </v-card>
                    <v-container>
                        <template>
                            <v-card>
                                <v-layout wrap>
                                    <v-flex sm4 mx-auto>
                                        <v-card-text>
                                            <v-text-field :disabled="!interuptor" type="number" append-icon="mdi-sprout-outline" class="mr-2 " v-model="idPlanta" label="Id planta.." autofocus v-on:keyup.enter="existePlanta(idPlanta) "></v-text-field>
                                        </v-card-text>
                                    </v-flex>

                                </v-layout>
                                <v-card-text>
                                    <v-layout wrap>

                                        <v-flex sm3>
                                            <label for="" class="mr-5 ml-5">Clasificación A</label>
                                            <v-text-field v-model="a" class="mr-5 ml-5" type="number" label="Flor" :disabled="interuptor"></v-text-field>
                                        </v-flex>
                                        <v-flex sm3>
                                            <label for="" class="mr-5 ml-5">Clasificación B</label>
                                            <v-text-field v-model="b" class="mr-5 ml-5" type="number" label="Hojas y flor menor" :disabled="interuptor"></v-text-field>
                                        </v-flex>
                                        <v-flex sm3>
                                            <label for="" class="mr-5 ml-5">Clasificación C</label>
                                            <v-text-field v-model="c" class="mr-5 ml-5" type="number" label="Ramas y tallos" :disabled="interuptor"></v-text-field>
                                        </v-flex>
                                        <v-flex sm3>
                                            <label for="Raices" class="mr-5 ml-5">Clasificación D</label>
                                            <v-text-field v-model="d" class="mr-5 ml-5" type="number" label="Raíces" :disabled="interuptor"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="success" @click="registroClasificacionPlanta(idPlanta) ">Guardar</v-btn>
                                    <v-btn color="success" @click="cancelaringreso()">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>-->
    <v-container>
        <v-dialog v-model="dialogoModificarRegistroProduccion" width="900" persistent>
            <v-card>
                <v-card-title></v-card-title>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex md3></v-flex>
                        <v-flex md1>
                            <v-chip class="primary" label>
                                <label class="mr-2 ml-2">Id</label>
                            </v-chip>
                            <v-text-field dense v-model="editarElementosRegistroSiembra.idRegistroSiembra" class="ml-3 mr-3" disabled></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-chip class="primary" label>
                                <label class="mr-5 ml-5">Lote</label>
                            </v-chip>
                            <v-text-field dense v-model="editarElementosRegistroSiembra.loteRegistroSiembra" class="mr-3 ml-1" disabled></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-chip class="primary" label>
                                <label class="mr-5 ml-5">Fecha</label>
                            </v-chip>
                            <v-text-field dense v-model="editarElementosRegistroProduccion.fechaRegistroProduccion" class="mr-3 ml-1" disabled></v-text-field>
                        </v-flex>
                        <v-flex md2></v-flex>

                        <v-flex md3>

                            <v-chip class="primary" label>
                                <label class="mr-5 ml-5">Clasificación A</label>
                            </v-chip>
                            <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifA" class="mr-5 ml-5" type="number" label="Flor (Kg)"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-chip class="primary" label>
                                <label class="mr-5 ml-5">Clasificación B</label>
                            </v-chip>
                            <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifB" class="mr-5 ml-5" type="number" label="Biomasa (Kg)"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-chip class="primary" label>
                                <label class="mr-5 ml-5">Clasificación C</label>
                            </v-chip>
                            <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifC" class="mr-5 ml-5" type="number" label="Ramas y tallos (Kg)"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-chip class="primary" label>
                                <label class="mr-5 ml-5">Clasificación D</label>
                            </v-chip>
                            <v-text-field v-model="editarElementosRegistroProduccion.valorRegistroProduccionClasifD" class="mr-5 ml-5" type="number" label="Raíces (Kg)"></v-text-field>
                        </v-flex>

                    </v-layout>
                </v-card-text>
                <v-card-actions>

                    <v-btn class="error" @click="inicializarDatosProduccion()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn class="primary" @click="guardarRegistroProduccion(editarElementosRegistroProduccion.valorRegistroProduccionClasifA,editarElementosRegistroProduccion.valorRegistroProduccionClasifB,editarElementosRegistroProduccion.valorRegistroProduccionClasifC,editarElementosRegistroProduccion.valorRegistroProduccionClasifD,editarElementosRegistroSiembra.idRegistroSiembra, editarElementosRegistroProduccion.fechaRegistroProduccion) ">
                        <v-icon>save</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

    <v-container>
        <v-snackbar v-model="notificacion">
            {{ textodenotificacion }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="notificacion = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import registroSService from '@/services/produccion/registrosiembra.service.js'
import registroProdService from '@/services/poscosecha/registroproduccion.service.js'
import axios from 'axios'
export default {
    data() {
        return {
            dialogDelete: false,
            dialogoModificarRegistroProduccion: '',
            registroSiembra: '',
            indiceEditarRegistroProduccion: -1,
            indiceEditarRegistroSiembra: -1,
            cabecerasRegistroProduccion: [{
                    text: 'ID',
                    value: 'idRegistroProduccion'
                },
                {
                    text: 'Fecha',
                    value: 'fechaRegistroProduccion'
                },
                {
                    text: 'Registro',
                    value: 'registroSiembra.idRegistroSiembra'
                },
                {
                    text: 'Clase A',
                    value: 'valorRegistroProduccionClasifA'
                },
                {
                    text: 'Clase B',
                    value: 'valorRegistroProduccionClasifB'
                },
                {
                    text: 'Clase C',
                    value: 'valorRegistroProduccionClasifC'
                },
                {
                    text: 'Clase D',
                    value: 'valorRegistroProduccionClasifD'
                },
                {
                    text: 'Acciones',
                    value: ''
                },
            ],

            elementosRegistroSiembra: [{
                idRegistroSiembra: '',
                loteRegistroSiembra: '',
            }],
            editarElementosRegistroSiembra: [{
                idRegistroSiembra: '',
                loteRegistroSiembra: '',
            }],
            defaultElementosRegistroSiembra: [{
                idRegistroSiembra: '',
                loteRegistroSiembra: '',
            }],

            elementosRegistroProduccion: [{
                idRegistroProduccion: '',
                fechaRegistroProduccion: '',
                valorRegistroProduccionClasifA: '',
                valorRegistroProduccionClasifB: '',
                valorRegistroProduccionClasifC: '',
                valorRegistroProduccionClasifD: '',
                proRegistroSiembra: {
                    loteRegistroSiembra: '',
                }
            }],
            editarElementosRegistroProduccion: [{
                idRegistroProduccion: '',
                fechaRegistroProduccion: '',
                valorRegistroProduccionClasifA: '',
                valorRegistroProduccionClasifB: '',
                valorRegistroProduccionClasifC: '',
                valorRegistroProduccionClasifD: '',
                proRegistroSiembra: {
                    idRegistroSiembra: '',
                    loteRegistroSiembra: '',
                }
            }],
            defaultElementosRegistroProduccion: [{
                idRegistroProduccion: '',
                fechaRegistroProduccion: '',
                valorRegistroProduccionClasifA: 0,
                valorRegistroProduccionClasifB: 0,
                valorRegistroProduccionClasifC: 0,
                valorRegistroProduccionClasifD: 0,
                proRegistroSiembra: {
                    idRegistroSiembra: '',
                }
            }],
            alert: false,
            alerta: false,
            ///////////////
            interuptor: true,
            ////////////////
            a: '',
            b: '',
            c: '',
            d: '',
            ///////////////
            dia: '',
            anio2: '',
            usuario: 'PP',
            almacen: 'J66',
            ////////////////
            notificacion: false,
            textodenotificacion: '',
            ////////////////
            lotedeplantaparaenviar: '',
            ///////////////
            elementosPlantaActividad: [{
                idPlantaActividad: '',
                fechaPlantaActividad: '',
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
                    clasificacionA: '',
                    clasificacionB: '',
                    clasificacionC: '',
                    clasificacionD: '',

                    lotePlanta: '',

                    /*  proPlanta: {
                          idPlanta: '',
                      },*/
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

            lotePlanta: '',

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
            cabecerasRegistroSiembra: [{}],
            elementosRegistroSiembra: [{}]
        }
    },

    methods: {

        eliminarRegistroProduccion(identificador) {
            registroProdService.eliminarRegistrosProduccion(identificador).then(() => {
                this.listarRegistroProduccionDia();
                this.inicializarDatosProduccion();
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Excelente!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Registro de producción eliminado!</spam>',
                    type: "success",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {

                });
            })

        },

        editarRegistroProduccion(item) {
            this.indiceEditarRegistroProduccion = item.idRegistroProduccion
            this.editarElementosRegistroProduccion = Object.assign({}, item)
            this.indiceEditarRegistroSiembra = item.proRegistroSiembra;
            this.editarElementosRegistroSiembra = Object.assign({}, item.proRegistroSiembra)

            this.registroSiembra = '';
            this.dialogoModificarRegistroProduccion = true;
        },

        inicializarDatosProduccion() {
            this.$nextTick(() => {
                this.dialogoModificarRegistroProduccion = false;
                this.registroSiembra = '';
                this.editarElementosRegistroProduccion = Object.assign({}, this.defaultElementosRegistroProduccion);
                this.editarElementosRegistroSiembra = Object.assign({}, this.defaultElementosRegistroSiembra)
                this.indiceEditarRegistroProduccion = -1;
                this.indiceEditarRegistroSiembra = -1;
            })
        },
        listarRegistroProduccionDia() {
            let fi = new Date().toISOString().substr(0, 10);
            let ff = new Date().toISOString().substr(0, 10)
            this.produccionFechaInicioFin(fi, ff);

        },

        produccionFechaInicioFin(fechaInicial, fechaFinal) {

            this.elementosRegistroProduccionProv = [];
            registroProdService.listarRegistrosProduccionFechas(fechaInicial, fechaFinal).then((result) => {
                this.elementosRegistroProduccion = result.data;
            })
        },

        guardarRegistroProduccion(clasA, clasB, clasC, clasD, idregistro, fecha) {
            if (clasA == '' || clasB == '' || clasC == '' || clasD == '' || idregistro == '') {
                alert("Los campos no pueden estar");
            } else {
                if (this.indiceEditarRegistroProduccion > -1) {
                    let registroProduccion = {
                        idRegistroProduccion: this.indiceEditarRegistroProduccion,
                        fechaRegistroProduccion: fecha,
                        valorRegistroProduccionClasifA: clasA,
                        valorRegistroProduccionClasifB: clasB,
                        valorRegistroProduccionClasifC: clasC,
                        valorRegistroProduccionClasifD: clasD,
                        proRegistroSiembra: {
                            idRegistroSiembra: idregistro,
                        }
                    }
                    registroProdService.editarRegistrosProduccion(registroProduccion).then(() => {
                        this.listarRegistroProduccionDia();
                        this.inicializarDatosProduccion();
                        this.$fire({
                            /// type: 'info',
                            /// message: 'Los campos no pueden quedar vacíos!'
                            title: '<strong class="u">Excelente!</strong>',
                            //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                            html: '<spam class="u">Registro de producción guardado!</spam>',
                            type: "success",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',
                        }).then(r => {

                        });
                    })

                } else {
                    let registroProduccion = {
                        idRegistroProduccion: '',
                        fechaRegistroProduccion: '',
                        valorRegistroProduccionClasifA: clasA,
                        valorRegistroProduccionClasifB: clasB,
                        valorRegistroProduccionClasifC: clasC,
                        valorRegistroProduccionClasifD: clasD,
                        proRegistroSiembra: {
                            idRegistroSiembra: idregistro,
                        }
                    }
                    registroProdService.registrarProduccion(registroProduccion).then(() => {
                        this.listarRegistroProduccionDia();
                        this.inicializarDatosProduccion();
                        this.$fire({
                            /// type: 'info',
                            /// message: 'Los campos no pueden quedar vacíos!'
                            title: '<strong class="u">Excelente!</strong>',
                            //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                            html: '<spam class="u">Registro de producción creado!</spam>',
                            type: "success",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',
                        }).then(r => {

                        });
                    })

                }

            }

        },
        traerRegistroSiembra() {
            registroSService.traerRegistrosSiembraActivos().then((resp) => {
                this.elementosRegistroSiembra = resp.data;
            })
        },
        existePlanta(id) {

            if (id == '') {
                alert("Identificador no válido de planta.");
                this.interuptor = true;
            } else {
                axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xactandidp/' + id, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        if (res.status == 200) {

                            this.elementosPlantaActividad = res.data;
                            this.interuptor = false;
                            this.a = this.elementosPlantaActividad.clasificacionA;
                            this.b = this.elementosPlantaActividad.clasificacionB;
                            this.c = this.elementosPlantaActividad.clasificacionC;
                            this.d = this.elementosPlantaActividad.clasificacionD;
                        }
                    })
                    .catch(err => {

                        if (err) {
                            this.idPlanta = '';
                            alert("Identificador no permitido.");
                        }
                    })
            }
        },
        cancelaringreso() {
            this.interuptor = true;
            this.a = '';
            this.b = '';
            this.c = '';
            this.d = '';
            this.idPlanta = '';
        },

     /*   registroClasificacionPlanta(id) {

            axios.get('http://localhost:12590/api/tucann/proPlanta/' + id, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosPlanta = res.data;
                    this.diajuliano();
                    if (res.data.proPlanta == null) {
                        let json = {

                            idPlanta: res.data.idPlanta,
                            codigoQR: res.data.codigoQR,
                            porcentajeThcPlanta: res.data.porcentajeThcPlanta,
                            porcentajeCbdPlanta: res.data.porcentajeCbdPlanta,
                            numeroBandeja: res.data.numeroBandeja,
                            clasificacionA: this.a,
                            clasificacionB: this.b,
                            clasificacionC: this.c,
                            clasificacionD: this.d,
                            lotePlanta: this.lotedeplantaparaenviar,

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

                        axios.post('http://localhost:12590/api/tucann/proPlanta/', json, {
                                headers: generalHeader()
                            })
                            .then(res => {

                                this.interuptor = true;
                                this.textodenotificacion = 'Registro de clasificación guardado con éxito!!';
                                this.notificacion = true;
                                this.a = '';
                                this.b = '';
                                this.c = '';
                                this.d = '';
                                this.idPlanta = '';
                            })
                            .catch(err => {
                                console.error(err);
                            })

                    } else {

                        let json = {

                            idPlanta: res.data.idPlanta,
                            codigoQR: res.data.codigoQR,
                            porcentajeThcPlanta: res.data.porcentajeThcPlanta,
                            porcentajeCbdPlanta: res.data.porcentajeCbdPlanta,
                            clasificacionA: this.a,
                            clasificacionB: this.b,
                            clasificacionC: this.c,
                            clasificacionD: this.d,
                            numeroBandeja: res.data.numeroBandeja,
                            lotePlanta: this.lotedeplantaparaenviar,
                            proPlanta: {
                                idPlanta: res.data.proPlanta.idPlanta,
                            },
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

                        axios.post('http://localhost:12590/api/tucann/proPlanta/', json, {
                                headers: generalHeader()
                            })
                            .then(res => {

                                this.interuptor = true;
                                this.textodenotificacion = 'Registro de clasificación guardado con éxito!!';
                                this.notificacion = true;
                                this.a = '';
                                this.b = '';
                                this.c = '';
                                this.d = '';
                                this.idPlanta = '';
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }

                })
                .catch(err => {
                    console.error(err);
                })
        },*/
        diajuliano() {

            var ahora = new Date();
            var comienzo = new Date(ahora.getFullYear(), 0, 1);
            var anio = ahora.getFullYear();
            var a = String(anio);
            var anio2 = a.substring(2, 4);
            var dif = ahora - (comienzo);
            var unDia = 1000 * 60 * 60 * 24;
            var dia = Math.ceil(dif / unDia);

            this.anio2 = anio2.toString();
            this.dia = dia.toString();

            this.lotedeplantaparaenviar = 'J66' + this.anio2 + this.dia + 'PP';

        }
    },
    mounted() {

        let fi = new Date().toISOString().substr(0, 10);
        let ff = new Date().toISOString().substr(0, 10)
        this.produccionFechaInicioFin(fi, ff);
        this.traerRegistroSiembra();
        this.inicializarDatosProduccion();

        // diajuliano() {
        var ahora = new Date();
        var comienzo = new Date(ahora.getFullYear(), 0, 1);
        var anio = ahora.getFullYear();
        var a = String(anio);
        var anio2 = a.substring(2, 4);
        var dif = ahora - (comienzo);
        var unDia = 1000 * 60 * 60 * 24;
        var dia = Math.ceil(dif / unDia);

        this.anio2 = anio2.toString();
        this.dia = dia.toString();

        this.lotedeplantaparaenviar = 'J66' + this.anio2 + this.dia + 'PP'

    },
}
</script>
