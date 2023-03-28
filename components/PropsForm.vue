<script setup lang="ts">

const props = defineProps<{
    config: any
}>();

const data = reactive({
    ...props.config
});

const { fontUnitOptions, schema, currentUnit } = useFormSchema(data);

const activeTab = ref('content');


</script>

<template>
    <div class="m-4 p-4">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="内容" name="content">
                <el-form label-position="top">
                    <el-form-item label="JSON配置">
                        <el-input type="textarea" v-model="data.formData"
                            :autosize="{ minRows: 10, maxRows: 50 }"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="配置" name="config">
                <div style="overflow-y: auto;">
                    <div class="flex w-full">
                        <el-radio-group v-model="currentUnit" label="Unit">
                            <el-radio-button v-for="item in fontUnitOptions" :label="item.value" :key="item.value">{{
                                item.key
                            }}</el-radio-button>
                        </el-radio-group>
                    </div>

                    <el-form label-width="150px">
                        <el-form-item v-for="(item, index) in schema" :key="index" :label="item.props.label" class="mr-2">
                            <template v-if="item.$cmp === 'number'">
                                <el-input :type="item.$cmp" v-model="data[item.props.name].value">
                                    <template #suffix>
                                        {{ data[item.props.name].unit }}
                                    </template>
                                </el-input>
                            </template>
                            <template v-else>
                                <client-only>
                                    <el-color-picker v-model="data[item.props.name]" />
                                </client-only>
                            </template>
                        </el-form-item>
                    </el-form>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped></style>