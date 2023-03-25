<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
});


const publish = () => {
    console.log(localStorage.getItem('curr_sid'))
}

</script>
<template>
    <div class="app">

        <header class="header flex justify-end fixed right-0 bg-white w-full">
            <button class="m-1 pt-1 pb-1 pr-4 pl-4 bg-gray-500 text-white text-xs rounded">保存草稿</button>
            <button class="m-1 pt-1 pb-1 pr-4 pl-4 bg-green-500 text-white text-xs rounded" @click="publish">发布</button>
        </header>
        <!-- <nav class="nav">导航</nav> -->
        <main class="main flex h-full pt-8">

            <section class="content w-4/6 p-4 bg-zinc-600">

                <div class="canvas">
                    
                </div>
            </section>

            <section class="panel w-2/6 p-4 bg-yellow-700">属性面板</section>
            
        </main>
    </div>
</template>

<style scoped>
.app {
    height: 100vh;
}
</style>