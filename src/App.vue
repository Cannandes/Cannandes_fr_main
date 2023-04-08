<template>
<v-app>

    <v-app-bar class="success" app dark>
        <!-- barra de aplicación-->
        <v-app-bar-nav-icon @click="aparece_menu = !aparece_menu" v-if="currentUser"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-icon></v-icon>
        <img src="@/assets/logo_dos.png" alt="" width="40">
        <v-app-bar-title class="ml-3">Cannandes S.A.</v-app-bar-title>
        <v-spacer></v-spacer>

        <div v-if="currentUser">
            <template>
                <div class="text-center" primary>
                    <v-menu offset-y v-if="currentUser">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon color="" dark v-bind="attrs" v-on="on" fab>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list color="primary">
                            <v-list-item v-for="(item, index) in items" :key="index">
                                <v-list-item-title>
                                    <span class=" white--text">
                                        {{ currentUser.rolSesionUsuarioSistema }}
                                    </span>
                                    <br>
                                    <v-btn href="" text color="accent" small depressed class="mb-3 mt-3">
                                        <v-icon left size="25" color="white">account_circle</v-icon>
                                        <span class="white--text">{{ currentUser.nombreSesionUsuarioSistema }}
                                        </span>
                                    </v-btn>
                                    <br>
                                    <v-divider class="white"></v-divider>
                                    <v-btn href="" text @click="logOut()" v-if="currentUser" class="primary" small depressed>
                                        <v-icon left size="25">logout</v-icon>
                                        <span class="mr-2">Salir</span>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </template>

        </div>
    </v-app-bar><!-- fin barra de aplicación-->

    <v-navigation-drawer v-model="aparece_menu" app temporary width="300">
        <v-card>
            <v-layout mt-4 column align-center>
                <v-flex>
                    <v-avatar class="dark">
                        <img src="@/assets/logo_tres.png" alt="logo">
                    </v-avatar>
                </v-flex>
                <v-flex>
                    <p class=" mt-3 ">Cannandes S.A.</p>
                </v-flex>
            </v-layout>
        </v-card><!-- fin de el usuario encabezado-->

        <v-divider></v-divider>

        <!-- LISTA DE MENU -->
        <v-list dense nav>

            <v-card>
                <v-card class="mb-2">
                    <v-list-item v-for="item in inicio" :key="item.title" :to="item.link" link>
                        <v-list-item-icon color="white">
                            <v-icon>{{item.icon}} </v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{item.title}} </v-list-item-title>
                    </v-list-item>
                </v-card>
                <v-card class="mb-2">
                    <v-list-group :value="false" prepend-icon="mdi-sprout-outline" v-if="showAdminBoard || showTecnicoBoard">
                        <!--  -->
                        <template v-slot:activator>
                            <v-list-item-title>Producción</v-list-item-title>
                        </template>

                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Semilla</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="semilla in semillas" :key="semilla.title" :to="semilla.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{semilla.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{semilla.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Planta</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="planta in plantas" :key="planta.title" :to="planta.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{planta.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{planta.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Ubicación</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="ubicacion in ubicaciones" :key="ubicacion.title" :to="ubicacion.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{ubicacion.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ubicacion.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Actividad</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="actividad in actividades" :key="actividad.title" :to="actividad.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{actividad.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{actividad.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                        <!--   <v-list-group no-action sub-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Bandejas</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="bandeja in bandejas" :key="bandeja.title" :to="bandeja.link" link>

                            <v-list-item-icon>
                                <v-icon v-text="icon">{{bandeja.icon}} </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{bandeja.title}} </v-list-item-title>
                        </v-list-item>
                    </v-list-group>-->
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Impresion</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="impresion in impresiones" :key="impresion.title" :to="impresion.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{impresion.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{impresion.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </v-list-group>
                </v-card>
                <v-card class="mb-2">

                    <v-list-group :value="false" prepend-icon="mdi-factory" v-if="showAdminBoard">
                        <!--  -->
                        <template v-slot:activator>
                            <v-list-item-title>Poscosecha</v-list-item-title>
                        </template>

                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Producción</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="posco in poscos" :key="posco.title" :to="posco.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{posco.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{posco.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-card>
                <v-card class="mb-2">
                    <v-list-group :value="false" prepend-icon="science" v-if="showAdminBoard">
                        <!--  -->
                        <template v-slot:activator>
                            <v-list-item-title>Laboratorio</v-list-item-title>
                        </template>
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Lab</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="labo in laboratorio" :key="labo.title" :to="labo.link" link>
                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{labo.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{labo.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-card>
                    <v-card class="mb-2">
                    <v-list-group :value="false" prepend-icon="science" v-if="showAdminBoard">
                        <!--  -->
                        <template v-slot:activator>
                            <v-list-item-title>Ventas</v-list-item-title>
                        </template>
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Lab</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="labo in ventas" :key="labo.title" :to="labo.link" link>
                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{labo.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{labo.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-card>
                <v-card class="mb-2">

                    <v-list-group :value="false" prepend-icon="settings" v-if="showAdminBoard">
                        <!--  -->
                        <template v-slot:activator>
                            <v-list-item-title>Ajustes</v-list-item-title>
                        </template>

                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Usuarios</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="objeto in ajustes" :key="objeto.title" :to="objeto.link" link>

                                <v-list-item-icon>
                                    <v-icon v-text="icon">{{objeto.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{objeto.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-card>
            </v-card>

        </v-list>
        <!-- FIN LISTA DE MENU -->
    </v-navigation-drawer>

    <v-main>
        <router-view />
    </v-main>

</v-app>
</template>

<script>
export default {
    name: 'CannandesSaApp',

    data() {
        return {
            aparece_menu: false,
            icon: '',
            title: '',
            link: '',
            btns: [
                ['Large', 'lg'],
            ],
            items: [{
                title: 'Click Me'
            }],
            /////////////////////////////
            inicio: [{
                icon: 'home',
                title: 'Inicio',
                link: '/home'
            }, ],
            semillas: [{
                    icon: 'mdi-seed',
                    title: 'Nueva',
                    link: '/semilla'
                },
                {
                    icon: 'mdi-account-box',
                    title: 'Proveedor',
                    link: '/proveedor'
                },
                {
                    icon: 'mdi-dip-switch ',
                    title: 'Estado',
                    link: '/estadosemilla'
                },
                {
                    icon: 'mdi-warehouse ',
                    title: 'Almacén',
                    link: '/almacen'
                },
                {
                    icon: 'account_tree',
                    title: 'Familia',
                    link: '/familia'
                },

            ],
            plantas: [{
                    icon: 'mdi-flower-tulip-outline',
                    title: 'Selección madre',
                    link: '/seleccionmadre'
                }, {
                    icon: 'list',
                    title: 'Listar',
                    link: '/listarplantas'
                },
                {
                    icon: 'mdi-gamepad-circle-up ',
                    title: 'Tipo',
                    link: '/tipoplanta'
                },
                {
                    icon: 'mdi-gamepad-circle ',
                    title: 'Estado',
                    link: '/estadoplanta'
                },
                {
                    icon: 'search',
                    title: 'Buscar',
                    link: '/buscarplantas'
                }
            ],
            ubicaciones: [{
                    icon: 'add_location',
                    title: 'Nueva',
                    link: '/nuevaubicacion'
                },
                {
                    icon: 'pin_drop',
                    title: 'Tipo',
                    link: '/tipoubicacion'
                },
                {
                    icon: 'location_searching',
                    title: 'Revisar',
                    link: '/revisarubicacion'
                }
            ],
            ajustes: [{
                icon: 'person_add',
                title: 'Nuevo',
                link: '/unu'
            }],
            bandejas: [{
                    icon: 'grid_on',
                    title: 'Nueva',
                    link: '/bandejas'
                },

            ],
            poscos: [{
                    icon: 'mdi-arrange-bring-to-front',
                    title: 'Clasificación',
                    link: '/clasificacion'
                },
                {
                    icon: 'density_small',
                    title: 'Producción',
                    link: '/lpro'
                },
                {
                    icon: 'takeout_dining',
                    title: 'Verificar',
                    link: '/verificarlote'
                },
                {
                    icon: 'list',
                    title: 'Listar',
                    link: '/listarlotes'
                },

            ],
            impresiones: [
                {
                    icon: 'mdi-printer-settings',
                    title: 'QR',
                    link: ''
                },
                {
                    icon: 'print',
                    title: 'Repo',
                    link: ''
                }
            ],
            actividades: [{
                    icon: 'note_add',
                    title: 'Revisar',
                    link: '/actividad'
                },
                {
                    icon: 'expand',
                    title: 'Crecimiento',
                    link: '/crecimiento'
                },
                {
                    icon: 'wb_incandescent',
                    title: 'Horas luz',
                    link: '/hl'
                },
                {
                    icon: 'drag_indicator',
                    title: 'Gestionar',
                    link: '/gestionaractividad'
                },
                {
                    icon: 'mdi-cannabis',
                    title: 'Clonación',
                    link: '/clonacion'
                },
                {
                    icon: 'mdi-tray-plus',
                    title: 'Siembra',
                    link: '/siembra'
                },

                {
                    icon: 'all_inbox',
                    title: 'Siembra Masiva',
                    link: '/siembramasiva'
                },
                {
                    icon: 'mdi-map-marker-distance',
                    title: 'Ubicar',
                    link: '/cambioubicacion'
                },
                {
                    icon: 'mdi-map-marker-path',
                    title: 'Ubicar Masiva',
                    link: '/cambiou'
                }
            ],
            laboratorio: [{
                icon: 'science',
                title: 'Laboratorio',
                link: '/home'
            }],
            ventas: [
             /*   {
                icon: 'science',
                title: 'Laboratorio',
                link: '/home'
            }*/
            ]

        };
    },

    mounted() {

    },

    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        },
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        showAdminBoard() {
            if (this.currentUser && this.currentUser['rolSesionUsuarioSistema']) {
                return this.currentUser['rolSesionUsuarioSistema'].includes('Administrador');
            }
            return false;
        },
        showTecnicoBoard() {
            if (this.currentUser && this.currentUser['rolSesionUsuarioSistema']) {
                return this.currentUser['rolSesionUsuarioSistema'].includes('Técnico');
            }
            return false;
        }
    },
};
</script>
