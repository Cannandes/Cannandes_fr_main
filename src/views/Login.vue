<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex md12>
                <v-card width="350 " class="mx-auto" elevation="20">

                    <v-system-bar height="4" class="    primary "></v-system-bar>
                    <v-img src="@/assets/logo_cannandes.png" width="200" class="mx-auto mt-5"></v-img>
                    <v-card-text></v-card-text>
                    <form name="form" @submit.prevent="manejarLogin">
                        <v-card-text>
                            <v-text-field blue--text label="Usuario.." outlined v-model="correoUsuarioSistema" secondary append-icon="person">
                            </v-text-field>
                            <!--<div v-if="errors.has('username')" class="alert alert-danger" role="alert">Se requiere que ingrese el usuario!</div>-->
                            <v-text-field label="Contraseña.." outlined v-model="contraseniaUsuarioSistema" type="password" append-icon="key" v-on:keyup.enter="validarMail(correoUsuarioSistema,contraseniaUsuarioSistema)">
                            </v-text-field>
                            <!--<div v-if="errors.has('password')" class="alert alert-danger" role="alert">Se requiere que ingrese la contrasenia correcta!</div>-->
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="validarMail(correoUsuarioSistema,contraseniaUsuarioSistema)" block class="primary">ingresar</v-btn>
                            <div class="form-group">
                                <!--    <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>-->
                            </div>
                        </v-card-actions>
                        <v-progress-linear :active="espera" :indeterminate="espera" absolute bottom color="primary accent-4"></v-progress-linear>

                    </form>

                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</div>
</template>

<script>
//import User from '@/model/user'
export default {
    name: 'CannandesSaLogin',

    data() {
        return {
            user: {},
            espera: false,
            correoUsuarioSistema: '',
            contraseniaUsuarioSistema: '',
            message: '',
        };
    },

    mounted() {
        if (!this.currentUser) {
            this.$router.push("/");
        }

    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        validarMail(correo, contraseniaUsuarioSistema) {

            if (/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail|cannandes)\.(?:|com|es)+$/.test(correo)) {
                this.espera = true;
                const user = {
                    correoUsuarioSistema: correo,
                    contraseniaUsuarioSistema: contraseniaUsuarioSistema,
                };
                this.manejarLogin(user);
            } else {
                alert("Debes ingresar las credenciales correctas!!");
            }
        },
        manejarLogin(user) {
            this.$store.dispatch('auth/login', user).then(() => {
                this.$router.replace('/home');
            }, error => {
                this.espera = false;
                this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                alert("Debes ingresar las credenciales correctas!!");
            })
        }
    }
};
</script>
