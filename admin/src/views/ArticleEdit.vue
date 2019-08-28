<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}文章</h1>
        <!-- @submit.native.prevent 提交表单时不要默认提交 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <!-- 使用富文本的子组件 -->
                <vue-editor
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="model.body"
                ></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 导入富文本
import { VueEditor } from "vue2-editor";

export default {
    //接收从分类列表页传递过来的id
    props: {
        id: {}
    },
    data() {
        return {
            //文章
            model: {},
            //所属分类
            categories: []
        };
    },
    // 富文本子组件
    components: {
        VueEditor
    },
    methods: {
        async fetch() {
            /**
             * 获取分类详情
             */
            const res = await this.$http.get(`rest/articles/${this.id}`);
            this.model = res.data;
        },
        async fetchCategories() {
            /**
             * 获取文章分类
             */
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
        },
        async save() {
            /**
             * 添加分类和修改分类
             *
             */
            let res;
            if (this.id) {
                res = await this.$http.put(
                    `rest/articles/${this.id}`,
                    this.model
                );
            } else {
                res = await this.$http.post("rest/articles", this.model);
            }

            this.$router.push("/articles/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        // 富文本上传图片，使用vue2-editor插件
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)

            const formData = new FormData();
            // 因为后端接收的图片文件名叫file，这里也要改成file
            formData.append("file", file);

            const res = await this.$http.post("upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        }
    },
    created() {
        /**
         * 进入当前页面如果存在id就查询分类
         */
        this.fetchCategories();
        this.id && this.fetch();
    }
};
</script>

<style>
</style>