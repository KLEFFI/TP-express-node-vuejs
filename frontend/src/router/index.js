import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'signup',
        component: () => import('../components/Signup.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/Dashboard.vue')
    },
    {
        path: '*',
        name: 'dashboard',
        component: () => import('../components/PageNotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/dashboard') {
        if (localStorage.getItem('jwt') == null) {
            next('/login');
        }
        else {
            next();
        }
    }
    else {
        next();
    }
})

export default router
