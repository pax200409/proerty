<template>
    <div class="addmain">
        <div class="box">
            <el-tabs type="border-card">
                <el-tab-pane label="新增单元">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="top1">
                            <el-form-item label="小区名称" prop="communityname">
                                <el-input v-model="ruleForm.communityname"></el-input>
                            </el-form-item>
                            <el-form-item label="栋数" prop="unitnum">
                                <el-input v-model="ruleForm.unitnum"></el-input>
                            </el-form-item>
                        </div>
                        <div class="top2">
                            <el-form-item label="单元名称" prop="unitname">
                                <el-input v-model="ruleForm.unitname"></el-input>
                            </el-form-item>
                            <el-form-item label="状态选择" prop="unitstatus">
                                <el-select v-model="ruleForm.unitstatus" placeholder="请选择活动区域">
                                    <el-option label="已建成" value="1"></el-option>
                                    <el-option label="未建成" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
                <!-- 富文本 -->
                <!-- <div class="txt">
                    <div class="wz">
                        <p>咨询问候</p>
                    </div>
                    <div class="fu">
                        <vue-ueditor-wrap class="addtit" v-model="ruleForm2.content"
                            :config="ueConfig"></vue-ueditor-wrap>
                    </div>
                </div> -->
            </el-tabs>
            <!-- 按钮 -->
            <div class="btn">
                <el-button type="primary" @click="back">
                    <img src="../assets/img/fh.png" alt="" style="width: 20px;">
                    返回
                </el-button>
                <br>
                <el-button type="primary" @click="save">
                    <img src="../assets/img/bc.png" alt="" style="width: 13px;">
                    保存
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'; // 引入 vue-ueditor-wrap

export default {
    name: "text_f",
    components: {
        // VueUeditorWrap
    },
    data() {
        return {
            communityname: "",
            unitnum: "",
            unitname: "",
            unitstatus: "",
            ruleForm: {
                communityname: "",
                unitname: "",
                unitnum: "",
                unitstatus: ""
            },
            rules: {
                communityname: [
                    { required: true, message: "小区名称不能为空", trigger: "blur" }
                ],
                unitname: [
                    { required: true, message: "单元名称不能为空", trigger: "blur" }
                ],
                unitnum: [
                    { required: true, message: "栋数不能为空", trigger: "blur" }
                ],
                unitstatus: [
                    { required: true, message: "状态不能为空", trigger: "blur" }
                ]
            },
            // // 富文本
            // ruleForm2: {
            //     content: ""
            // },
            // ueConfig: {
            //     // UEditor 资源文件的存放路径，就是放置UEditor的文件路径
            //     UEDITOR_HOME_URL: "/ueditor/",
            //     // 编辑器不自动被内容撑高
            //     autoHeightEnabled: false,
            //     // 初始容器高度
            //     initialFrameHeight: 300,
            //     // 初始容器宽度
            //     initialFrameWidth: 400,
            //     // 上传文件接口
            //     enableAutoSave: false,
            //     // 上传文件接口
            //     // serverUrl: this.$axios.defaults.baseURL + '/mh/ueditor/config',
            //     serverUrl: "http://community.byesame.com/mh/ueditor/config",
            //     elementPathEnable: false,
            //     wordCount: false
            // }
        };
    },
    methods: {
        // 保存
        save() {
            this.$confirm("确定提交信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    this.axios({
                        url: 'http://community.byesame.com/house/addunitList',
                        method: 'post',
                        data: {
                            communityname: this.ruleForm.communityname,
                            unitname: this.ruleForm.unitname,
                            unitnum: this.ruleForm.unitnum,
                            unitstatus: this.ruleForm.unitstatus,
                            unitcontext: this.ruleForm2.content,
                            token: sessionStorage.toekn
                        }
                    }).then(res => {
                        console.log(res);
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.$router.push({
                            name: 'Unit'
                        })
                    })
                })
        },
        // 返回
        back() {
            this.$router.go(-1);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.addmain {
    background-color: rgba(240, 240, 240);
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
}

.box::v-deep {
    position: relative;

    .el-form {
        display: flex;

        .el-input__inner {
            width: 530px;
            height: 36px;
        }
    }

    .top1 {
        margin-left: 20px;
    }

    .top2 {
        margin-left: 280px;
    }

    .btn {
        position: absolute;
        right: 0;
        top: 0;

        .el-button {
            width: 85px;
            height: 35px;
            margin: 10px 0;
            font-size: 14px;
        }

        img {
            vertical-align: middle;
        }
    }

    .txt {
        width: 90%;
        display: flex;
        justify-content: space-around;

        .wz {
            width: 9%;
            font-size: 14px;
            display: inline-block;
            text-align: right;
            margin-right: 10px;
            color: #606266;
        }

        .fu {
            width: 95%;
        }
    }
}
</style>