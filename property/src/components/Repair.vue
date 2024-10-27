<template>
  <div class="main">
    <div class="repair">
      <el-tabs type="border-card">
        <el-tab-pane label="维修处理"></el-tab-pane>
        <el-row>
          <el-col :span="4">
            <div
              class="intelligent success"
              @click="$router.push('smartRepair')"
            >
              <div class="content">
                <i class="el-icon-office-building"></i>
                <p>智能设备维修</p>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div
              class="intelligent success"
              style="margin-left: 30px; background-color: #13ce66"
              @click="$router.push('houseRepair')"
            >
              <div class="content">
                <i class="el-icon-service"></i>
                <p>智能设备维修</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tabs>
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

  .repair {
    background-color: #fff;
    padding: 1.3% 1%;

    .intelligent {
      text-align: center;
      color: #fff;
      background-color: #20a0ff;
      border-radius: 10px;
      width: 160px;
      height: 160px;
      display: flex;
      cursor: pointer;

      .content {
        width: 100%;
        height: 100%;
        align-content: center;

        i {
          display: block;
          width: 60px;
          height: 60px;
          font-size: 60px;
          margin: 0 auto;
        }

        p {
          margin-top: 10px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
