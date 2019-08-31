<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <!-- @submit.native监听原生的表单事件，prevent 阻止默认提交，不要跳转页面 -->
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item> 
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async login() {
          const res = await this.$http.post('login',this.model)
          // 登录成功后将token保存在localStorage中,再次打开浏览器还是存在
          localStorage.token = res.data.token

          // 浏览器关闭后就没有了
          // sessionStorage.token = res.data.token
          this.$router.push('/')
          this.$message({
            type:'success',
            message:'登录成功'
          })
        }
    }
};
</script>

<style>
.login-card {
    width: 25rem;
    margin: 6rem auto;
}
</style>