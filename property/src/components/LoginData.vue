<template>
  <main>
    <el-form label-width="100px" class="user-info-form">
      <div class="top">
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item prop="username">
                <el-input v-model="loginFrom.username" placeholder="请输入登录账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="type">
                <el-select v-model="loginFrom.type" placeholder="请选择类型" class="type">
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="普通用户" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :pull="1">
              <el-form-item>
                <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
                  :default-time="['12:00:00']" @change="handleDateChange">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" :push="1">
              <el-button @click="getMenuData" icon="el-icon-search">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="登录日志">
          <el-table v-if="tableData.length > 0" :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="username" label="登录账户" align="center"></el-table-column>
            <el-table-column prop="type" label="角色类型" align="center">
              <template v-slot:default="scope">
                {{ scope.row.type === 1 ? '管理员' : '普通用户' }}
              </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column label="登录时间" align="center">
              <template v-slot:default="scope">
                {{ formatDate(scope.row.createtime) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template v-slot:default="scope">
                <el-button type="danger" @click="confirmDelete(scope.row)">删除记录</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next, jumper"
              :page-size='pageNum' :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :total="totalItemsCount" background
              @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </main>
</template>

<script>
import { MessageBox } from 'element-ui'; // 引入 MessageBox

export default {
  data() {
    return {
      tableData: [],
      totalItemsCount: 0,
      currentPage: 1,
      pageNum: 9,
      loginFrom: {
        username: "",
        type: "",
        startDate: "",
        endDate: "",
      },
      value1: [], // 用于存储选择的时间范围
    };
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
            this.currentPage = val;
            this.getMenuData()
        },
        handleSizeChange(val) {
            this.currentPage = 1
            this.pageNum = val;
            this.getMenuData()
        },
    formatDate(isoDateString) {
      const date = new Date(isoDateString);
      return date.toLocaleString(); // 使用本地格式化
    },
    handleDateChange(dates) {
      if (dates && dates.length === 2) {
        this.loginFrom.startDate = this.formatToDate(dates[0]); // 设置开始日期
        this.loginFrom.endDate = this.formatToDate(dates[1]);   // 设置结束日期
      }
    },
    formatToDate(date) {
      return date.toISOString().split('T')[0]; // 转换为 YYYY-MM-DD 格式
    },
    async getMenuData() {
      try {
        const response = await this.axios.get(`http://community.byesame.com/users/getLoginData`, {
          params: {
            username: this.loginFrom.username,
            type: this.loginFrom.type,
            startDate: this.loginFrom.startDate,
            endDate: this.loginFrom.endDate,
            currPage: this.currentPage - 1,
            pageNum: this.pageNum,
          },
        });
        this.tableData = response.data.data || [];
        this.totalItemsCount = response.data.total || 0;
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    },
    handlePagination({ page, limit }) {
      this.currentPage = page;
      this.pageNum = limit;
      this.getMenuData();
    },
    confirmDelete(row) {
      MessageBox.confirm('确认删除该记录?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dele(row); // 确认后调用删除方法
        })
        .catch(() => {
          this.$message.info('删除已取消'); // 取消删除时的信息
        });
    },
    async dele(row) {
      const token = sessionStorage.getItem('token');
      try {
        const response = await this.axios.get(`http://community.byesame.com/users/delLoginData?id=${row.id}&token=${token}`); // 假设 row 中有 id
        if (response.status === 200) {
          this.$message.success('删除成功'); // 显示成功消息
          this.tableData = this.tableData.filter(item => item.id !== row.id); // 更新表格数据
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        this.$message.error('删除失败'); // 显示失败消息
      }
    },
  },
  mounted() {
    this.prentId = this.$route.query.prentId;
    this.getMenuData(); // Fetch data on component mount
  },
};
</script>

<style lang="scss" scoped>
.user-info-form {
  margin: 20px;
}

.el-tabs.el-tabs--top.el-tabs--border-card {
  margin-top: 20px;
}

.type{
  margin-left: 20px;
}
.user-info-form {
  padding: 15px;
  background-color: #fff;
  text-align: left;
}

.el-button--text {
  width: 40%;
  color: #fff;
  font-size: 12px;
  background-color: #20a0ff;
  border-color: #20a0ff;
  padding: 7px 15px;
}

.el-button--default {
  width: 40%;
  color: #fff;
  font-size: 12px;
  height: 40px;
  background-color: #20a0ff;
  border-color: #20a0ff;
  padding: 7px 15px;
}
.pagination{
  text-align: right;
  margin: 20px 0;
}
</style>