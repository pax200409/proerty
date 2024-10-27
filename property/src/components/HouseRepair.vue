<template>
  <div class="main">
    <div class="houserepair">
      <el-tabs type="border-card">
        <el-tab-pane label="家具设备维修">
          <el-row>
            <el-form :model="listOfRepairs" :inline="true">
              <el-form-item>
                <el-input
                  placeholder="维修房主"
                  v-model="listOfRepairs.homename"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-select
                  placeholder="维修状态"
                  size="small"
                  v-model="listOfRepairs.resultstatus"
                >
                  <el-option label="已修复" value="1"></el-option>
                  <el-option label="待处理" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="queryTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  size="small"
                  @click="search"
                  >查询维修
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  size="small"
                  @click="reset"
                  >重置
                </el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row>
            <el-table :data="tableData" border v-loading="loading">
              <el-table-column
                label="序号"
                type="index"
                align="center"
              ></el-table-column>
              <el-table-column
                label="发布人员"
                prop="homename"
                align="center"
              ></el-table-column>
              <el-table-column
                label="房屋信息"
                prop="housename"
                align="center"
              ></el-table-column>
              <el-table-column
                label="维修内容"
                prop="repaircontent"
                align="center"
              ></el-table-column>
              <el-table-column
                label="发布时间"
                prop="createtime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="处理结果"
                prop="resultstatus"
                align="center"
              >
                <template v-slot="scope">
                  <span>{{
                    scope.row.resultstatus === 2 ? '已修复' : '待处理'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200">
                <template v-slot="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-s-tools"
                    plain
                    @click="processing(scope.row)"
                    >处理
                  </el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-delete-solid"
                    plain
                    @click="del(scope.row)"
                    >归档
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <Pagination
              :total="total"
              :page.sync="currentPage"
              :limit.sync="listOfRepairs.pageNum"
              @pagination="getList"
              align="right"
            ></Pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="家居处理" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-col :span="12">
          <el-form-item label="发布人员：">
            <el-input v-model="form.homename" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋信息：">
            <el-input v-model="form.housename" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="维修内容：">
          <el-input v-model="form.repaircontent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="维修内容：">
          <el-input
            type="textarea"
            v-model="form.resultcontent"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理状态：">
          <el-switch
            v-model="value"
            active-text="已修复"
            inactive-text="待处理"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">处理提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'HouseRepair',
  data() {
    return {
      listOfRepairs: {
        repairtype: 2,
        homename: '',
        resultstatus: null,
        startDate: '',
        endDate: '',
        currPage: 0,
        pageNum: 10,
        token: sessionStorage.token
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      queryTime: [],
      loading: true,
      dialogFormVisible: false,
      form: {
        createtime: '',
        h_id: null,
        homename: '',
        housename: '',
        r_id: 5,
        repaircontent: '',
        repairtype: 2,
        resultcontent: '',
        resultstatus: 2,
        token: sessionStorage.token
      },
      value: true
    }
  },
  methods: {
    async getList() {
      this.loading = true
      this.listOfRepairs.currPage = this.currentPage - 1
      const { data: res } = await this.axios.get(
        `http://community.byesame.com/poster/getRepairData`,
        {
          params: this.listOfRepairs
        }
      )
      res.data.map((item) => {
        item.createtime = this.getDateTwoDaysBefore(item.createtime)
      })
      await this.delay(300)
      this.loading = false
      this.tableData = res.data
      this.total = res.total
    },
    search() {
      this.listOfRepairs.startDate = this.queryTime[0]
      this.listOfRepairs.endDate = this.queryTime[1]
      this.getList()
    },
    // 重置
    reset() {
      this.listOfRepairs = {
        repairtype: 2,
        homename: '',
        resultstatus: null,
        startDate: '',
        endDate: '',
        currPage: 0,
        pageNum: 10,
        token: sessionStorage.token
      }
      this.getList()
    },
    processing(row) {
      console.log(row)
      this.dialogFormVisible = true
      this.form = row
      if (row.resultstatus === 1) {
        this.value = true
      }
      if (row.resultstatus === 2) {
        this.value = false
      }
    },
    handleSubmit() {
      this.dialogFormVisible = false

      this.axios
        .post(`http://community.byesame.com/poster/updateSmartRepair`, {
          ...this.form
        })
        .then((res) => {
          console.log(res)
          this.$message.success('处理成功')
          this.getList()
        })
        .catch((error) => {
          console.error(error)
          this.$message.error('处理失败')
        })
    },
    del(row) {
      console.log(row)
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios
            .get(
              `http://community.byesame.com/poster/delRepair?r_id=${row.r_id}&token=${sessionStorage.token}`
            )
            .then((res) => {
              console.log(res)
              this.$message.success('删除成功')
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getDateTwoDaysBefore(isoDateStr) {
      const date = new Date(isoDateStr)
      date.setDate(date.getDate() - 3)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从0开始的
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }
  },
  components: { Pagination },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .houserepair {
    background-color: #fff;
    padding: 1.3% 1%;
  }
}
</style>
