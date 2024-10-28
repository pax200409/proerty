<template>
  <div class="main">
    <div class="feedback">
      <!-- 功能区 -->
      <div class="top-form">
        <el-input v-model="filters.username" placeholder="反馈人"></el-input>
        <el-input v-model="filters.feedtext" placeholder="反馈内容"></el-input>
        <el-date-picker
          class="width-full"
          v-model="filters.dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div style="margin-top: 10px; width: 100%">
          <el-input
            v-model="filters.feedresult"
            placeholder="反馈回复"
          ></el-input>
          <!--          反馈状态，下拉框-->
          <el-select
            v-model="filters.feedstatus"
            style="margin-left: 10px; width: 27%"
            placeholder="反馈状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 8%; font-size: 14px; margin-left: 10px"
            @click="getList"
            >搜索
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-edit"
            style="width: 8%; font-size: 14px; margin-left: 10px"
            @click="resetForm"
            >重置
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            style="width: 8%; font-size: 14px; margin-left: 10px"
            @click="deleteSelected"
            >批量删除
          </el-button>
          <el-button
            type="success"
            icon="el-icon-upload"
            style="width: 8%; font-size: 14px; margin-left: 10px"
            @click="exportSelected"
            >批量导出
          </el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="contain-form">
        <el-table
          ref="table"
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{
            'text-align': 'center',
            color: 'rgb(31, 45, 61)'
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <!-- 多选 -->
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            prop="username"
            label="反馈人"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="feedtext"
            label="反馈内容"
            width="180"
          ></el-table-column>
          <el-table-column prop="startDate" label="反馈时间"></el-table-column>
          <el-table-column prop="endDate" label="服务内容"></el-table-column>
          <el-table-column prop="feedstatus" label="处理状态"></el-table-column>
          <el-table-column prop="endDate" label="服务评分"></el-table-column>
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button size="mini" @click="viewFeedback(scope.row)"
                >查看
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="editFeedback(scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteFeedback(scope.row.id)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          align="right"
          :total="total"
          :page.sync="currPage"
          :limit.sync="pageNum"
          @pagination="handlePagination"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
// 分页器
import Pagination from './Pagination.vue'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      filters: {
        username: '',
        feedtext: '',
        dateRange: '',
        feedstatus: '',
        feedresult: ''
      },
      tableData: [],
      currPage: 1,
      pageNum: 10,
      total: 0,
      options: [
        {
          value: '1',
          label: '已处理'
        },
        {
          value: '2',
          label: '未处理'
        }
      ]
    }
  },
  methods: {
    handlePagination({ page, limit }) {
      this.currentPage = page
      this.pageNum = limit
      this.getList()
    },
    async getList() {
      const { data: res } = await this.axios.get(
        'http://community.byesame.com/poster/getFeedBack',
        {
          params: {
            username: this.filters.username,
            feedtext: this.filters.feedtext,
            startDate: this.filters.dateRange ? this.filters.dateRange[0] : '',
            endDate: this.filters.dateRange ? this.filters.dateRange[1] : '',
            feedresult: this.filters.feedresult,
            feedstatus: this.filters.feedstatus,
            currPage: this.currPage - 1,
            pageNum: this.pageNum
          }
        }
      )
      this.tableData = res.data
      this.total = res.total
    },
    resetForm() {
      this.filters = {
        username: '',
        feedtext: '',
        dateRange: '',
        feedstatus: ''
      }
      this.getList() // 重置后重新获取数据
    },
    async deleteSelected() {
      const selected = this.$refs.table.selection
      if (!selected.length) {
        await this.$confirm('请选择要删除的反馈内容', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }
      const ids = selected.map((item) => item.id)
      await this.axios.post(
        'http://community.byesame.com/poster/deleteFeedBack',
        { ids }
      )
      this.getList() // 删除后重新获取数据
    },
    exportSelected() {
      const selected = this.$refs.table.selection
      if (!selected.length) {
        this.$message.warning('请选择要导出的数据')
        return
      }

      const data = selected.map((row) => ({
        反馈人: row.username,
        反馈内容: row.feedtext,
        开始日期: row.startDate,
        结束日期: row.endDate,
        处理状态: row.feedstatus,
        服务内容: row.endDate,
        服务评分: row.endDate
      }))

      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback')
      XLSX.writeFile(workbook, 'feedback.xlsx')
    },
    viewFeedback(row) {
      this.$message.info(`查看反馈: ${row.username}`)
    },
    editFeedback(row) {
      this.$router.push(`/editFeedback/${row.id}`)
    },
    async deleteFeedback(id) {
      await this.axios.delete(
        `http://community.byesame.com/poster/deleteFeedBack/${id}`
      )
      await this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 20px;
}

.feedback {
  padding: 15px;
  background-color: #ffffff;

  .contain-form {
    margin-top: 20px;
  }
}

.top-form {
  font-size: 14px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .el-input:first-child {
    width: 27%;
  }

  .el-input:nth-child(2) {
    width: 27%;
    margin-left: 10px;
  }

  .width-full {
    margin-left: 10px;
    width: 27%;
  }
}

.el-button {
  padding: 9px 15px;
}
</style>

<style lang="scss" scoped>
.main {
  background-color: #f0f0f0;
  padding: 20px;
}

.feedback {
  padding: 15px;
  background-color: #ffffff;

  .contain-form {
    margin-top: 20px;
  }
}

.top-form {
  font-size: 14px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .el-input:first-child {
    width: 27%;
  }

  .el-input:nth-child(2) {
    width: 27%;
    margin-left: 10px;
  }

  .width-full {
    margin-left: 10px;
    width: 27%;
  }
}

.el-button {
  padding: 9px 15px;
}
</style>
