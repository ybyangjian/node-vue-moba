<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}英雄</h1>
        <!-- @submit.native.prevent 提交表单时不要默认提交 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <!-- action 是图片的上传地址，$http.defaults.baseURL 可以获取根路由 -->
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                >
                    <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            model: {
                name:'',
                avatar:''
            }
        };
    },
    methods: {
        afterUpload(res){
            // 展示图片
            // console.log(res)
            // 获取图片地址，这是Vue提供的显式赋值，要赋值的对象，名称，值
            // this.$set(this.model,'avatar',res.url)
            // 这种方式在data中没有相关属性时 可能无法赋值上
            this.model.avatar = res.url
        },
        async fetch() {
            /**
             * 获取分类详情
             */
            const res = await this.$http.get(`rest/heroes/${this.id}`);
            this.model = res.data;
        },
        async save() {
            /**
             * 添加分类和修改分类
             *
             */
            let res;
            if (this.id) {
                res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
            } else {
                res = await this.$http.post("rest/heroes", this.model);
            }

            this.$router.push("/heroes/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        }
    },
    created() {
        /**
         * 进入当前页面如果存在id就查询物品
         */
        this.id && this.fetch();
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>