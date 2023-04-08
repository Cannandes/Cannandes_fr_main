<template>
<div>
    <v-container>
        <v-card width="280">
            <v-card-title class="primary white--text">Indicadores producción </v-card-title>
            <v-card-text>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn x-large icon class="primary" v-bind="attrs" v-on="on">
                            <v-icon dark color="white">
                                insights
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>
                        <v-card>
                            <strong>Indicadores productivos</strong>
                            <ul>
                                <li>Semillas sembradas</li>
                                <li>Semillas germinadas</li>
                            </ul>
                        </v-card>
                    </span>
                </v-tooltip>

                <template>
                    <v-card>
                        <v-sparkline :value="value" :gradient="gradient" :smooth="radius || false" :padding="padding" :line-width="width" :stroke-linecap="lineCap" :gradient-direction="gradientDirection" :fill="fill" :type="type" :auto-line-width="autoLineWidth" auto-draw></v-sparkline>
                    </v-card>

                </template>
            </v-card-text>
        </v-card>
    </v-container>
</div>
</template>

<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
]
export default {

    name: 'Home',
    components: {},
    directives: {},
    data() {
        return {
            width: 2,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            gradientDirection: 'top',
            gradients,
            fill: false,
            type: 'trend',
            autoLineWidth: false,

        };
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/");
        }

    },
    methods: {

    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    }
};
</script>
