<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="750" class="mx-auto">
        <v-card-title class="primary white--text">UBICACIONES <v-spacer></v-spacer>
            <v-btn class="primary white--text" @click="alert = !alert" elevation="15" icon>
                <v-icon>mdi-information-variant</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-card-text>
                <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                    Las ubicaciones se gestionan por su tipo dependiendo en el lugar que se van a alojar las plantas en su proceso:
                    <ul>
                        <li>Bandeja </li>
                        <li>BLoque</li>
                        <li>Pote</li>
                    </ul>
                </v-alert>
            </v-card-text>
            <v-card-actions>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="analogo4" dark @click="dialog3=true" v-bind="attrs" v-on="on" elevation="15">
                            <v-icon>loupe</v-icon>
                        </v-btn>
                    </template>
                    <span>Nuevas ubicaciones</span>
                </v-tooltip>
                &nbsp;&nbsp;
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="analogo3" dark @click="listarUbicacion()" v-bind="attrs" v-on="on" elevation="15">
                            <v-icon>list</v-icon>
                        </v-btn>
                    </template>
                    <span>Listar todas</span>
                </v-tooltip>
                &nbsp;&nbsp;
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon elevation="15" v-bind="attrs" v-on="on" class="primary" @click="prepararListarTipoUbicacion()">
                            <v-icon color="white" small>mdi-view-grid</v-icon>
                        </v-btn>
                    </template>
                    <span>Listar por tipo</span>
                </v-tooltip>

                &nbsp;&nbsp;
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon elevation="15" v-bind="attrs" v-on="on" class="primary" @click="prepararBuscarUbicacion()">
                            <v-icon color="white" small>search</v-icon>
                        </v-btn>
                    </template>
                    <span>Buscar por ubicación</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Revisar ubicación.." class="mr-3"></v-text-field>
            </v-card-actions>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md4 v-for="item in elementosResultadoAux" :key="item.nombre">
                        <v-hover open-delay="200" v-slot="{ hover }" class="primary">
                            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="mx-auto" height="65" max-width="160">
                                <v-card-title class="">
                                    <v-spacer></v-spacer>
                                    <v-chip label class="white primary--text" @click="prepararDisponibilidadUbicacion(item.id)">
                                        {{item.nombre}} - {{item.valor}}
                                    </v-chip>
                                    <v-spacer></v-spacer>
                                </v-card-title>
                            </v-card>
                        </v-hover>
                    </v-flex>

                </v-layout>
            </v-card-text>
            <v-card-text>
                <v-progress-linear color="primary accent-4" indeterminate rounded height="6" :active="activarEsperaLinear"></v-progress-linear>
            </v-card-text>
            <v-card-text>
                <template>
                    <v-data-table :headers="titulosUbicacion" :items="elementosUbicacion" :items-per-page="5" class="elevation-1" :search="search" dense>
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{item.idUbicacion}}</td>

                                <td>
                                    <div v-if="item.proEstadoUbicacion.idEstadoUbicacion == 1">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on">
                                                    <v-icon color="monocromatico4">check_circle</v-icon>
                                                </span>
                                            </template>
                                            <span>Disponible</span>
                                        </v-tooltip>
                                    </div>
                                    <div v-else-if="item.proEstadoUbicacion.idEstadoUbicacion == 2">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on">
                                                    <v-icon color="error">warning_amber</v-icon>
                                                </span>
                                            </template>
                                            <span>Ocupada</span>
                                        </v-tooltip>
                                    </div>
                                    <div v-else>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on">
                                                    <v-icon color="analogo1">not_interested</v-icon>
                                                </span>
                                            </template>
                                            <span>Nula</span>
                                        </v-tooltip>
                                    </div>
                                </td>
                                <td>{{item.proTipoUbicacion.nombreTipoUbicacion}}</td>
                                <td>
                                    <div v-if="item.idUbicacion != ''">
                                        <v-btn icon @click="prepararGestionUbicacion(item)">
                                            <v-icon color="primary">dataset</v-icon>
                                        </v-btn>
                                    </div>

                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </template>
            </v-card-text>

            <!-- PANTALLAS EMERGENTES DE UBICACION -->
            <form v-on:submit.prevent="nuevaUbicacionMasiva">

                <!-- PANTALLA EMERGENETE PARA INGRESAR NUEVA UBICACION-->
                <!--  <v-dialog v-model="dialog2" width="500">

                    <v-card>
                        <v-card-title class="success white--text">
                            Crear Ubicacion
                        </v-card-title>
                        <v-card-text></v-card-text>
                        <v-card-text>
                            <v-layout wrap>
                                <v-flex sm4>
                                    <v-card-text>
                                        <v-select class="mr-4" v-model="blo" label="Bloque.." color="info" :items="bloque"></v-select>
                                    </v-card-text>
                                </v-flex>
                                <v-flex sm4>
                                    <v-card-text>
                                        <v-select class="mr-4" v-model="cam" label="Cama.." color="info" :items="cama"></v-select>
                                    </v-card-text>
                                </v-flex>
                                <v-flex sm4>
                                    <v-card-text>
                                        <v-select class="mr-4" v-model="lug" label="Lugar.." error :items="lugar"></v-select>
                                    </v-card-text>
                                </v-flex>
                                <v-flex mx-auto sm4>
                                    <v-chip label large color="fondo">{{blo}} / {{cam}} / {{lug}} </v-chip>
                                </v-flex>
                                <v-flex mx-auto sm10>
                                    <v-select v-model="idTipoUbicacion" item-text="nombreTipoUbicacion" item-value="idTipoUbicacion" label="Tipo de ubicación.." :items="elementosTipoUbicacion"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="dialog2=false">
                                Cerrar
                            </v-btn>
                            <v-btn color="success" text @click="nuevaUbicacion(blo,cam,lug,idTipoUbicacion)">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>-->
            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR UBICACIONES DE FORMA MASIVA-->
            <form v-on:submit.prevent="nuevaUbicacionMasiva">

                <v-dialog v-model="dialog3" width="600" persistent>
                    <!-- PANTALLA EMERGENETE PARA INGRESAR UBICACION DE FORMA MASIVA-->
                    <v-card>
                        <v-card-title class="success white--text">
                            Crear ubicación de forma masiva <v-spacer></v-spacer>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon class="analogo3 white--text" small @click="dialog3=false,limpiarDatos()" v-bind="attrs" v-on="on">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cerrar</span>
                            </v-tooltip>
                        </v-card-title>
                        <v-card-text></v-card-text>
                        <v-card-text>
                            <v-layout wrap>
                                <v-flex mx-auto sm11>
                                    <v-select v-model="idTipoUbicacion" item-text="nombreTipoUbicacion" item-value="idTipoUbicacion" label="Tipo de ubicación.." :items="elementosTipoUbicacion" :disabled=habilitarTipoUbicacion></v-select>
                                </v-flex>
                                <!-- PARA BLOQUES  -->
                                <v-flex md4>
                                    <div v-if="idTipoUbicacion == 2 ">
                                        <v-card-text>
                                            <v-text-field type="number" class="mr-4" success v-model="blo" label="Bloque.." color="info" :disabled=!encenderBotonBloque></v-text-field>
                                        </v-card-text>
                                    </div>
                                    <!-- PARA POTES  -->
                                    <div v-else-if="idTipoUbicacion == 4">
                                        <v-card-text>
                                            <v-text-field class="mr-4" success v-model="numpotesembrar" label="Cantidad de potes.." color="info" type="number">

                                            </v-text-field>
                                        </v-card-text>
                                    </div>
                                    <!-- PARA BANDEJAS  -->
                                    <div v-else-if="idTipoUbicacion == 3 ">
                                        <v-card-text>
                                            <v-text-field class="mr-4" success v-model="numbandejassembrar" label="Cantidad de bandejas.." color="info" type="number">

                                            </v-text-field>
                                        </v-card-text>
                                    </div>
                                </v-flex>
                                <v-flex md4>
                                    <!-- PARA BLOQUES  -->
                                    <div v-if="idTipoUbicacion == 2">
                                        <v-card-text>
                                            <v-text-field type="number" class="mr-4" success v-model="cam" label="Número camas.." color="info" :disabled=!encenderBotonBloque></v-text-field>
                                        </v-card-text>
                                    </div>
                                    <!-- PARA POTES  -->
                                    <div v-else-if="idTipoUbicacion == 4">
                                        <v-card-text>
                                            <v-text-field class="mr-4" success v-model="pot" label="Pote desde.." color="info" type="number">
                                            </v-text-field>
                                        </v-card-text>
                                    </div>
                                    <!-- PARA BANDEJAS  -->
                                    <div v-else-if="idTipoUbicacion == 3">
                                        <v-card-text>
                                            <v-text-field class="mr-4" success v-model="ban" label="Bandeja desde.." color="info" type="number">
                                            </v-text-field>
                                        </v-card-text>
                                    </div>
                                </v-flex>
                                <v-flex md4>
                                    <!-- PARA BLOQUES  -->
                                    <div v-if="idTipoUbicacion == 2">
                                        <v-card-text>

                                            <v-text-field type="number" class="mr-4" success v-model="den" label="Densisad por cama.." :disabled=!encenderBotonBloque></v-text-field>
                                        </v-card-text>
                                    </div>
                                    <!-- PARA POTES  -->
                                    <div v-else-if="idTipoUbicacion == 4">
                                        <v-card-text>Desde:
                                            <v-chip label color="success">{{(this.pot)}}</v-chip>
                                        </v-card-text>
                                        <v-card-text v-if="this.numpotesembrar > 0 && this.pot > 0 ">Hasta:
                                            <v-chip label color="success"> {{(numpotesembrar)*1 +(pot)*1-1}} </v-chip>
                                        </v-card-text>
                                    </div>
                                    <!-- PARA BANDEJAS  -->
                                    <div v-else-if="idTipoUbicacion == 3">
                                        <v-card-text>Desde:
                                            <v-chip label color="success">{{(this.ban)}}</v-chip>
                                        </v-card-text>
                                        <v-card-text v-if="this.numbandejassembrar > 0 && this.ban > 0 ">Hasta:
                                            <v-chip label color="success"> {{(numbandejassembrar)*1 +(ban)*1-1}} </v-chip>
                                        </v-card-text>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex md12>
                                    <v-card-text v-if="valor > 0.001">
                                        <v-layout>
                                            <v-flex md12 sm12 xs12>
                                                <div class="text-center">
                                                    <v-progress-circular :rotate="360" :size="120" :width="15" :value="valor" color="success" :active=progresoCreaUbi>
                                                        {{valor}}
                                                    </v-progress-circular>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex md4>
                                    <div v-if="idTipoUbicacion == 2 ">
                                        <v-card-text>
                                            <v-text-field type="number" class="mr-4" success v-model="camin" label="Cama inicial.." color="info" :disabled=!encenderBotonBloque></v-text-field>
                                        </v-card-text>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex>
                                    <v-progress-linear :active="esperarRevBloques" :indeterminate="esperarRevBloques" absolute color="primary "></v-progress-linear>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm12 md12 xs12>
                                    <!-- PARA BLOQUES  -->
                                    <div v-if="idTipoUbicacion == 2" class="casa">
                                        <v-divider class="success  mt-5 mb-5"></v-divider>
                                        <strong>Bloque&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp;</strong>
                                        <v-chip class="mx-auto" label color="primary" small v-if="blo>0">B-{{blo}} </v-chip>
                                        <v-divider></v-divider>
                                        <strong> Camas&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp;</strong>
                                        <v-chip class="mx-auto" label color="primary" small v-if="cam>0"> {{cam}} </v-chip>
                                        <v-divider></v-divider>
                                        <strong> Dendisad&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp;</strong>
                                        <v-chip class="mx-auto" label color="primary" small v-if="den>0"> {{den}}</v-chip> plantas por cama
                                        <v-divider></v-divider>
                                        <strong> Posiciones&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp;</strong>
                                        <v-chip class="mx-auto" label color="primary" small v-if="den>0"> {{(den*1) * (cam*1)}} </v-chip>
                                        <v-divider></v-divider>
                                        <strong> Cama inicial - final&nbsp;&nbsp;:&nbsp;</strong>
                                        <v-chip class="mx-auto" label color="primary" small v-if="camin>0"> {{camin}} - {{(camin*1)+((cam*1)-1)}} </v-chip>
                                        <v-divider></v-divider>
                                        <br>
                                        <v-btn v-if="blo >0 && cam >0 && den>0 && camin>0" class="primary" @click="revisarExisteBloques(blo,cam,den,idTipoUbicacion,camin)" :disabled=!encenderBotonBloque>
                                            <v-icon>change_circle</v-icon>
                                        </v-btn>
                                    </div>
                                    <!-- PARA POTES  -->
                                    <div v-else-if="idTipoUbicacion == 4" class="casa">
                                        Se van a crear <v-chip label color="success white--text">{{numpotesembrar*50}}</v-chip> potes.
                                    </div>
                                    <!-- PARA BANDEJAS  -->
                                    <div v-else-if="idTipoUbicacion == 3">
                                        Se van a crear <v-chip label color="success white--text">{{numbandejassembrar}}</v-chip> bandejas
                                        en total <v-chip label color="success white--text">{{numbandejassembrar * 50}} </v-chip> posiciones.
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <!-- PARA BLOQUES  -->
                            <div v-if="idTipoUbicacion == 2">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="success" class="ml-3" :disabled=encenderCrearBotonBloque @click="guardarUbicacionRevisada()" v-bind="attrs" v-on="on">
                                            <v-icon>save</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Crear ubicaciones</span>
                                </v-tooltip>
                            </div>

                            <!-- PARA BANDEJAS  -->

                            <div v-else-if=" idTipoUbicacion == 3">
                                <v-btn color="error" @click="dialog3=false,limpiarDatos()" :disabled=encenderBoton>
                                    Cancelar
                                </v-btn>
                                <v-btn color="success" class="ml-3" @click="crearUbicacionMasiva(numbandejassembrar,ban,idTipoUbicacion)" :disabled=encenderBoton>
                                    Crear bandejas
                                </v-btn>
                            </div>
                            <!-- PARA POTES  -->
                            <div v-else-if="idTipoUbicacion == 4">
                                <v-btn color="error" @click="dialog3=false,limpiarDatos()" :disabled=encenderBoton>
                                    cancelar
                                </v-btn>
                                <v-btn color="success" class="ml-3" @click="crearUbicacionMasiva(numpotesembrar,pot,idTipoUbicacion)" :disabled=encenderBoton>
                                    crear potes
                                </v-btn>
                            </div>
                            <!-- ////////////////// -->
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR UBICACIONES DE FORMA MASIVA-->
        </v-card-text>
    </v-card>

    <v-container>
        <v-snackbar v-model="notificacion">
            {{ mensajenotificacion }}
            <template v-slot:action="{ attrs }">
                <v-btn color="success" text v-bind="attrs" @click="notificacion = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>

    <v-dialog :width=anchoDos v-model="dialogoGestionUbicacion" persistent>
        <v-card :width=anchoDos>
            <v-card-title class="primary white--text">
                <v-spacer></v-spacer> {{ nombreTipoUbicacionAux }} - {{numeroUbicacionAux}}
                <v-spacer></v-spacer>
                <v-btn icon elevation="15" small @click="dialogoGestionUbicacion = false">
                    <v-icon color="white" small>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
                <v-btn class="analogo1" fab small>
                    <v-icon color="white" small>mdi-dots-grid</v-icon>
                </v-btn>
                <v-btn class="analogo2" fab small>
                    <v-icon color="white" small>mdi-dots-grid</v-icon>
                </v-btn>
                <v-btn class="analogo4" fab small>
                    <v-icon color="white" small>mdi-dots-grid</v-icon>
                </v-btn>
            </v-card-actions>
            <v-card-text>
                <v-card :width=ancho class="mx-auto">
                    <v-flex>
                        <v-chip-group multiple active-class="error white--text" column>
                            <span v-for="item in mostrarLayoutBandeja " :key="item.idUbicacion">
                                <v-avatar tile size="45" class="white--text ml-5">

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">

                                            <v-btn class="primary" icon v-bind="attrs" v-on="on">
                                                <v-icon color="white">check</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>{{item}} </span>
                                    </v-tooltip>
                                </v-avatar>
                            </span>
                        </v-chip-group>
                    </v-flex>
                </v-card>
            </v-card-text>

        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoListarPorUbiaciones" width="400" persistent>
        <v-card width="400">
            <v-card-title class="primary white--text">LISTAR POR TIPO UBICACION</v-card-title>
            <v-card-text> </v-card-text>
            <v-card-text>
                <v-select label="Tipo ubicación.." :items="elementosTipoUbicacion" item-text="nombreTipoUbicacion" item-value="idTipoUbicacion" v-model="idTipoUbicacion"></v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn class="error" @click="dialogoListarPorUbiaciones = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn class="primary" @click="listarUbicacionXTipo(idTipoUbicacion)">
                    <v-icon>list</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoRevisarUbiacion" width="800" persistent>
        <v-card width="800">
            <v-card-title class="primary white--text">BUSCAR <v-spacer></v-spacer>
                <v-btn icon @click="dialogoRevisarUbiacion= false" elevation="15">
                    <v-icon color="white">close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <template v-slot:extension>
                        <v-tabs v-model="tabs" fixed-tabs>
                            <v-tab v-for="n in 2" :key="n">
                                <div v-if="n==1">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on , attrs}">
                                            <v-icon large v-bind="attrs" v-on="on">not_listed_location</v-icon>
                                        </template>
                                        <span>Por ubicación</span>
                                    </v-tooltip>
                                </div>
                                <div v-else>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on, attrs}">
                                            <v-icon v-bind="attrs" v-on="on">
                                                yard
                                            </v-icon>
                                        </template>
                                        <span>Por planta</span>
                                    </v-tooltip>
                                </div>
                            </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>
                <v-tabs-items v-model="tabs">
                    <!-- /////////////////////////  PARA BUSCAR POR UBICACION ///////////////////// -->
                    <v-tab-item>
                        <v-card>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex md2></v-flex>
                                    <v-flex md5>
                                        <v-autocomplete label="Revisar ubicación.." :items="elementosUbicacion" item-text="idUbicacion" item-value="idUbicacion" v-model="idUbicacionBuscar"></v-autocomplete>
                                    </v-flex>
                                    <v-flex md1>
                                        <v-btn class="primary mt-3 ml-3" @click="revisarUbicacion(idUbicacionBuscar)">
                                            <v-icon> search</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex md4>

                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> Ubicación :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">pin_drop</v-icon> {{idUbicacionMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text"> Tipo &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">drag_indicator</v-icon>{{tipoUbicacionMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text"> Estado &nbsp; &nbsp; &nbsp; :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">radio_button_checked</v-icon>{{estadoUbicacionMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text"> N° plantas :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">yard</v-icon>{{cantidadPlantasMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text">Código planta :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">yard</v-icon>{{codigoPlantasMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <!--  <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">

                                        </v-sheet>
                                    </v-flex>-->
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!-- /////////////////////////  PARA BUSCAR POR PLANTA ///////////////////// -->
                    <v-tab-item>
                        <v-card>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex md2></v-flex>
                                    <v-flex md5>
                                        <v-autocomplete label="Código de planta.." :items="elementosPlanta" item-text="idPlanta" item-value="idPlanta" v-model="idPlanta"></v-autocomplete>
                                    </v-flex>
                                    <v-flex md1>
                                        <v-btn class="primary mt-3 ml-3" @click="revisarPorCodigoPlanta(idPlanta)">
                                            <v-icon>search</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex md4>

                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-layout wrap>

                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> Id planta :&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">pin_drop</v-icon> {{idPlantaMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> % THC :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">percent</v-icon> {{porcentajeThcPlantaMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> % CBD :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">percent</v-icon> {{porcentajeCbdPlantaMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>

                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> Clasif A :&nbsp;&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">mdi-arrange-bring-to-front</v-icon> {{idClasificacionAMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> Clasif B :</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">mdi-arrange-bring-to-front</v-icon> {{idClasificacionBMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="primary--text ml-3"> Clasif C :</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">mdi-arrange-bring-to-front</v-icon> {{idClasificacionCMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>

                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text"> Lote :</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">drag_indicator</v-icon>{{loteRegistroSiembraMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text"> Prefijo &nbsp; :&nbsp;</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">radio_button_checked</v-icon>{{prefijoPlantaMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text">Ubicación :</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">yard</v-icon>{{ubicacionPlantaMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md8 sm8 xs8>
                                        <v-sheet color="white" elevation="15" height="50" width="95%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text">QR :</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">qr_code_2</v-icon>{{codigoQRMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">
                                            <strong class="ml-3 primary--text">Tp. planta :</strong>
                                            <v-chip label class="primary white--text ma-2">
                                                <v-icon left color="white">filter_vintage</v-icon>{{nombrePlantaMostrar}}
                                            </v-chip>
                                        </v-sheet>
                                    </v-flex>

                                    <v-flex md4 sm4 xs4>
                                        <v-sheet color="white" elevation="15" height="150" width="94%" class="mx-auto mb-3">
                                            <v-spacer></v-spacer>
                                            <vue-qr :text='codigoQRMostrar' :size="100" :margin="4" class="red mx-auto ml-5 mt-5"></vue-qr>
                                        </v-sheet>
                                    </v-flex>
                                    <!--  <v-flex md6 sm6 xs6>
                                        <v-sheet color="white" elevation="15" height="50" width="90%" class="mx-auto mb-3">

                                        </v-sheet>
                                    </v-flex>-->
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogoMostrarEstadoUbicacion" width="600" persistent>
        <v-card width="600">
            <v-card-title class="primary white--text">UBICACIONES <v-spacer></v-spacer>
                <v-btn icon class="pr1mary" elevation="15" @click="dialogoMostrarEstadoUbicacion = false">
                    <v-icon color="white">close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md4></v-flex>
                    <v-flex md4>
                        <v-text-field label="Revisar ubicación.." append-icon="search" v-model="ubicacionBuscada"></v-text-field>
                    </v-flex>
                    <v-flex md4></v-flex>
                </v-layout>
            </v-card-text>
            <v-card-text>
                <v-data-table :headers="cabecerasUbicacionEstado" :items="elementosUbicacionEstado" dense :search="ubicacionBuscada"></v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import generalHeader from '@/services/general-header';
import plantaService from '@/services/produccion/planta.service.js'
import axios from 'axios'
import ubicacionServ from '@/services/produccion/ubicacion.service.js'
import VueQr from 'vue-qr'
import VueSimpleAlert from "vue-simple-alert"
export default {
    name: 'Ubicacionform',
    components: {
        VueQr
    },
    directives: {},

    data() {
        return {
            ubicacionBuscada:null,
            dialogoMostrarEstadoUbicacion: false,
            codigoPlantasMostrar: '',
            nombrePlantaMostrar: '',
            codigoQRMostrar: '',
            ubicacionPlantaMostrar: '',
            loteRegistroSiembraMostrar: '',
            porcentajeThcPlantaMostrar: '',
            porcentajeCbdPlantaMostrar: '',
            prefijoPlantaMostrar: '',
            idPlantaMostrar: '',
            idClasificacionAMostrar: '',
            idClasificacionBMostrar: '',
            idClasificacionCMostrar: '',
            idPlanta: [],
            cantidadPlantasMostrar: '',
            idUbicacionMostrar: '',
            tipoUbicacionMostrar: '',
            estadoUbicacionMostrar: '',
            idUbicacionBuscar: '',
            tabs: null,
            dialogoRevisarUbiacion: false,
            bandera: false,
            idTipoUbiaccion: '',
            dialogoListarPorUbiaciones: false,
            anchoDos: 900,
            ancho: 1200,
            numeroUbicacionAux: '',
            mostrarLayoutBandeja: [],
            dialogoGestionUbicacion: false,
            nombreTipoUbicacionAux: '',
            bloqueAuxiliarMen: '',
            camaAuxiliarMen: '',
            bandera: null,
            esperarRevBloques: false,
            habilitarTipoUbicacion: false,
            vectorUbiBloquesCorrecto: [],
            contador1: 0,
            alert: false,
            idUbicacion: '',
            idEstadoUbicacion: '',
            idTipoUbicacion: '',
            vectorUbiBLoques: [],
            search: null,
            valor: 0,
            camin: '',
            contadornoexiste: 0,
            contadorvacias: 0,
            contadorocupadas: 0,
            bandejasnecesarias: 0,
            progresoCreaUbi: true,
            activarEsperaLinear: false,
            mostrarTipoUbicacion: '',
            /////////////////////////
            notificacion: false,
            mensajenotificacion: '',
            encenderBoton: false,
            encenderBotonBloque: true,
            encenderCrearBotonBloque: true,
            contadordebandejasOK: '',
            contex: 0,
            /////////////////////////
            isUpdating: false,
            blo: '',
            cam: '',
            lug: '',
            den: '',
            bloque: '',
            cama: '',
            lugar: '',
            //////////////////////////////
            numbandejassembrar: '',
            ban: '',
            fil: '',
            col: '',
            filas: ['10'],
            columnas: ['5'],
            numpotesembrar: '',
            pot: '',
            //////////////////////////////
            //   dialog2: false,
            dialog3: false,
            //////////////////////////////////
            elementosTipoUbicacion: [{
                idTipoUbicacion: '',
                nombreTipoUbicacion: '',
            }],
            /////////////////////////////////
            titulosUbicacion: [{
                    text: "ID",
                    align: "start",
                    //sortable: false,
                    value: "idUbicacion"
                },
                {
                    text: "Estado",
                    value: "proEstadoUbicacion.idEstadoUbicacion"
                },
                {
                    text: "Ubicacion",
                    value: "proTipoUbicacion.nombreTipoUbicacion"
                },
                {
                    text: 'Acciones',
                    value: ''
                }
            ],
            elementosUbicacion: [{
                idUbicacion: '',
                ubiPrimeraParte: '',
                ubiSegundaParte: '',
                ubiTerceraParte: '',
                ordenPosicion: '',
                proEstadoUbicacion: {
                    idEstadoUbicacion: '',
                    nombreEstadoUbicacion: '',
                },
                proTipoUbicacion: {
                    idTipoUbicacion: '',
                    nombreTipoUbicacion: '',
                }
            }],
            elementosEstadoUbicacion: [],
            elementosResultadosEstadoUbiaccion: [{
                nombre: '',
                valor: ''
            }],
            elementosResultadoAux: [],
            elementosPlanta: [],
            elementosUbicacionEstado: [],
            cabecerasUbicacionEstado: [{
                text: 'Ubicación',
                value: 'idUbicacion'
            }, 
            {
                text: 'Ubicación',
                value: 'proTipoUbicacion.nombreTipoUbicacion'
            }, 
            {
                text: 'Estado ubicación',
                value: 'proEstadoUbicacion.nombreEstadoUbicacion'
            }, 
            ]
        };
    },
    mounted() {
        this.listarTipoUbicacion();
        this.listaEstadoUbicacion();
    },
    created() {

    },
    methods: {
        prepararDisponibilidadUbicacion(id) {
            this.dialogoMostrarEstadoUbicacion = true;
            this.revisarDisponibilidadUbicacion(id);
        },

        revisarDisponibilidadUbicacion(estadoUbicacion) {
            this.elementosUbicacionEstado = [];
            ubicacionServ.listaUbicacionesXEstadoUbicacion(estadoUbicacion).then((result) => {
                this.elementosUbicacionEstado = result.data;
            }).catch((err) => {});
        },
        listarPlantasActivas() {
            let estadoPlantaAcitvas = 1;
            plantaService.buscarPlantaXIdEstadoPlanta(estadoPlantaAcitvas).then((result) => {
                this.elementosPlanta = result.data;

            }).catch((err) => {});
        },
        revisarPorCodigoPlanta(codigoPlanta) {
            if (codigoPlanta == '') {
                alert("Selecciona una ubicación..");
            } else {
                plantaService.buscarPlantaXCodigoPlanta(codigoPlanta).then((result) => {
                    this.idPlantaMostrar = result.data.idPlanta;
                    this.idClasificacionAMostrar = result.data.clasificacionA;
                    this.idClasificacionBMostrar = result.data.clasificacionB;
                    this.idClasificacionCMostrar = result.data.clasificacionC;
                    this.porcentajeCbdPlantaMostrar = result.data.porcentajeCbdPlanta;
                    this.porcentajeThcPlantaMostrar = result.data.porcentajeThcPlanta;
                    this.loteRegistroSiembraMostrar = result.data.proRegistroSiembra.loteRegistroSiembra;
                    this.prefijoPlantaMostrar = result.data.prefijoPlanta;
                    this.ubicacionPlantaMostrar = result.data.proUbicacion.idUbicacion;
                    this.codigoQRMostrar = result.data.codigoQR;
                    this.nombrePlantaMostrar = result.data.proTipoPlanta.nombreTipoPlanta;

                    console.log(result.data)
                }).catch((err) => {});
            }
        },
        revisarUbicacion(idUbicacionBuscar) {
            if (idUbicacionBuscar == '') {
                alert("Selecciona una ubicación..");
            } else {
                this.estadoUbicacionMostrar = '';
                ubicacionServ.buscarUbicacionXIdUbicacion(idUbicacionBuscar).then((result) => {
                    this.idUbicacionMostrar = result.data.idUbicacion;
                    this.estadoUbicacionMostrar = result.data.proEstadoUbicacion.nombreEstadoUbicacion;
                    this.tipoUbicacionMostrar = result.data.proTipoUbicacion.nombreTipoUbicacion;
                }).catch((err) => {});

                plantaService.buscarPlantaXIdUbicacion(idUbicacionBuscar).then((result) => {
                    if (result.data.length == 0) {
                        this.cantidadPlantasMostrar = result.data.length;
                    } else {
                        this.cantidadPlantasMostrar = result.data.length;
                        this.codigoPlantasMostrar = result.data[0].idPlanta;
                    }
                }).catch((err) => {});
            }
        },

        prepararBuscarUbicacion() {
            this.listarUbicacion();
            this.listarPlantasActivas();
            this.dialogoRevisarUbiacion = true;
        },

        listaEstadoUbicacion() {
            this.elementosEstadoUbicacion = [];
            ubicacionServ.listaEstadoUbicacion().then((result) => {
                this.elementosEstadoUbicacion = result.data;
            }).catch((err) => {});
        },

        cantidadUbicacionesXEstado(idTipoUbicacion) {
            this.elementosResultadoAux = [];
            for (let index = 0; index < this.elementosEstadoUbicacion.length; index++) {
                ubicacionServ.listaEstadoUbicacionXEstadoYTipo(this.elementosEstadoUbicacion[index].idEstadoUbicacion, idTipoUbicacion).then((result) => {
                    let resultados = {
                        id: this.elementosEstadoUbicacion[index].idEstadoUbicacion,
                        nombre: this.elementosEstadoUbicacion[index].nombreEstadoUbicacion,
                        valor: result.data
                    }
                    this.elementosResultadoAux.push(resultados);
                }).catch((err) => {});
            }
        },

        cantidadUbicacionesTotal() {
            this.elementosResultadoAux = [];
            for (let index = 0; index < this.elementosEstadoUbicacion.length; index++) {
                ubicacionServ.valorEstadoUbicacionTotal(this.elementosEstadoUbicacion[index].idEstadoUbicacion).then((result) => {
                    let resultados = {
                        id: this.elementosEstadoUbicacion[index].idEstadoUbicacion,
                        nombre: this.elementosEstadoUbicacion[index].nombreEstadoUbicacion,
                        valor: result.data
                    }
                    this.elementosResultadoAux.push(resultados);
                }).catch((err) => {});
            }
        },

        listarUbicacionXTipo(idTipoUbicacion) {
            this.elementosUbicacion = [];
            ubicacionServ.listarUbicacionesXTipo(idTipoUbicacion).then((result) => {
                this.dialogoListarPorUbiaciones = false;
                this.idTipoUbicacion = '';
                this.elementosUbicacion = result.data;
            }).catch((err) => {});
            this.cantidadUbicacionesXEstado(idTipoUbicacion);
        },
        prepararListarTipoUbicacion() {
            this.dialogoListarPorUbiaciones = true
        },
        prepararGestionUbicacion(item) {

            switch (item.proTipoUbicacion.idTipoUbicacion) {
                /// libre
                case 1:

                    break;
                    //bloque
                case 2:

                    break;
                    //bandeja
                case 3:

                    this.ancho = 410;
                    this.anchoDos = 410;
                    this.dialogoGestionUbicacion = true;
                    this.mostrarLayoutBandeja = [];

                    let ubiPrim = item.ubiPrimeraParte;
                    let tpUbi = item.proTipoUbicacion.idTipoUbicacion;
                    this.nombreTipoUbicacionAux = (item.proTipoUbicacion.nombreTipoUbicacion).toUpperCase();
                    this.numeroUbicacionAux = item.ubiPrimeraParte;

                    ubicacionServ.buscarXBandejaTipoUbicacion(ubiPrim, tpUbi).then((result) => {
                        for (let index = 0; index < result.data.length; index++) {
                            this.mostrarLayoutBandeja.push(result.data[index].idUbicacion)

                        }

                    }).catch((err) => {

                    });

                    break;
                    //pote
                case 4:

                    break;
                    //nula
                case 5:

                    break;

                default:
                    break;
            }

        },
        async revisarExisteBloques(blo, cam, den, idTipoUbicacion, camin) {

            try {
                this.contador1 = 0;
                let contador2 = 0;
                this.vectorUbiBloquesCorrecto = [];
                this.esperarRevBloques = true;
                this.bandera = false;
                this.bloqueAuxiliarMen = '';
                this.camaAuxiliarMen = '';
                let camAux = parseInt(camin);
                let tipoUbicacionBloque = 2;
                //  console.log("Total " + camAux);
                for (let index = 1; index <= 1; index++) {
                    for (let index1 = 0; index1 < cam; index1++) {
                        for (let index2 = 1; index2 <= den; index2++) {
                            let ubicacion = ('B-' + blo + '-' + (index1 + camAux) + '-' + index2).toString() + '~' + den;
                            let cama = (index1 + camAux);
                            // console.log(ubicacion);
                            // console.log(tipoUbicacionBloque + ' - ' + blo + ' - ' + index1);
                            //  console.log(tipoUbicacionBloque + ' - ' + index + ' - ' + index1 +' - ' + index2);
                            await ubicacionServ.verificarUbixtipoPrimpSegp(tipoUbicacionBloque, blo, cama).then((resp) => {
                                //  console.log(resp.data.length);
                                if (resp.data.length == 1) {
                                    index1 = 200000;
                                    index2 = 200000;
                                    this.bandera = true;
                                    this.bloqueAuxiliarMen = blo;
                                    this.camaAuxiliarMen = cama;
                                    //  alert("El bloque \" " + this.bloqueAuxiliarMen + ' \" y la cama \" ' + this.camaAuxiliarMen + ' \" se encuentran ocupadas, para seguir con el proceso por favor revise la ubicación, o elija otra ubicación en estado vacío!!');
                                } else {
                                    let ubibloque = {
                                        idUbicacion: ubicacion,
                                        ubiPrimeraParte: blo,
                                        ubiSegundaParte: cama,
                                        ubiTerceraParte: index2,
                                        proEstadoUbicacion: {
                                            idEstadoUbicacion: 1,
                                        },
                                        proTipoUbicacion: {
                                            idTipoUbicacion: tipoUbicacionBloque,
                                        }
                                    }
                                    //    console.log(ubibloque);

                                    this.vectorUbiBloquesCorrecto.push(ubibloque);
                                }

                            })
                        }
                    }
                }

            } catch (error) {

            } finally {

                //console.log(this.vectorUbiBloquesCorrecto);
                //console.log(this.bandera);
                if (this.bandera == true) {
                    //console.log("Existen ubicaciones comprometidas");
                    this.esperarRevBloques = false;
                    alert("El bloque \" " + this.bloqueAuxiliarMen + ' \" y la cama \" ' + this.camaAuxiliarMen + ' \" se encuentran ocupadas, para seguir con el proceso por favor revise la ubicación, o elija otra ubicación en estado vacío!!');
                } else if (this.bandera == false) {
                    this.encenderBotonBloque = false;
                    this.encenderCrearBotonBloque = false;
                    this.habilitarTipoUbicacion = true;
                    this.esperarRevBloques = false;
                } else {
                    alert("Error inesperado");
                }
            }
        },
        async guardarUbicacionRevisada() {
            try {
                this.esperarRevBloques = true;
                this.encenderCrearBotonBloque = true;
                this.encenderBotonBloque = true;
                for (let index = 0; index < this.vectorUbiBloquesCorrecto.length; index++) {
                    //  console.log(this.vectorUbiBloquesCorrecto.length);
                    await ubicacionServ.nuevaUbicacion(this.vectorUbiBloquesCorrecto[index]).then((resp) => {

                    })
                }
            } catch (error) {

            } finally {
                this.esperarRevBloques = false;
                this.nuevaUbicacionMasiva = false;
                this.limpiarDatos();
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Excelente!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Ubicaciones creadas con éxito!</spam>',
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
                    // console.log(r);
                });
            }

        },

        listarTipoUbicacion() {
            axios.get('http://localhost:12590/api/tucann/proTipoUbicacion', {
                    headers: generalHeader()
                })
                .then(res => {
                    this.elementosTipoUbicacion = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },

        async listarUbicacion() {
            try {
                this.activarEsperaLinear = true;
                this.elementosUbicacion = [];
                await axios.get('http://localhost:12590/api/tucann/proUbicacion', {
                        headers: generalHeader()
                    })
                    .then(res => {
                        this.cantidadUbicacionesTotal();
                        this.elementosUbicacion = res.data;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            } finally {
                this.activarEsperaLinear = false;
            }
        },

        nuevaUbicacion(a, b, c, d) {
            this.listarTipoUbicacion();
            if (a == '' || b == '' || c == '' || d == '') {
                alert("Los campos no pueden quedar vacios.");
            } else {

                let json = {
                    idUbicacion: a + b + c,
                    ubiPrimeraParte: parseFloat(a),
                    ubiSegundaParte: parseFloat(b),
                    ubiTerceraParte: parseFloat(c),
                    ordenPosicion: '',
                    proEstadoUbicacion: {
                        idEstadoUbicacion: 1,
                    },
                    proTipoUbicacion: {
                        idTipoUbicacion: this.idTipoUbicacion,
                    }
                }
                axios.post('http://localhost:12590/api/tucann/proUbicacion/', json, {
                        headers: generalHeader()
                    })
                    .then(res => {
                        //  this.dialog2 = false;
                        this.mensajenotificacion = "Ubicacion guardada correctamante";
                        this.listarUbicacion();
                        this.notificacion = true;
                        this.blo = '';
                        this.cam = '';
                        this.lug = '';
                        this.den = '';
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },

        async crearUbicacionMasiva(numbandejassembrar, ban, idTipoUbicacion) {

            try {
                if (numbandejassembrar == '' || ban == '' || idTipoUbicacion == '') {
                    alert("Los campos no pueden quedar vacios!");
                } else {

                    if (idTipoUbicacion == 3) {
                        this.listarTipoUbicacion();
                        //   console.log("Bandeja");
                        this.mostrarTipoUbicacion = "Bandeja";
                        let filas = 10,
                            columnas = 5,
                            baninicial = ban,
                            bandejas = numbandejassembrar,
                            cont = 0,
                            contador = 0;
                        let bandera = false;
                        this.encenderBoton = true;
                        while (bandera != true) {
                            let orden = 1;
                            for (let i = 1; i <= filas; i++) {

                                for (let j = 1; j <= columnas; j++) {
                                    let ubi = ((baninicial) + '-' + i + '-' + j);

                                    await this.comprobarUbi(ubi, idTipoUbicacion)
                                        .then(resp => {
                                            if (resp === 0) {
                                                this.contadornoexiste++;
                                                contador++;
                                                let json = {
                                                    idUbicacion: ubi,
                                                    ubiPrimeraParte: parseFloat(baninicial),
                                                    ubiSegundaParte: parseFloat(i),
                                                    ubiTerceraParte: parseFloat(j),
                                                    ordenPosicion: orden++,
                                                    proEstadoUbicacion: {
                                                        idEstadoUbicacion: 1,
                                                    },
                                                    proTipoUbicacion: {
                                                        idTipoUbicacion: idTipoUbicacion,
                                                    }
                                                }
                                                axios.post('http://localhost:12590/api/tucann/proUbicacion/', json, {
                                                        headers: generalHeader()
                                                    })
                                                    .then(res => {
                                                        this.valor = parseInt(((contador * 100) / (bandejas * 50)));
                                                    })
                                                    .catch(err => {
                                                        console.error(err);
                                                    })
                                            }
                                            if (resp === false) {
                                                this.contadorvacias++;
                                            } else if (resp == true) {
                                                this.contadorocupadas++;
                                            }
                                        })
                                }
                            }
                            if (contador == (bandejas) * 50) {
                                bandera = true;
                                this.dialog3 = false;
                                this.bandejasnecesarias = bandejas;
                            }
                            baninicial++;
                        }
                        //  console.log("Vuelta : " + contador);

                    } else if (idTipoUbicacion == 4) {
                        this.listarTipoUbicacion();
                        //console.log("Pote");
                        this.mostrarTipoUbicacion = "Pote";
                        let filas = 10,
                            columnas = 5,
                            baninicial = ban,
                            bandejas = numbandejassembrar,
                            cont = 0,
                            contador = 0;
                        let bandera = false;
                        this.encenderBoton = true;

                        while (bandera != true) {
                            for (let i = 1; i <= filas; i++) {
                                for (let j = 1; j <= columnas; j++) {
                                    let ubi = ((baninicial) + '-' + i + j);
                                    await this.comprobarUbi(ubi, idTipoUbicacion)
                                        .then(resp => {
                                            if (resp === 0) {
                                                contador++;
                                                let json = {
                                                    idUbicacion: ubi,
                                                    ubiPrimeraParte: parseFloat(baninicial),
                                                    ubiSegundaParte: parseFloat(i),
                                                    ubiTerceraParte: parseFloat(j),
                                                    proEstadoUbicacion: {
                                                        idEstadoUbicacion: 1,
                                                    },
                                                    proTipoUbicacion: {
                                                        idTipoUbicacion: idTipoUbicacion,
                                                    }
                                                }
                                                axios.post('http://localhost:12590/api/tucann/proUbicacion/', json, {
                                                        headers: generalHeader()
                                                    })
                                                    .then(res => {
                                                        this.valor = parseInt(((contador * 100) / (bandejas * 50)));
                                                    })
                                                    .catch(err => {
                                                        console.error(err);
                                                    })
                                            }
                                        })
                                }
                            }
                            if (contador == (numbandejassembrar) * 50) {
                                bandera = true;
                                this.dialog3 = false;
                                this.bandejasnecesarias = bandejas;
                            }
                            baninicial++;
                        }

                    } else {
                        console.log("Todos");
                    }

                }
            } catch (error) {

                console.log(error);
                console.log("Error inisperado");
                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Oops!</strong>',
                    //  text: '<strong class="u">Los campos no pueden quedar vacíos!</strong>',
                    html: '<spam class="u">Ha ocurrido un error inesperado!</spam>',
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
                    // console.log(r);
                });

            } finally {

                this.$fire({
                    /// type: 'info',
                    /// message: 'Los campos no pueden quedar vacíos!'
                    title: '<strong class="u">Excelente!</strong>',
                    text: 'Se crearon ' + (this.bandejasnecesarias * 50) + ' en el tipo de ubicación ' + this.mostrarTipoUbicacion,
                    //  html: '<spam class="u">Los campos no pueden quedar vacíos!</spam>',
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
                }).then(r => {});
                //   this.mensajenotificacion = "Se crearon " + this.bandejasnecesarias + " bandejas, total " + (this.bandejasnecesarias * 50) + " ubicaciones.";
                if (this.bandejasnecesarias > 0) {
                    this.notificacion = true;
                }
                this.encenderBoton = false;
                this.limpiarDatos();
                this.listarUbicacion();
            }
        },

        async comprobarUbi(ubi, idTipoUbicacion) {
            let a;
            await axios.get('http://localhost:12590/api/tucann/proUbicacion/bxidu/' + ubi, {
                    headers: generalHeader()
                })
                .then(res => {
                    a = res.data[0].estadoUbicacion;
                    console.log(res.data);
                })
                .catch(err => {
                    a = 0;
                })
            return a;
        },
        limpiarDatos() {
            this.ban = '';
            this.blo = '';
            this.cam = '';
            this.camin = '';
            this.lug = '';
            this.pot = '';
            this.den = '';
            this.numpotesembrar = '';
            this.numbandejassembrar = '';
            this.valor = 0;
            this.contadornoexiste = 0;
            this.contadorvacias = 0;
            this.contadorocupadas = 0;
            this.bandejasnecesarias = 0;
            this.idTipoUbicacion = '';
            this.encenderBotonBloque = true;
            this.encenderCrearBotonBloque = true;
            this.habilitarTipoUbicacion = false;
            this.esperarRevBloques = false;
            this.vectorUbiBloquesCorrecto = [];
            this.bandera = null;

        }
    },
};
</script>
