<template>
  <div class="main">
    <div class="paytype">
      <h2>计费管理 / 缴费类性管理</h2>
      <el-row>
        <el-form :model="parameters">
          <el-col :span="4">
            <el-input
              v-model="parameters.paymoney"
              placeholder="项目价格"
              size="small"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="parameters.paystatus"
              placeholder="通知状态"
              size="small"
            >
              <el-option label="已通知" value="1"></el-option>
              <el-option label="未通知" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <h3>{{ label }}</h3>
            <div style="float: right">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="getList"
                >查询
              </el-button>
              <el-button type="success" size="small" icon="el-icon-plus"
                >新增
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh"
                @click="refresh"
                >刷新
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-top"
                @click="exportToExcel"
                size="small"
                >导出
              </el-button>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <el-row style="margin-top: 2%">
        <el-col :span="8">
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :default-expand-all="true"
            :expand-on-click-node="expandAndCollapse"
            :highlight-current="true"
            :node-key="nodeKey"
          ></el-tree>
        </el-col>
        <el-col :span="16">
          <el-table
            :data="sortedTableData"
            border
            :stripe="true"
            style="width: 100%"
            height="460"
            v-loading="loading"
          >
            <el-table-column
              align="center"
              prop="payname"
              label="缴费项目名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="paylevel"
              label="缴费项目名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="paynum"
              label="项目用量/时长"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="paymoney"
              label="项目价格"
              sortable
            ></el-table-column>
            <el-table-column
              align="center"
              prop="paytime"
              label="创建时间"
              sortable
            ></el-table-column>
            <el-table-column
              align="center"
              prop="username"
              label="通知人"
            ></el-table-column>
            <el-table-column align="center" label="通知状态" width="150">
              <template v-slot="scope">
                <span>{{
                  scope.row.paystatus === 1 ? '已通知' : '未通知'
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="250">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  type="info"
                  @click="notice(scope.row)"
                  >通知
                </el-button>
                <el-button size="mini" plain type="primary">查看</el-button>
                <el-button
                  size="mini"
                  plain
                  type="danger"
                  @click="setAside(scope.row)"
                  >作废
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            :total="total"
            :page.sync="currentPage"
            :limit.sync="parameters.pageNum"
            @pagination="getList"
            align="right"
          ></Pagination>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="计费通知"
      :visible.sync="dialogTableVisible"
      width="800px"
    >
      <el-col :span="18">
        <el-form
          :model="notificationParameters"
          label-width="80px"
          :inline="true"
        >
          <el-form-item>
            <el-input
              size="small"
              v-model="notificationParameters.username"
              style="width: 330px"
              placeholder="请输入用户账号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-search"
              @click="getNotificationList"
            ></el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              size="small"
              icon="el-icon-refresh-right"
              @click="reset"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="notificationData" max-height="350">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column
          property="username"
          label="用户账号"
          width="200"
        ></el-table-column>
        <el-table-column
          property="homeaddress"
          label="家庭住址"
        ></el-table-column>
        <el-table-column property="type" label="类型"></el-table-column>
        <el-table-column label="缴费状态">
          <template v-slot="scope">
            <span>{{
              scope.row.coststatus === 2
                ? '未缴费'
                : scope.row.coststatus === 1
                ? '已缴费'
                : ''
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="notificationTotal"
        :page.sync="currentPage"
        :limit.sync="notificationParameters.pageNum"
        @pagination="getNotificationList"
        align="right"
      ></Pagination>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: '缴费项目',
          children: [
            {
              id: 2,
              label: '电费项目',
              children: [{ id: 7, label: '电费目录表' }]
            },
            {
              id: 3,
              label: '水费项目',
              children: [
                { id: 8, label: '水费固定月目录表' },
                { id: 9, label: '水费按量计价目录表' }
              ]
            },
            {
              id: 4,
              label: '天燃气项目',
              children: [{ id: 10, label: '天然气目录表' }]
            },
            {
              id: 5,
              label: '物业费项目',
              children: [{ id: 11, label: '物业费目录表' }]
            },
            {
              id: 6,
              label: '宽带费项目',
              children: [{ id: 12, label: '宽带费目录表' }]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      label: '',
      nodeKey: 'id',
      loading: true,
      expandAndCollapse: false,
      order: 'descending',
      idData: [],
      parameters: {
        c_id: 1,
        paymoney: '',
        paystatus: '',
        currPage: 0,
        pageNum: 10
      },
      currentPage: 1,
      total: 0,
      tableData: [],
      notificationParameters: {
        username: '',
        currPage: 0,
        pageNum: 10
      },
      notificationData: [],
      dialogTableVisible: false,
      notificationTotal: 0
    }
  },
  methods: {
    handleNodeClick(data) {
      this.label = data.label
      this.parameters = {
        c_id: null,
        paymoney: '',
        paystatus: '',
        currPage: 0,
        pageNum: 10
      }
      this.parameters.c_id = data.id
      this.getList()
    },
    // 获取缴费列表
    async getList() {
      this.loading = true
      this.parameters.currPage = this.currentPage - 1
      const { data: res } = await this.axios.get(
        'http://community.byesame.com/cost/getCostData',
        {
          params: this.parameters
        }
      )
      console.log(res)
      res.data.map((item) => {
        item.paytime = this.getDateTwoDaysBefore(item.paytime)
      })
      await this.delay(300)
      this.tableData = res.data
      this.total = res.total
      this.loading = false
    },
    // 通知
    notice() {
      this.dialogTableVisible = true
      this.getNotificationList()
    },
    // 获取通知列表
    async getNotificationList() {
      this.notificationParameters.currPage = this.currentPage - 1
      this.axios
        .get('http://community.byesame.com/users/getUserList', {
          params: this.notificationParameters
        })
        .then((res) => {
          this.notificationTotal = res.data.total
          this.notificationData = res.data.data
        })
    },
    // 重置通知列表
    reset() {
      this.notificationParameters.username = ''
      this.getNotificationList()
    },
    // 刷新
    refresh() {
      this.parameters.paymoney = ''
      this.parameters.paystatus = ''
      this.parameters.currPage = 0
      this.parameters.pageNum = 10
      this.currentPage = 1
      this.getList()
    },
    // 作废
    setAside(row) {
      this.$confirm('是否作废?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios.get('http://community.byesame.com/cost/delCostData', {
            params: {
              id: row.id
            },
            token: sessionStorage.token
          })
          this.$message.success('作废成功')
          this.getList()
        })
        .catch(() => {
          this.$message.error('作废失败')
          this.getList()
        })
    },
    // 导出
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.tableData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      XLSX.writeFile(workbook, 'data.xlsx')
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
  mounted() {
    this.getList()
  },
  computed: {
    sortedTableData() {
      // 创建 tableData 的副本
      const sortedData = this.tableData.slice()

      return sortedData.sort((a, b) => {
        // 首先根据价格排序
        if (a.paymoney < b.paymoney) return this.order === 'descending' ? 1 : -1
        if (a.paymoney > b.paymoney) return this.order === 'descending' ? -1 : 1

        // 如果价格相等，再根据创建时间排序
        if (new Date(a.paytime) < new Date(b.paytime))
          return this.order === 'descending' ? 1 : -1
        if (new Date(a.paytime) > new Date(b.paytime))
          return this.order === 'descending' ? -1 : 1

        return 0 // 如果都相等
      })
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 1.3% 1%;

  .paytype {
    background-color: #fff;
    padding: 1.3% 1%;

    h2 {
      font-size: 16px;
      font-weight: 600;
      padding: 1em;
    }

    .el-col {
      padding-left: 5px;
      padding-right: 5px;

      h3 {
        float: left;
        font-weight: bold;
        font-size: 1.5em;
        margin: 0;
      }
    }
  }
}
</style>
