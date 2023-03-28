<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
});


//TODO 待重构： hooks 抽取

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

let formData = ref<any>(null);
const publish = async () => {

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
        const body = {
            "path": `${basePath}/${path}.js`,
            "data": {
                ...formData.value
            }

        }

        const result = await $fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify(body)
        });


        ElMessage({
            type: 'success',
            message: JSON.stringify(result),
        });
    })

    const saveDraft = () => {

    }


}

onMounted(() => {
    //TODO 获取远程数据
    setTimeout(() => {
        formData.value = {
            "baseFontSize": { "unit": "px", "value": "14" },
            "tagFontSize": { "unit": "em", "value": "1" },
            "tagColor": "#555555",
            "textFontSize": { "unit": "em", "value": "1.36" },
            "textColor": "#181818",
            "subFontSize": { "unit": "em", "value": "0.8" },
            "subColor": "#999999",
            "answerFontSize": { "unit": "em", "value": "0.96" },
            "completeTitleFontSize": { "unit": "em", "value": "1.6" },
            "completeTitleColor": "#181818",
            "completeSubtitleFontSize": { "unit": "em", "value": "1" },
            "completeSubtitleColor": "#181818",
            "completeDescriptionFontSize": { "unit": "em", "value": "1.2" },
            "completeDescriptionColor": "#3B3B3B",
            "formData": "[{\"id\":\"test\",\"tagline\":\"111\",\"title\":\"11\",\"required\":true,\"type\":\"text\",\"keepAlive\":false,\"multiple\":false,\"allowOther\":false,\"helpTextShow\":false},{\"id\":\"2\",\"tagline\":\"2\",\"title\":\"2\",\"required\":true,\"type\":\"text\",\"keepAlive\":false,\"multiple\":false,\"allowOther\":false,\"helpTextShow\":false},{\"id\":\"__complete\",\"title\":\"2额 \",\"subtitle\":\"\",\"description\":\"\",\"showSubmit\":false},{\"id\":\"test\",\"tagline\":\"test\",\"title\":\"\",\"required\":true,\"type\":\"choice\",\"keepAlive\":false,\"multiple\":false,\"allowOther\":false,\"helpTextShow\":false,\"options\":[{\"label\":\"1\",\"value\":\"1\"},{\"label\":\"2\",\"value\":\"2\",\"imageSrc\":\"\"},{\"label\":\"3\",\"value\":\"3\",\"imageSrc\":\"\"}]}]",
        }
    }, 500);


})




</script>
<template>
    <div class="app">

        <header class="header flex justify-end fixed right-0 bg-white w-full">
            <button class="m-1 pt-1 pb-1 pr-4 pl-4 bg-gray-500 text-white text-xs rounded">保存草稿</button>
            <button class="m-1 pt-1 pb-1 pr-4 pl-4 bg-green-500 text-white text-xs rounded" @click="publish">发布</button>
        </header>
        <!-- <nav class="nav">导航</nav> -->
        <main class="main flex h-full pt-8">

            <section class="content w-4/6 p-4">

                <div class="canvas">

                </div>
            </section>

            <section class="panel w-2/6 p-4">属性面板

                <PropsForm v-if="formData" :config="formData"></PropsForm>

            </section>

        </main>
    </div>
</template>

<style scoped>
.app {
    height: 100vh;
}
</style>