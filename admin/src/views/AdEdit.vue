<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}广告位</h1>
        <!-- @submit.native.prevent 提交表单时不要默认提交 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button size="small" @click="model.items.push({})">
                    <i class="el-icon-plus"></i> 添加广告
                </el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <!-- 循环出英雄的所有技能 -->
                    <el-col :md="24" v-for="(item,index) of model.items" :key="index">
                        <el-form-item label="跳转链接(URL)">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="margin-top:0.5rem">
                            <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :on-success="res => $set(item,'image',res.url)"
                            >
                                <img v-if="item.image" :src="item.image" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                size="small"
                                type="danger"
                                @click="model.items.splice(index,1)"
                            >删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                items: []
            }
        };
    },
    methods: {
        async fetch() {
            /**
             * 获取分类详情
             */
            const res = await this.$http.get(`rest/ads/${this.id}`);
            // 将this.model和res.data合并成一个新的对象赋值给this.model
            this.model = Object.assign({}, this.model, res.data);
        },

        async save() {
            /**
             * 添加分类和修改分类
             *
             */
            let res;
            if (this.id) {
                res = await this.$http.put(`rest/ads/${this.id}`, this.model);
            } else {
                res = await this.$http.post("rest/ads", this.model);
            }

            this.$router.push("/ads/list");
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
        this.id && this.fetch();
    }
};
</script>

<style scoped>
img.avatar{
    border-radius: 0;
}
</style>