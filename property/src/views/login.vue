<template>
    <div class="login_content">
        <vue-particles style="width: 99%; height: 99%" color="#fff" :particleOpacity="0.7" :particlesNumber="100"
            shapeType="circle" :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
            :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
            clickMode="push" class="lizi">
        </vue-particles>
        <div class="form">
            <h3>欢迎登录小区物业管理系统</h3>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="loginForm.username" aria-placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" aria-placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item label="验证码" prop="verifyCode" class="verifyCodeItemCss" style="margin-top: 30px">
                    <el-row :span="24">
                        <el-col :span="14">
                            <el-input prefix-icon="el-icon-key" class="verify_css" placeholder="请输入4位验证码"
                                v-model="loginForm.verifyCode"></el-input>
                        </el-col>
                        <el-col :span="10">
                            <div id="v_container" style="margin-left: 42px"></div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="button-box" style="margin-top: 32px; margin-left: 150px">
                    <el-button type="primary" @click="login" style="margin-left: -25px">登录</el-button>
                    <el-button type="danger" @click="reset" style="margin-left: 25px">重置</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { GVerify } from "../assets/js/verifyCode.js";
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                verifyCode: '',
                id: '',
                type: '',
                email: ''
            },
            rules: {
                username: { required: true, message: "账号不能为空", trigger: "blur" },
                password: { required: true, message: "密码不能为空", trigger: "blur" },
                verifyCode: { required: true, message: "请输入验证码", trigger: "blur" },
            }
        }
    },
    created() {
        let token = sessionStorage.token;
        console.log(token)
    },
    mounted() {
        this.verifyCode = new GVerify("v_container");
        // 绑定监听事件
        window.addEventListener("keydown", this.keyDown);
    },
    destroyed() {
        // 销毁事件
        window.removeEventListener("keydown", this.keyDown, false);
    },
    methods: {
        // 登录
        login() {
            this.$refs['loginForm'].validate((valid) => {
                if (!valid) {
                    this.$message.error({
                        message: "请填写账号密码或验证码"
                    });
                } else {
                    this.axios({
                        url: 'http://community.byesame.com/users/login',
                        method: 'post',
                        data: {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        }
                    })
                        .then(res => {
                            console.log(res);
                            let verifyCode = this.loginForm.verifyCode;
                            let verifyFlag = this.verifyCode.validate(verifyCode);
                            if (!verifyFlag) {
                                this.$message.error("验证码错误！");
                                this.verifyCode.refresh();
                                return;
                            }else{
                                
                                if(res.status==200){
                                    sessionStorage.token=res.data.jwt_token;
                                    sessionStorage.username=this.loginForm.username;
                                    console.log(sessionStorage.username);
                                    this.$message.success("登陆成功！");
                                    this.$router.push({path:'/index'});
                                }
                                
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            if(err.status==500) return this.$message.error("用户名或密码错误");
                        })

                }
            })
        },
        // 点击回车键登录
        keyDown(e) {
            // 回车则执行登录方法 enter键的ASCII是13
            if (e.keyCode === 13) {
                this.login(); // 定义的登录方法
            }
        },

        // 重置
        reset() {
            this.loginForm = {
                username: '',
                password: '',
            }
        }
    },
}
</script>
<style lang="scss">
.login_content {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url(../assets/loginbg.jpg);
    background-size: cover;
}

.form {
    position: absolute;
    border: 1px solid #dcdfe6;
    width: 470px;
    height: 350px;
    background-color: hsla(0, 0%, 100%, .85);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 35px 85px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;

    h3 {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
        margin-left: 52px;
        font-size: 32px;
    }
}
</style>