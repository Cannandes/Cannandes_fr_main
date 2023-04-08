<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex>
                <v-card>
                    <v-card-title class="success white--text">
                        <v-icon size="40" color="analogo4">takeout_dining</v-icon>
                        &nbsp;
                        <h2>Verificar por lote y peso</h2>
                        <v-spacer></v-spacer>
                        <!--////////////////////////////////////// alerta -->
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Se lista las plantas que contiene cada lote junto con su peso individual en sus diferentes clasificacones .
                            </v-alert>
                        </v-card-text>
                    </v-card-title>
                    <v-card-text>

                    </v-card-text>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex md3>

                            </v-flex>
                            <v-flex md4>
                                <v-text-field class="mr-5" label="Nun lote.." type="text" append-icon="search" v-model="lote"></v-text-field>

                            </v-flex>
                            <v-flex md3>
                                <v-btn color="success" @click="listarLotes(lote)">Verificar <v-icon size="25" right>list</v-icon>
                                </v-btn>
                            </v-flex>

                        </v-layout>

                    </v-card-text>
                    <v-card-text>
                        <template>
                            <v-data-table dense :headers="titulosLote" :items="elementosLote" :items-per-page="10" class="elevation-10" hide-default-footer>
                                <template v-slot:item="{ item }">
                                    <tr>

                                        <td>{{item.idPlanta}}</td>
                                        <td class="text-endtext-lg-right">{{item.proSemilla.nombreInternoSemilla}}</td>
                                        <td>{{item.proTipoPlanta.nombreTipoPlanta}} </td>
                                        <td>
                                            <v-chip label :color="getColor(item.clasificacionA)" dark>
                                        <td>{{item.clasificacionA}} </td>
                                        </v-chip>
                                        </td>
                                        <td> {{item.clasificacionB}} </td>
                                        <td> {{item.clasificacionC}} </td>
                                        <td> {{item.clasificacionD}} </td>
                                        <td> {{item.clasificacionA + item.clasificacionB +item.clasificacionC + item.clasificacionD }}</td>
                                    </tr>
                                </template>

                                <template slot="body.append">
                                    <tr>
                                        <th class="title">Totales</th>
                                        <th></th>
                                        <th></th>
                                        <th class=""> {{sumaDeTotales('clasificacionA').toFixed(2)}} kg</th>
                                        <th class="">{{sumaDeTotales('clasificacionB').toFixed(2)}} kg</th>
                                        <th class="">{{sumaDeTotales('clasificacionC').toFixed(2)}} kg</th>
                                        <th class="">{{sumaDeTotales('clasificacionD').toFixed(2)}} kg</th>
                                        <!--<th> {{sumaDeTotales('clasificacionA').toFixed(2) + sumaDeTotales('clasificacionB').toFixed(2) + sumaDeTotales('clasificacionC').toFixed(2) + sumaDeTotales('clasificacionD').toFixed(2)}}</th>-->
                                        <th>{{(sumaDeTotales('clasificacionA') + sumaDeTotales('clasificacionB') + sumaDeTotales('clasificacionC') + sumaDeTotales('clasificacionD')).toFixed(2)}} kg</th>

                                    </tr>
                                </template>

                            </v-data-table>
                        </template>
                    </v-card-text>
                    <v-card-text>
                        <v-flex md2>
                            <v-btn color="success    white--text" @click="dialog=true">crear <v-icon size="25" right>save</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-card-text>
                    <!--    <v-card-text>
                        <template>
                            <v-card>
                                <v-card-title class="success white--text">
                                    <v-layout>
                                        <v-flex>
                                            Redultado
                                        </v-flex>
                                        <v-flex>
                                            <v-btn @click="dialog=true">GUARDAR</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-title>

                                <v-card-text>
                                    <v-layout wrap>

                                        <v-flex md2>
                                            <v-text-field class="ml-3 mr-3" label="Lote" v-model="lote" disabled></v-text-field>
                                        </v-flex>
                                        <v-flex md2>
                                            <v-text-field class="ml-3 mr-3" label="Tipo A" v-model="tipoa" disabled></v-text-field>
                                        </v-flex>
                                        <v-flex md2>
                                            <v-text-field class="ml-3 mr-3" label="Tipo B" v-model="tipob" disabled></v-text-field>
                                        </v-flex>
                                        <v-flex md2>
                                            <v-text-field class="ml-3 mr-3" label="Tipo C" v-model="tipoc" disabled></v-text-field>
                                        </v-flex>
                                        <v-flex md2>
                                            <v-text-field class="ml-3 mr-3" label="Tipo D" v-model="tipod" disabled></v-text-field>
                                        </v-flex>
                                        <v-flex md2>
                                            <v-text-field class="ml-3 mr-3" label="Total" v-model="totaltipos" disabled></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-card-text>-->
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container>
        <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
        <form v-on:submit.prevent="nuevoLote">
            <v-dialog v-model="dialog" width="800">
                <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVO DATO DE TIPO DE SEMILLA-->
                <v-card>
                    <v-card-title class="success white--text">
                        Crear lote de materia prima
                    </v-card-title>

                    <v-card-text>
                        <v-card-text>
                            <v-layout wrap>

                                <v-flex md2>
                                    <label for="sa">Lote</label><br>
                                    <v-chip label color="analogo1 white--text">{{lote}} </v-chip>

                                </v-flex>
                                <v-flex md2>
                                    <label for="sa">Tipo A</label><br>
                                    <v-chip label color="analogo2 white--text">{{tipoa}} </v-chip>

                                </v-flex>
                                <v-flex md2>
                                    <label for="sa">Tipo B</label><br>
                                    <v-chip label color="analogo2 white--text">{{tipob}} </v-chip>

                                </v-flex>
                                <v-flex md2>
                                    <label for="sa">Tipo C</label><br>
                                    <v-chip label color="analogo2 white--text">{{tipoc}} </v-chip>

                                </v-flex>
                                <v-flex md2>
                                    <label for="sa">Tipo D</label><br>
                                    <v-chip label color="analogo2 white--text">{{tipod}} </v-chip>

                                </v-flex>
                                <v-flex md2>
                                    <label for="sa">Total</label><br>
                                    <v-chip label color="analogo3 white--text">{{totaltipos}} </v-chip>

                                </v-flex>
                            </v-layout>
                        </v-card-text>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white--text" class="analogo1" @click="dialog=false">
                            cancelar
                        </v-btn>
                        <v-btn color="white--text" class="success" @click="nuevoLote(lote)">
                            Crear<v-icon size="25" right>save</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR NUEVA ACTIVIDAD-->
    </v-container>
    <v-container>
        <v-snackbar v-model="notificacion">
            {{ mensajeNotificacion }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="notificacion = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from 'axios'
export default {
    data() {
        return {
            alert: false,
            lote: '',
            tipoa: 0,
            tipob: 0,
            tipoc: 0,
            tipod: 0,
            totaltipos: 0,
            /////////////////
            notificacion: false,
            mensajeNotificacion: '',
            dialog: false,
            titulosLote: [{
                    text: 'ID Planta',
                    value: 'idPlanta'
                },
                {
                    text: 'Semilla',
                    value: 'proSemilla.nombreInternoSemilla'
                },
                {
                    text: 'Tipo',
                    value: 'proTipoPlanta.nombreTipoPlanta'
                },
                {
                    text: 'Tipo A (kg)',
                    value: 'clasificacionA'
                },
                {
                    text: 'Tipo B (kg)',
                    value: 'clasificacionB'
                },
                {
                    text: 'Tipo C (kg)',
                    value: 'clasificacionC'
                },
                {
                    text: 'Tipo D (kg)',
                    value: 'clasificacionD'
                },
                {
                    text: 'Total',
                    value: '/'
                }
            ],
            elementosLote: [{
                idPlanta: '',
                clasificacionA: '',
                clasificacionB: '',
                clasificacionC: '',
                clasificacionD: '',
                proTipoPlanta: {
                    idTipoPlanta: '',
                    nombreTipoPlanta: '',
                    detalleTipoPlanta: ''
                },
                proSemilla: {
                    nombreVariedadSemilla: '',
                    nombreInternoSemilla: ''
                }
            }]

        }
    },
    methods: {
        listarLotes(lote) {
            if (lote == '' || lote.length != 10) {
                this.lote = '';

                alert("Lote no permitido");

            } else {
                axios.get('http://localhost:12590/api/tucann/proPlanta/findbylotePlanta/' + lote,{
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.elementosLote = res.data;
                        let suma1 = 0,
                            suma2 = 0,
                            suma3 = 0,
                            suma4 = 0;
                        for (let index = 0; index < res.data.length; index++) {
                            suma1 = suma1 + res.data[index].clasificacionA;
                            suma2 = suma2 + res.data[index].clasificacionB;
                            suma3 = suma3 + res.data[index].clasificacionC;
                            suma4 = suma4 + res.data[index].clasificacionD;
                        }
                        // console.log(suma1 + '' + suma2 + '' + suma3 + '' + suma4);
                        this.tipoa = suma1.toFixed(2);
                        this.tipob = suma2.toFixed(2);
                        this.tipoc = suma3.toFixed(2);
                        this.tipod = suma4.toFixed(2);
                        this.totaltipos = (suma1 + suma2 + suma3 + suma4).toFixed(2);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        nuevoLote(lote) {

            if (lote.length > 0) {
                axios.get('http://localhost:12590/api/tucann/posLoteMateriaPrima/' + lote,{
                        headers: generalHeader()
                    })
                    .then(res => {

                        if (res.data.idLoteMateriaPrima.length != 0) {
                            this.dialog = false;
                            alert("El lote ya se encuentra registrado.")
                        }else{

                        }
                    })
                    .catch(err => {
                        //console.error(err);
                        let json = {
                            idLoteMateriaPrima: this.lote,
                            fechaCreacionLoteMateriaPrima: '',
                            estadolote: true,
                            tipoa: parseFloat(this.tipoa),
                            tipob: parseFloat(this.tipob),
                            tipoc: parseFloat(this.tipoc),
                            tipod: parseFloat(this.tipod),
                        }

                        axios.post('http://localhost:12590/api/tucann/posLoteMateriaPrima/', json,{
                        headers: generalHeader()
                    })
                            .then(res => {
                                this.mensajeNotificacion = 'Lote ' + this.lote + ' creado para su uso.';
                                this.notificacion = true;
                                this.dialog = false;
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    })

            }

        },
        getColor(clasificacionA) {
            if (clasificacionA > 1.5) return 'analogo1'
            else if (clasificacionA >= 1) return 'triada2'
            else if (clasificacionA < 1) return 'monocromatico2'
            else return ''
        },
        reducir(a) {
            let b = a.toFixed(2);
            return b;
        },
        sumaDeTotales(key) {
            // sum data in give key (property)
            if (key <= 0) {

                return 0;
            } else {
                return this.elementosLote.reduce((a, b) => parseFloat(a) + (parseFloat(b[key]) || 0), 0);
            }

            // console.log(key);
        },

    },
}
</script>
