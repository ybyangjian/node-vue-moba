<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}英雄</h1>
        <!-- @submit.native.prevent 提交表单时不要默认提交 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- value表示name的pane默认显示 -->
            <el-tabs value="basic" type="border-card">
                <el-tab-pane label="基本信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <!-- action 是图片的上传地址，$http.defaults.baseURL 可以获取根路由 -->
                        <el-upload
                            class="avatar-uploader"
                            :headers="getAuthHeaders()"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="res => $set(model,'avatar',res.url)"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="Banner">
                        <!-- action 是图片的上传地址，$http.defaults.baseURL 可以获取根路由 -->
                        <el-upload
                            class="avatar-uploader"
                            :headers="getAuthHeaders()"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="res => $set(model,'banner',res.url)"
                        >
                            <img v-if="model.banner" :src="model.banner" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                v-for="item of categories"
                                :label="item.name"
                                :key="item._id"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate
                            v-model="model.scores.difficult"
                            :max="9"
                            show-score
                            style="margin-top:0.6rem"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate
                            v-model="model.scores.skills"
                            :max="9"
                            show-score
                            style="margin-top:0.6rem"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate
                            v-model="model.scores.attack"
                            :max="9"
                            show-score
                            style="margin-top:0.6rem"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate
                            v-model="model.scores.survive"
                            :max="9"
                            show-score
                            style="margin-top:0.6rem"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option
                                v-for="item of items"
                                :label="item.name"
                                :key="item._id"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option
                                v-for="item of items"
                                :label="item.name"
                                :key="item._id"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对搞技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skills">
                    <el-button size="small" @click="model.skills.push({})">
                        <i class="el-icon-plus"></i> 添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <!-- 循环出英雄的所有技能 -->
                        <el-col :md="12" v-for="(item,index) of model.skills" :key="index">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="冷却值">
                                <el-input v-model="item.delay"></el-input>
                            </el-form-item>
                            <el-form-item label="消耗">
                                <el-input v-model="item.cost"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :show-file-list="false"
                                    :headers="getAuthHeaders()"
                                    :on-success="res => $set(item,'icon',res.url)"
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="最佳搭档" name="partners">
                    <el-button size="small" @click="model.partners.push({})">
                        <i class="el-icon-plus"></i> 添加英雄
                    </el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <!-- 循环出英雄的所有技能 -->
                        <el-col :md="12" v-for="(item,index) of model.partners" :key="index">
                            <el-form-item label="英雄">
                                <!-- filterable 可以筛选和过滤 -->
                                <el-select v-model="item.hero" filterable>
                                    <el-option
                                        v-for="hero in heroes"
                                        :key="hero._id"
                                        :value="hero._id"
                                        :label="hero.name"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="model.partners.splice(index,1)"
                                >删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top:1rem">
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
            categories: [],
            items: [],
            //分类
            model: {
                name: "",
                avatar: "",
                skills: [],
                partners: [],
                scores: {
                    difficul: 0
                }
            },
            heroes:[]
        };
    },
    methods: {
        afterUpload(res) {
            // 展示图片
            // console.log(res)
            // 获取图片地址，这是Vue提供的显式赋值，要赋值的对象，名称，值
            // this.$set(this.model,'avatar',res.url)
            // 这种方式在data中没有相关属性时 可能无法赋值上
            this.model.avatar = res.url;
        },
        async fetch() {
            /**
             * 获取分类详情
             */
            const res = await this.$http.get(`rest/heroes/${this.id}`);
            // this.model = res.data
            // Object.assign深拷贝，将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
            // 将this.model的值添加到空对象中，再将res.data的值也添加进去，如果res.data中没有的数据不会影响现有的数据
            // 避免出现这种错误 Error in render: "TypeError: Cannot read property 'difficult' of undefined"
            this.model = Object.assign({}, this.model, res.data);
        },
        async fetchCategories() {
            /**
             * 获取所有的英雄类型
             */
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
        },
        async fetchItems() {
            /**
             * 获取所有的物品
             */
            const res = await this.$http.get(`rest/items`);
            this.items = res.data;
        },
        async fetchHeroes() {
            /**
             * 获取所有的物品
             */
            const res = await this.$http.get(`rest/heroes`);
            this.heroes = res.data;
        },
        async save() {
            /**
             * 添加分类和修改分类
             *
             */
            let res;
            if (this.id) {
                res = await this.$http.put(
                    `rest/heroes/${this.id}`,
                    this.model
                );
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
        this.fetchItems();
        this.fetchCategories();
        this.id && this.fetch();
        this.heroes = this.fetchHeroes();
    }
};
</script>

<style>
</style>