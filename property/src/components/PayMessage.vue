<template>
  <div class="main">
    <div class="paymessage">
      <el-row>
        <el-col :span="6">
          <el-card>
            <el-form label-position="top">
              <el-form-item label="缴费人员">
                <el-input placeholder="输入缴费人员"></el-input>
              </el-form-item>
              <el-form-item label="缴费名称 ">
                <el-input placeholder="输入缴费项目/名称"></el-input>
              </el-form-item>
              <el-form-item label="支付类型">
                <el-select placeholder="输入支付类型">
                  <el-option label="支付宝支付" value="1"></el-option>
                  <el-option label="微信支付" value="2"></el-option>
                  <el-option label="银联支付" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付状态">
                <el-select placeholder="选择支付状态">
                  <el-option label="已支付" value="1"></el-option>
                  <el-option label="未支付" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付时间">
                <el-date-picker
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="缴费金额">
                <el-input placeholder="输入缴费金额"></el-input>
              </el-form-item>
              <el-form-item label="缴费优先级">
                <el-input placeholder="输入缴费优先级"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="info" plain>重置</el-button>
            <el-button type="primary">立即查询</el-button>
          </el-card>
        </el-col>
        <el-col :span="18"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .paymessage {
    background-color: #fff;
    padding: 1.3% 1%;
  }
}
</style>
