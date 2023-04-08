<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="success white--text">
                        <v-icon size="40" color="analogo4">takeout_dining</v-icon>
                        &nbsp;
                        <h2>Lista de lotes</h2>
                        <v-spacer></v-spacer>
                        <!--////////////////////////////////////// alerta -->
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Se lista los lotes que se han generado por fecha de creación.
                            </v-alert>
                        </v-card-text>
                    </v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-text>
                        <v-layout wrap>

                            <v-flex md3>
                                <v-btn color="success" @click="listarLotes()">Listar <v-icon size="25" right>list</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex md3>

                            </v-flex>

                        </v-layout>

                    </v-card-text>

                    <v-card-text>
                        <template>
                            <v-data-table dense :headers="titulosLoteMateriaPrima" :items="elementosLoteMateriaPrima" :items-per-page="10" class="elevation-10" hide-default-footer>
                                <template v-slot:item="{ item }">
                                    <tr>

                                        <td>{{item.idLoteMateriaPrima}}</td>
                                        <td class="text-endtext-lg-right">{{item.tipoa}}</td>
                                        <td class="text-endtext-lg-right">{{item.tipob}}</td>
                                        <td class="text-endtext-lg-right">{{item.tipoc}}</td>
                                        <td class="text-endtext-lg-right">{{item.tipod}}</td>

                                        <td> {{item.tipoa + item.tipob +item.tipoc + item.tipod }}</td>
                                    </tr>
                                </template>

                            </v-data-table>
                        </template>
                    </v-card-text>

                </v-card>
            </v-flex>
        </v-layout>
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
            titulosLoteMateriaPrima: [{
                    text: 'Lote',
                    value: 'idLoteMateriaPrima'
                },
                {
                    text: 'Clasificación A',
                    value: 'tipoa'
                },
                {
                    text: 'Clasificación B',
                    value: 'tipob'
                },
                {
                    text: 'Clasificación C',
                    value: 'tipoc'
                },
                {
                    text: 'Clasificación D',
                    value: 'tipod'
                },
                {
                    text: 'Total',
                    value: 'tipod'
                }
            ],
            elementosLoteMateriaPrima: [{
                idLoteMateriaPrima: '',
                fechaCreacionLoteMateriaPrima: '',
                estadoLote: '',
                tipoa: '',
                tipob: '',
                tipoc: '',
                tipod: '',
            }]

        }
    },
    methods: {
        listarLotes() {
            axios.get('http://localhost:12590/api/tucann/posLoteMateriaPrima', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosLoteMateriaPrima = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

        },
    },
}
</script>
