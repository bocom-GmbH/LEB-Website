import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: 'kontakt/:fileId',
                component: () => import('pages/ContactUs.vue'),
            },
            {
                path: 'ueber-uns/:fileId',
                component: () => import('pages/AboutUs.vue'),
            },
            {
                path: ':directoryId',
                component: () => import('pages/DirectoryPage.vue'),
            },
            {
                path: ':directoryId/product/:productId',
                component: () => import('pages/ProductPage.vue'),
            },
            {
                path: ':directoryId/story/:storyId',
                component: () => import('pages/StoryPage.vue'),
            },
            {
                path: 'impressum',
                component: () => import('pages/ImpressumPage.vue'),
            },
        ],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
