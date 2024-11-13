<template>
    <q-layout view="hHh Lpr lff">
        <NavigationBar />
        <q-page-container>
            <router-view />
        </q-page-container>
        <Footer style="position: fixed; bottom: 0" />
    </q-layout>
</template>

<script setup lang="ts">
import NavigationBar from 'src/components/NavigationBar.vue';
import Footer from 'src/components/Footer.vue';

defineOptions({
    name: 'MainLayout',
});
</script>
