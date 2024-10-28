<template>
  <main>
    <el-form :model="userInfo" label-width="100px" class="user-info-form">
      <el-tabs type="border-card">
        <el-tab-pane label="密码修改">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input
              v-model="userInfo.oldPwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              v-model="userInfo.newPwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input
              v-model="userInfo.confirmPwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="button-group">
            <el-button type="primary" @click="changePassword"
              >修改密码</el-button
            >
            <el-button type="default" @click="restForm">重置</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInfo: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "", // 确认密码字段
      },
    };
  },
  methods: {
    async changePassword() {
      const { oldPwd, newPwd, confirmPwd } = this.userInfo;
      if (newPwd !== confirmPwd) {
        this.$message.error("新密码和确认密码不匹配");
        return;
      }
      const id = sessionStorage.getItem("userid");
      const token = sessionStorage.getItem("token");
      try {
        const res = await axios.post(
          `users/updatePwd?id=${id}&oldPwd=${oldPwd}&newPwd=${newPwd}&token=${token}`,
          {
            id: id,
            oldPwd: oldPwd,
            newPwd: newPwd,
            token: token,
          }
        );
        console.log(res);
        this.$message.success("密码修改成功");
        // 清空输入框
        this.restForm();
      } catch (error) {
        console.error(
          "密码修改失败",
          error.response ? error.response.data : error
        );
        this.$message.error("密码修改失败，请重试");
      }
    },
    restForm() {
      this.userInfo.oldPwd = "";
      this.userInfo.newPwd = "";
      this.userInfo.confirmPwd = "";
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.user-info-form {
  width: 100%; /* 表单占满宽度 */
  max-width: 95%; /* 控制表单最大宽度 */
  margin: 20px auto; /* 居中表单 */
}

.button-group {
  display: flex;
  justify-content: space-between; /* 按钮之间的间距 */
  margin-top: 20px; /* 按钮顶部间距 */
}
</style>
