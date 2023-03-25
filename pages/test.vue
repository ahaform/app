<script setup lang="ts">

const result = await $fetch('/api/hello');
const user = reactive({
    name: "",
    email: "",
    password: ""
});
const testInsert = () => {
    $fetch("/api/hello", {
        method: 'POST',
        body: user
    })
}
</script>
<template>
    <div>{{ result }}</div>
    <div>

        <div>
            username : <input type="text" v-model="user.name" />
            <br>
            email:<input type="email" v-model="user.email" />
            <br>
            password : <input type="password" v-model="user.password" />
        </div>


        <button class=" bg-yellow-800 text-white p-2 " @click="testInsert()">插入数据测试</button>
    </div>
</template>