<script setup lang="ts">

const sid = ref('');


function handleEnter() {
    localStorage.setItem('curr_sid',sid.value);

    return navigateTo('/');
    
}
</script>
<template>
    <div class="h-full w-full flex justify-center items-center" style="height:100vh">
        <form>
            <input placeholder="请输入用户档案Sid" v-model="sid" type="text" class="border-2 w-60 box-content p-1">
            <input type="button" value="进入" class=" bg-green-500 text-white w-20 border-2 border-green-500 p-1"
                @click="handleEnter" />
        </form>
    </div>
</template>