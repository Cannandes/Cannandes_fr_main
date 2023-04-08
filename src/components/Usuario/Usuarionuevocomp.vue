<template>
<div>
    <v-container class="transparent light-green lighten-4">
        <v-card>
            <v-layout>
                <v-flex mx-auto lg12>
                    <v-card-title class="success white--text">
                        <v-icon left size="25" color="analogo3">group</v-icon>
                        <h2>Usuarios de sistema</h2>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="alert = !alert" elevation="15" icon>
                            <v-icon>mdi-information-variant</v-icon>
                        </v-btn>
                        <v-card-text>
                            <v-alert :value="alert" color="analogo1" dark border="top" transition="scale-transition" elevation="20">
                                Para crear un usuario se debe tener claro el
                                <strong>rol,</strong> de el mismo para que las funcionalidades esten acorde a su puesto.

                            </v-alert>
                        </v-card-text>
                    </v-card-title>
                    <v-divider horizontal class="white"></v-divider>
                    <v-container success></v-container>

                    <template>
                        <v-container success>
                            <v-card class="mx-auto">
                                <v-layout wrap>
                                    <v-flex md4>
                                        <v-card-text>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" class="primary" @click="dialogoNuevoUsuario=true">
                                                        <v-icon>add</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Nuevo usuario</span>
                                            </v-tooltip>
                                        </v-card-text>
                                    </v-flex>
                                    <v-flex md4>
                                        <v-card-text>
                                            <v-text-field v-model="search" append-icon="search"></v-text-field>
                                        </v-card-text>
                                    </v-flex>
                                </v-layout>

                                <v-card-text class="primary">
                                    <v-card>
                                        <v-card-text>
                                            <v-data-table :items="elementosUsuarioSistema" :headers="cabeceraUsuarioSistema" dense :search="search">
                                                <template v-slot:item="{ item }">
                                                    <tr>

                                                        <td>{{item.cedulaUsuarioSistema}}</td>
                                                        <td>{{item.nombreUsuarioSistema}} {{item.apellidoUsuarioSistema}}</td>
                                                        <td>{{item.usuarioSistema}} </td>
                                                        <td>{{item.correoUsuarioSistema}} </td>
                                                        <td>{{item.genRolUsuarioSistema.nombreRolUsuarioSistema}} </td>
                                                        <td>
                                                              <div v-if="item.genEstadoUsuarioSistema.idEstadoUsuarioSistema== 1 &&  item.genRolUsuarioSistema.idRolUsuarioSistema== 1  " >
                                                                <v-tooltip bottom>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn class="primary" dark v-bind="attrs" v-on="on" icon x-small @click="gestionarEstadoUsuario(item)" disabled>
                                                                            <v-icon> check</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Activo</span>
                                                                </v-tooltip>
                                                            </div>
                                                            <div v-else-if="item.genEstadoUsuarioSistema.idEstadoUsuarioSistema== 1">
                                                                <v-tooltip bottom>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn class="primary" dark v-bind="attrs" v-on="on" icon x-small @click="gestionarEstadoUsuario(item)">
                                                                            <v-icon> check</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Activo</span>
                                                                </v-tooltip>
                                                            </div>
                                                            <div v-if="item.genEstadoUsuarioSistema.idEstadoUsuarioSistema== 2">
                                                                <v-tooltip bottom>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn class="error" dark v-bind="attrs" v-on="on" icon x-small @click="gestionarEstadoUsuario(item)">
                                                                            <v-icon>close</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Desabilitado</span>
                                                                </v-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <v-tooltip bottom>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn icon v-bind="attrs" v-on="on" @click="editItem(item)">
                                                                        <v-icon color="analogo1">edit</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <span>Editar</span>
                                                            </v-tooltip>
                                                        </td>

                                                    </tr>
                                                </template>
                                            </v-data-table>
                                        </v-card-text>
                                    </v-card>

                                </v-card-text>
                            </v-card>
                        </v-container>
                    </template>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
    <v-dialog v-model="dialogoNuevoUsuario" width="550" persistent>
        <v-card width="550">
            <v-card-title class="primary white--text"> {{tituloFormulario}}
                <v-spacer></v-spacer>
                <div v-if="botonEditar">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon class="primary" v-bind="attrs" v-on="on" elevation="10" @click="editarCampoUsuario = !editarCampoUsuario">
                                <v-icon color="white">edit</v-icon>
                            </v-btn>
                        </template>
                        <span>Desbloquear</span>
                    </v-tooltip>
                </div>

            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md12>
                        <v-text-field class="ml-2 mr-2" label="Cédula.." v-model="editarUsuarioSistema.cedulaUsuarioSistema" :disabled="editarCampoUsuario"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-text-field class="ml-2 mr-2" label="Nombres.." v-model="editarUsuarioSistema.nombreUsuarioSistema" :disabled="editarCampoUsuario"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-text-field class="ml-2 mr-2" label="Apellidos.." v-model="editarUsuarioSistema.apellidoUsuarioSistema" :disabled="editarCampoUsuario"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-text-field class="ml-2 mr-2" label="Correo.." v-model="editarUsuarioSistema.correoUsuarioSistema" :disabled="editarCampoUsuario"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-text-field class="ml-2 mr-2" label="Contraseña.." v-model="editarUsuarioSistema.contraseniaUsuarioSistema" type="password" :disabled="editarCampoUsuario"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-text-field class="ml-2 mr-2" label="Usuario sistema.." v-model="editarUsuarioSistema.usuarioSistema" :disabled="editarCampoUsuario"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-select class="ml-2 mr-2" label="Rol usuario.." v-model="editarElementosRolUsuarioSistema.idRolUsuarioSistema" item-text="nombreRolUsuarioSistema" item-value="idRolUsuarioSistema" :items="elementosRolUsuarioSistema" :disabled="editarCampoUsuario"></v-select>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn class="error" @click="cerrarDialogo()">cancelar</v-btn>
                <v-btn class="primary" @click="guardarUsuarioSistema(editarUsuarioSistema,editarElementosRolUsuarioSistema,editarElementosRolUsuarioSistema.idRolUsuarioSistema)" :disabled="editarCampoUsuario">guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import usuarioService from '@/services/general/usuario.service.js'
export default {
    name: 'CannandesSaUsuarionuevocomp',

    data() {
        return {
            habilitarDesbloqueo: true,
            editarCampoUsuario: false,
            indiceEditado: -1,
            indiceEditadoRolUsuarioSistema: -1,
            editarUsuarioSistema: {
                cedulaUsuarioSistema: '',
                nombreUsuarioSistema: '',
                apellidoUsuarioSistema: '',
                correoUsuarioSistema: '',
                contraseniaUsuarioSistema: '',
                usuarioSistema: '',

                genEstadoUsuarioSistema: {
                    idEstadoUsuarioSistema: '',
                },

                genRolUsuarioSistema: {
                    idRolUsuarioSistema: '',
                    nombreRolUsuarioSistema: '',
                }
            },
            defaultItem: {
                cedulaUsuarioSistema: '',
                nombreUsuarioSistema: '',
                apellidoUsuarioSistema: '',
                correoUsuarioSistema: '',
                contraseniaUsuarioSistema: '',
                usuarioSistema: '',

                genEstadoUsuarioSistema: {
                    idEstadoUsuarioSistema: '',
                },

                genRolUsuarioSistema: {
                    idRolUsuarioSistema: '',
                    nombreRolUsuarioSistema: '',
                }
            },

            search: null,
            alert: false,
            dialogoNuevoUsuario: false,
            elementosRolUsuarioSistema: [{
                idRolUsuarioSistema: '',
                descripcionRolUsuarioSistema: ''
            }],
            editarElementosRolUsuarioSistema: [{
                idRolUsuarioSistema: '',
                descripcionRolUsuarioSistema: ''
            }],
            defaultElementosRolUsuarioSistema: [{
                idRolUsuarioSistema: '',
                descripcionRolUsuarioSistema: ''
            }],

            cabeceraUsuarioSistema: [{
                    text: 'Cédula',
                    value: 'cedulaUsuarioSistema'
                },
                {
                    text: 'Nombre',
                    value: 'nombreUsuarioSistema'
                },
                {
                    text: 'Usuario',
                    value: 'usuarioSistema'
                },
                {
                    text: 'Correo',
                    value: 'correoUsuarioSistema'
                },
                {
                    text: 'Rol',
                    value: ''
                },
                {
                    text: 'Estado',
                    value: 'genEstadoUsuarioSistema.idEstadoUsuarioSistema'
                },
                {
                    text: 'Acciones',
                    value: ''
                },
            ],

            elementosUsuarioSistema: [{
                cedulaUsuarioSistema: '',
                nombreUsuarioSistema: '',
                apellidoUsuarioSistema: '',
                usuarioSistema: '',
                correoUsuarioSistema: '',
                contraseniaUsuarioSistema: '',
                genEstadoUsuarioSistema: {
                    idEstadoUsuarioSistema: '',
                },
                genRolUsuarioSistema: {
                    idRolUsuarioSistema: '',
                    nombreRolUsuarioSistema: '',
                }
            }],

        };
    },

    mounted() {
        this.listarRlUsuario();
        this.listarUsuarios();
    },
    computed: {
        tituloFormulario() {
            return this.indiceEditado === -1 ? 'CREAR NUEVO USUARIO' : 'EDITAR USUARIO'
        },

        botonEditar() {
            return this.indiceEditado === -1 ? this.habilitarDesbloqueo = false : this.habilitarDesbloqueo = true
        },
    },
    methods: {
        listarRlUsuario() {
            usuarioService.listarRolUsuario().then((resp) => {
                //   console.log(resp.data);
                this.elementosRolUsuarioSistema = resp.data;
            });
        },

        manejoUsuarioNuevoSistema(usuario) {
            usuarioService.registrarNuevoUsuario(usuario).then((resp) => {})
        },
        listarUsuarios() {
            usuarioService.listarUsuarioSistema().then((resp) => {
                this.elementosUsuarioSistema = resp.data;
            })
        },
        inicializarDatos() {
            this.cedula = '';
            this.nombres = '';
            this.apellidos = '';
            this.correo = '';
            this.contrasenia = '';
            this.rolUsuario = '';
            this.usuario = '';
            this.editarCampoUsuario = true;
        },
        editItem(item) {
            this.habilitarDesbloqueo = true;
            this.indiceEditado = this.elementosUsuarioSistema.indexOf(item)
            this.editarUsuarioSistema = Object.assign({}, item)

            this.indiceEditadoRolUsuarioSistema = this.elementosRolUsuarioSistema.indexOf(item.genRolUsuarioSistema)
            this.editarElementosRolUsuarioSistema = Object.assign({}, item.genRolUsuarioSistema)
            this.editarCampoUsuario = true;
            this.dialogoNuevoUsuario = true
        },

        guardarUsuarioSistema(editarUsuarioSistema, editarElementosRolUsuarioSistema, idRolUsuarioSistema) {
            if (editarUsuarioSistema.cedulaUsuarioSistema == '' || editarUsuarioSistema.nombreUsuarioSistema == '' || editarUsuarioSistema.nombreUsuarioSistema == '' || editarUsuarioSistema.apellidoUsuarioSistema == '' || editarUsuarioSistema.usuarioSistema == '' || editarUsuarioSistema.contraseniaUsuarioSistema == '' || editarUsuarioSistema.correoUsuarioSistema == '' || idRolUsuarioSistema == undefined) {
                alert("Los campos no deben quedar vacíos!");
            } else {

                if (this.indiceEditado > -1) {

                    let usuario = {
                        idUsuarioSistema: editarUsuarioSistema.idUsuarioSistema,
                        cedulaUsuarioSistema: editarUsuarioSistema.cedulaUsuarioSistema,
                        nombreUsuarioSistema: editarUsuarioSistema.nombreUsuarioSistema,
                        apellidoUsuarioSistema: editarUsuarioSistema.apellidoUsuarioSistema,
                        usuarioSistema: editarUsuarioSistema.usuarioSistema,
                        contraseniaUsuarioSistema: editarUsuarioSistema.contraseniaUsuarioSistema,
                        correoUsuarioSistema: editarUsuarioSistema.correoUsuarioSistema,
                        genEstadoUsuarioSistema: {
                            idEstadoUsuarioSistema: editarUsuarioSistema.genEstadoUsuarioSistema.idEstadoUsuarioSistema,
                        },
                        genRolUsuarioSistema: {
                            idRolUsuarioSistema: idRolUsuarioSistema
                        },
                    }
                    usuarioService.editarUsuario(usuario).then((resp) => {
                        this.cerrarDialogo();
                        this.listarUsuarios();
                        this.$fire({
                            title: '<strong class="u">Excelente!</strong>',
                            html: '<spam class="u">El usuario se ha editado correctamante!</spam>',
                            type: "success",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',

                        }).then(r => {
                            // console.log(r);
                        });
                    })
                    //  console.log(usuario);
                } else {
                    //   usuarioService.registrarNuevoUsuario()
                    let usuario = {
                        idUsuarioSistema: '',
                        cedulaUsuarioSistema: editarUsuarioSistema.cedulaUsuarioSistema,
                        nombreUsuarioSistema: editarUsuarioSistema.nombreUsuarioSistema,
                        apellidoUsuarioSistema: editarUsuarioSistema.apellidoUsuarioSistema,
                        usuarioSistema: editarUsuarioSistema.usuarioSistema,
                        contraseniaUsuarioSistema: editarUsuarioSistema.contraseniaUsuarioSistema,
                        correoUsuarioSistema: editarUsuarioSistema.correoUsuarioSistema,
                        genEstadoUsuarioSistema: {
                            idEstadoUsuarioSistema: 1,
                        },
                        genRolUsuarioSistema: {
                            idRolUsuarioSistema: idRolUsuarioSistema
                        },
                    }
                    usuarioService.registrarNuevoUsuario(usuario).then(() => {
                        this.cerrarDialogo();
                        this.listarUsuarios();
                        this.$fire({
                            title: '<strong class="u">Excelente!</strong>',
                            html: '<spam class="u">Usuario creado correctamante!</spam>',
                            type: "success",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',

                        }).then(r => {
                            // console.log(r);
                        });
                    })
                    // console.log(usuario);
                }
            }

        },
        gestionarEstadoUsuario(item) {
            if (item.genRolUsuarioSistema.idRolUsuarioSistema == 1 && item.genRolUsuarioSistema.nombreRolUsuarioSistema == "Administrador") {
                alert("Esta accion no se puede realizar!");
            } else {
                if (item.genEstadoUsuarioSistema.idEstadoUsuarioSistema == 1) {
                    let usuario = {
                        idUsuarioSistema: item.idUsuarioSistema,
                        cedulaUsuarioSistema: item.cedulaUsuarioSistema,
                        nombreUsuarioSistema: item.nombreUsuarioSistema,
                        apellidoUsuarioSistema: item.apellidoUsuarioSistema,
                        usuarioSistema: item.usuarioSistema,
                        contraseniaUsuarioSistema: item.contraseniaUsuarioSistema,
                        correoUsuarioSistema: item.correoUsuarioSistema,
                        genEstadoUsuarioSistema: {
                            idEstadoUsuarioSistema: 2,
                        },
                        genRolUsuarioSistema: {
                            idRolUsuarioSistema: item.genRolUsuarioSistema.idRolUsuarioSistema
                        },
                    }
                    //  console.log(usuario);
                    usuarioService.editarUsuario(usuario).then((resp) => {
                        this.cerrarDialogo();
                        this.listarUsuarios();
                        this.$fire({
                            title: '<strong class="u">Excelente!</strong>',
                            html: '<spam class="u">El usuario se ha editado correctamante!</spam>',
                            type: "success",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',

                        }).then(r => {
                            // console.log(r);
                        });
                    })

                } else if (item.genEstadoUsuarioSistema.idEstadoUsuarioSistema == 2) {
                    let usuario = {
                        idUsuarioSistema: item.idUsuarioSistema,
                        cedulaUsuarioSistema: item.cedulaUsuarioSistema,
                        nombreUsuarioSistema: item.nombreUsuarioSistema,
                        apellidoUsuarioSistema: item.apellidoUsuarioSistema,
                        usuarioSistema: item.usuarioSistema,
                        contraseniaUsuarioSistema: item.contraseniaUsuarioSistema,
                        correoUsuarioSistema: item.correoUsuarioSistema,
                        genEstadoUsuarioSistema: {
                            idEstadoUsuarioSistema: 1,
                        },
                        genRolUsuarioSistema: {
                            idRolUsuarioSistema: item.genRolUsuarioSistema.idRolUsuarioSistema
                        },
                    }
                    usuarioService.editarUsuario(usuario).then((resp) => {
                        this.cerrarDialogo();
                        this.listarUsuarios();
                        this.$fire({
                            title: '<strong class="u">Excelente!</strong>',
                            html: '<spam class="u">El usuario se ha editado correctamante!</spam>',
                            type: "success",
                            timer: 4000,
                            confirmButtonText: '<spam class="u" >OK</spam>',
                            confirmButtonColor: '#4CAF50',

                        }).then(r => {
                            // console.log(r);
                        });
                    })

                } else {
                    this.alert("Imposible realizar esta acción!!");
                }
            }

        },
        cerrarDialogo() {
            this.habilitarDesbloqueo = true;
            this.dialogoNuevoUsuario = false;
            this.editarCampoUsuario = false;
            this.$nextTick(() => {
                this.editarUsuarioSistema = Object.assign({}, this.defaultItem)
                this.editarElementosRolUsuarioSistema = Object.assign({}, this.defaultElementosRolUsuarioSistema)
                this.indiceEditado = -1
            })

        },
    },
};
</script>
