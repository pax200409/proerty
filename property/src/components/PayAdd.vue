<template>
  <div class="main">
    <div class="payadd">
      <el-tabs type="border-card" v-if="$route.query.id">
        <el-tab-pane label="计费项目查看"></el-tab-pane>
        <el-form :model="formIdData" label-width="130px">
          <el-form-item label="计费项目名称：">
            {{ formIdData.payname }}
          </el-form-item>
          <el-form-item label="项目优先级：">
            {{ formIdData.paylevel }}
          </el-form-item>
          <el-form-item label="项目用量/时长：">
            {{ formIdData.paynum }}
          </el-form-item>
          <el-form-item label="项目价格：">
            {{ formIdData.paymoney }}
          </el-form-item>
          <el-form-item label="通知状态：">
            {{ formIdData.coststatus === 1 ? '已通知' : '未通知' }}
          </el-form-item>
          <el-form-item label="通知人：">
            {{ formIdData.username }}
          </el-form-item>
          <el-form-item label="通知内容：">
            {{ formIdData.paycontent }}
          </el-form-item>
        </el-form>
      </el-tabs>
      <el-tabs type="border-card" v-if="$route.query.paystatus">
        <el-tab-pane label="新增计费项目"></el-tab-pane>
        <el-form
          :model="formStatus"
          label-width="130px"
          style="padding-right: 80px"
        >
          <el-col :span="12">
            <el-form-item label="计费项目名称：">
              <el-input
                v-model="formStatus.payname"
                autocapitalize="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目优先级：">
              <el-input
                v-model="formStatus.paylevel"
                autocapitalize="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目用量/时长：">
              <el-input
                v-model="formStatus.paynum"
                autocapitalize="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目价格：">
              <el-input
                v-model="formStatus.paymoney"
                autocapitalize="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知状态：">
              <el-select
                v-model="formStatus.paystatus"
                placeholder="请选择通知状态"
              >
                <el-option label="已通知" value="1"></el-option>
                <el-option label="未通知" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费目录">
              <el-select v-model="formStatus.c_id" placeholder="请选择计费目录">
                <el-option label="电费目录" value="7"></el-option>
                <el-option label="水费固定月目录" value="8"></el-option>
                <el-option label="水费按量目录" value="9"></el-option>
                <el-option label="天然气目录" value="10"></el-option>
                <el-option label="物业费目录" value="11"></el-option>
                <el-option label="宽带费目录" value="12"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="通知内容：">
              <el-input
                v-model="formStatus.paycontent"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-tabs>
    </div>
    <div class="back">
      <el-row>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-back"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-folder-add"
          @click="addNotice"
        >
          保存
        </el-button>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-s-promotion"
          @click="addNotice"
        >
          提交
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayAdd',
  data() {
    return {
      formIdData: {},
      formStatus: {
        payname: '',
        paylevel: '',
        paynum: '',
        paymoney: '',
        paystatus: null,
        c_id: null,
        paycontent: '',
        coststatus: null,
        token: sessionStorage.token
      }
    }
  },
  methods: {
    // 查看缴费详细信息
    getPaymentInformation(id) {
      console.log(id)
      this.axios
        .get(
          `http://community.byesame.com/cost/getCostDetail?id=${id}&token=${sessionStorage.token}`
        )
        .then((res) => {
          console.log(res)
          res.data[0].paycontent = this.stripPTags(res.data[0].paycontent)
          this.formIdData = Array.isArray(res.data)
            ? res.data[0] || {}
            : res.data
        })
    },
    stripPTags(inputString) {
      return inputString.replace(/^<p>|<\/p>$/g, '')
    },
    addNotice() {
      this.$confirm('确认保存计费信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.post('http://community.byesame.com/cost/addCostData', {
            params: this.formStatus
          })
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({ name: 'PayType' })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    }
  },
  mounted() {
    const id = this.$route.query.id
    if (id) {
      this.getPaymentInformation(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .payadd {
    background-color: #fff;
    padding: 1.3% 1%;
  }
}

.back {
  position: fixed;
  top: 30%;
  right: 30px;

  .el-row {
    margin-bottom: 15px;
  }
}
</style>
