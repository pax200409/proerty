<template>
  <div class="main">
    <div class="paydetail">
      <el-tabs type="border-card">
        <el-tab-pane label="缴费信息详情"></el-tab-pane>
        <el-form :inline="true" :model="formIdData" label-width="130px">
          <el-col :span="12">
            <el-form-item label="缴费产品：">
              <el-input readonly v-model="formIdData.payname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缴费人员：">
              <el-input readonly v-model="formIdData.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缴费金额：">
              <el-input readonly v-model="formIdData.paymoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缴费优先级：">
              <el-input readonly v-model="formIdData.paylevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间：">
              <el-date-picker
                readonly
                v-model="formIdData.paytime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付状态：">
              <el-input :value="payStatusText" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="支付类型：">
              <el-radio v-model="formIdData.costtype" label="1" disabled>
                <img src="@/assets/img/zfb.png" alt="" />
              </el-radio>
              <el-radio v-model="formIdData.costtype" label="2" disabled>
                <img src="@/assets/img/wx.png" alt="" />
              </el-radio>
              <el-radio v-model="formIdData.costtype" label="3" disabled>
                <img src="@/assets/img/ysf.png" alt="" />
              </el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="回复内容：">
              <span v-html="formIdData.paycontent"></span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayDetail',
  data() {
    return {
      formIdData: {}
    }
  },
  methods: {
    getList(detail) {
      this.axios
        .get(
          `http://community.byesame.com/cost/getCostDetail?id=${detail}&token=${sessionStorage.token}`
        )
        .then((res) => {
          this.formIdData = res.data[0]
          console.log(res.data[0])
        })
    }
  },
  computed: {
    payStatusText() {
      if (this.formIdData.paystatus === 1) {
        return '未支付'
      } else if (this.formIdData.paystatus === 2) {
        return '已支付'
      }
      return '' // 默认返回值
    }
  },
  mounted() {
    const detail = this.$route.query.detail
    this.getList(detail)
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .paydetail {
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

img {
  width: 100px;
  height: 100px;
}
</style>
