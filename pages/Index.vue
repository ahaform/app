<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
});

useHead({
    script: [{ src: "https://ecstatic.ptengine.com/sdk/ec-sdk.js" }]
})

const { find, publish, renderForm } = useForm();

const domRef = ref();

const open = (callback: (path: string) => void) => {
    ElMessageBox.prompt('请输入发布路径', '表单发布', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    })
        .then(({ value }) => {
            callback(value);
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
        })
}


const formData = ref<any>(null);

const handleUpdateChange = async (data: any) => {

    renderForm(data, domRef);
}



const publishHandler = async () => {

    const basePath = localStorage.getItem('curr_sid');

    if (!basePath) {
        ElMessage({
            type: 'error',
            message: '基础路径不存在',
        })
        return;
    }

    open(async (path) => {
        //构造发布结构
        const fullPath = `${basePath}/${path}.js`;

        publish(fullPath, formData.value);

    })
}

onMounted(async () => {
    //TODO 模拟获取远程数据
    formData.value = await find();

})




</script>
<template>
    <div class="app">

        <header class="header flex justify-end fixed right-0 bg-white w-full">
            <button class="m-1 pt-1 pb-1 pr-4 pl-4 bg-gray-500 text-white text-xs rounded">保存草稿</button>
            <button class="m-1 pt-1 pb-1 pr-4 pl-4 bg-green-500 text-white text-xs rounded"
                @click="publishHandler">发布</button>
        </header>
        <!-- <nav class="nav">导航</nav> -->
        <main class="main flex h-full pt-8">

            <section class="content w-4/6 p-4">

                <div class="canvas">
                    <div ref="domRef"></div>

                </div>
            </section>

            <section class="panel w-2/6 p-4">属性面板

                <PropsForm v-if="formData" :config="formData" @content-update="handleUpdateChange"></PropsForm>

            </section>

        </main>
    </div>
</template>

<style scoped>
.app {
    height: 100vh;
}
</style>