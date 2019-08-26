<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}分类</h1>
        <!-- @submit.native.prevent 提交表单时不要默认提交 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    //接收从分类列表页传递过来的id
    props: {
        id: {}
    },
    data() {
        return {
            //分类
            model: {},
            //上级分类
            parents: []
        };
    },
    methods: {
        async fetch() {
            /**
             * 获取分类详情
             */
            const res = await this.$http.get(`rest/categories/${this.id}`);
            this.model = res.data;
        },
        async fetchParents() {
            /**
             * 获取所有的上级分类
             */
            const res = await this.$http.get(`rest/categories`);
            this.parents = res.data;
        },
        async save() {
            /**
             * 添加分类和修改分类
             *
             */
            let res;
            if (this.id) {
                res = await this.$http.put(`rest/categories/${this.id}`, this.model);
            } else {
                res = await this.$http.post("rest/categories", this.model);
            }

            this.$router.push("/categories/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        }
    },
    created() {
        /**
         * 进入当前页面如果存在id就查询分类
         */
        this.fetchParents()
        this.id && this.fetch();
    }
};
</script>

<style>
</style>