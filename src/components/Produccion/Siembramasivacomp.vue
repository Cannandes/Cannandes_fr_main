<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-card>
            <v-layout>
                <v-flex mx-auto lg12>
                    <v-card-title class="success white--text">
                        <v-icon left size="25" color="analogo3">mdi-seed-outline</v-icon>
                        <v-icon left size="20" color="analogo3">mdi-seed-outline</v-icon>
                        <v-icon left size="15" color="analogo3">mdi-seed-outline</v-icon>
                        <v-icon left size="10" color="analogo3">mdi-seed-outline</v-icon>
                        <h2>Siembra Masiva</h2>
                        <v-spacer></v-spacer>

                        <!--<v-btn @click="cambiarActividadPlanta('C112220301')">EMERGENCIA</v-btn>-->

                        <v-btn @click="listarRegistrosDeSiembra()" right color="primary">
                            <v-icon color="white">refresh</v-icon>
                        </v-btn>

                        <!--////////////////////////////////////// alerta -->
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Selecciona la
                                <strong>cantidad,</strong> de
                                <strong>semillas</strong> y luego su
                                <strong>variedad.</strong>
                                <br />Recuerda que el lote tiene los siguientes componentes:
                                <ul>
                                    Lote
                                    <v-chip label color="white" x-small class="secondary--text dense">C1122145399</v-chip>
                                    <li>
                                        Es el almacen donde están las semillas
                                        <v-chip label color="white" x-small class="secondary--text dense">C1</v-chip>
                                    </li>
                                    <li>
                                        Tipo de registro de siembra <v-chip label color="white" x-small class="secondary--text dense">1</v-chip> registro de planta común, <v-chip label color="white" x-small class="secondary--text dense">2</v-chip> registro de planta clonada.

                                    </li>
                                    <li>
                                        El año en curso
                                        <v-chip label color="white" x-small class="secondary--text dense">21</v-chip>
                                    </li>
                                    <li>
                                        Semana en curso
                                        <v-chip label color="white" x-small class="secondary--text dense">45</v-chip>
                                    </li>
                                    <li>
                                        Número de día de la semana
                                        <v-chip label color="white" x-small class="secondary--text dense">3</v-chip>
                                    </li>
                                    <li>
                                        Prefijo de la variedad
                                        <v-chip label color="white" x-small class="secondary--text dense">99</v-chip>

                                    </li>
                                </ul>
                            </v-alert>
                        </v-card-text>
                    </v-card-title>
                    <v-divider horizontal class="white"></v-divider>
                    <v-container success></v-container>
                    <v-progress-linear :active="loading" :indeterminate="loading" absolute top color="primary"></v-progress-linear>

                    <template>
                        <v-container success>
                            <v-card class="mx-auto">
                                <v-toolbar flat>
                                    <template v-slot:extension>
                                        <v-tabs v-model="tabs" fixed-tabs>
                                            <v-tabs-slider></v-tabs-slider>
                                            <v-tab v-for="n in 3" :key="n">
                                                <div v-if="n == 1">
                                                    Registrar
                                                    <v-icon right size="25">assignment</v-icon>
                                                </div>
                                                <div v-else-if="n == 2">
                                                    Sembrar
                                                    <v-icon right size="25">mdi-seed-outline</v-icon>
                                                </div>
                                                <div v-else>
                                                    Gestionar
                                                    <v-icon>grid_on</v-icon>
                                                </div>
                                            </v-tab>
                                        </v-tabs>
                                    </template>
                                </v-toolbar>

                                <v-tabs-items v-model="tabs">

                                    <!--/////////////////////////// REGISTRAR ////////////////////////-->
                                    <!--/////////////////////////// REGISTRAR ////////////////////////-->
                                    <!--/////////////////////////// REGISTRAR ////////////////////////-->

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>
                                            <v-container success>
                                                <v-card>
                                                    <v-card-text></v-card-text>

                                                    <v-card-text>
                                                        <v-layout wrap>
                                                            <v-flex md1></v-flex>
                                                            <v-flex md3>
                                                                <v-text-field v-model="numeroSemillasSiembra" type="number" label="Número semillas.." class="mr-2" append-icon="mdi-seed-outline" number></v-text-field>
                                                            </v-flex>
                                                            <v-flex md5>
                                                                <v-select v-model="codigoSemilla" item-text="nombreInternoSemilla" item-value="codigoSemilla" label="Semilla.." :items="elementosSemilla"></v-select>
                                                            </v-flex>

                                                            <v-flex md2 class="mt-2">
                                                                <v-tooltip bottom>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn class="ml-2 primary" color="primary" dark v-bind="attrs" v-on="on" @click="crearRegistro(numeroSemillasSiembra,codigoSemilla)">
                                                                            <v-icon size="25">assignment</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Crear registro de siembra!</span>
                                                                </v-tooltip>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-text>
                                                </v-card>
                                                <v-card-text></v-card-text>
                                                <v-card>
                                                    <v-data-table :sort-by="['fechaRegistroSiembra']" :sort-desc="[true]" :items="elementosRegistrosiembra" :headers="cabeceraRegistrosiembra" dense>
                                                        <template v-slot:item="{ item }">
                                                            <tr>
                                                                <td>{{item.loteRegistroSiembra}}</td>
                                                                <td>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Lunes'">
                                                                        <v-chip blue label small color="blue white--text ">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Martes'">
                                                                        <v-chip blue label small color="green white--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Miércoles'">
                                                                        <v-chip blue label small color="light-blue white--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Jueves'">
                                                                        <v-chip blue label small color="red white--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Viernes'">
                                                                        <v-chip blue label small color="yellow black--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Sábado'">
                                                                        <v-chip blue label small color="gray " dark>{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                    <div v-if="item.proDiaSemana.nombreDiaSemana == 'Domingo'">
                                                                        <v-chip blue label small color="purple white--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                    </div>
                                                                </td>
                                                                <td>{{item.semillasSembradasRegistroSiembra}}</td>
                                                                <td>{{item.proSemilla.nombreInternoSemilla}}</td>
                                                                <td>{{item.proEstadoRegistroSiembra.nombreEstadoRegistroSiembra}}</td>
                                                            </tr>
                                                        </template>
                                                    </v-data-table>
                                                </v-card>
                                            </v-container>
                                        </v-card>
                                    </v-tab-item>
                                    <!--///////////////////////////////////////////////////////////////////////////////// -->
                                    <!--/////////////////////////// SEMBRAR ////////////////////////-->
                                    <!--/////////////////////////// SEMBRAR ////////////////////////-->
                                    <!--/////////////////////////// SEMBRAR ////////////////////////-->

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>
                                            <v-container success>
                                                <v-card-text></v-card-text>
                                                <v-card>
                                                    <v-data-table :sort-by="['idRegistroSiembra']" :sort-desc="[true]" :items="elementosRegistrosiembraSiembra" :headers="cabeceraRegistrosiembraSiembra" dense>
                                                        <template v-slot:item="{ item }">
                                                            <tr>
                                                                <td>{{item.loteRegistroSiembra}}</td>
                                                                <td>{{item.proSemilla.nombreInternoSemilla}}</td>
                                                                <td>{{item.semanaRegistroSiembra}}</td>
                                                                <td>{{item.proDiaSemana.nombreDiaSemana}}</td>
                                                                <td>{{item.semillasSembradasRegistroSiembra}}</td>
                                                                <td>{{((item.pesoSemillasRegistroSiembra) * (item.semillasSembradasRegistroSiembra)).toFixed(2)}}</td>
                                                                <td>
                                                                    <div v-if="item.proEstadoRegistroSiembra.idEstadoRegistroSiembra == 1">
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <span v-bind="attrs" v-on="on">

                                                                                    <v-btn icon color="analogo3" @click="mostrarDialogoSiembraFormaMasiva(item.semillasSembradasRegistroSiembra,item.loteRegistroSiembra,item.proSemilla.codigoSemilla,item.proSemilla.nombreInternoSemilla,item.idRegistroSiembra), mostrarSiembraMasiva= true">
                                                                                        <v-icon size="28">mdi-sprout</v-icon>
                                                                                    </v-btn>

                                                                                </span>
                                                                            </template>
                                                                            <span>Sembrar de forma masiva</span>
                                                                        </v-tooltip>
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <span v-bind="attrs" v-on="on">
                                                                                    <v-btn icon color="error" @click="mostrarEliminarRegistroSiembra= true,confirmarEliminarRegistroSiembra(item.idRegistroSiembra,item.loteRegistroSiembra,item.proSemilla.idSemilla,item.idRegistroSiembra)">
                                                                                        <v-icon size="28">delete</v-icon>
                                                                                    </v-btn>
                                                                                </span>
                                                                            </template>
                                                                            <span>Eliminar registro de siembra</span>
                                                                        </v-tooltip>

                                                                    </div>
                                                                    <div v-else>
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <span v-bind="attrs" v-on="on">

                                                                                    <v-btn icon disabled>
                                                                                        <v-icon size="28">mdi-sprout</v-icon>
                                                                                    </v-btn>
                                                                                </span>
                                                                            </template>
                                                                            <span>Registro tratado!</span>
                                                                        </v-tooltip>
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <span v-bind="attrs" v-on="on">
                                                                                    <v-btn icon color="error" disabled>
                                                                                        <v-icon size="28">delete</v-icon>
                                                                                    </v-btn>
                                                                                </span>
                                                                            </template>
                                                                            <span>Registro tratado!</span>
                                                                        </v-tooltip>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </template>
                                                    </v-data-table>
                                                </v-card>
                                            </v-container>
                                        </v-card>
                                    </v-tab-item>
                                    <!--///////////////////////////////////////////////////////////////////////////////// -->
                                    <!--/////////////////////////// GESTIONAR ////////////////////////-->
                                    <!--/////////////////////////// GESTIONAR ////////////////////////-->
                                    <!--/////////////////////////// GESTIONAR ////////////////////////-->

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text></v-card-text>
                                            <v-container success>
                                                <v-card-text></v-card-text>
                                                <v-card>
                                                    <v-data-table :sort-by="['idRegistroSiembra']" :sort-desc="[true]" :items="elementosRegistrosiembraSiembra" :headers="cabeceraRegistrosiembraSiembra" dense>
                                                        <template v-slot:item="{ item }">
                                                            <tr>
                                                                <td>{{item.loteRegistroSiembra}}</td>
                                                                <td>{{item.proSemilla.nombreInternoSemilla}}</td>
                                                                <td>{{item.semanaRegistroSiembra}}</td>
                                                                <td>{{item.proDiaSemana.nombreDiaSemana}}</td>
                                                                <td>{{item.semillasSembradasRegistroSiembra}}</td>
                                                                <td>{{((item.pesoSemillasRegistroSiembra) * (item.semillasSembradasRegistroSiembra)).toFixed(2)}}</td>
                                                                <td>
                                                                    <div v-if="item.proEstadoRegistroSiembra.idEstadoRegistroSiembra == 2">
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <span v-bind="attrs" v-on="on">

                                                                                    <v-btn icon color="analogo1" @click="bandejasActivasRegistroSiembra(item.semillasSembradasRegistroSiembra,item.loteRegistroSiembra,item.proSemilla.codigoSemilla,item.proSemilla.nombreInternoSemilla,item.idRegistroSiembra), mostrarGestionarBandejas= true">
                                                                                        <v-icon size="28">grid_on</v-icon>
                                                                                    </v-btn>

                                                                                </span>
                                                                            </template>
                                                                            <span>Gestionar bandejas</span>
                                                                        </v-tooltip>

                                                                    </div>
                                                                    <div v-if="item.proEstadoRegistroSiembra.idEstadoRegistroSiembra == 1">
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <span v-bind="attrs" v-on="on">

                                                                                    <v-btn icon color="gray" disabled>
                                                                                        <v-icon size="28">grid_on</v-icon>
                                                                                    </v-btn>

                                                                                </span>
                                                                            </template>
                                                                            <span>Pendiente la siembra</span>
                                                                        </v-tooltip>

                                                                    </div>
                                                                </td>
                                                                <td>

                                                                </td>
                                                            </tr>
                                                        </template>
                                                    </v-data-table>
                                                </v-card>
                                            </v-container>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </v-container>
                    </template>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
    <template>
        <v-dialog v-model="mostrarSiembraMasiva" width="600" persistent>
            <v-card width="600" class="mx-auto">
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">mdi-seed-outline</v-icon>Sembrar de forma masiva
                    <v-spacer></v-spacer>
                    <v-chip label large color="analogo1" class="text-h5 white--text uuu"> {{this.idRegistroSiembra}} </v-chip>
                    <v-chip label large color="analogo1" class="text-h5 white--text"> {{this.nombreInternoSemillarRegSi}} </v-chip>
                </v-card-title>

                <v-card-text>
                    <v-layout wrap>
                        <v-flex md6 sm12 xs12>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">Lote de siembra</p>
                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">{{this.loteRegistroSiembra}}</p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                        <v-flex md6 sm12 xs12>
                            <v-flex ms12>
                                <p class="text-md-center text-lg-center text-h6">Número de semillas</p>
                            </v-flex>
                            <v-flex sm12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-h6 white--text">{{this.semillasSembradasRegistroSiembra}}</p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex md6 sm12 xs12>
                            <v-flex md12>

                                <p class="text-md-center text-lg-center text-h6">Bandejas necesarias</p>

                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">{{this.bandejasNecesariasSiembra}}</p>

                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                        <v-flex md6 sm12 xs12>
                            <v-flex ms12>

                                <p class="text-md-center text-lg-center text-h6">Bandeja - Inicio</p>

                            </v-flex>
                            <v-flex sm12>
                                <v-sheet class="pa-1 white--text">
                                    <v-sheet class="pa-1 mx-auto white--text" elevation="12" color="analogo1">

                                        <v-text-field :disabled="desabilitarboton" v-model="bandejaInicialSiembra" class="text-md-center text-lg-center text-h6 ml-5 mr-5" type="number" dark label="Bandeja inicial.."></v-text-field>
                                        <div v-if="bandejaInicialSiembra>0" class="ml-5 mr-5"> Desde {{ (bandejaInicialSiembra)*1 }} - Hasta {{ ( this.bandejasNecesariasSiembra) + (bandejaInicialSiembra)*1 -1 }}</div>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on">

                                                    <v-flex sm12 class="text-md-center text-lg-center">
                                                        <v-btn :disabled="desabilitarboton" class="white" icon small @click="revisarposiciones(bandejaInicialSiembra, semillasSembradasRegistroSiembra, bandejasNecesariasSiembra)">
                                                            <v-icon :color="colorrevision">{{logorevision}}</v-icon>
                                                        </v-btn>
                                                    </v-flex>

                                                </span>
                                            </template>
                                            <span>{{mensajedisponibilidad}} </span>
                                        </v-tooltip>

                                        <v-alert border="left" color="error" dark :value="alertaerror">

                                            {{mensajeAlertaPosiciones}}
                                        </v-alert>

                                        <v-progress-linear color="white accent-4" indeterminate rounded height="6" :active="loadingrevisarubi"></v-progress-linear>

                                    </v-sheet>

                                </v-sheet>
                            </v-flex>

                        </v-flex>
                        <v-flex sm12 md12 lg12 xs12>
                            <v-progress-linear :active="loadingEsperaSiembra" :indeterminate="loadingEsperaSiembra" color="primary accent-4"></v-progress-linear>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <!--    <v-card-text>
                    <v-layout>
                        <v-flex md12 sm12 xs12>
                            <div class="text-center">

                                <v-progress-circular :rotate="360" :size="120" :width="15" :value="valor" color="success">
                                    {{valor}}
                                </v-progress-circular>
                            </div>

                        </v-flex>
                    </v-layout>
                </v-card-text>-->
                <v-divider class="success"></v-divider>
                <v-card-actions>
                    <v-btn class="error" @click="mostrarSiembraMasiva= false , limpiarDatos()">cancelar</v-btn>
                    <v-btn :disabled="!desabilitarboton" class="success" @click="crearPlanta(semillasSembradasRegistroSiembra,loteRegistroSiembra,bandejaInicialSiembra,semillaRedistroSi,idRegistroSiembra,bandejasNecesariasSiembra)">sembrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <template>
        <v-dialog v-model="mostrarEliminarRegistroSiembra" width="600">
            <v-card width="600" class="mx-auto">
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">delete</v-icon>Elimiar registro siembra
                </v-card-title>
                <v-card-text> </v-card-text>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex md12 sm12 xs12>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">Eliminar registro de siembra </p>
                            </v-flex>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">
                                    <v-icon size="40" color="red">delete</v-icon>
                                </p>
                            </v-flex>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-sm-center text-xs-center text-h5 ">{{this.loteRedistroSi}} </p>

                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn error color="error" @click="limpiarDatos(),mostrarEliminarRegistroSiembra = false">cancelar</v-btn>
                    <v-btn color="success" @click="eliminarRegistroSiembra(identificadorRedistroSi)">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <!--////////////// DIALOGO DE BANDEJAS ////////////////// -->
    <template>
        <v-dialog v-model="mostrarGestionarBandejas" width="800" persistent>
            <v-card width="800" class="mx-auto">
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">grid_on</v-icon>Gestionar bandejas de siembra
                </v-card-title>
                <v-card-text> </v-card-text>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex md12 sm12 xs12>
                            <v-flex md12>
                                LISTA DE BANDEJAS
                            </v-flex>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">
                                    <span mr-3>{{numBandMostrar}} </span>
                                    <v-icon size="40" class="ml-3" color="success">grid_on</v-icon>
                                </p>
                            </v-flex>
                            <v-flex md4 mx-auto>
                                <v-progress-linear :active="mostrarLoad2" :indeterminate="mostrarLoad2" rounded color="primary accent-4"></v-progress-linear>
                            </v-flex>
                            <v-card width="700" class="mx-auto">
                                <v-flex md12>

                                    <v-flex>
                                        <span v-for="item in vectorActRegistroSiembra " :key="item.idUbicacion">

                                            <v-avatar tile size="65" class="white--text ml-5">
                                                <!--<v-badge dot color="white"  offset-x="25" offset-y="8" avatar >-->
                                                <v-btn icon @click="mostrarLayoutBanUbi=true, mostrarLayoutBanSem(item)">
                                                    <v-avatar tile color="success" class="white--text">{{item}}</v-avatar>
                                                </v-btn>
                                                <!--</v-badge>-->
                                            </v-avatar>

                                        </span>
                                    </v-flex>

                                    <!--   <v-data-iterator :items="this.vectorActRegistroSiembra" item-key="item.idUbicacion" :items-per-page="10">
                                        <template v-slot:default="{ items, isExpanded, expand }">
                                            <v-layout>
                                                <v-flex v-for="item in items" :key="item.idPlanta">
                                                    <v-btn icon @click="mostrarLayoutBanUbi=true, mostrarLayoutBanSem(item)">
                                                        <v-avatar tile color="success" class="white--text">{{item}}</v-avatar>
                                                    </v-btn>

                                                </v-flex>
                                            </v-layout>
                                        </template>
                                    </v-data-iterator>-->
                                </v-flex>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn block dense error color="success" @click="limpiarDatos(),mostrarGestionarBandejas = false">cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <!--////////////// DIALOGO DE LAYOUT DE BANDEJA ////////////////// -->
    <template>
        <v-dialog v-model="mostrarLayoutBanUbi" width="600" persistent>

            <v-card width="600" class="mx-auto" mx-auto>
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">grid_on</v-icon>Gestionar bandeja individual
                </v-card-title>
                <v-card-text> </v-card-text>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex md12 sm12 xs12>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">
                                    <v-icon size="40" class="ml-3" color="success">grid_on</v-icon>
                                </p>
                            </v-flex>
                            <v-flex md4 mx-auto>
                                <v-progress-linear :active="mostrarLoad2" :indeterminate="mostrarLoad2" rounded color="primary accent-4"></v-progress-linear>
                            </v-flex>
                            <v-card width="450" class="mx-auto">
                                <v-flex>
                                    <span v-for="item in layoutBandejaUbi " :key="item.idUbicacion">

                                        <v-avatar tile size="65" class="white--text ml-5" v-if="item.proEstadoUbicacion.idEstadoUbicacion == 2">
                                            <!--<v-badge dot color="white"  offset-x="25" offset-y="8" avatar >-->
                                            <v-btn @click="mostrarCambioEstadoPl= true,dialogoCambioEstadoPlanta(item.idUbicacion, item.ubiPrimeraParte)" color="success"> {{item.idUbicacion}}</v-btn>

                                            <!--</v-badge>-->
                                        </v-avatar>

                                        <v-avatar tile size="65" class="white--text ml-5" v-if="item.proEstadoUbicacion.idEstadoUbicacion == 3">
                                            <!--<v-badge dot color="white"  offset-x="25" offset-y="8" avatar >-->
                                            <v-btn color="info">
                                                <v-icon>block</v-icon>
                                            </v-btn>
                                            <!--</v-badge>-->
                                        </v-avatar>

                                    </span>
                                </v-flex>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn block dense error color="success" @click="limpiarDatos2(),mostrarLayoutBanUbi = false">cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <!--////////////// DIALOGO DE CAMBIO DE ESTADO DE PLANTA  ////////////////// -->
    <template>
        <v-dialog v-model="mostrarCambioEstadoPl" width="600">

            <v-card width="600" class="mx-auto" mx-auto>
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">grid_on</v-icon>Gestionar planta <v-spacer></v-spacer>Planta : {{numPlantaCambioEstado}}
                    <v-spacer></v-spacer> Ubi : {{numUbiCambioEstado}}
                </v-card-title>
                <v-card-text> </v-card-text>

                <v-card-text>
                    <v-select v-model="idEstadoPlanta" item-text="nombreEstadoPlanta" item-value="idEstadoPlanta" label="Estado.." :items="elementosCambioEstadoPlanta"></v-select>
                </v-card-text>

                <v-card-actions>
                    <v-btn dense color="error" @click=" mostrarCambioEstadoPl = false,limpiarDatos3() ">cerrar</v-btn>
                    <v-btn dense color="success" @click="cambiarEstadoPlantaEnBandeja(idEstadoPlanta,numPlantaCambioEstado)">guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>

    <template>
        <div class="text-center ma-2">
            <v-snackbar v-model="notificacionELiminado">
                {{ mensajeNotificacionEliminar }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="success" text v-bind="attrs" @click="notificacionELiminado = false">
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </template>
</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import axios from "axios";
import VueSimpleAlert from "vue-simple-alert"
import Loading2comp from '@/components/Sistema/Loading2comp.vue'
import {
    v4 as uuidv4
} from 'uuid' // Import uuid  
import Loadingcomp from "@/components/Sistema/Loadingcomp.vue";
export default {
    name: "Siembramasivacomp",

    data() {
        return {
            numerosDePlantaParaRegistro: [],
            loading: false,
            loadingEsperaSiembra: false,
            alertaerror: false,
            numUbiCambioEstado: '',
            numPlantaCambioEstado: '',
            numPriPartCambioEstado: '',
            idEstadoPlanta: '',
            posicionerror: '',
            logorevision: 'done',
            colorrevision: 'error',
            desabilitarboton: false,
            loadingrevisarubi: false,
            mostrarLayoutBanUbi: false,
            mensajeAlertaPosiciones: '',
            mensajedisponibilidad: 'Revisar disponibilidad.',
            bandActRegistroSiembra: [],
            vectorActRegistroSiembra: [],
            layoutBandejaUbi: [],
            mostrarLoad2: false,
            numBandMostrar: '',
            loteParaMostrar: '',

            elementosCambioEstadoPlanta: [{
                idEstadoPlanta: '',
                nombreEstadoPlanta: '',
                detalleEstadoPlanta: '',
                proGestionarEstadoPlanta: {
                    idGestionarEstadoPlanta: '',
                    nombGestionarEstadoPlanta: '',
                }
            }],
            desserts: [{
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
                        proGestionarEstadoPlanta: {
                            idGestionarEstadoPlanta: '',
                            nombGestionarEstadoPlanta: ''
                        }
                    },
                    proUbicacion: {
                        idUbicacion: '',
                        ubiPrimeraParte: '',
                        ubiSegundaParte: '',
                        ubiTerceraParte: '',
                        proTipoUbicacion: {
                            idTipoUbicacion: '',
                            nombreTipoUbicacion: '',
                        }
                    },
                    proRegistroSiembra: {
                        idRegistroSiembra: '',
                        loteRegistroSiembra: '',
                        semanaRegistroSiembra: '',
                        pesoImpuresasRegistroSiembra: '',
                        pesoSemillasRegistroSiembra: '',
                        semillasSembradasRegistroSiembra: '',
                        esquejesSembradosRegistroSiembra: '',
                        fechaRegistroSiembra: '',
                        proDiaSemana: {
                            idDiaSemana: '',
                            nombreDiaSemana: '',
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
                            prefijoSemilla: '',
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
                        },
                        proEstadoRegistroSiembra: {
                            idEstadoRegistroSiembra: '',
                            nombreEstadoRegistroSiembra: '',
                            detalleEstadoRegistroSiembra: '',
                        }
                    }
                },

            ],
            singleExpand: false,
            valor: 0,
            aa: 10,
            spiner: 'display:none',
            bandejaInicialSiembra: 0,
            mostrarEliminarRegistroSiembra: false,
            mostrarCambioEstadoPl: false,
            notificacionELiminado: false,
            mensajeNotificacionEliminar: '',
            identificadorRedistroSi: '',
            idRegistroSiembra: '',
            loteRedistroSi: '',
            idRegistroSi: '',
            semillaRedistroSi: '',
            nombreInternoSemillarRegSi: '',
            tabs: null,
            alert: false,
            fecha: null,
            mostrarSiembraMasiva: false,
            mostrarGestionarBandejas: false,
            codigoSemilla: "",
            variable: "",
            semillasSembradasRegistroSiembra: "",
            bandejasNecesariasSiembra: '',
            numeroSemillasSiembra: "",
            loteRegistroSiembra: "",
            almacenSemillaLoteSiembra: "",
            prefijoSemillaSiembra: "",
            pesoSemillaSiembra: "",
            elementosRegistroSiembraActualizar: [{
                idRegistroSiembra: "",
                loteRegistroSiembra: "",
                semanaRegistroSiembra: "",
                pesoImpuresasRegistroSiembra: "",
                pesoSemillasRegistroSiembra: "",
                semillasSembradasRegistroSiembra: "",
                esquejesSembradosRegistroSiembra: '',
                fechaRegistroSiembra: "",
                proDiaSemana: {
                    idDiaSemana: "",

                },
                proSemilla: {
                    codigoSemilla: "",

                },
                proEstadoRegistroSiembra: {
                    idEstadoRegistroSiembra: "",

                }
            }],
            elementosSemilla: [{
                codigoSemilla: "",
                nombreVariedadSemilla: "",
                nombreInternoSemilla: "",
                prefijoSemilla: "",
                proAlmacen: {
                    idAlmacen: "",
                    nombreAlmacen: "",
                    detalleAlmacen: ""
                }
            }],
            cabeceraRegistrosiembra: [
                /*{
                            text: 'Id Registro',
                            value: 'idRegistroSiembra'
                        },*/
                {
                    text: "Lote registro",
                    value: "loteRegistroSiembra"
                },
                /*  {
                              text: 'Semana siembra',
                              value: 'semanaRegistroSiembra'
                          },*/
                {
                    text: "Día siembra",
                    value: "proDiaSemana.nombreDiaSemana"
                },
                /*  {
                              text: 'Peso Impuresas (gr)',
                              value: 'pesoImpuresasRegistroSiembra'
                          },
                          {
                              text: 'Peso Semilla (gr)',
                              value: 'pesoSemillasRegistroSiembra'
                          },*/
                {
                    text: "Nº semillas",
                    value: "semillasSembradasRegistroSiembra"
                },

                {
                    text: "Semilla",
                    value: "proSemilla.nombreInternoSemilla"
                },
                {
                    text: "Estado registro",
                    value: "proEstadoRegistroSiembra.nombreEstadoRegistroSiembra"
                }
            ],
            elementosRegistrosiembra: [{
                idRegistroSiembra: "",
                loteRegistroSiembra: "",
                semanaRegistroSiembra: "",
                pesoImpuresasRegistroSiembra: "",
                pesoSemillasRegistroSiembra: "",
                semillasSembradasRegistroSiembra: "",
                esquejesSembradosRegistroSiembra: '',
                fechaRegistroSiembra: "",
                proDiaSemana: {
                    idDiaSemana: "",
                    nombreDiaSemana: ""
                },
                proSemilla: {
                    codigoSemilla: "",
                    nombreVariedadSemilla: "",
                    nombreInternoSemilla: ""
                },
                proEstadoRegistroSiembra: {
                    idEstadoRegistroSiembra: "",
                    nombreEstadoRegistroSiembra: "",
                    detalleEstadoRegistroSiembra: ""
                }
            }],
            cabeceraRegistrosiembraSiembra: [
                /*{
                                    text: 'Id Registro',
                                    value: 'idRegistroSiembra'
                                },*/
                {
                    text: "Lote registro",
                    value: "loteRegistroSiembra"
                },
                {
                    text: "Semilla",
                    value: "proSemilla.nombreInternoSemilla"
                },
                {
                    text: "Semana",
                    value: "semanaRegistroSiembra"
                },
                {
                    text: "Día siembra",
                    value: "proDiaSemana.nombreDiaSemana"
                },
                {
                    text: "Nº semillas",
                    value: "semillasSembradasRegistroSiembra"
                },
                {
                    text: "Peso semillas (gr)",
                    value: "pesoSemillasRegistroSiembra"
                },

                {
                    text: "Acciones",
                    value: "/"
                }
            ],
            elementosRegistrosiembraSiembra: [{
                idRegistroSiembra: "",
                loteRegistroSiembra: "",
                semanaRegistroSiembra: "",
                pesoImpuresasRegistroSiembra: "",
                pesoSemillasRegistroSiembra: "",
                semillasSembradasRegistroSiembra: "",
                esquejesSembradosRegistroSiembra: '',
                fechaRegistroSiembra: "",
                proDiaSemana: {
                    idDiaSemana: "",
                    nombreDiaSemana: ""
                },
                proSemilla: {
                    codigoSemilla: '',
                    nombreVariedadSemilla: '',
                    nombreInternoSemilla: ''
                },
                proEstadoRegistroSiembra: {
                    idEstadoRegistroSiembra: "",
                    nombreEstadoRegistroSiembra: "",
                    detalleEstadoRegistroSiembra: ""
                }
            }],

        };
    },
    components: {
        Loadingcomp,
        Loading2comp
    },

    mounted() {
        this.mostrarSemilla();
        this.listarRegistrosDeSiembra();

    },

    methods: {
        semanaDelAnioEnCurso(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            var dayNum = d.getUTCDay() + 1 || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        },

        mostrar(a) {
            var result = this.semanaDelAnioEnCurso(new Date(a));
        },
        mostrarSemilla() {
            axios
                .get("http://localhost:12590/api/tucann/proSemilla", {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosSemilla = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        mostrarDialogoSiembraFormaMasiva(semillasSembradasRegistroSiembra, loteRegistroSiembra, codigoSemilla, nombreInternoSemilla, idRegistroSiembra) {

            this.semillasSembradasRegistroSiembra = semillasSembradasRegistroSiembra;
            this.loteRegistroSiembra = loteRegistroSiembra;
            this.bandejasNecesariasSiembra = Math.ceil(semillasSembradasRegistroSiembra / 50);
            this.semillaRedistroSi = codigoSemilla;
            this.nombreInternoSemillarRegSi = nombreInternoSemilla;
            this.idRegistroSiembra = idRegistroSiembra;

        },
        inicialiazarVectorEstadoPlanta() {
            this.elementosCambioEstadoPlanta = [];
        },
        dialogoCambioEstadoPlanta(idUbicacion, ubiPrimeraParte) {

            this.inicialiazarVectorEstadoPlanta();

            axios.get('http://localhost:12590/api/tucann/proPlanta/xubi/' + idUbicacion, {
                    headers: generalHeader()
                })
                .then(res => {

                    this.numPlantaCambioEstado = res.data[0].idPlanta;

                })
                .catch(err => {
                    console.error(err);
                })
            this.numUbiCambioEstado = idUbicacion;
            this.numPriPartCambioEstado = ubiPrimeraParte;
            axios.get('http://localhost:12590/api/tucann/proEstadoPlanta/lepxidgep/' + 1, {
                    headers: generalHeader()
                })
                .then(res => {
                    for (let index = 0; index < res.data.length; index++) {
                        this.elementosCambioEstadoPlanta.push(res.data[index]);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        },

        async cambiarEstadoPlantaEnBandeja(idEstadoPlanta, numPlantaCambioEstado) {

            if (idEstadoPlanta == '' || numPlantaCambioEstado == '') {
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Pilas!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Los campos no pueden quedar vacíos!</spam>',
                    type: "warning",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',

                }).then(r => {

                });
            } else {

                try {
                    await axios.get('http://localhost:12590/api/tucann/proPlanta/' + numPlantaCambioEstado, {
                            headers: generalHeader()
                        })
                        .then(res => {

                            this.loteParaMostrar = res.data.proRegistroSiembra.loteSiembra;
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
                                    idEstadoPlanta: idEstadoPlanta,
                                },
                                proUbicacion: {
                                    idUbicacion: '0-0-0',
                                },
                                proRegistroSiembra: {
                                    idRegistroSiembra: res.data.proRegistroSiembra.idRegistroSiembra,
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

                            axios.get('http://localhost:12590/api/tucann/proUbicacion/bxidu/' + res.data.proUbicacion.idUbicacion, {
                                    headers: generalHeader()
                                })
                                .then(res => {

                                    let json2 = {
                                        idUbicacion: res.data[0].idUbicacion,
                                        ubiPrimeraParte: res.data[0].ubiPrimeraParte,
                                        ubiSegundaParte: res.data[0].ubiSegundaParte,
                                        ubiTerceraParte: res.data[0].ubiTerceraParte,
                                        proEstadoUbicacion: {
                                            idEstadoUbicacion: 3,
                                        },
                                        proTipoUbicacion: {
                                            idTipoUbicacion: res.data[0].proTipoUbicacion.idTipoUbicacion,
                                        }
                                    }

                                    axios.put('http://localhost:12590/api/tucann/proUbicacion/', json2, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {
                                            this.mostrarCambioEstadoPl = false;
                                            this.mostrarLayoutBanUbi = false;
                                            this.limpiarDatos2();
                                            this.limpiarDatos3();

                                        })
                                        .catch(err => {
                                            console.error(err);
                                        })
                                })
                                .catch(err => {
                                    console.error(err);
                                })

                        })
                        .catch(err => {
                            console.error(err);
                        })

                } catch (error) {
                    this.$fire({
                        /// type: 'info',
                        /// message: 'Los campos no pueden quedar vacíos!'
                        title: '<strong class="u">Ups!</strong>',
                        //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                        html: '<spam class="u">Ocurrio un error vuelva a intentarlo!</spam>',
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',
                        /*
                          title: '<strong style="color:blue;font-style: italic; font-family: Roboto,sans-serif" >HTML <u>example</u></strong>',
                        html: 'You can use <b>bold text</b>, ' +
                            '<a href="//sweetalert2.github.io">links</a> ' +
                            'and other HTML tags',
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: '<spam style=" font-family: Roboto,sans-serif">Chevere</spam>',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText: '<spam style="color:blue;font-style: italic; font-family: Roboto,sans-serif"></spam>',
                        cancelButtonAriaLabel: 'Thumbs down' */
                    }).then(r => {

                    });
                } finally {
                    this.cambiarEstaPlantInactiva(numPlantaCambioEstado, this.loteParaMostrar);
                }

            }

        },
        async cambiarEstaPlantInactiva(numPlantaCambioEstado, loteParaMostrar) {
            try {

                await axios.get('http://localhost:12590/api/tucann/proPlantaActividad/xidp/' + numPlantaCambioEstado, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        for (let index = 0; index < res.data.length; index++) {

                            if (res.data[index].estadoActividad == false) {

                                let json4 = {
                                    idPlantaActividad: res.data[index].idPlantaActividad,
                                    estadoActividad: true,
                                    fechaPlantaActividad: res.data[index].fechaPlantaActividad,
                                    loteSiembra: res.data[index].loteSiembra,
                                    proActividad: {
                                        idActividad: res.data[index].proActividad.idActividad,
                                    },
                                    proPlanta: {
                                        idPlanta: res.data[index].proPlanta.idPlanta,
                                    }
                                }

                                axios.put('http://localhost:12590/api/tucann/proPlantaActividad/', json4, {
                                        headers: generalHeader()
                                    })
                                    .then(res => {

                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })
                            }
                        }

                        let json5 = {
                            idPlantaActividad: '',
                            estadoActividad: true,
                            fechaPlantaActividad: '',
                            loteSiembra: loteParaMostrar,
                            proActividad: {
                                idActividad: 10,
                            },
                            proPlanta: {
                                idPlanta: numPlantaCambioEstado,
                            }
                        }

                        axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json5, {
                                headers: generalHeader()
                            })
                            .then(res => {

                            })
                            .catch(err => {
                                console.error(err);
                            })

                        /*    axios.get('http://localhost:12590/api/tucann/proPlanta/' + numPlantaCambioEstado)
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
                                        prefijoPlanta: res.data.prefijoPlanta,
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
                                        proRegistroSiembra: {
                                            idRegistroSiembra: res.data.proRegistroSiembra.idRegistroSiembra,
                                        }

                                    }

                                })
                                .catch(err => {
                                    console.error(err);
                                })*/

                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            } finally {
                //  alert("terminamos");
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Excelente!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Registro guardado con éxito!</spam>',
                    type: "success",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                    /*
                      title: '<strong style="color:blue;font-style: italic; font-family: Roboto,sans-serif" >HTML <u>example</u></strong>',
                    html: 'You can use <b>bold text</b>, ' +
                        '<a href="//sweetalert2.github.io">links</a> ' +
                        'and other HTML tags',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: '<spam style=" font-family: Roboto,sans-serif">Chevere</spam>',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText: '<spam style="color:blue;font-style: italic; font-family: Roboto,sans-serif"></spam>',
                    cancelButtonAriaLabel: 'Thumbs down' */
                }).then(r => {

                });
            }

        },
        mostrarBandeja(numeroBandejaSiembra) {
            axios.get("http://localhost:12590/api/tucann/proUbicación/lpxnb/" + numeroBandejaSiembra, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.desserts = res.data;

                })
                .catch(err => {
                    console.error(err);
                })
        },
        async bandejasActivasRegistroSiembra(semillasSembradasRegistroSiembra, loteRegistroSiembra, codigoSemilla, nombreInternoSemilla, idRegistroSiembra) {
            this.encerarVectorRegSiem();
            this.mostrarLoad2 = true;
            try {
                await axios.get('http://localhost:12590/api/tucann/proPlanta/lpxru/' + loteRegistroSiembra, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        for (let index = 0; index < res.data.length; index++) {
                            this.vectorActRegistroSiembra.push(res.data[index].proUbicacion.ubiPrimeraParte)
                        }
                        this.quitarDuplicados();
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {
            } finally {
                this.mostrarLoad2 = false;
                this.numBandMostrar = this.bandActRegistroSiembra.length;
            }
        },
        mostrarLayoutBanSem(i) {

            axios.get('http://localhost:12590/api/tucann/proUbicacion/bxupp/' + i, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.layoutBandejaUbi = res.data;

                })
                .catch(err => {
                    console.error(err);
                })
        },
        cambiarEstadoPlanta(idUbicacion) {

            axios.get('http://localhost:12590/api/tucann/proPlanta/xubi/' + idUbicacion, {
                    headers: generalHeader()
                })
                .then(res => {

                })
                .catch(err => {
                    console.error(err);
                })
        },
        encerarVectorRegSiem() {
            this.vectorActRegistroSiembra = [];
            this.bandActRegistroSiembra = [];
        },
        quitarDuplicados() {
            var hash = {};

            for (var i = 0; i < this.vectorActRegistroSiembra.length; i++) {
                if (!(this.vectorActRegistroSiembra[i] in hash)) { //it works with objects! in FF, at least
                    hash[this.vectorActRegistroSiembra[i]] = true;
                    this.bandActRegistroSiembra.push(this.vectorActRegistroSiembra[i]);
                }
            }

            this.vectorActRegistroSiembra = this.bandActRegistroSiembra;

            return this.bandActRegistroSiembra;
        },
        invertirFecha(fecha) {
            return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
        },
        crearRegistro(numeroSemillasSiembra, codigoSemilla) {

            if (numeroSemillasSiembra == "" || numeroSemillasSiembra <= 0) {
                //  alert("Debe colocar al menos una semilla");
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Error!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Debe colocar al menos una semilla!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',

                }).then(r => {

                });
            } else if (codigoSemilla == "") {
                //  alert("Debe seleccionar una semilla");
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Error!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Debe seleccionar una semilla!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',

                }).then(r => {

                });
            } else {
                axios.get("http://localhost:12590/api/tucann/proSemilla/" + codigoSemilla, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.pesoSemillaSiembra = res.data.pesoSemilla;

                        var hoy = new Date();
                        var anio = hoy.getFullYear().toString().substr(-2);
                        var anio2 = hoy.getFullYear();
                        var diaSemana = hoy.getDay();
                        var mes = hoy.getMonth() + 1;
                        var dia2 = diaSemana;
                        var dia = hoy.getDate();

                        if (diaSemana === 0) {
                            diaSemana = '7';
                        } else {
                            diaSemana = diaSemana;
                        }

                        if (dia < 10) {
                            dia = '0' + dia;
                        } else {
                            dia = dia;
                        }

                        if (mes < 10) {
                            mes = '0' + mes;
                        } else {
                            mes = mes;
                        }
                        var almacen = res.data.proAlmacen.nombreAlmacen;
                        var tipregsiembra = 1;
                        var prefijo = res.data.prefijoSemilla;
                        var semana = this.semanaDelAnioEnCurso(new Date(hoy));
                        var fechactual = anio2 + '-' + mes + '-' + dia;

                        if (semana < 10) {
                            semana = '0' + semana;
                        } else {
                            semana = semana;
                        }
                        var lote = almacen + tipregsiembra + anio + semana + diaSemana + prefijo;

                        axios.get(
                                "http://localhost:12590/api/tucann/proRegistroSiembra/bxrs/" + lote, {
                                    headers: generalHeader()
                                })
                            .then(res => {
                                if (res.data.length) {
                                    //    alert("Existe ya un registro para esta semilla el día de hoy con el lote de registro de siembra : " + lote);
                                    this.$fire({

                                        title: '<strong class="u">Error!</strong>',
                                        html: '<spam class="u">Existe ya un registro para esta semilla el día de hoy con el lote de registro de siembra : </spam>' + '' + '<strong class="u">' + lote + '</strong>',
                                        type: "error",
                                        timer: 5000,
                                        confirmButtonText: '<spam class="u" >OK</spam>',
                                        confirmButtonColor: '#4CAF50',

                                    }).then(r => {

                                    });
                                } else {
                                    let json = {
                                        idRegistroSiembra: "",
                                        loteRegistroSiembra: lote,
                                        semanaRegistroSiembra: semana,
                                        pesoImpuresasRegistroSiembra: null,
                                        pesoSemillasRegistroSiembra: this.pesoSemillaSiembra,
                                        semillasSembradasRegistroSiembra: numeroSemillasSiembra,
                                        fechaRegistroSiembra: fechactual,
                                        proDiaSemana: {
                                            idDiaSemana: diaSemana
                                        },
                                        proSemilla: {
                                            codigoSemilla: codigoSemilla
                                        },
                                        proEstadoRegistroSiembra: {
                                            idEstadoRegistroSiembra: 1
                                        },
                                        proTipoRegistroSiembra: {
                                            idTipoRegistroSiembra: 1
                                        }
                                    };

                                    axios.post("http://localhost:12590/api/tucann/proRegistroSiembra/", json, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {
                                            this.$fire({
                                                /// type: 'info',
                                                /// message: 'Los campos no pueden quedar vacíos!'
                                                title: '<strong class="u">Excelente!</strong>',
                                                //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                                                html: '<spam class="u">Registro de siembra creado con éxito!</spam>',
                                                type: "success",
                                                timer: 4000,
                                                confirmButtonText: '<spam class="u" >OK</spam>',
                                                confirmButtonColor: '#4CAF50',

                                            }).then(r => {

                                            });
                                            this.limpiarDatos4();
                                            this.listarRegistrosDeSiembra();

                                        })
                                        .catch(err => {
                                            console.error(err);
                                            this.$fire({
                                                /// type: 'info',
                                                /// message: 'Los campos no pueden quedar vacíos!'
                                                title: '<strong class="u">Error!</strong>',
                                                //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                                                html: '<spam class="u">Error faltal!</spam>',
                                                type: "error",
                                                timer: 4000,
                                                confirmButtonText: '<spam class="u" >OK</spam>',
                                                confirmButtonColor: '#4CAF50',

                                            }).then(r => {

                                            });
                                        });
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                this.$fire({
                                    /// type: 'info',
                                    /// message: 'Los campos no pueden quedar vacíos!'
                                    title: '<strong class="u">Error!</strong>',
                                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                                    html: '<spam class="u">ERROR1!</spam>',
                                    type: "error",
                                    timer: 4000,
                                    confirmButtonText: '<spam class="u" >OK</spam>',
                                    confirmButtonColor: '#4CAF50',

                                }).then(r => {

                                });
                            });
                    })
                    .catch(err => {
                        console.error(err);
                        this.$fire({
                            /// type: 'info',
                            /// message: 'Los campos no pueden quedar vacíos!'
                            title: '<strong class="u">Error!</strong>',
                            //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                            html: '<spam class="u">ERROR2!</spam>',
                            type: "error",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',

                        }).then(r => {

                        });
                    });

            }
        },

        listarRegistrosDeSiembra() {

            this.elementosRegistrosiembra = [];
            axios.get("http://localhost:12590/api/tucann/proRegistroSiembra/bxidtrs/1", {
                    headers: generalHeader()
                })
                .then(res => {

                    for (let index = 0; index < res.data.length; index++) {

                        if (res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra == 1) {
                            this.elementosRegistrosiembra.push(res.data[index]);

                        }
                    }
                    this.elementosRegistrosiembraSiembra = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        async crearPlanta(semillasSembradasRegistroSiembra, loteRegistroSiembra, bandejaInicialSiembra, semillaRegistroSi, identificadorRedistroSi, bandejasNecesariasSiembra) {

            try {
                if (semillasSembradasRegistroSiembra <= 0 || semillasSembradasRegistroSiembra == '') {
                    //  alert('La cantidad debe ser mayor a cero!');
                    this.$fire({
                        /// type: 'info',
                        /// message: 'Los campos no pueden quedar vacíos!'
                        title: '<strong class="u">Error!</strong>',
                        //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                        html: '<spam class="u">La cantidad debe ser mayor a cero!</spam>',
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',

                    }).then(r => {

                    });
                } else if (loteRegistroSiembra == '') {
                    // alert('Debe haber por lo menos un lote de siembra!!');
                    this.$fire({
                        /// type: 'info',
                        /// message: 'Los campos no pueden quedar vacíos!'
                        title: '<strong class="u">Error!</strong>',
                        //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                        html: '<spam class="u">Debe haber por lo menos un lote de siembra!</spam>',
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',

                    }).then(r => {

                    });
                } else if (bandejaInicialSiembra == '' || bandejaInicialSiembra <= 0) {
                    //   alert('Debe colocarse por lo menos una bandeja inicial!');
                    this.$fire({
                        /// type: 'info',
                        /// message: 'Los campos no pueden quedar vacíos!'
                        title: '<strong class="u">Error!</strong>',
                        //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                        html: '<spam class="u">Debe colocarse por lo menos una bandeja inicial!</spam>',
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',

                    }).then(r => {

                    });

                } else {

                    let ban = bandejasNecesariasSiembra,
                        ubi = '';
                    let contbandejas = bandejaInicialSiembra;
                    let contadorPalntasSembradas = 0;

                    for (let index = 1; index <= ban; index++) {
                        for (let filas = 1; filas <= 10; filas++) {
                            for (let columnas = 1; columnas <= 5; columnas++) {
                                ubi = contbandejas + '-' + filas + '-' + columnas;

                                contadorPalntasSembradas++;

                                if (contadorPalntasSembradas <= semillasSembradasRegistroSiembra) {

                                    let json = {

                                        idPlanta: 0,
                                        codigoQR: uuidv4(),

                                        porcentajeThcPlanta: 0,
                                        porcentajeCbdPlanta: 0,
                                        numeroBandeja: index,
                                        clasificacionA: 0,
                                        clasificacionB: 0,
                                        clasificacionC: 0,
                                        clasificacionD: 0,
                                        lotePlanta: '',

                                        /////// funcion recursiva para la planta madre
                                        //        proPlanta: {
                                        //         idPlanta: 0,
                                        //   },

                                        proTipoPlanta: {
                                            idTipoPlanta: 1,
                                        },
                                        proEstadoPlanta: {
                                            idEstadoPlanta: 1,
                                        },
                                        proUbicacion: {
                                            idUbicacion: ubi,
                                            ubiPrimeraParte: parseFloat(contbandejas),
                                            ubiSegundaParte: parseFloat(filas),
                                            ubiTerceraParte: parseFloat(columnas),

                                        },
                                        proSemilla: {
                                            codigoSemilla: semillaRegistroSi,
                                        },
                                        proRegistroSiembra: {
                                            idRegistroSiembra: identificadorRedistroSi,
                                        }
                                    }
                                    await axios.post('http://localhost:12590/api/tucann/proPlanta/', json, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {
                                            this.valor = parseInt((contadorPalntasSembradas * 100) / (bandejasNecesariasSiembra * 50));
                                        })
                                        .catch(err => {
                                            console.error(err);
                                        });

                                    let json2 = {
                                        idUbicacion: ubi,
                                        ubiPrimeraParte: parseFloat(contbandejas),
                                        ubiSegundaParte: parseFloat(filas),
                                        ubiTerceraParte: parseFloat(columnas),
                                        proEstadoUbicacion: {
                                            idEstadoUbicacion: 2, //Ocupada
                                        },
                                        proTipoUbicacion: {
                                            idTipoUbicacion: 3, //Bandeja
                                        }
                                    }
                                    await axios.put('http://localhost:12590/api/tucann/proUbicacion/', json2, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {

                                        })
                                        .catch(err => {
                                            console.error(err);
                                        });
                                } else {

                                    let json3 = {
                                        idUbicacion: ubi,
                                        ubiPrimeraParte: parseFloat(contbandejas),
                                        ubiSegundaParte: parseFloat(filas),
                                        ubiTerceraParte: parseFloat(columnas),
                                        proEstadoUbicacion: {
                                            idEstadoUbicacion: 3, //Nula
                                        },
                                        proTipoUbicacion: {
                                            idTipoUbicacion: 3, //Bandeja
                                        }
                                    }
                                    await axios.put('http://localhost:12590/api/tucann/proUbicacion/', json3, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {

                                        })
                                        .catch(err => {
                                            console.error(err);
                                        });
                                }

                            }
                        }
                        contbandejas++;
                    }

                }
            } catch (error) {

            } finally {
                console.log("Termino la creación de plantas!!");
                this.cambiarActividadPlanta(loteRegistroSiembra);
            }
        },

        async comprobarUbi(ubi) {
            let a;
            await axios.get('http://localhost:12590/api/tucann/proUbicacion/bxidu/' + ubi, {
                    headers: generalHeader()
                })
                .then(res => {
                    a = res.data[0].estadoUbicacion;

                })
                .catch(err => {

                    a = 0;

                })

            return a;
        },
        limpiarDatos() {
            this.identificadorRedistroSi = '';
            this.loteRedistroSi = '';
            this.bandejaInicialSiembra = '';
            this.spiner = 'display:none';
            this.valor = 0;
            this.alertaerror = false;
            this.posicionerror = '';
            this.logorevision = 'done';
            this.colorrevision = 'error';
            this.desabilitarboton = false;
            this.mensajedisponibilidad = '';
            this.loadingrevisarubi = false;
            this.numBandMostrar = '';

        },
        limpiarDatos2() {
            this.layoutBandejaUbi = [];

        },
        limpiarDatos3() {
            this.numPlantaCambioEstado = '';
            this.numUbiCambioEstado = '';
            this.idEstadoPlanta = '';

        },
        limpiarDatos4() {
            this.numeroSemillasSiembra = '';
            this.codigoSemilla = '';
        },
        reiniciaralertas() {
            this.logorevision = 'done';
            this.colorrevision = 'error';
            this.alertaerror = false;

        },

        async cambiarActividadPlanta(lot) {

            //     if (lot) {

            try {

                this.loadingEsperaSiembra = true;
                this.numerosDePlantaParaRegistro = [],
                    await axios.get('http://localhost:12590/api/tucann/proPlanta/lpxrsm/' + lot, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        for (let index = 0; index < res.data.length; index++) {
                            this.numerosDePlantaParaRegistro.push(res.data[index].idPlanta);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })

            } catch (error) {

            } finally {
                console.log("Termino la siembra");
                this.crearRegistroSiembraPlanta(this.numerosDePlantaParaRegistro, lot, {
                    headers: generalHeader()
                })

            }

        },
        async crearRegistroSiembraPlanta(res, lot) {

            try {
                for (let index = 0; index < res.length; index++) {

                    let json = {

                        idPlantaActividad: '',
                        fechaPlantaActividad: '',
                        estadoActividad: false,
                        loteSiembra: lot,
                        proActividad: {
                            idActividad: 1,
                        },
                        proPlanta: {
                            idPlanta: res[index],
                        }
                    }

                    await axios.post('http://localhost:12590/api/tucann/proPlantaActividad/', json, {
                            headers: generalHeader()
                        })
                        .then(res => {

                        })
                        .catch(err => {
                            console.error(err);
                        })
                }

            } catch (error) {

            } finally {
                this.cambiarEstadoRegistroSiembra(lot);

            }

        },
        async cambiarEstadoRegistroSiembra(lote) {
            try {
                await axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/bxrs/' + lote, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        let json = {

                            idRegistroSiembra: res.data[0].idRegistroSiembra,
                            loteRegistroSiembra: res.data[0].loteRegistroSiembra,
                            semanaRegistroSiembra: res.data[0].semanaRegistroSiembra,
                            pesoImpuresasRegistroSiembra: res.data[0].pesoImpuresasRegistroSiembra,
                            pesoSemillasRegistroSiembra: res.data[0].pesoSemillasRegistroSiembra,
                            semillasSembradasRegistroSiembra: res.data[0].semillasSembradasRegistroSiembra,
                            fechaRegistroSiembra: res.data[0].fechaRegistroSiembra,
                            proDiaSemana: {
                                idDiaSemana: res.data[0].proDiaSemana.idDiaSemana,
                            },
                            proSemilla: {
                                codigoSemilla: res.data[0].proSemilla.codigoSemilla,
                            },
                            proEstadoRegistroSiembra: {
                                idEstadoRegistroSiembra: 2,
                            },
                            proTipoRegistroSiembra: {
                                idTipoRegistroSiembra: res.data[0].proTipoRegistroSiembra.idTipoRegistroSiembra,
                            }
                        }
                        axios.put('http://localhost:12590/api/tucann/proRegistroSiembra/', json, {
                                headers: generalHeader()
                            })
                            .then(res => {

                                this.listarRegistrosDeSiembra();
                            })
                            .catch(err => {
                                console.error(err);
                            })

                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            } finally {
                console.log("Termino registro lote!");
                this.loadingEsperaSiembra = false;
                this.mostrarSiembraMasiva = false;
                this.loadingEsperaSiembra = false;
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Excelente!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">El proceso de siembra ha terminado!</spam>',
                    type: "success",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',

                }).then(r => {

                });
                this.desabilitarboton = false;

            }

        },

        eliminarRegistroSiembra(id) {

            axios.delete('http://localhost:12590/api/tucann/proRegistroSiembra/' + id, {
                    headers: generalHeader()
                })
                .then(res => {
                    this.mostrarEliminarRegistroSiembra = true;

                    if (res.data == 'OK') {
                        this.mostrarEliminarRegistroSiembra = false;
                        this.notificacionELiminado = true;
                        this.mensajeNotificacionEliminar = 'Registro ' + this.loteRedistroSi + ' eliminado !!';
                        this.listarRegistrosDeSiembra();
                        this.limpiarDatos();
                    }

                })
                .catch(err => {
                    console.error(err);
                    //   alert("No puedes eliminar un registro de siembra si ya tiene plantas referidas a este!");
                    this.$fire({
                        /// type: 'info',
                        /// message: 'Los campos no pueden quedar vacíos!'
                        title: '<strong class="u">Error!</strong>',
                        //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                        html: '<spam class="u">No puedes eliminar un registro de siembra si ya tiene plantas referidas a este!</spam>',
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',

                    }).then(r => {

                    });

                })
        },
        confirmarEliminarRegistroSiembra(idRegistroSiembra, loteRegistroSiembra) {
            this.mostrarEliminarRegistroSiembra = true;
            this.identificadorRedistroSi = idRegistroSiembra;
            this.loteRedistroSi = loteRegistroSiembra;
        },
        async revisarposiciones(inicial, semillas, bandejas) {

            if (inicial <= 0) {

                //    alert("Debe colocar el número de bandeja inicial!");
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Error!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Debe colocar el número de bandeja inicial!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',

                }).then(r => {

                });
            } else {
                this.alertaerror = false;
                this.loadingrevisarubi = true;
                let contadorbandejasOk = 0;
                this.reiniciaralertas();
                for (let index = 0; index < bandejas; index++) {
                    for (let fila = 1; fila <= 10; fila++) {
                        for (let columna = 1; columna <= 5; columna++) {

                            let ubi = inicial + '-' + fila + '-' + columna;

                            await axios.get('http://localhost:12590/api/tucann/proUbicacion/bxidu/' + ubi, {
                                    headers: generalHeader()
                                })
                                .then(res => {
                                    contadorbandejasOk++;
                                    if (res.data[0].proEstadoUbicacion.idEstadoUbicacion == 2) {
                                        fila = 11;
                                        index = bandejas + 1;
                                        columna = 6;
                                        this.mensajeAlertaPosiciones = 'La ubicacion ' + res.data[0].idUbicacion + ' esta ocupada. Para realizar este proceso las bandejas deben tener una secuencia.';
                                        this.posicionerror = res.data[0].idUbicacion;
                                        this.colorrevision = 'error';
                                        this.logorevision = 'error';
                                        this.alertaerror = true;
                                        this.loadingrevisarubi = false;

                                    }

                                })
                                .catch(err => {
                                    console.error(err);
                                    console.log("Error de Ubicacion insuficiente");
                                    fila = 11;
                                    index = bandejas + 1;
                                    columna = 6;
                                    this.mensajeAlertaPosiciones = 'Ubicaciones insuficientes, debe ir a: Ubicación/Nueva y crearlas.';
                                    this.alertaerror = true;
                                    this.loadingrevisarubi = false;

                                })
                        }
                    }
                    inicial++;
                }

                if (contadorbandejasOk == bandejas * 50) {
                    this.colorrevision = 'primary';
                    this.logorevision = 'done_all';
                    this.desabilitarboton = true;
                    this.loadingrevisarubi = false;
                    this.mensajedisponibilidad = 'Disponibilidad correcta';
                }
            }

        },

    }
};
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
