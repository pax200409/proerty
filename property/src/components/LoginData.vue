<template>
  <div class="box">
    <div class="top">
      <el-input v-model="username" placeholder="用户账号" clearable style="width: 20%;"></el-input>
      <el-select v-model="type" placeholder="角色类型" style="width: 20%; margin:0 10px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" clearable>
        </el-option>
      </el-select>
      <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"

      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" style="width: 25%;">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" style="width: 8%; font-size: 14px; margin-left: 10px;"
        @click="search">查询</el-button>
    </div>
    <div class="tab">
      <el-tabs type="border-card">
        <el-tab-pane label="登录日志">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="username" label="登陆账户" min-width="226">
            </el-table-column>
            <el-table-column prop="type" label="角色类型" min-width="223">
              {{ tableData.type === admin ? '管理员' : '普通用户' }}
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="297">
            </el-table-column>
            <el-table-column prop="createtime" label="登录时间" min-width="446">
            </el-table-column>
            <el-table-column label="操作" min-width="163">
              <template slot-scope="scope">
                <el-button style="background-color: red;color: white;"
                  @click="handleDetele(scope.row.id)">删除记录</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block" style="text-align: right ; margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage4" :page-sizes="[5, 9, 20, 50, 100]" :page-size="9"
              layout="total, sizes, prev, pager, next,jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      username: '',
      type: '',
      startDate: '',
      endDate: '',
      currPage: 1,
      pageNum: 9,
      total: null,
      currentPage4: 1,
      currentPage: 1,
      admin: '',
      tableData: [],
      createtime: '',
      value2: '',
      parameters: {
        username: "",
        type: "",
        startDate: "",
        endDate: "",
        currPage: 1,
        pageNum: 9,
      },
      options: [{
        value: '1',
        label: '管理员'
      }, {
        value: '2',
        label: '普通用户'
      },],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },

    }
  },
  mounted() {
    this.handleGetList()
  },
  methods: {
    async handleGetList() {
      this.parameters.currPage = this.currentPage - 1
      const { data: res } = await this.axios.get(
        'http://community.byesame.com/users/getLoginData',
        {
          params: this.parameters
        }
      )
      console.log(res)
      res.data.map((item) => {
        item.createtime = this.formatCreateTime(item.createtime)
      })
      this.tableData = res.data
      this.total = res.total
    },
    // 删除
    handleDetele(id) {
      this.$confirm("确定删除该条登录信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios.get('http://community.byesame.com/users/delLoginData',{
          pramas:{
            id:id
          },
          token: sessionStorage.token
        })
        this.$message.success('作废成功')
        this.handleGetList()
      })
      .catch(() => {
          this.$message.error('作废失败')
          this.handleGetList()
        })
    },

    search(){ },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = val
      this.handleGetList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currPage = val
      this.handleGetList()
    },
    // 时间格式化
    formatCreateTime(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString.replace("T", " ").replace("Z", ""));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
}
</script>
<style lang="scss" scoped>
.box::v-deep {
  .top {
    display: flex;
    justify-content: left;


  }

  .tab {
    margin-top: 20px;

    .has-gutter {
      .el-table__cell {
        background: rgb(238, 241, 246);
        border-color: rgb(223, 230, 236);
        text-align: center;
        font-size: 14px;
        color: #000;
      }
    }

    .el-table__cell {
      text-align: center;
      color: #000;
      font-size: 14px;
    }
  }
}
</style>