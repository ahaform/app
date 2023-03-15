<script setup lang="ts">
const r = await $fetch('/api/hello');
console.log(r);
</script>
<template>
    <h1>hello nuxt</h1>
    <div>{{ r.msg }}</div>
</template>