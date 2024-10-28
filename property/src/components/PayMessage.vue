<template>
  <div class="main">
    <div class="paymessage">
      <el-row>
        <el-col :span="6">
          <el-card>
            <el-form
              label-position="top"
              :model="contributionsData"
              style="max-height: 600px; overflow: auto"
            >
              <el-form-item label="缴费人员">
                <el-input
                  v-model="contributionsData.username"
                  placeholder="输入缴费人员"
                ></el-input>
              </el-form-item>
              <el-form-item label="缴费名称 ">
                <el-input
                  v-model="contributionsData.payname"
                  placeholder="输入缴费项目/名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="支付类型">
                <el-select
                  v-model="contributionsData.costtype"
                  placeholder="输入支付类型"
                >
                  <el-option label="支付宝支付" value="1"></el-option>
                  <el-option label="微信支付" value="2"></el-option>
                  <el-option label="银联支付" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付状态">
                <el-select
                  v-model="contributionsData.coststatus"
                  placeholder="选择支付状态"
                >
                  <el-option label="已支付" value="1"></el-option>
                  <el-option label="未支付" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付时间">
                <el-date-picker
                  v-model="queryTime"
                  style="width: 90%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="缴费金额">
                <el-input
                  v-model="contributionsData.paymoney"
                  placeholder="输入缴费金额"
                ></el-input>
              </el-form-item>
              <el-form-item label="缴费优先级">
                <el-input
                  v-model="contributionsData.paylevel"
                  placeholder="输入缴费优先级"
                ></el-input>
              </el-form-item>
              <el-form-item align="center" class="search">
                <el-col :span="12">
                  <el-button type="info" size="small" plain @click="reset()"
                    >重置
                  </el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    type="primary"
                    size="small"
                    @click="getContributions"
                    >立即查询
                  </el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card class="right">
            <el-row>
              <el-col :span="20"><h3>缴费列表</h3></el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  icon="el-icon-download"
                  size="small"
                  @click="exportToExcel"
                  >导出
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table
                :data="paymentData"
                border
                max-height="460"
                v-loading="loading"
              >
                <el-table-column
                  prop="payname"
                  align="center"
                  label="缴费产品"
                ></el-table-column>
                <el-table-column align="center" label="缴费人员">
                  <template v-slot="scope">
                    <span>{{
                      scope.row.username ? scope.row.username : '暂无'
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="costtype"
                  align="center"
                  label="支付类型"
                >
                  <template v-slot="scope">
                    <span>{{
                      scope.row.costtype ? scope.row.costtype : '暂无'
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymoney"
                  align="center"
                  label="缴费金额"
                ></el-table-column>
                <el-table-column
                  prop="paylevel"
                  align="center"
                  label="缴费优先级"
                ></el-table-column>
                <el-table-column prop="paytime" align="center" label="支付时间">
                </el-table-column>
                <el-table-column
                  prop="paystatus"
                  align="center"
                  label="支付状态"
                >
                  <template v-slot="scope">
                    <span>{{
                      scope.row.paystatus === 1 ? '已支付' : '未支付'
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="210" align="center">
                  <template v-slot="scope">
                    <el-button
                      type="primary"
                      size="small"
                      plain
                      @click="paymentDetails(scope.row)"
                      >查看
                    </el-button>
                    <el-button
                      type="info"
                      plain
                      size="small"
                      @click="exportToExcel(scope.row)"
                      >导出
                    </el-button>
                    <el-button
                      type="warning"
                      plain
                      size="small"
                      @click="del(scope.row)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <Pagination
                :total="total"
                :page.sync="currentPage"
                :limit.sync="contributionsData.pageNum"
                @pagination="getListOfContributions"
                align="right"
              ></Pagination>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      contributionsData: {
        username: '',
        payname: null,
        costtype: null,
        coststatus: null,
        startDate: null,
        endDate: null,
        paymoney: null,
        paylevel: null,
        currPage: 0,
        pageNum: 10
      },
      currentPage: 1,
      total: 0,
      paymentData: [],
      queryTime: [],
      loading: true
    }
  },
  methods: {
    async getListOfContributions() {
      this.loading = true
      this.contributionsData.currPage = this.currentPage - 1
      const { data: res } = await this.axios.get(
        'http://community.byesame.com/cost/getPayMessage',
        {
          params: this.contributionsData
        }
      )
      await this.delay(300)
      this.loading = false
      this.paymentData = res.data
      res.data = res.data.map((item) => {
        item.paytime = this.getDateTwoDaysBefore(item.paytime)
      })
      this.total = res.total
    },
    // 查看
    paymentDetails(row) {
      console.log(row)
      this.$router.push({
        name: 'PayDetail',
        query: {
          detail: row.id
        }
      })
    },
    // 导出
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.paymentData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      XLSX.writeFile(workbook, 'data.xlsx')
    },
    // 查询
    getContributions() {
      this.contributionsData.startDate = this.queryTime[0]
      this.contributionsData.endDate = this.queryTime[1]
      this.getListOfContributions()
    },
    reset() {
      this.contributionsData = {
        username: null,
        payname: null,
        costtype: null,
        coststatus: null,
        startDate: null,
        endDate: null,
        paymoney: null,
        paylevel: null,
        currPage: 30,
        pageNum: 10
      }
      this.getListOfContributions()
    },
    del(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios
            .get(
              `http://community.byesame.com/cost/delCostData?id=${row.id}&token=${sessionStorage.token}`
            )
            .then(() => {
              this.getListOfContributions()
              this.$message.success('删除成功')
            })
        })
        .catch(() => {
          this.$message.error('删除失败')
          this.getListOfContributions()
        })
    },
    // 死循环
    delay(time) {
      return Promise.resolve(undefined).then(
        () => new Promise((resolve) => setTimeout(resolve, time))
      )
    },
    getDateTwoDaysBefore(isoDateStr) {
      const date = new Date(isoDateStr)
      date.setDate(date.getDate() - 3)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从0开始的
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  mounted() {
    this.getListOfContributions()
  },
  comments: {
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .paymessage {
    background-color: #fff;
    padding: 1.3% 1%;
  }

  .right {
    margin-left: 20px;
  }

  h3 {
    font-size: 24px;
  }

  .search {
    .el-col {
      padding: 0 10px;

      .el-button {
        width: 100%;
      }
    }
  }
}

.el-table {
  margin-top: 10px;
}
</style>
