<template>
  <div class="content">
    <div class="top">
      <el-input v-model="form.input" placeholder="请输入用户账号"></el-input>
      <el-date-picker v-model="form.createData" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" style="margin-left: 10px">
      </el-date-picker>
      <el-select v-model="form.valueInput" clearable placeholder="请选择类型" style="width: 20%;margin-left: 10px">
        <el-option v-for="item in valueList" :key="item.value" :label="item.text" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left: 20px"
        class="button1">查询</el-button>
      <el-button type="success" icon="el-icon-plus" @click="add()" class="button2">录入</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" @click="reset" class="button3">重置</el-button>
    </div>
    <div class="list">
      <el-table ref="multipleTable" :data="tableData" border stripe align="center" tooltip-effect="dark"
        :header-cell-style="{ 'background': '#eef1f6', 'color': '#1f2d3d', 'border-color': '#dfe6ec' }"
        style="width: 100%;font-size: 14px;color: #1f2d3d" v-loading="loading">
        <el-table-column type="index" label="序号" align="center" width="60">
        </el-table-column>
        <el-table-column prop="username" label="用户账号" align="center" width="190">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="70" align="center">
        </el-table-column>
        <el-table-column prop="homeaddress" label="家庭住址" show-overflow-tooltip :formatter="showFormatter" width="200"
          align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="210" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center" width="222" :formatter="dateFormat"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="note" label="描述" width="248" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="130" :formatter="typeFormatter" align="center">
        </el-table-column>
        <el-table-column prop="" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <div style="display: flex;margin-left: 13px">
              <el-button :plain="true" size="mini" style="background-color: #fff;font-size: 12px"
                @click="edit(scope.row,)">复制</el-button>
              <el-button :plain="true" size="mini" style="color: #62a8ea;background-color: #fff;font-size: 12px"
                @click="detail(scope.row)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <detail-dialog ref="detailDialog"></detail-dialog>
  </div>
</template>

<script>
import dateFunc from '@/utils/dateFunc'
import moment from 'moment'
import detailDialog from "./detailDialog"
export default {
  name: "Index",
  components: {
    detailDialog
  },
  data() {
    return {
      form: {
        'input': '',
        'createData': '',
        'valueInput': '',
      },

      nickname: '',
      homeaddress: '',
      dialogTableVisible: false,
      valueList: [
        {
          text: '管理员',
          value: '1'
        },
        {
          text: '普通用户',
          value: '2'
        },
      ],
      tableData: [],
      loading: false,
      loaded: false,
      total: 0,
      cur_page: 1,
      pageSize: 10,

    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    // 分页导航
    handleSizeChange(val) {
      this.pageSize = val;
      //当输入框等不为空搜索,否则全部分页显示
      if (this.form.input || this.form.valueInput || this.form.createData) {
        this.search()
      } else {
        this.getData()
      }
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      //分页
      if (this.form.input || this.form.valueInput || this.form.createData) {
        this.search()
      } else {
        this.getData()
      }
    },
    // 获取用户表信息
    getData() {
      this.axios({
        url: 'http://community.byesame.com/users/getUsersData',
        method: 'get',
        params: {
          pageNum: this.pageSize,
          currPage: this.cur_page - 1
        },
      }).then((res) => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    // 查询
    search() {
      const params = { ...this.form.createData }
      console.log(params, 33)
      params.startDate = dateFunc.format(params[0], 'YYYY-MM-DD');
      params.endDate = dateFunc.format(params[1], 'YYYY-MM-DD');
      this.$delete(params, 'createDate')
      this.axios({
        url: 'http://community.byesame.com/admin/getUserData',
        method: 'get',
        data: {
          inputText: this.form.input,
          value: this.form.valueInput,
          startDate: params.startDate,
          endDate: params.endDate,
          pageNum: this.pageSize,
          currPage: this.cur_page - 1
        },
        success: (res) => {
          this.tableData = res.data
          this.total = res.total
        }
      })
      if (!this.form.input && !this.form.valueInput && !this.form.createData) {
        this.getData()
      }
    },
    // 新增
    add() {
      this.$nextTick(() => {
        this.$refs.detailDialog.actionType = "add";
        this.$refs.detailDialog.dialogTableVisible = true;
        this.$refs.detailDialog.reset()
      });
    },
    // 复制
    edit(row) {
      console.log(row, '行')
      this.$refs.detailDialog.actionType = "edit";
      this.$refs.detailDialog.dialogTableVisible = true;
      this.$refs.detailDialog.init(row)
    },
    // 重置
    reset() {
      this.getData();
      this.form = {
        'input': '',
        'createData': '',
        'valueInput': '',
      }
    },
    // 详情
    detail(row) {
      this.$refs.detailDialog.dialogTableVisible = true;
      this.$refs.detailDialog.actionType = "detail";
      this.$refs.detailDialog.formData = Object.assign(row)
    },
    // 时间格式转化
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return ''
      } else {
        return moment(date).format("YYYY-MM-DD HH:mm:ss")

      }
    },
    // 类型转文字
    typeFormatter(row) {
      const type = row.type
      if (type == 1) {
        return '管理员'
      } else {
        return '普通用户'
      }
    },
    // 显示数据状态
    showFormatter(row) {
      if (row.homeaddress == undefined || row.homeaddress == '') {
        return '暂无'
      } else {
        return row.homeaddress
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  margin-top: 10px;
}

::v-deep .el-input__inner {
  font-size: 14px;
  height: 36px;
}

.el-input:nth-child(1) {
  width: 20%;
  border-radius: 4px;
}

.el-input:nth-child(2) {
  width: 30%;
  margin-left: 10px;
  border-radius: 4px;
}

.el-input:nth-child(3) {
  width: 22%;
  margin-left: 10px;
  border-radius: 4px;
}

.button1,
.button2,
.button3 {
  border-radius: 4px;
  margin-left: 15px;
  color: #fff;
  font-size: 14px;
  width: 9%;
}

::v-deep .el-button--mini,
.el-button--mini.is-round {
  padding: 6px 10px;
}

::v-deep .el-button--mini,
.el-button--small {
  border-radius: 5px;
}

.list {
  margin-top: 25px;
}

.pagination {
  text-align: right;
  margin: 20px 0;
}

::v-deep .el-input.el-input--mini.el-input--suffix>.el-input__inner {
  height: 28px;
}
</style>