<template>
  <div class="main">
    <div class="parkmessage">
      <el-tabs type="border-card">
        <el-tab-pane label="智能设备维修">
          <el-form :inline="true" :model="queryInfo">
            <el-form-item>
              <el-input
                placeholder="维修房主"
                v-model="queryInfo.homename"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                placeholder="维修状态"
                v-model="queryInfo.resultstatus"
              >
                <el-option label="已修复" :value="1"></el-option>
                <el-option label="待处理" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                range-separator="至"
                @change="updateDateRange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-search"
                @click="getParkingMessageList"
                >查询维修
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="resetParkingMessageList"
                >重置
              </el-button>
            </el-form-item>
          </el-form>
          <el-table :data="parkMessageList" stripe border>
            <el-table-column label="序号" width="60">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="parkname" label="发布人员"></el-table-column>
            <el-table-column prop="parkpay" label="房屋信息"></el-table-column>
            <el-table-column prop="address" label="维修内容"></el-table-column>
            <el-table-column prop="parkstatus" label="发布时间">
            </el-table-column>
            <el-table-column prop="address" label="处理结果"></el-table-column>
            <el-table-column label="操作" width="290">
              <template slot-scope="scope">
                <el-button
                  :disabled="scope.row.parkstatus == 1"
                  size="small"
                  icon="el-icon-share"
                >
                  分配车位
                </el-button>
                <el-button
                  size="small"
                  @click="handleEdit(scope.row)"
                  style="color: #409eff"
                  icon="el-icon-edit"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  class="deleteButton"
                  @click="handleDelete(scope.row)"
                  icon="el-icon-delete"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            :total="parkTotal"
            :page.sync="queryInfo.currPage"
            :limit.sync="queryInfo.pageNum"
            @pagination="getParkingMessageList"
            align="right"
          ></Pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      id: '',
      parkMessageList: [],
      parkForm: {
        parkname: '',
        parkpay: '',
        parkstatus: 1,
        parktype: 1,
        token: ''
      },
      parkTotal: 0,
      queryInfo: {
        repairtype: 1,
        homename: '',
        resultstatus: '',
        startDate: '',
        endDate: '',
        currPage: 0,
        pageNum: 10,
        token: '' // 替换为实际的 token
      },
      dateRange: []
    }
  },
  methods: {
    updateDateRange(value) {
      if (value && value.length === 2) {
        // 将 dateRange 的两个值分别赋值给 queryInfo.startDate 和 queryInfo.endDate
        this.queryInfo.startDate = value[0]
        this.queryInfo.endDate = value[1]
      } else {
        // 如果没有选择日期范围，则清空 queryInfo.startDate 和 queryInfo.endDate
        this.queryInfo.startDate = ''
        this.queryInfo.endDate = ''
      }
    },
    async getParkingMessageList() {
      const params = this.queryInfo
      if (params.currPage > 0) {
        params.currPage -= 1
      }
      const { data: res } = await this.axios.get(
        'http://community.byesame.com/poster/getRepairData',
        {
          params: params
        }
      )
      this.parkMessageList = res.data
      this.parkTotal = res.total
    },
    resetParkingMessageList() {
      this.queryInfo = {
        repairtype: 1,
        homename: '',
        resultstatus: '',
        startDate: '',
        endDate: '',
        currPage: this.queryInfo.currPage,
        pageNum: this.queryInfo.pageNum,
        token: '' // 替换为实际的 token
      }
      this.getParkingMessageList()
    },

    async handleEdit(row) {
      this.id = row.id
      this.parkForm.parkname = row.parkname
      this.parkForm.parkpay = row.parkpay
      this.parkForm.parkstatus = row.parkstatus
      this.parkForm.parkstatus = row.parkstatus
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.axios.get(
            `parking/delParkData?id=${row.id}&token=${sessionStorage.getItem(
              'token'
            )}`
          )
          if (res == '删除车位成功') {
            this.getParkingMessageList()
            this.$message.success(res)
          } else {
            this.$message.error('车位删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  watch: {
    // 监听 startDate 和 endDate，确保它们的改变会更新 dateRange
    'queryInfo.startDate'(newVal) {
      if (newVal && this.queryInfo.endDate) {
        this.dateRange = [newVal, this.queryInfo.endDate]
      }
    },
    'queryInfo.endDate'(newVal) {
      if (newVal && this.queryInfo.startDate) {
        this.dateRange = [this.queryInfo.startDate, newVal]
      }
    }
  },
  mounted() {
    this.getParkingMessageList()
  },
  components: {
    Pagination
  }
}
</script>

<style scoped lang="scss">
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .parkmessage {
    background-color: #fff;
    padding: 1.3% 1%;
  }
}

::v-deep .el-table__header {
  background-color: #333; /* 设置表头背景颜色 */
}

.deleteButton:hover {
  border-color: rgb(245, 108, 108);
  color: #000;
  background-color: #fff;
}
</style>
