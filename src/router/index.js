import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Horasluz from '../components/Produccion/Horasluzcomp.vue'
import Error from '../components/Sistema/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/proveedor',
    name: 'Proveedor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Proveedor.vue')
  },
  {
    path: '/almacen',
    name: 'Almacen',
    component: () => import(/* webpackChunkName: "about" */ '../views/Almacen.vue')
  },
  {
    path: '/semilla',
    name: 'Semilla',
    component: () => import(/* webpackChunkName: "about" */ '../views/Semilla.vue')
  },
  {
    path: '/siembra',
    name: 'Siembra',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Siembra.vue')
  },
  {
    path: '/siembramasiva',
    name: 'Siembramasiva',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Siembramasiva.vue')
  }
  ,
  {
    path: '/planta',
    name: 'Planta',
    component: () => import(/* webpackChunkName: "about" */ '../views/Planta.vue')
  }
  ,
  {
    path: '/nuevaubicacion',
    name: 'Nuevaubicacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Nuevaubicacion.vue')
  }
  ,
  {
    path: '/actividad',
    name: 'Actividad',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Actividad.vue')
  }
  ,
  {
    path: '/prueba1',
    name: 'Prueba1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pruebas/Prueba1.vue')
  },
  {
    path: '/buscarxqr',
    name: 'Buscarxqr',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Buscarxqr.vue')
  },
  {
    path: '/cambioubicacion',
    name: 'Cambioubicacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Cambioubicacion.vue')
  },
  {
    path: '/estadosemilla',
    name: 'Estadosemilla',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Estadosemilla.vue')
  },
  {
    path: '/clonacion',
    name: 'Clonacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Clonacion.vue')
  },
  {
    path: '/seleccionmadre',
    name: 'Seleccionmadre',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Seleccionmadre.vue')
  },
  {
    path: '/listarplantas',
    name: 'Listarplantas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Listarplantas.vue')
  },
  {
    path: '/tipoplanta',
    name: 'Tipoplanta',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Tipoplanta.vue')
  },
  {
    path: '/estadoplanta',
    name: 'Estadoplanta',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Estadoplanta.vue')
  },
  {
    path: '/familia',
    name: 'Familia',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Familia.vue')
  },
  {
    path: '/crecimiento',
    name: 'Crecimiento',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Crecimiento.vue')
  },
  {
    path: '/hl',
    name: 'Horasluz',
    component: Horasluz
  },
  {
    path: '/tipoubicacion',
    name: 'Tipoubicacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Tipoubicacion.vue')
  },
  {
    path: '/revisarubicacion',
    name: 'Revisarubicacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Revisarubicacion.vue')
  },
  
  {
    path: '/clasificacion',
    name: 'Clasificacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Poscosecha/Clasificacion.vue')
  },
  {
    path: '/gestionaractividad',
    name: 'Gestionaractividad',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Gestionaractividad.vue')
  },
  {
    path: '/verificarlote',
    name: 'Verificarlote',
    component: () => import(/* webpackChunkName: "about" */ '../views/Poscosecha/Verificarlote.vue')
  },
  {
    path: '/listarlotes',
    name: 'Listarlotes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Poscosecha/Listarlotes.vue')
  },
  {
    path: '/bandejas',
    name: 'Bandejas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Bandeja.vue')
  },
  {
    path: '/cambiou',
    name: 'Cambioubimasiv',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Cambioubimasiv.vue')
  },
  {
    path: '/buscarplantas',
    name: 'Buscarplantas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produccion/Buscarplantas.vue')
  },
  {
    path: '/unu',
    name: 'Usuarionuevocomp',
    component: () => import(/* webpackChunkName: "about" */ '../components/Usuario/Usuarionuevocomp.vue')
  },
  ,
  {
    path: '/lpro',
    name: 'Listaproduccion',
    component: () => import(/* webpackChunkName: "about" */ '../components/Poscosecha/Listaproduccioncomp.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  { path: '*', component: Error }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
