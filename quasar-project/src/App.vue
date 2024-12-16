<template>
    <router-view />
</template>

<script setup lang="ts">
import { useApolloClient } from 'src/apollo/utils';
import { onMounted } from 'vue';
import { useDirectoryStore } from 'src/stores/directory-store';

useApolloClient();
onMounted(async () => {
    await useDirectoryStore().fetchDirectory();
});

defineOptions({
    name: 'App',
});
</script>
