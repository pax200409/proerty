<template>
  <div class="maininfo">
    <div class="box">
      <el-tabs type="border-card">
        <el-tab-pane label="单元详情">
          <div class="cont" v-if="!isEditing">
            <div>
              <p><i class="red-star">*</i>小区名称:</p>
              <span> {{ detailData.communityname }}</span>
            </div>
            <div>
              <p><i class="red-star">*</i>单元名称:</p>
              <span>{{ detailData.unitname }}</span>
            </div>
            <div>
              <p><i class="red-star">*</i>栋数:</p>
              <span>{{ detailData.unitnum }}</span>
            </div>
            <div>
              <p><i class="red-star">*</i>状态:</p>
              <span>{{ detailData.unitstatus === 1 ? "已建成" : "未建成" }}</span>
            </div>
            <div>
              <p>咨询:</p>
              <span v-html="detailData.unitcontext"></span>
            </div>
          </div>
          <div class="form" v-if="isEditing">
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
                    .
                    <el-option label="已建成" value="1"></el-option>
                    <el-option label="未建成" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
            <!-- 富文本 -->

            <!-- <div class="txt">
            <div class="wz">
              <p>咨询问候</p>
            </div>
            <div class="fu">
              <vue-ueditor-wrap
                class="addtit"
                v-model="ruleForm.unitcontext"
                :config="ueConfig"
              ></vue-ueditor-wrap>
            </div>
          </div> -->

          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 按钮 -->
      <div class="btn">
        <el-button type="primary" @click="back">
          <img src="../assets/img/fh.png" alt="" style="width: 20px" />
          返回
        </el-button>
        <br />
        <el-button type="primary" @click="handleEdit" v-if="!isEditing">
          <img src="../assets/img/bc.png" alt="" style="width: 13px" />
          编辑
        </el-button>
        <el-button type="primary" @click="handleSave" v-if="isEditing">
          <img src="../assets/img/bc.png" alt="" style="width: 13px" />
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  name: "text_f",
  components: {
    // VueUeditorWrap
  },
  data() {
    return {
      isEditing: false,
      detailData: {},
      communityname: '',
      unitnum: '',
      unitname: '',
      unitstatus: '',
      ruleForm: {
        communityname: '',
        unitname: '',
        unitnum: '',
        unitstatus: ''
      },
      rules: {
        communityname: [
          { required: true, message: '小区名称不能为空', trigger: 'blur' },
        ],
        unitname: [
          { required: true, message: '单元名称不能为空', trigger: 'blur' },
        ],
        unitnum: [
          { required: true, message: '栋数不能为空', trigger: 'blur' },
        ],
        unitstatus: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      },
      // 富文本
      ruleForm2: {
      },
      ueConfig: {
        //UEditor资源文件的存放路径，就是放置UEditor的文件路径
        UEDITOR_HOME_URL: "/ueditor/",
        //编辑器不自动被内容撑高
        autoHeightEnabled: false,
        //初始容器高度
        initialFrameHeight: 300,
        //初始容器宽度
        initialFrameWidth: "100%",
        //上传文件接口
        enableAutoSave: false,
        //上传文件接口
        //serverUrl:this.$axios.defaults.baseURL+'/mh/ueditor/config',
        serverUrl: 'http://112.6.99.125:7013/safetyPatrol/mh/ueditor/config',
        elementPathEnable: false,
        wordCount: false
      },
    }
  },
  created() {
    const id = this.$route.query.id
    console.log(id)
    if (id) {
      this.handleDetail(id)
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
        this.detailData = res.data[0];
        // console.log(this.detailData);
      }).catch(err => {
        console.log(err);
      })
    },
    // 编辑
    handleEdit() {
      this.isEditing = true
      this.ruleForm = this.detailData
      this.detailData.unitstatus = this.ruleForm.unitstatus === '1' ? '已建成' : '未建成';
      console.log(this.ruleForm, '2222');

    },
    // 保存
    handleSave() {
      this.$confirm("确定提交信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios({
            url: 'http://community.byesame.com/house/updateunitList',
            method: 'post',
            data: {
              u_id: this.detailData.id,
              communityname: this.ruleForm.communityname,
              unitname: this.ruleForm.unitname,
              unitnum: this.ruleForm.unitnum,
              unitstatus: this.ruleForm.unitstatus,
              unitcontext: this.ruleForm.unitcontext,
              token: sessionStorage.token
            }
          }).then(res => {
            console.log(res);
            if(res.status === 200){
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.push({
                name: 'Unit'
              })
            }
          })
        })
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

}
</script>
<style lang="scss" scoped>
.form {
  position: relative;
  transform: translate(-111%, 0%);
  box-shadow: none;
  border: none;
}

.maininfo {
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

  .cont {
    div {
      width: 500px;
    }

    p {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin: 10px 0 10px 10px;
      font-size: 12px;
      color: #606266;
      padding: 5px;

      .red-star {
        color: red;
        margin-right: 5px;
      }
    }

    span {
      color: #000;
      display: inline-block;
      width: 100px;
      margin-left: 20px;
      font-size: 12px;
    }
  }

  .top1 {
    margin-left: 20px;
  }

  .top2 {
    margin-left: 20px;
  }

  .btn {
    position: absolute;
    right: 0;
    top: 0;

    .el-button {
      width: 85px;
      height: 35px;
      margin: 10px 0 10px 0;
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