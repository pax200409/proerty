<template>
  <div class="bgd">
    <main>
      <el-form>
        <el-tabs type="border-card">
          <el-tab-pane label="我的信息">
            <el-form
              :model="userInfo"
              label-width="100px"
              class="user-info-form"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户账号" prop="username">
                    <el-input
                      v-model="userInfo.username"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="账号名称">
                    <el-input
                      v-model="userInfo.nickname"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="性别">
                    <el-input
                      v-model="userInfo.sex"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="类型">
                    <el-input
                      v-model="userInfo.userType"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <el-input
                      v-model="userInfo.phone"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input
                      v-model="userInfo.email"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="生效时间">
                    <el-input
                      v-model="userInfo.createtime"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="详细地址">
                    <el-input
                      v-model="userInfo.homeaddress"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="我的车位">
                    <el-input
                      v-model="userInfo.parkname"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="计费状态">
                    <el-input
                      v-model="userInfo.billingStatus"
                      :disabled="isInputDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="我的描述">
                <el-input
                  type="textarea"
                  v-model="userInfo.note"
                  :disabled="isInputDisabled"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div class="panel">
          <h3>头像信息/更换</h3>
          <el-card>
            <div class="panel-body">
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="用户头像"
                class="user-avatar"
              />
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="1"
                :on-change="handleChange"
                :on-exceed="handleExceed"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </el-card>
        </div>
      </el-form>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      userInfo: {
        username: "",
        nickname: "",
        sex: "",
        userType: "",
        phone: "",
        email: "",
        createtime: "",
        homeaddress: "",
        parkname: "",
        billingStatus: "",
        note: "",
      },
      header: "",
      isInputDisabled: true,
      imageUrl: "", // 用于保存头像 URL
    };
  },
  methods: {
    async getUser() {
      const token = sessionStorage.getItem("token"); // 从 sessionStorage 获取 token
      const id = sessionStorage.getItem("userid"); // 从 sessionStorage 获取用户 ID
      try {
        const res = await axios.post(
          `http://community.byesame.com/users/getMyId`,
          {
            id: id,
            token: token,
          }
        );
        console.log("请求成功:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          this.mapUserData(res.data[0]); // 处理并填充用户信息
        } else {
          console.error("返回的数据格式不正确:", res.data);
        }
      } catch (error) {
        console.error(
          "获取用户信息失败",
          error.response ? error.response.data : error
        );
      }
    },
    mapUserData(data) {
      // 将原始数据映射到 userInfo 中，并转换类型和状态
      this.userInfo.username = data.username;
      this.userInfo.nickname = data.nickname;
      this.userInfo.sex = data.sex;
      this.userInfo.userType = data.type === "1" ? "管理员" : "普通用户";
      this.userInfo.phone = data.phone;
      this.userInfo.email = data.email;
      this.userInfo.createtime = data.createtime;
      this.userInfo.homeaddress = data.homeaddress;
      this.userInfo.parkname = data.parkname;
      this.userInfo.billingStatus =
        data.coststatus === "1" ? "已缴费" : "未交费";
      this.userInfo.note = data.note;
    },
    async getHeader() {
      const token = sessionStorage.getItem("token"); // 从 sessionStorage 获取 token
      try {
        const res = await axios.get(
          `http://community.byesame.com/users/getUserByToken?token=${token}`
        );
        this.header = res.data.head;
        this.getFile();
      } catch (error) {
        console.error(
          "获取用户信息失败",
          error.response ? error.response.data : error
        );
      }
    },
    async getFile() {
      try {
        const res = await axios.get(
          `http://community.byesame.com/file/${this.header}`,
          {
            responseType: "blob", // 重要：设置响应类型为 blob
          }
        );
        this.imageUrl = URL.createObjectURL(res.data); // 创建可显示的 URL
      } catch (error) {
        console.error(
          "获取用户头像失败",
          error.response ? error.response.data : error
        );
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async handleChange(file) {
      // 检查 file.file 是否存在
      console.log("文件对象:", file); // 调试信息
      const fileToUpload = file.raw; // 获取实际的文件对象
      if (!fileToUpload) {
        console.error("文件对象未找到");
        return; // 退出方法
      }
      try {
        const token = sessionStorage.getItem("token"); // 从 sessionStorage 获取 token
        const formData = new FormData();

        // 将文件添加到 FormData
        formData.append("file", fileToUpload); // 'file' 是后端期望的字段名

        // 发送请求
        const res = await axios.post(
          `users/updateIcon?token=${token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("上传成功:", res.data);
        this.$message.success("头像更换成功重新登录即可查看");
        this.imageUrl = URL.createObjectURL(file.file);
      } catch (error) {
        console.error("更换头像失败");
      }
    },
    handleExceed() {
      this.$message.warning("只能上传一张图片");
    },
  },
  mounted() {
    this.getHeader();
    this.getUser(); // 组件加载时获取用户信息
  },
};
</script>

<style scoped lang="scss">
.bgd {
  background-color: rgb(240, 240, 240);
  overflow: hidden;
}
main {
  margin: 1.3% 1%;
  padding: 0;
  background-color: #fff; /* 背景颜色 */
  padding: 20px;
}

.user-info-form {
  max-width: 800px; /* 控制表单最大宽度 */
  margin: 20px auto; /* 居中表单 */
}

.panel {
  margin-top: 20px;
  text-align: left;
}

.panel-body {
  padding: 20px;
}

.user-avatar {
  max-width: 200px; /* 控制头像大小 */
}
</style>
