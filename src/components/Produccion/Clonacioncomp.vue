<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-layout>
            <v-flex mx-auto lg12>
                <!--  <h1>SIEMBRA</h1>-->
                <v-btn @click="prueba()">prue</v-btn>
                <v-card elevation-15>
                    <v-card-title class="success white--text">
                        <v-icon size="40" color="yellow">mdi-cannabis</v-icon>
                        <v-icon size="30" color="white">trending_flat</v-icon>
                        <v-icon size="15" color="yellow">mdi-cannabis</v-icon>
                        &nbsp;
                        <h2>Clonación de plantas madres</h2>
                        <v-spacer></v-spacer>
                        <v-btn icon elevation="15" color="white" @click="listarRegistrosDeSiembra()">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <!--////////////////////////////////////// alerta -->
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>

                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                <ul>
                                    Registrar

                                    <li>Se debe crear el lote de clonación <v-chip label color="white" small class="secondary--text dense">
                                            <v-icon size="18">assignment</v-icon>
                                        </v-chip> seleccionando la planta madre.</li>
                                    <p></p>
                                    Clonar
                                    <li>
                                        Se va a seleccionar el número de esquejes <v-chip label color="white" small class="secondary--text dense">
                                            <v-icon size="20">mdi-cannabis</v-icon>
                                        </v-chip> sacados a la planta madre y se procede a crear las plantas .
                                    </li>
                                    <p></p>
                                    Plantar
                                    <li>
                                        Las plantas se va a ubicar <v-chip label color="white" x-small class="secondary--text dense">
                                            <v-icon size="18">grid_on</v-icon>
                                        </v-chip> para posteriormente ser enviadas al campo o dadas de baja.
                                    </li>
                                </ul>

                                <h3>Dias de la semana</h3>
                                <ul>
                                    <li>
                                        <v-chip blue label small color="blue white--text " class="mt-3">Lunes</v-chip>
                                    </li>
                                    <li>
                                        <v-chip blue label small color="green white--text" class="mt-3">Martes</v-chip>
                                    </li>

                                    <li>
                                        <v-chip blue label small color="light-blue white--text" class="mt-3">Miércoles</v-chip>
                                    </li>

                                    <li>
                                        <v-chip blue label small color="red white--text" class="mt-3">Jueves</v-chip>
                                    </li>

                                    <li>
                                        <v-chip blue label small color="yellow black--text" class="mt-3">Viernes</v-chip>
                                    </li>

                                    <li>
                                        <v-chip blue label small color="gray " dark class="mt-3">Sábado</v-chip>
                                    </li>

                                    <li>
                                        <v-chip blue label small color="purple black--text" class="mt-3">Domingo</v-chip>
                                    </li>
                                </ul>
                            </v-alert>
                        </v-card-text>

                    </v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-text>
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
                                                        Plantar
                                                        <v-icon right size="25">mdi-seed-outline</v-icon>
                                                    </div>
                                                    <div v-else>
                                                        Revisar
                                                        <v-icon>grid_on</v-icon>
                                                    </div>
                                                </v-tab>
                                            </v-tabs>
                                        </template>
                                    </v-toolbar>
                                    <v-tabs-items v-model="tabs">
                                        <!-- //////////////// REGISTRAR /////////////// -->
                                        <!-- //////////////// REGISTRAR /////////////// -->
                                        <!-- //////////////// REGISTRAR /////////////// -->
                                        <v-tab-item>
                                            <v-card flat>
                                                <v-card-text></v-card-text>
                                                <v-container success>
                                                    <v-card>
                                                        <v-card-text>
                                                            <v-card-text>
                                                                <v-layout wrap>
                                                                    <v-flex md3></v-flex>
                                                                    <v-flex md5>
                                                                        <!--  <v-select class="ml-3 mr-3" v-model="plantaMadre" item-text="idPlanta" item-value="idPlanta" label="Id Planta Madre" :items="elementosPlantaMadre"></v-select>-->
                                                                        <v-autocomplete class="ml-3 mr-3" label="Id Planta Madre.." :items="elementosPlantaMadre" item-text="idPlanta" item-value="idPlanta" v-model="plantaMadre"></v-autocomplete>
                                                                    </v-flex>
                                                                    <!--    <v-flex md3>
                                                                        <v-text-field v-model="numEsquejes" class="ml-3 mr-3" label="N° esquejes.." type="number"></v-text-field>
                                                                    </v-flex>-->

                                                                    <v-flex md4>
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{ on, attrs }">

                                                                                <v-btn class="ml-2 primary" color="primary" dark v-bind="attrs" v-on="on" @click="crearRegistroClonacion(plantaMadre)">
                                                                                    <v-icon size="25">assignment</v-icon>
                                                                                </v-btn>
                                                                            </template>
                                                                            <span>Crear registro de clonación!</span>
                                                                        </v-tooltip>
                                                                    </v-flex>
                                                                </v-layout>
                                                            </v-card-text>
                                                        </v-card-text>
                                                    </v-card>
                                                    <v-card-text></v-card-text>
                                                    <v-card>
                                                        <v-data-table :sort-by="['idRegistroSiembra']" :sort-desc="[true]" :items="elementosRegistrosiembra" :headers="cabeceraRegistrosiembra" dense>
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
                                                                            <v-chip blue label small color="purple black--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                        </div>
                                                                    </td>
                                                                    <td>{{item.esquejesSembradosRegistroSiembra}}</td>

                                                                    <td>{{item.proEstadoRegistroSiembra.nombreEstadoRegistroSiembra}}</td>
                                                                    <td>
                                                                        <v-tooltip bottom>
                                                                            <template v-slot:activator="{on, attrs}">
                                                                                <v-btn icon color="error" @click="prepararEliminar(item.idRegistroSiembra,1)" v-on="on" v-bind="attrs">
                                                                                    <v-icon>delete</v-icon>
                                                                                </v-btn>
                                                                            </template>
                                                                            <span>Eliminar registro</span>
                                                                        </v-tooltip>

                                                                    </td>
                                                                </tr>
                                                            </template>
                                                        </v-data-table>
                                                    </v-card>
                                                </v-container>
                                            </v-card>
                                        </v-tab-item>
                                        <!-- //////////////// PLANTAR /////////////// -->
                                        <!-- //////////////// PLANTAR /////////////// -->
                                        <!-- //////////////// PLANTAR /////////////// -->
                                        <!-- //////////////// PLANTAR /////////////// -->
                                        <!--/////////////////////////////////////////////////////-->
                                        <v-tab-item>
                                            <v-card flat>
                                                <v-card-text></v-card-text>

                                                <v-container success>
                                                    <v-card-text></v-card-text>
                                                    <v-card>

                                                        <v-card-text>
                                                            <v-card-text>
                                                                <v-layout wrap>
                                                                    <v-flex md1></v-flex>
                                                                    <v-flex md12>
                                                                        <v-data-table :sort-by="['idRegistroSiembra']" :sort-desc="[true]" :items="elementosRegistrosiembraClonar" :headers="cabeceraRegistrosiembraClonar" dense>
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
                                                                                            <v-chip blue label small color="purple black--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td> {{item.esquejesSembradosRegistroSiembra}} </td>
                                                                                    <td> {{item.idPlantaClonada}} </td>
                                                                                    <td>
                                                                                        <div v-if="item.proEstadoRegistroSiembra.idEstadoRegistroSiembra == 1">
                                                                                            <v-tooltip bottom>
                                                                                                <template v-slot:activator="{ on, attrs }">
                                                                                                    <v-btn icon color="primary" @click="gestionarClonacionPlanta(item.loteRegistroSiembra,item.idPlantaClonada,item.idRegistroSiembra)" v-bind="attrs" v-on="on">
                                                                                                        <v-icon size="28">add</v-icon>
                                                                                                    </v-btn>
                                                                                                </template>
                                                                                                <span>Agregar esquejes</span>
                                                                                            </v-tooltip>
                                                                                        </div>
                                                                                        <div v-else>
                                                                                            <v-tooltip bottom>
                                                                                                <template v-slot:activator="{ on, attrs }">
                                                                                                    <v-btn icon color="primary" v-bind="attrs" v-on="on" disabled>
                                                                                                        <v-icon size="28">add</v-icon>
                                                                                                    </v-btn>
                                                                                                </template>
                                                                                                <span>La siembra ya se realizó</span>
                                                                                            </v-tooltip>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div v-if="item.proEstadoRegistroSiembra.idEstadoRegistroSiembra == 1">
                                                                                            <v-tooltip bottom>
                                                                                                <template v-slot:activator="{ on, attrs }">
                                                                                                    <v-btn icon color="primary" @click=" prepararParasembrarClones(item.loteRegistroSiembra,item.idPlantaClonada,item.idRegistroSiembra,item)" v-bind="attrs" v-on="on">
                                                                                                        <v-icon size="28">mdi-sprout</v-icon>
                                                                                                    </v-btn>
                                                                                                </template>
                                                                                                <span>Sembrar clones</span>
                                                                                            </v-tooltip>
                                                                                        </div>
                                                                                        <div v-else-if="item.proEstadoRegistroSiembra.idEstadoRegistroSiembra == 2">
                                                                                            <v-tooltip bottom>
                                                                                                <template v-slot:activator="{ on, attrs }">
                                                                                                    <v-btn icon v-bind="attrs" v-on="on" disabled>
                                                                                                        <v-icon size="28">check</v-icon>
                                                                                                    </v-btn>
                                                                                                </template>
                                                                                                <span>Lote tratado</span>
                                                                                            </v-tooltip>
                                                                                        </div>

                                                                                    </td>
                                                                                </tr>
                                                                            </template>
                                                                        </v-data-table>

                                                                    </v-flex>
                                                                    <v-flex md5>

                                                                    </v-flex>

                                                                    <v-flex md2 class="mt-2">

                                                                    </v-flex>
                                                                </v-layout>
                                                            </v-card-text>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-container>
                                            </v-card>
                                        </v-tab-item>
                                        <!-- //////////////// REVISAR /////////////// -->
                                        <!-- //////////////// REVISAR /////////////// -->
                                        <!-- //////////////// REVISAR /////////////// -->
                                        <!--/////////////////////////////////////////////////////-->
                                        <v-tab-item>
                                            <v-card flat>
                                                <v-card-text></v-card-text>
                                                <v-container success>
                                                    <v-card>
                                                        <v-card-text>
                                                            <v-card-text>
                                                                <v-layout wrap>
                                                                    <v-flex md1></v-flex>
                                                                    <v-flex md3>

                                                                    </v-flex>
                                                                    <v-flex md5>

                                                                    </v-flex>

                                                                    <v-flex md12 class="mt-2">
                                                                        <v-data-table :sort-by="['idRegistroSiembra']" :sort-desc="[true]" :items="elementosRegistrosiembraClonarRevisar" :headers="cabeceraRegistrosiembraClonarRevisar" dense>
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
                                                                                            <v-chip blue label small color="purple black--text">{{item.proDiaSemana.nombreDiaSemana}}</v-chip>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td> {{item.esquejesSembradosRegistroSiembra}} </td>
                                                                                    <td> {{item.idPlantaClonada}} </td>
                                                                                    <td>
                                                                                        <v-btn icon color="primary" @click="gestionarSiembraPlanta(item.loteRegistroSiembra,item.idPlantaClonada,item.idRegistroSiembra)">
                                                                                            <v-icon size="28">mdi-view-grid-plus-outline</v-icon>
                                                                                        </v-btn>
                                                                                    </td>
                                                                                </tr>
                                                                            </template>
                                                                        </v-data-table>
                                                                    </v-flex>
                                                                </v-layout>
                                                            </v-card-text>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-container>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </v-card>
                            </v-container>

                        </template>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
    <v-dialog v-model="dialogoClonacion" width="800">
        <v-card>
            <v-card width="800">
                <v-card-title class="primary white--text">Clonación</v-card-title>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex sm6>
                            <v-flex md6 sm12 xs12 class="mx-auto">
                                <v-flex md12>
                                    <p class="text-md-center text-lg-center text-h6">Lote de clonación</p>
                                </v-flex>
                                <v-flex md12>
                                    <v-sheet class="pa-0">
                                        <v-sheet class="pa-1 mx-auto" elevation="12" color="success" width="200" height="40">
                                            <p class="text-md-center text-lg-center text-h6 white--text">{{lotereg}}</p>
                                        </v-sheet>
                                    </v-sheet>
                                </v-flex>
                            </v-flex>
                        </v-flex>
                        <v-flex sm6>
                            <v-flex md6 sm12 xs12 class="mx-auto">
                                <v-flex md12>
                                    <p class="text-xs-center text-sm-center text-md-center text-lg-center text-h6">Identificador planta</p>
                                </v-flex>
                                <v-flex md12>
                                    <v-sheet class="pa-0">
                                        <v-sheet class="pa-1 mx-auto" elevation="12" color="success" width="200" height="40">
                                            <p class="text-xs-center text-sm-center text-md-center text-lg-center text-h6 white--text">{{plantaClon}}</p>
                                        </v-sheet>
                                    </v-sheet>
                                </v-flex>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
            <v-card-text></v-card-text>
            <v-card elevation="14">
                <v-card-text></v-card-text>
                <v-layout wrap>
                    <v-flex sm4>
                    </v-flex>
                    <v-flex sm4>
                        <v-text-field label="Número esquejes a clonar" text-md-center type="number" v-model="numeroEsquejes" :disabled="activarBoton"></v-text-field>
                    </v-flex>
                    <v-flex sm4>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" class="mt-3 ml-3" v-bind="attrs" v-on="on" :disabled="activarBoton" @click="clonarPlantas(numeroEsquejes,lotereg,plantaClon)">
                                    <v-icon>mdi-cannabis</v-icon>
                                </v-btn>
                            </template>
                            <span>Clonar planta</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
                <v-progress-linear :active="loadingSiembra" :indeterminate="loadingSiembra" absolute bottom color="primary accent-4"></v-progress-linear>
                <v-card-actions>
                    <v-btn @click="encerarDatos()" color="error" :disabled="activarBoton">cerrar</v-btn>
                </v-card-actions>
            </v-card>

        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoSiembraCLones" width="800" persistent>

        <v-card width="800" class="mx-auto" mx-auto>
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
                            <v-progress-linear :active="mostrarLoad" :indeterminate="mostrarLoad" rounded color="primary accent-4"></v-progress-linear>
                        </v-flex>
                        <v-card width="450" class="mx-auto">
                            <v-flex>
                                <span v-for="item in layoutBandejaSiembraClon " :key="item.idUbicacion">

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
                <v-btn block dense error color="success" @click="dialogoSiembraCLones = false">cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <template>
        <v-dialog v-model="mostrarSiembraClonesMasiva" width="600" persistent>
            <v-card width="600" class="mx-auto">
                <v-card-title class="success white--text">
                    <v-icon left size="25" color="analogo3">mdi-seed-outline</v-icon>Sembrar clones de forma masiva
                    <v-spacer></v-spacer>
                    <v-chip label large color="analogo1" class="text-h5 white--text"> {{this.nombreInternoSemillaMostrar}} </v-chip>
                    <span class="uuu">{{idRegistroSiembraMostrar}} </span>
                </v-card-title>

                <v-card-text>
                    <v-layout wrap>
                        <v-flex md6 sm12 xs12>
                            <v-flex md12>
                                <p class="text-md-center text-lg-center text-h6">Lote de clonación</p>
                            </v-flex>
                            <v-flex md12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-lg-center text-h6 white--text">{{this.loteClonacionMostrar}}</p>
                                    </v-sheet>
                                </v-sheet>

                            </v-flex>
                        </v-flex>
                        <v-flex md6 sm12 xs12>
                            <v-flex ms12>
                                <p class="text-md-center text-lg-center text-h6">Número de esquejes</p>
                            </v-flex>
                            <v-flex sm12>
                                <v-sheet class="pa-1">
                                    <v-sheet class="pa-1 mx-auto" elevation="12" color="success">
                                        <p class="text-md-center text-h6 white--text">{{this.esquejesSembradosRegistroSiembraMostrar}}</p>
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
                                        <p class="text-md-center text-lg-center text-h6 white--text">{{this.bandejasNecesariasSiembraClones}}</p>

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
                                        <div v-if="bandejaInicialSiembra>0" class="ml-5 mr-5"> Desde {{ (bandejaInicialSiembra)*1 }} - Hasta {{ ( this.bandejasNecesariasSiembraClones) + (bandejaInicialSiembra)*1 -1 }}</div>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on">

                                                    <v-flex sm12 class="text-md-center text-lg-center">
                                                        <v-btn :disabled="desabilitarboton" class="white" icon small @click="revisarposiciones(bandejaInicialSiembra, esquejesSembradosRegistroSiembraMostrar, bandejasNecesariasSiembraClones)">
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
                <v-card-text>
                </v-card-text>
                <v-divider class="success"></v-divider>
                <v-card-actions>
                    <v-btn class="error" @click="mostrarSiembraClonesMasiva= false , limpiarDatos()">cancelar</v-btn>
                    &nbsp;
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :disabled="!desabilitarboton" class="success" @click="sembrarClones(esquejesSembradosRegistroSiembraMostrar,loteClonacionMostrar,bandejaInicialSiembra,idRegistroSiembraMostrar,bandejasNecesariasSiembraClones)" v-bind="attrs" v-on="on">
                                <v-icon>mdi-sprout-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Plantar</span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>

    <v-dialog width="450" v-model="dialogoPlantasActRegistroSiembra" persistent>
        <v-card width="450">
            <v-card-title class="primary white--text">PLANTAS EXISTENTES <v-spacer></v-spacer>
                <v-btn elevation="15" icon @click="dialogoPlantasActRegistroSiembra = false">
                    <v-icon color="white">close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text> </v-card-text>
            <v-card-text>
                <v-data-table :headers="cabecerasEliminarPlantas" :items="elementosEliminarPlantas" dense>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td> {{item.idPlanta}} </td>
                            <td> {{item.proRegistroSiembra.loteRegistroSiembra}} </td>
                            <td>
                                <v-btn icon @click="prepararEliminar(item.idPlanta,2)">
                                    <v-icon color="error">delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoPreguntarEliminarRegistroSiembra" max-width="500px" persistent>
        <v-card>
            <v-card-title class="text-h5 primary--text">{{mensajeDialogoEliminar}} <span class="uuu">{{indicadorTransaccion}} </span> </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary white--text" text @click="dialogoPreguntarEliminarRegistroSiembra = false">Cancelar</v-btn>
                <v-btn class="primary white--text" @click="revisarPElimacionRegistroClonacion(indicadorTransaccion)">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import plantaService from '@/services/produccion/planta.service.js'
import ubicacionService from '@/services/produccion/ubicacion.service.js'
import actividadPlantaServ from '@/services/produccion/actividad.service.js'
import registroSiembraServ from '@/services/produccion/registrosiembra.service.js'
import axios from 'axios'
import {
    v4 as uuidv4
} from 'uuid' // Import uuid 
import {
    json
} from 'body-parser';
export default {
    created() {
        let tipoplanta = 'Madre';
        axios.get('http://localhost:12590/api/tucann/proPlanta/xnomtp/' + tipoplanta, {
                headers: generalHeader()
            })
            .then(res => {
                this.elementosPlantaMadre = res.data;
            })
            .catch(err => {
                console.error(err);
            })
        this.listarRegistrosDeSiembra();
    },
    data() {
        return {
            numeroPlantas: 0,
            indicadorTransaccion: '',
            mensajeDialogoEliminar: '',
            idRegistroSiembraGestionar: '',
            idPlantaGestionar: '',
            dialogoPreguntarEliminarRegistroSiembra: false,
            dialogoPlantasActRegistroSiembra: false,
            loteRegistroSiembraMostrar: '',
            idPlantaClonadaMostrar: '',
            idRegistroSiembraMostrar: '',
            idRegistroSiembraMostrar: '',
            idRegistroSiembra: '',
            nombreInternoSemillarRegSi: '',
            loteRegistroSiembra: '',
            esquejesSembradosRegistroSiembra: '',
            bandejasNecesariasSiembra: '',
            desabilitarboton: false,
            bandejaInicialSiembra: '',

            alertaerror: false,
            mensajeAlertaPosiciones: '',
            loadingrevisarubi: false,
            valor: '',
            loadingEsperaSiembra: false,

            ////////////////////
            mensajedisponibilidad: 'Revisar disponibilidad.',
            colorrevision: 'error',
            logorevision: 'done',
            loteClonacionMostrar: '',
            nombreInternoSemillaMostrar: '',
            bandejasNecesariasSiembraClones: '',
            esquejesSembradosRegistroSiembraMostrar: '',
            /////////////////
            mostrarSiembraClonesMasiva: false,
            e1: 1,
            min: 0,
            max: 50,
            slider: 0,
            ss: '',
            activarBoton: false,
            dialogoSiembraCLones: false,
            mostrarLoad: false,
            layoutBandejaSiembraClon: [],
            /////////////////
            tabs: null,
            plantaMadre: '',
            numEsquejes: '',
            /////////////////
            alert: false,
            numBandeja: '',
            selectplanta: '',
            mensaje: '',
            mensajeNotificacion: '',
            notificacion: false,
            /////////////////
            dialogoClonacion: false,
            numeroEsquejes: '',
            /////////////////
            loadingSiembra: false,
            lotereg: '',
            plantaClon: '',
            ////////////////
            semi: '',

            idPlanta: '',
            codigoQR: '',
            porcentajeThcPlanta: '',
            porcentajeCbdPlanta: '',
            numeroBandeja: '',

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

            cabeceraRegistrosiembra: [{
                    text: "Lote registro",
                    value: "loteRegistroSiembra"
                },
                {
                    text: "Día de clonación",
                    value: "proDiaSemana.nombreDiaSemana"
                },
                {
                    text: "Nº esquejes",
                    value: "esquejesSembradosRegistroSiembra"
                },
                {
                    text: "Estado registro",
                    value: "proEstadoRegistroSiembra.nombreEstadoRegistroSiembra"
                },
                {
                    text: "Acciones",
                    value: ""
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
                idPlantaClonada: '',
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
            /////////////////////////////////////////// REGISTRO DE SIEMBRA ////////////////////////////
            cabeceraRegistrosiembraClonar: [{
                    text: "Lote registro",
                    value: "loteRegistroSiembra"
                },
                {
                    text: "Día siembra",
                    value: "proDiaSemana.nombreDiaSemana"
                },
                {
                    text: "Nº esquejes",
                    value: "esquejesSembradosRegistroSiembra"
                },
                {
                    text: "Planta Madre",
                    value: "idPlantaClonada"
                },
                {
                    text: "Agregar esquejes",
                    value: ""
                },
                {
                    text: "Acciones",
                    value: ""
                }
            ],
            elementosRegistrosiembraClonar: [{
                idRegistroSiembra: "",
                loteRegistroSiembra: "",
                semanaRegistroSiembra: "",
                pesoImpuresasRegistroSiembra: "",
                pesoSemillasRegistroSiembra: "",
                semillasSembradasRegistroSiembra: "",
                esquejesSembradosRegistroSiembra: '',
                idPlantaClonada: '',
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
            /////////////////////////////////////////// REGISTRO DE SIEMBRA BANDEJAS VISTA  ////////////////////////////////
            cabeceraRegistrosiembraClonarRevisar: [{
                    text: "Lote registro",
                    value: "loteRegistroSiembra"
                },
                {
                    text: "Día siembra",
                    value: "proDiaSemana.nombreDiaSemana"
                },
                {
                    text: "Nº esquejes",
                    value: "esquejesSembradosRegistroSiembra"
                },
                {
                    text: "Planta Madre",
                    value: "idPlantaClonada"
                },
                {
                    text: "Acciones",
                    value: ""
                }
            ],
            elementosRegistrosiembraClonarRevisar: [{
                idRegistroSiembra: "",
                loteRegistroSiembra: "",
                semanaRegistroSiembra: "",
                pesoImpuresasRegistroSiembra: "",
                pesoSemillasRegistroSiembra: "",
                semillasSembradasRegistroSiembra: "",
                esquejesSembradosRegistroSiembra: '',
                idPlantaClonada: '',
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
            ////////////////////////////////////////// PLANTA //////////////////////
            titulosPlanta: [{
                    text: "ID",
                    align: "start",
                    //  sortable: false,
                    value: "idPlanta"
                },
                {
                    text: "Id Madre",
                    value: "proPlanta.idPlanta",
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
            elementosPlanta: [{

                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
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
                }

            }],
            elementosPlantaMadre: [{

                idPlanta: '',
                codigoQR: '',
                porcentajeThcPlanta: '',
                porcentajeCbdPlanta: '',
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
                }
            }],
            cabecerasEliminarPlantas: [{
                text: 'Id',
                value: 'idPlanta'
            }, {
                text: 'Lote',
                value: 'proRegistroSiembra.loteRegistroSiembra'
            }, {
                text: 'Acción',
                value: ''
            }],
            elementosEliminarPlantas: [{
                idPlanta: '',
                proRegistroSiembra: {
                    loteRegistroSiembra: ''
                }
            }],
        }
    },
    methods: {

        prueba() {
            axios.get('http://localhost:12590/api/tucann/proPlanta/lista', {
                    headers: generalHeader()
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
        },

        prepararEliminar(id, clave) {
            switch (clave) {
                case 1:
                    this.mensajeDialogoEliminar = "Seguro que desea eliminar el registro?";
                    this.idRegistroSiembraGestionar = id;
                    this.indicadorTransaccion = 1;
                    this.dialogoPreguntarEliminarRegistroSiembra = true;
                    break;
                case 2:
                    this.mensajeDialogoEliminar = "Seguro que desea eliminar la planta?";
                    this.idPlantaGestionar = id;
                    this.indicadorTransaccion = 2;
                    this.dialogoPreguntarEliminarRegistroSiembra = true;
                    break;

                default:
                    break;
            }
        },

        revisarPElimacionRegistroClonacion(clave) {
            switch (clave) {
                case 1:
                    let idReg = this.idRegistroSiembraGestionar;
                    this.dialogoPreguntarEliminarRegistroSiembra = false;
                    plantaService.devolverNumPlantasEnRegistroSiembra(idReg).then((result) => {
                        if (result.data > 0) {
                            this.listarPlantasXRegSiem(idReg);
                        } else {
                            this.eliminarRegistroSiembra(idReg);
                        }
                    }).catch((err) => {});

                    break;

                case 2:
                    plantaService.eliminarPlanta(this.idPlantaGestionar).then((result) => {
                        this.prepararActualizarPlantasEnRegistro(this.idRegistroSiembraGestionar);
                        this.listarRegistrosDeSiembra();
                        let mensaje = "Planta eliminada correctamante!";
                        this.mensajesRespuesta(mensaje, 1);
                        this.revisarPElimacionRegistroClonacion(1);
                        this.dialogoPreguntarEliminarRegistroSiembra = false;
                    }).catch((err) => {});
                    break;
                default:
                    break;
            }
        },

        listarPlantasXRegSiem(idRegistroSiembra) {
            plantaService.listaPlantasXIdRegistroSiembra(idRegistroSiembra).then((result) => {
                this.elementosEliminarPlantas = result.data;
                this.dialogoPlantasActRegistroSiembra = true;
            }).catch((err) => {});
        },

        eliminarRegistroSiembra(idRegistroSiembra) {

            registroSiembraServ.eliminarRegistrosSiembraActivos(idRegistroSiembra).then((result) => {
                this.listarRegistrosDeSiembra();
                let mensaje = "Registro eliminado correctamante!";
                this.mensajesRespuesta(mensaje, 1);

            }).catch((err) => {});
        },

        async sembrarClones(esquejesSembradosRegistroSiembraMostrar, loteClonacionMostrar, bandejaInicialSiembra, idRegistroSiembra, bandejasNecesariasSiembraClones) {
            try {
                if (esquejesSembradosRegistroSiembraMostrar <= 0 || esquejesSembradosRegistroSiembraMostrar == '') {
                    let mensaje = "La cantidad debe ser mayor a cero!";
                    this.mensajesRespuesta(mensaje, 2);
                } else if (loteClonacionMostrar == '') {
                    let mensaje = "Debe haber por lo menos un lote de siembra!";
                    this.mensajesRespuesta(mensaje, 2);
                } else if (bandejaInicialSiembra == '' || bandejaInicialSiembra <= 0) {
                    let mensaje = "Debe colocarse por lo menos una bandeja inicial!";
                    this.mensajesRespuesta(mensaje, 2);
                } else {

                    await plantaService.listarPlantasXRegistroSiembra(loteClonacionMostrar).then((resp) => {

                        let ban = bandejasNecesariasSiembraClones,
                            ubi = '';
                        let contbandejas = bandejaInicialSiembra;
                        let contadorPalntasSembradas = 0;
                        let numeroFilas = 10,
                            numeroColumnas = 5;

                        for (let index = 1; index <= ban; index++) {
                            for (let filas = 1; filas <= numeroFilas; filas++) {
                                for (let columnas = 1; columnas <= numeroColumnas; columnas++) {

                                    ubi = contbandejas + '-' + filas + '-' + columnas;
                                    if (contadorPalntasSembradas < esquejesSembradosRegistroSiembraMostrar) {
                                        let indice = contadorPalntasSembradas++;
                                        let actividadPlanta = {
                                            idPlantaActividad: '',
                                            fechaPlantaActividad: '',
                                            estadoActividad: false,
                                            loteSiembra: loteClonacionMostrar,
                                            proActividad: {
                                                idActividad: 1,
                                            },
                                            proPlanta: {
                                                idPlanta: resp.data[indice].idPlanta,
                                            }
                                        }
                                        let auxiliar = contadorPalntasSembradas - 1;
                                        this.crearActividadPlanta(actividadPlanta);
                                        this.gestionarUbicacionPlanta(ubi);
                                        this.actualizarUbicacionPlanta(resp.data[auxiliar], ubi.toString());
                                        
                                    } else {

                                        ubicacionService.buscarUbicacionXIdUbicacion(ubi).then((resp) => {
                                            let ubicacionnula = {
                                                idUbicacion: resp.data.idUbicacion,
                                                ubiPrimeraParte: resp.data.ubiPrimeraParte,
                                                ubiSegundaParte: resp.data.ubiSegundaParte,
                                                ubiTerceraParte: resp.data.ubiTerceraParte,
                                                proEstadoUbicacion: {
                                                    idEstadoUbicacion: 3, //nula
                                                },
                                                proTipoUbicacion: {
                                                    idTipoUbicacion: resp.data.proTipoUbicacion.idTipoUbicacion, //Bandeja
                                                }
                                            }
                                            ubicacionService.modificarUbicacion(ubicacionnula).then(() => {})
                                        })
                                    }
                                }
                            }
                        }
                    })
                }
            } catch (error) {} finally {
                this.cambiarEstadoRegistroSiembra(loteClonacionMostrar);
            }
        },


        crearActividadPlanta(actividadPlanta) {
            actividadPlantaServ.crearActividadPlanta(actividadPlanta).then((result) => {}).catch((err) => {});
        },

        gestionarUbicacionPlanta(ubi) {
            ubicacionService.buscarUbicacionXIdUbicacion(ubi).then((resp) => {
                let ubicacion = {
                    idUbicacion: resp.data.idUbicacion,
                    ubiPrimeraParte: resp.data.ubiPrimeraParte,
                    ubiSegundaParte: resp.data.ubiSegundaParte,
                    ubiTerceraParte: resp.data.ubiTerceraParte,
                    proEstadoUbicacion: {
                        idEstadoUbicacion: 2, //Ocupada
                    },
                    proTipoUbicacion: {
                        idTipoUbicacion: resp.data.proTipoUbicacion.idTipoUbicacion, //Bandeja
                    }
                }
                ubicacionService.modificarUbicacion(ubicacion).then(() => {})
            })
        },

        actualizarUbicacionPlanta(planta, ubicacion) {

            let plantaActualizada = {
                clasificacionA: planta.clasificacionA,
                clasificacionB: planta.clasificacionB,
                clasificacionC: planta.clasificacionC,
                clasificacionD: planta.clasificacionD,
                codigoQR: planta.codigoQR,
                idPlanta: planta.idPlanta,
                lotePlanta: planta.lotePlanta,
                numeroBandeja: planta.numeroBandeja,
                porcentajeCbdPlanta: planta.porcentajeCbdPlanta,
                porcentajeThcPlanta: planta.porcentajeThcPlanta,
                prefijoPlanta: planta.prefijoPlanta,

                proEstadoPlanta: {
                    idEstadoPlanta: 1,
                },
                proPlanta: {
                    idPlanta: planta.proPlanta.idPlanta,
                },
                proRegistroSiembra: {
                    idRegistroSiembra: planta.proRegistroSiembra.idRegistroSiembra
                },
                proTipoPlanta: {
                    idTipoPlanta: planta.proTipoPlanta.idTipoPlanta,
                },
                proUbicacion: {
                    idUbicacion: ubicacion
                },
            }
            plantaService.actualizarPlanta(plantaActualizada).then((result) => {}).catch((err) => {});
        },

        async cambiarEstadoRegistroSiembra(lote) {
            try {
                await axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/bxrs/' + lote, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        let registroSiembra = {

                            idRegistroSiembra: res.data[0].idRegistroSiembra,
                            loteRegistroSiembra: res.data[0].loteRegistroSiembra,
                            semanaRegistroSiembra: res.data[0].semanaRegistroSiembra,
                            pesoImpuresasRegistroSiembra: res.data[0].pesoImpuresasRegistroSiembra,
                            pesoSemillasRegistroSiembra: res.data[0].pesoSemillasRegistroSiembra,
                            semillasSembradasRegistroSiembra: res.data[0].semillasSembradasRegistroSiembra,
                            esquejesSembradosRegistroSiembra: res.data[0].esquejesSembradosRegistroSiembra,
                            idPlantaClonada: res.data[0].idPlantaClonada,
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
                        registroSiembraServ.modificarRegistroSiembra(registroSiembra).then(() => {
                            this.listarRegistrosDeSiembra();
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
                this.desabilitarboton = false;
                this.mostrarSiembraClonesMasiva = false;
                let mensaje = "El proceso de siembra ha terminado!";
                this.mensajesRespuesta(mensaje, 1);
            }
        },

        async cambiarActividadPlanta(lot) {
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
            }

        },
        async revisarposiciones(inicial, semillas, bandejas) {

            if (inicial <= 0) {
                let mensaje = "Debe colocar el número de bandeja inicial!";
                this.mensajesRespuesta(mensaje, 2);
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

        prepararParasembrarClones(loteRegistroClonacion, idPlantaClonada, idRegistroSiembra, item) {

            if (item.esquejesSembradosRegistroSiembra != null) {
                this.loteClonacionMostrar = loteRegistroClonacion;
                this.esquejesSembradosRegistroSiembraMostrar = item.esquejesSembradosRegistroSiembra;
                this.nombreInternoSemillaMostrar = item.proSemilla.nombreInternoSemilla;
                this.bandejasNecesariasSiembraClones = Math.ceil(item.esquejesSembradosRegistroSiembra / 50);
                this.idRegistroSiembraMostrar = idRegistroSiembra;
                this.mostrarSiembraClonesMasiva = true;

            } else {
                let mensaje = "Debes agregar almenos un esqueje, para poder realizar la siembra!";
                this.mensajesRespuesta(mensaje, 2);
            }
        },

        gestionarSiembraPlanta(loteRegistroSiembra, idPlantaClonada, idRegistroSiembra) {
            this.loteRegistroSiembraMostrar = loteRegistroSiembra;
            this.idPlantaClonadaMostrar = idPlantaClonada;
            this.idRegistroSiembraMostrar = idRegistroSiembra;

            console.log(loteRegistroSiembra)
            console.log(idPlantaClonada)
            console.log(idRegistroSiembra)
            this.dialogoSiembraCLones = true;
        },

        async clonarPlantas(numeroEsquejes, lotereg, plantaClon) {
            try {
                if (numeroEsquejes == '' || numeroEsquejes == null || numeroEsquejes == NaN || numeroEsquejes == undefined) {
                    let mensaje = "Debe colocar al menos un esqueje!";
                    this.mensajesRespuesta(mensaje, 2);
                } else if (numeroEsquejes <= 0) {
                    let mensaje = "Valor no permitido!";
                    this.mensajesRespuesta(mensaje, 2);
                } else {
                    this.activarBoton = true;
                    this.loadingSiembra = true;
                    for (let index = 0; index < numeroEsquejes; index++) {
                        let planta = {
                            idPlanta: '',
                            codigoQR: uuidv4(),
                            porcentajeThcPlanta: 0,
                            porcentajeCbdPlanta: 0,
                            numeroBandeja: 0,
                            clasificacionA: 0,
                            clasificacionB: 0,
                            clasificacionC: 0,
                            clasificacionD: 0,
                            lotePlanta: '',
                            ////////////////////// funcion recursiva para la planta madre
                            proPlanta: {
                                idPlanta: this.plantaClon,
                            },
                            proTipoPlanta: {
                                idTipoPlanta: 3,
                            },
                            proEstadoPlanta: {
                                idEstadoPlanta: 4,
                            },
                            proUbicacion: {
                                idUbicacion: '0-0-0',
                            },
                            proRegistroSiembra: {
                                idRegistroSiembra: this.idRegSiem
                            }
                        }
                        await plantaService.crearPlanta(planta).then((result) => {}).catch((err) => {

                        });
                    }
                }
            } catch (error) {

            } finally {

                this.prepararActualizarPlantasEnRegistro(this.idRegSiem);
                this.encerarDatos();
                this.listarRegistrosDeSiembra();

                this.$fire({
                    title: '<strong class="u">Éxito!</strong>',
                    html: '<spam class="u">Se agregaron </spam>' + '<strong>' + numeroEsquejes + '</strong>' + '<spam class="u"> esquejes al lote de clonación!</spam>',
                    type: "success",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {});
            }

        },

        async clonarPlantasxxxx(numeroEsquejes) {

            try {
                if (numeroEsquejes < 1 || numeroEsquejes == '' || numeroEsquejes == null || numeroEsquejes == NaN || numeroEsquejes == undefined) {
                    let mensaje = "Debe colocar almenos un esqueje!";
                    this.mensajesRespuesta(mensaje, 2);
                } else if (numeroEsquejes <= 0) {
                    let mensaje = "Valor no permitido!";
                    this.mensajesRespuesta(mensaje, 2);
                } else {
                    this.activarBoton = true;
                    this.loadingSiembra = true;
                    for (let index = 0; index < numeroEsquejes; index++) {
                        let json = {
                            idPlanta: '',
                            codigoQR: uuidv4(),
                            porcentajeThcPlanta: 0,
                            porcentajeCbdPlanta: 0,
                            numeroBandeja: 0,
                            clasificacionA: 0,
                            clasificacionB: 0,
                            clasificacionC: 0,
                            clasificacionD: 0,
                            lotePlanta: '',
                            ////////////////////// funcion recursiva para la planta madre
                            proPlanta: {
                                idPlanta: this.plantaClon,
                            },
                            proTipoPlanta: {
                                idTipoPlanta: 3,
                            },
                            proEstadoPlanta: {
                                idEstadoPlanta: 4,
                            },
                            proUbicacion: {
                                idUbicacion: '0-0-0',
                            },
                            proRegistroSiembra: {
                                idRegistroSiembra: this.idRegSiem
                            }
                        }
                        await axios.post('http://localhost:12590/api/tucann/proPlanta/', json, {
                                headers: generalHeader()
                            })
                            .then(res => {

                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }

                }
            } catch (error) {

            } finally {
                this.activarBoton = false;
                this.loadingSiembra = false;
                this.dialogoClonacion = false;

                axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/' + this.idRegSiem, {
                        headers: generalHeader()
                    })
                    .then(res => {

                        let json = {
                            idRegistroSiembra: res.data.idRegistroSiembra,
                            loteRegistroSiembra: res.data.loteRegistroSiembra,
                            semanaRegistroSiembra: res.data.semanaRegistroSiembra,
                            pesoImpuresasRegistroSiembra: res.data.pesoImpuresasRegistroSiembra,
                            pesoSemillasRegistroSiembra: res.data.pesoSemillasRegistroSiembra,
                            semillasSembradasRegistroSiembra: res.data.semillasSembradasRegistroSiembra,
                            esquejesSembradosRegistroSiembra: res.data.esquejesSembradosRegistroSiembra + numeroEsquejes,
                            idPlantaClonada: res.data.idPlantaClonada,
                            fechaRegistroSiembra: res.data.fechaRegistroSiembra,

                            proDiaSemana: {
                                idDiaSemana: res.data.proDiaSemana.idDiaSemana,
                            },
                            proSemilla: {
                                codigoSemilla: res.data.proSemilla.codigoSemilla,
                            },
                            proEstadoRegistroSiembra: {
                                idEstadoRegistroSiembra: res.data.proEstadoRegistroSiembra.idEstadoRegistroSiembra,
                            },
                            proTipoRegistroSiembra: {
                                idTipoRegistroSiembra: res.data.proTipoRegistroSiembra.idTipoRegistroSiembra,
                            }
                        }

                        axios.put('http://localhost:12590/api/tucann/proRegistroSiembra/', json, {
                                headers: generalHeader()
                            })
                            .then(res => {
                                this.encerarDatos();
                                this.listarRegistrosDeSiembra();
                                this.$fire({
                                    title: '<strong class="u">Éxito!</strong>',
                                    html: '<spam class="u">Se agregaron </spam>' + '<strong>' + numeroEsquejes + '</strong>' + '<spam class="u"> esquejes al lote de clonación!</spam>',
                                    type: "success",
                                    timer: 4000,
                                    confirmButtonText: '<spam class="u" >OK</spam>',
                                    confirmButtonColor: '#4CAF50',
                                }).then(r => {});
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },

        encerarDatos() {
            this.dialogoClonacion = false;
            this.numeroEsquejes = '';
            this.lotereg = '';
            this.plantaClon = '';
            this.idRegSiem = '';
            this.numeroEsquejes = '';
            this.activarBoton = false;
            this.loadingSiembra = false;

        },

        gestionarClonacionPlanta(loteRegistroSiembra, idPlantaClonada, idRegistroSiembra) {
            this.lotereg = loteRegistroSiembra;
            this.plantaClon = idPlantaClonada;
            this.idRegSiem = idRegistroSiembra;
            this.dialogoClonacion = true;
        },
        semanaDelAnioEnCurso(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            var dayNum = d.getUTCDay() + 1 || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        },

        crearRegistroClonacion(plantaMadre) {
            if (plantaMadre == '' || plantaMadre == undefined) {
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Ups!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Los campos no pueden quedar vacíos!</spam>',
                    type: "error",
                    timer: 4000,
                    confirmButtonText: '<spam class="u" >OK</spam>',
                    confirmButtonColor: '#4CAF50',
                }).then(r => {
                    // console.log(r);
                });

            } else {

                axios.get("http://localhost:12590/api/tucann/proPlanta/" + plantaMadre, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.semi = res.data.proRegistroSiembra.proSemilla.codigoSemilla;
                        var hoy = new Date();
                        var anio = hoy.getFullYear().toString().substr(-2);
                        var anio2 = hoy.getFullYear();
                        var dia = hoy.getDay();
                        var mes = hoy.getMonth() + 1;
                        var dia2 = dia;
                        var prefi = res.data.prefijoPlanta;

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
                        var almacen = res.data.proRegistroSiembra.proSemilla.proAlmacen.nombreAlmacen;
                        var tpregsiembra = 2;
                        var idplanta = res.data.idPlanta;
                        var semana = this.semanaDelAnioEnCurso(new Date(hoy));
                        var fechactual = anio2 + '-' + mes + '-' + dia;
                        if (semana < 10) {
                            semana = '0' + semana;
                        } else {
                            semana = semana;
                        }
                        var lote = almacen + tpregsiembra + anio + semana + dia2 + prefi;

                        axios.get("http://localhost:12590/api/tucann/proRegistroSiembra/bxrs/" + lote, {
                                headers: generalHeader()
                            })
                            .then(res => {
                                if (res.data.length) {
                                    // alert( "Existe ya un registro para esta semilla el día de hoy con el lote de registro de siembra : " + lote);
                                    this.$fire({
                                        /// type: 'info',
                                        /// message: 'Los campos no pueden quedar vacíos!'
                                        title: '<strong class="u">Error!</strong>',
                                        //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                                        html: '<spam class="u">Existe ya un registro para la planta, </spam>' + '<strong class="u">' + plantaMadre + '</strong>' + '<spam class="u"> el día de hoy con el lote de registro de siembra : </spam>' + '<strong class="u">' + lote + '</strong>',
                                        type: "error",
                                        timer: 4000,
                                        confirmButtonText: '<spam class="u" >OK</spam>',
                                        confirmButtonColor: '#4CAF50',

                                    }).then(r => {
                                        // console.log(r);
                                    });
                                } else {

                                    let json = {
                                        idRegistroSiembra: "",
                                        loteRegistroSiembra: lote,
                                        semanaRegistroSiembra: semana,
                                        pesoImpuresasRegistroSiembra: null,
                                        pesoSemillasRegistroSiembra: null,
                                        semillasSembradasRegistroSiembra: null,
                                        esquejesSembradosRegistroSiembra: '',
                                        idPlantaClonada: plantaMadre,
                                        fechaRegistroSiembra: fechactual,
                                        proDiaSemana: {
                                            idDiaSemana: dia
                                        },
                                        proSemilla: {
                                            codigoSemilla: this.semi,
                                        },
                                        proEstadoRegistroSiembra: {
                                            idEstadoRegistroSiembra: 1
                                        },
                                        proTipoRegistroSiembra: {
                                            idTipoRegistroSiembra: 2
                                        }
                                    };

                                    axios.post("http://localhost:12590/api/tucann/proRegistroSiembra/", json, {
                                            headers: generalHeader()
                                        })
                                        .then(res => {
                                            let mensaje = "Registro de siembra creado con éxito!";
                                            this.mensajesRespuesta(mensaje, 1);
                                            this.listarRegistrosDeSiembra();
                                        })
                                        .catch(err => {
                                            console.error(err);
                                        });
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        },
        listarRegistrosDeSiembra() {
            this.elementosRegistrosiembra = [];
            registroSiembraServ.listaPlantasTipoRegistroAndEstadoRegistro(2, 1).then((result) => {
                this.elementosRegistrosiembra = result.data;
            }).catch((err) => {});
            registroSiembraServ.listaPlantasTipoRegistro(2).then((result) => {
                this.elementosRegistrosiembraClonar = result.data;
                this.elementosRegistrosiembraClonarRevisar = result.data;
            }).catch((err) => {});
        },

        async actualizarRegistroSiembra(item, idRegistroSiembra) {
            await plantaService.devolverNumPlantasEnRegistroSiembra(idRegistroSiembra).then((result) => {
                let registro = {
                    esquejesSembradosRegistroSiembra: result.data,
                    fechaRegistroSiembra: item.fechaRegistroSiembra,
                    idPlantaClonada: item.idPlantaClonada,
                    idRegistroSiembra: item.idRegistroSiembra,
                    indicadorActividadActual: item.indicadorActividadActual,
                    loteRegistroSiembra: item.loteRegistroSiembra,
                    pesoImpuresasRegistroSiembra: item.pesoImpuresasRegistroSiembra,
                    pesoSemillasRegistroSiembra: item.pesoSemillasRegistroSiembra,
                    proDiaSemana: {
                        idDiaSemana: item.proDiaSemana.idDiaSemana,
                    },
                    proEstadoRegistroSiembra: {
                        idEstadoRegistroSiembra: item.proEstadoRegistroSiembra.idEstadoRegistroSiembra,
                    },
                    proSemilla: {
                        codigoSemilla: item.proSemilla.codigoSemilla
                    },
                    proTipoRegistroSiembra: {
                        idTipoRegistroSiembra: item.proTipoRegistroSiembra.idTipoRegistroSiembra
                    },
                    semanaRegistroSiembra: item.semanaRegistroSiembra,
                    semillasSembradasRegistroSiembra: item.semillasSembradasRegistroSiembra
                }

                registroSiembraServ.modificarRegistroSiembra(registro).then((result) => {
                    this.listarRegistrosDeSiembra()
                }).catch((err) => {});
            }).catch((err) => {});
        },

        async prepararActualizarPlantasEnRegistro(idRegistroSiembra) {
            for (let index = 0; index < this.elementosRegistrosiembra.length; index++) {
                if (this.elementosRegistrosiembra[index].idRegistroSiembra == idRegistroSiembra) {
                    this.actualizarRegistroSiembra(this.elementosRegistrosiembra[index], idRegistroSiembra)
                }
            }
        },

        reiniciaralertas() {
            this.logorevision = 'done';
            this.colorrevision = 'error';
            this.alertaerror = false;
        },

        limpiarDatos() {
            this.nombreInternoSemillaMostrar = '';
            this.loteClonacionMostrar = '';
            this.esquejesSembradosRegistroSiembraMostrar = '';
            this.bandejasNecesariasSiembraClones = '';
            this.bandejaInicialSiembra = '';
            this.idRegistroSiembraMostrar = '';
            // this.identificadorRedistroSi = '';
            // this.spiner = 'display:none';
            this.valor = 0;
            this.alertaerror = false;
            this.posicionerror = '';
            this.logorevision = 'done';
            this.colorrevision = 'error';
            this.desabilitarboton = false;
            this.mensajedisponibilidad = 'Revisar disponibilidad.';
            this.loadingrevisarubi = false;
            this.numBandMostrar = '';
        },

        mensajesRespuesta(mensaje, clave) {
            switch (clave) {
                case 1:
                    this.$fire({
                        title: '<strong class="u">Excelente!</strong>',
                        text: mensaje,
                        type: "success",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',

                    }).then(r => {});
                    break;
                case 2:
                    this.$fire({
                        title: '<strong class="u">Error!</strong>',
                        text: mensaje,
                        type: "error",
                        timer: 4000,
                        confirmButtonText: '<spam class="u" >OK</spam>',
                        confirmButtonColor: '#4CAF50',
                    }).then(r => {});
                    break;
                default:
                    break;
            }
        }
    },
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
