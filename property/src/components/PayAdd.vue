<template>
  <div class="main">
    <div class="payadd">
      <el-tabs type="border-card">
        <el-tab-pane label="计费项目查看"></el-tab-pane>
        <el-form :model="form" label-width="130px">
          <el-form-item label="计费项目名称：">
            {{ form.payname }}
          </el-form-item>
          <el-form-item label="项目优先级："> {{ form.paylevel }}</el-form-item>
          <el-form-item label="项目用量/时长：">
            {{ form.paynum }}
          </el-form-item>
          <el-form-item label="项目价格："> {{ form.paymoney }}</el-form-item>
          <el-form-item label="通知状态：">
            {{ form.coststatus === 1 ? '已通知' : '未通知' }}
          </el-form-item>
          <el-form-item label="通知人："> {{ form.username }}</el-form-item>
          <el-form-item label="通知内容："> {{ form.paycontent }}</el-form-item>
        </el-form>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayAdd',
  data() {
    return {
      form: {}
    }
  },
  methods: {
    // 查看详细信息
    getPaymentInformation(id) {
      console.log(id)
      this.axios
        .get(
          `http://community.byesame.com/cost/getCostDetail?id=${id}&token=${sessionStorage.token}`
        )
        .then((res) => {
          console.log(res)
          res.data[0].paycontent = this.stripPTags(res.data[0].paycontent)
          this.form = Array.isArray(res.data) ? res.data[0] || {} : res.data
        })
    },
    stripPTags(inputString) {
      return inputString.replace(/^<p>|<\/p>$/g, '')
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
</style>
