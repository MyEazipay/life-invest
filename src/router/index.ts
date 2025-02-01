import Home from '../pages/home.vue';
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;