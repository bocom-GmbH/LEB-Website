<template>
    <router-view />
</template>

<script setup lang="ts">
import { useApolloClient } from 'src/apollo/utils';
import { onMounted } from 'vue';
import { useDirectoryStore } from 'src/stores/directory-store';
const directoryStore = useDirectoryStore();

useApolloClient();

onMounted(async () => {
    await directoryStore.fetchDirectory();
});

defineOptions({
    name: 'App',
});
</script>
