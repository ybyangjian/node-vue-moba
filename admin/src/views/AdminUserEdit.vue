<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}管理员</h1>
        <!-- @submit.native.prevent 提交表单时不要默认提交 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="model.password"></el-input>
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
        };
    },
    methods: {
        async fetch() {
            /**
             * 获取管理员详情
             */
            const res = await this.$http.get(`rest/admin_users/${this.id}`);
            this.model = res.data;
        },
       
        async save() {
            /**
             * 添加管理员和修改管理员
             *
             */
            let res;
            if (this.id) {
                res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
            } else {
                res = await this.$http.post("rest/admin_users", this.model);
            }

            this.$router.push("/admin_users/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        }
    },
    created() {
        /**
         * 进入当前页面如果存在id就查询管理员
         */
      
        this.id && this.fetch();
    }
};
</script>

<style>
</style>