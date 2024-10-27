<template>
    <div class="box">
        <div class="back" @click="goback">
            <p>返回</p>
        </div>
        <div class="homemsg">
            <div class="homemsgtitle">
                <span>房号信息</span>
            </div>
            <div class="ipt">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="单元名称" prop="unitname">
                                <el-input v-model="ruleForm.unitname">

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="幢号" prop="buildnum">
                                <el-input v-model="ruleForm.buildnum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="楼层号" prop="storeynum">
                                <el-input v-model="ruleForm.storeynum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="房号" prop="homenum">
                                <el-input v-model="ruleForm.homenum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="住客姓名" prop="homename">
                                <el-input v-model="ruleForm.homename"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态" prop="unitstatus">
                                <el-select v-model="ruleForm.unitstatus" placeholder="请选择">
                                    <el-option label="已入住" value="1"></el-option>
                                    <el-option label="未入住" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="房屋信息" prop="homemessage">
                        <el-input type="textarea" v-model="ruleForm.homemessage" :rows="5"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭成员" prop="familystatus">
                        <el-input type="textarea" v-model="ruleForm.familystatus" :rows="5"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="homemsg">
            <div class="homemsgtitle">
                <span>智能设备</span>
            </div>
            <div class="ipt">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="洗衣机数量" prop="washnum">
                                <el-input v-model="ruleForm.washnum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="WI-FI名称" prop="wifiname">
                                <el-input v-model="ruleForm.wifiname"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="空调数量" prop="airnum">
                                <el-input v-model="ruleForm.airnum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="智能设备状态" prop="smartstatus">
                                <el-select v-model="ruleForm.smartstatus" placeholder="请选择">
                                    <el-option label="完好" value="1"></el-option>
                                    <el-option label="待维修" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="homemsg">
            <div class="homemsgtitle">
                <span>家居设备</span>
            </div>
            <div class="ipt">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="书桌数量" prop="homedesk">
                                <el-input v-model="ruleForm.homedesk"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="椅子数量" prop="homechair">
                                <el-input v-model="ruleForm.homechair"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="100">
                        <el-col :span="12">
                            <el-form-item label="衣橱数量" prop="homeclothes">
                                <el-input v-model="ruleForm.homeclothes"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="家具设备状态" prop="homestatus">
                                <el-select v-model="ruleForm.homestatus" placeholder="请选择">
                                    <el-option label="完好" value="1"></el-option>
                                    <el-option label="待维修" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="bottom">
            <el-button type="success" @click="handleSave">保存</el-button>
            <el-button type="primary" @click="goback">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            homeaddress: '123',
            h_id: '',
            detaildata: [],
            ruleForm: {
                communityname: '',
                unitname: '',
                buildnum: '',
                storeynum: '',
                homenum: '',
                homename: '',
                unitstatus: '',
                homemessage: '',
                familystatus: '',

                washnum: '',
                wifiname: '',
                airnum: '',
                smartstatus: '',

                homedesk: '',
                homechair: '',
                homeclothes: '',
                homestatus: '',
            },
            rules: {
                // 1
                unitname: [
                    { required: true, message: '单元名称不能为空', trigger: 'blur' },
                ],
                buildnum: [
                    { required: true, message: '幢号不能为空', trigger: 'blur' },
                ],
                storeynum: [
                    { required: true, message: '楼层号不能为空', trigger: 'blur' },
                ],
                homenum: [
                    { required: true, message: '房号不能为空', trigger: 'blur' },
                ],
                homename: [
                    { required: true, message: '住客姓名不能为空', trigger: 'blur' },
                ],
                homemessage: [
                    { required: true, message: '房屋信息不能为空', trigger: 'blur' },
                ],
                familystatus: [
                    { required: true, message: '家庭成员不能为空', trigger: 'blur' },
                ],
                // 2
                washnum: [
                    { required: true, message: '洗衣机数量不能为空', trigger: 'blur' },
                ],
                wifiname: [
                    { required: true, message: 'wifi名不能为空', trigger: 'blur' },
                ],
                airnum: [
                    { required: true, message: '空调数量不能为空', trigger: 'blur' },
                ],
                smartstatus: [
                    { required: true, message: '智能设备状态不能为空', trigger: 'blur' },
                ],
                // 3
                homedesk: [
                    { required: true, message: '书桌数量不能为空', trigger: 'blur' },
                ],
                homechair: [
                    { required: true, message: '椅子数量不能为空', trigger: 'blur' },
                ],
                homeclothes: [
                    { required: true, message: '衣柜数量不能为空', trigger: 'blur' },
                ],
                homestatus: [
                    { required: true, message: '家居设备状态不能为空', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        const id = this.$route.query.editId;
        console.log(id)
        if (id) {
            this.handleDetail(id);
        }
    },
    methods: {
        // 获取数据
        handleDetail(id) {
            this.axios({
                url: `http://community.byesame.com/house/getDetailId?id=${id}&token=${sessionStorage.token}`,
                method: 'get'
            }).then(res => {
                console.log(res);
                this.ruleForm = res.data[0];
                this.ruleForm.h_id = res.data[0].id;
                // console.log(this.detailData);
            }).catch(err => {
                console.log(err);
            })
        },
        // 保存
        handleSave() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.axios({
                        url: 'http://community.byesame.com/house/updatenumList',
                        method: 'post',
                        data: {
                            id: this.ruleForm.id,
                            h_id: this.ruleForm.h_id,
                            communityname: this.ruleForm.communityname,
                            unitname: this.ruleForm.unitname,
                            buildnum: this.ruleForm.buildnum,
                            storeynum: this.ruleForm.storeynum,
                            homenum: this.ruleForm.homenum,
                            homename: this.ruleForm.homename,
                            unitstatus: this.ruleForm.unitstatus,
                            homemessage: this.ruleForm.homemessage,
                            familystatus: this.ruleForm.familystatus,

                            washnum: this.ruleForm.washnum,
                            wifiname: this.ruleForm.wifiname,
                            airnum: this.ruleForm.airnum,
                            smartstatus: this.ruleForm.smartstatus,

                            homedesk: this.ruleForm.homedesk,
                            homechair: this.ruleForm.homechair,
                            homeclothes: this.ruleForm.homeclothes,
                            homestatus: this.ruleForm.homestatus,

                            homeaddress: this.homeaddress,
                            token: sessionStorage.token
                        }
                    }).then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            this.$message({
                                type: "success",
                                message: "保存成功"
                            });
                            this.$router.push({
                                name: 'Number'
                            })
                        }
                    }
                    )
                } else {
                    // 如果表单验证不通过，给出提示
                    this.$message({
                        type: 'error',
                        message: '请填写正确的表单!'
                    });
                }
            })
        },
        // 保存
        // handleSave() {
        //     this.$refs.ruleForm.validate(valid => {
        //         if (valid) {
        //             this.$axiosToken({
        //                 url: 'house/updatenumList',
        //                 method: 'post',
        //                 data: {
        //                     id: this.ruleForm.id,
        //                     h_id: this.ruleForm.h_id,
        //                     communityname: this.ruleForm.communityname,
        //                     unitname: this.ruleForm.unitname,
        //                     buildnum: this.ruleForm.buildnum,
        //                     storeynum: this.ruleForm.storeynum,
        //                     homenum: this.ruleForm.homenum,
        //                     homename: this.ruleForm.homename,
        //                     unitstatus: this.ruleForm.unitstatus,
        //                     homemessage: this.ruleForm.homemessage,
        //                     familystatus: this.ruleForm.familystatus,

        //                     washnum: this.ruleForm.washnum,
        //                     wifiname: this.ruleForm.wifiname,
        //                     airnum: this.ruleForm.airnum,
        //                     smartstatus: this.ruleForm.smartstatus,

        //                     homedesk: this.ruleForm.homedesk,
        //                     homechair: this.ruleForm.homechair,
        //                     homeclothes: this.ruleForm.homeclothes,
        //                     homestatus: this.ruleForm.homestatus,

        //                     homeaddress: this.homeaddress
        //                 },
        //                 success: (res) => {
        //                     if (res) {
        //                         this.$message({
        //                             type: 'success',
        //                             message: '保存成功!'
        //                         });
        //                         // 使用 vue-router 进行页面跳转
        //                         setTimeout(() => {
        //                             this.$router.push({
        //                                 name: 'number'
        //                             })
        //                         }, 1000);
        //                     }
        //                 }

        //             })
        //         } else {
        //             // 如果表单验证不通过，给出提示
        //             console.log('表单验证失败');
        //         }
        //     })
        // },

        goback() {
            this.$router.go(-1);
        }
    },
};
</script>

<style lang="scss" scoped>
.box::v-deep {
    .back {

        p {
            cursor: pointer;
            color: #409eff;
            font-size: 14px;
        }

    }

    .homemsg {
        margin-top: 20px;

        .homemsgtitle {
            border-left: 6px solid #409eff;
            padding-left: 5px;
            margin-bottom: 20px;

            span {
                font-size: 20px;
                font-weight: 700;
            }
        }

        .ipt {
            display: flex;
            justify-content: space-evenly;
            width: 100%;

            .el-input {
                width: 520px;
            }

            .el-input__inner {
                width: 100%;
                height: 36px;
            }
        }
    }

    .bottom {
        text-align: right;
        margin-right: 80px;
        margin-top: 0px;
    }
}
</style>