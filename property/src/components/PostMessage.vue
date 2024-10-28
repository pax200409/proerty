<template>
  <div class="main">
    <div class="postmessage">
      <!--      功能区-->
      <div class="announcement-top">
        <el-input
          placeholder="请输入发布小区"
          style="width: 21%"
          v-model="tableAdd.communityname"
        ></el-input>
        <el-input
          placeholder="请输入公告主题"
          style="width: 21%"
          v-model="tableAdd.title"
        ></el-input>
        <el-input
          placeholder="请输入发布内容"
          style="width: 30%"
          v-model="tableAdd.content"
        ></el-input>
        <el-button type="success" @click="addPoster"
          ><i class="el-icon-plus"></i
          ><span style="margin-left: 5px">发布公告</span></el-button
        >
        <el-button type="primary" @click="resetForm">重置</el-button>
      </div>
      <!--      表格区-->
      <div class="announcement-center">
        <el-tabs type="border-card">
          <el-tab-pane label="公告信息">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :header-cell-style="{
                background: 'rgb(238,241,246)',
                color: 'rgb(31,45,61)',
                'border-color': 'rgb(233,230,236)',
                'text-align': 'center'
              }"
              :cell-style="{ 'text-align': 'center' }"
              max-height="420"
            >
              <el-table-column type="index" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="title" label="公告主题" width="180">
              </el-table-column>
              <el-table-column prop="content" label="公告内容">
              </el-table-column>
              <el-table-column prop="createtime" label="发布时间" sortable>
              </el-table-column>
              <el-table-column prop="communityname" label="小区名称">
              </el-table-column>
              <el-table-column label="操作" width="210">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    >归档</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-search"
                    @click="handleEdit(scope.row)"
                    >查看公告</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 分页器 -->
          <div class="block">
            <pagination
              :total="totalItemsCount"
              :page.sync="currentPage"
              :limit.sync="pageSize"
              @pagination="handlePagination"
            ></pagination>
          </div>
        </el-tabs>
      </div>
      <!-- 查看公告模态框-->
      <el-dialog
        title="公告详情"
        :visible.sync="dialogVisible"
        width="50%"
        margin-top="15vh"
      >
        <el-form label-width="90px" :model="tableEdit" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="小区名称">
                <el-input v-model="tableEdit.communityname" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="发布时间：">
              <el-date-picker
                v-model="tableEdit.createtime"
                readonly
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-form-item label="公告主题">
            <el-input v-model="tableEdit.title" readonly></el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input
              type="textarea"
              v-model="tableEdit.content"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="公告状态">
            <el-button disabled style="color: black">阅读量</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      currentPage: 0,
      pageSize: 10,
      totalItemsCount: 0,
      tableAdd: {
        communityname: '',
        title: '',
        content: '',
        token: sessionStorage.token
      },
      tableEdit: {}
    }
  },
  methods: {
    // 获取列表
    async getList() {
      const { data: res } = await this.axios.get(
        'http://community.byesame.com/poster/getPosterData',
        {
          params: {
            currPage: this.currentPage - 1,
            pageNum: this.pageSize
          }
        }
      )
      // console.log(res)
      res.data.forEach((item) => {
        item.createtime = this.formatTime(item.createtime)
      })
      this.totalItemsCount = res.total
      this.tableData = res.data
    },
    // 定义一个方法用于转换时间格式
    formatTime(timeStr) {
      const date = new Date(timeStr)
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const hours = ('0' + date.getHours()).slice(-2)
      const minutes = ('0' + date.getMinutes()).slice(-2)
      const seconds = ('0' + date.getSeconds()).slice(-2)

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    // 分页
    handlePagination({ page, limit }) {
      this.currentPage = page
      this.pageSize = limit
      this.getList()
    },
    // 归档
    handleDelete(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.get(
            'http://community.byesame.com/poster/delPoster',
            {
              params: {
                p_id: row.p_id,
                token: sessionStorage.token
              }
            }
          )
          await this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 发布公告
    addPoster() {
      if (
        this.tableAdd.communityname === '' ||
        this.tableAdd.title === '' ||
        this.tableAdd.content === ''
      )
        return this.$message.error('请填写完整信息')
      this.axios
        .post('http://community.byesame.com/poster/addPoster', this.tableAdd)
        .then(() => {
          this.getList()
          this.resetForm()
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '发布失败'
          })
        })
    },
    // 查看公告
    handleEdit(row) {
      this.dialogVisible = true
      const selectedPoster = this.tableData.find(
        (item) => item.p_id === row.p_id
      )
      // console.log(selectedPoster)
      this.tableEdit = { ...selectedPoster }
    },
    resetForm() {
      this.tableAdd = {
        communityname: '',
        title: '',
        content: '',
        token: sessionStorage.token
      }
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
  padding: 1.3% 1%;

  .postmessage {
    background-color: #fff;
    padding: 1.3% 1%;
    .announcement-top {
      display: flex;
      .el-input {
        margin-left: 10px;
      }
      .el-input:nth-child(1) {
        margin-left: 0;
      }
      .el-button {
        margin-left: 15px;
        width: 8%;
        padding: 9px 15px;
      }
    }
    .announcement-center {
      margin-top: 15px;
    }
  }
}
.block {
  float: right;
}
::v-deep .el-dialog__title {
  font-weight: bolder;
  line-height: 24px;
  font-size: 20px;
  color: #303133;
}
</style>
