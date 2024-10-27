<template>
  <div class="box">
    <div class="left">
      <div>
        <p>车位名：</p>
        <el-input v-model="parkname" placeholder="请输入车位名"></el-input>
      </div>
      <div>
        <p>车位金额：</p>
        <el-input v-model="parkpay" placeholder="请输入车位金额"></el-input>
      </div>
      <div>
        <p>车位类型：</p>
        <el-select v-model="parktype" placeholder="请选择车位类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <p>车位状态：</p>
        <el-select v-model="parkstatus" placeholder="请选择车位状态">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="text-align: center">
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="right">
      <div class="rt">
        <span>车位列表</span>
        <el-button type="success" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
      <div class="tab">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="unitname" label="序号" type="index" width="70">
          </el-table-column>
          <el-table-column prop="parkname" label="车位名称" min-width="200" sortable>
          </el-table-column>
          <el-table-column prop="parkpay" label="车位金额" min-width="170" sortable>
          </el-table-column>
          <el-table-column prop="parktype" label="车位类型" min-width="190">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <el-switch active-text="地下" inactive-text="地上" :active-value="1" :inactive-value="2"
                  v-model="scope.row.parktype" @change="changeparktype(scope.row)">
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="parkstatus" label="车位状态" min-width="190">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <el-switch active-text="已有车" inactive-text="未有车" :active-value="1" :inactive-value="2"
                  v-model="scope.row.parkstatus" @change="changeparkstatus(scope.row)">
                </el-switch>
              </el-tooltip>
            </template>

          </el-table-column>
          <el-table-column label="操作" min-width="280">
            <template slot-scope="scope">
              <el-button icon="el-icon-share" class="bt1" plain :disabled="scope.row.parkstatus == '1'"
                @click="site(scope.row)">分配车位</el-button>
              <el-button icon="el-icon-edit" class="bt2" plain
                @click="handleEdit(scope.row, scope.row.id)">编辑</el-button>
              <el-button icon="el-icon-delete" class="bt3" plain @click="handleDel(scope.row.id)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="text-align: right ; margin-top: 20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[7, 10, 20, 50]" :page-size="9"
            layout="total, sizes, prev, pager, next,jumper" :total="total">
          </el-pagination>
        </div>
        <!-- 弹出框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="900px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="车位名称" prop="parkname">
              <el-input v-model="ruleForm.parkname"></el-input>
            </el-form-item>
            <el-form-item label="车位金额" prop="parkpay">
              <el-input v-model="ruleForm.parkpay"></el-input>
            </el-form-item>
            <el-form-item label="车位类型" prop="parktype">
              <el-select v-model="ruleForm.parktype" placeholder="请选择">
                <el-option label="地下" value="1"></el-option>
                <el-option label="地上" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车位状态" prop="parkstatus">

              <el-select v-model="ruleForm.parkstatus" placeholder="请选择">

                <el-option label="已有车" value="1"></el-option>
                <el-option label="未有车" value="2"></el-option>
              </el-select>
            </el-form-item>


          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sure" v-if="this.title == '新增车位'">确 定</el-button>
            <el-button type="primary" @click="save" v-if="this.title == '车位修改'">保 存</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 分配车位 -->
    <div>
      <el-drawer title="车位分配" :visible.sync="drawer" size="50%" direction="ltr">
        <div style="width: 95%; padding: 20px; margin:0 auto;" class="site">
          <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange" border>
            <template>
              <el-table-column type="selection" width="55" @click.stop="handleselect(scope.row)">
              </el-table-column>
            </template>

            <el-table-column label="序号" width="60" type="index">
            </el-table-column>
            <el-table-column prop="username" label="用户账号" width="120">
            </el-table-column>
            <el-table-column prop="homeaddress" label="家庭住址" width="180">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="120">
            </el-table-column>
            <el-table-column prop="parkname" label="车位" min-width="140">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block" style="text-align: right ; margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
              :current-page="currentPage2" :page-sizes="[5, 10, 20, 50]" :page-size="10"
              layout="total, sizes, prev, pager, next,jumper" :total="total2">
            </el-pagination>
          </div>

        </div>
        <div class="botbtn">
          <el-button @click="cancel2">取消</el-button>
          <el-button type="primary" @click="handleAddSite">确定</el-button>
        </div>
      </el-drawer>


    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      parkname1:"",
      parkId1:"",
      parktype999:"",
      parkpay999:"",
      uid: '',
      // 弹出框
      dialogVisible: false,
      title: '',
      u_id: '',
      ruleForm: {
        parkname: "",
        parkpay: "",
        parktype: "",
        parkstatus: "",
      },
      rules: {
        parkname: [
          { required: true, message: '车位名称不能为空', trigger: 'blur' },
        ],
        parkpay: [
          { required: true, message: '车位金额不能为空', trigger: 'blur' },
        ],
        parktype: [
          { required: true, message: '车位类行不能为空', trigger: 'blur' },
        ],
      },



      parkpay: "",
      parktype: "",
      parkstatus: "",


      tableData: [],
      index: '',
      currPage: 1,
      pageNum: 9,
      currentPage: 1,
      total: null,
      total2: null,
      currentPage2: 1,

      // 分配车位
      drawer: false,
      currPage2: 1,
      pageNum2: 10,
      tableData2: [],
      parkname: '',
      username: '',
      type: '',
      homeaddress: '',
      parkId: "",

      val1: '',
      val2: '',

      options: [{
        value: '2',
        label: '地上'
      },
      {
        value: '1',
        label: '地下'
      },],
      value: '',

      options2: [{
        value: '1',
        label: '已有车'
      },
      {
        value: '2',
        label: '未有车'
      },],
      value2: ''
    }
  },
  mounted() {
    this.handleGetList()
    this.handleGetList2()

  },
  methods: {
    // 获取页面数据
    handleGetList() {
      this.axios({
        url: 'http://community.byesame.com/parking/getParkData',
        method: 'get',
        params: {
          parkname: this.parkname,
          parkpay: this.parkpay,
          parktype: this.parktype,
          parkstatus: this.parkstatus,
          pageNum: this.pageNum,
          currPage: this.currPage - 1,
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }

      })
    },
    // 搜索
    search() {
      this.axios({
        url: 'http://community.byesame.com/parking/getParkData',
        method: 'get',
        params: {
          parkname: this.parkname,
          parkpay: this.parkpay,
          parktype: this.parktype,
          parkstatus: this.parkstatus,
          pageNum: this.pageNum,
          currPage: this.currPage - 1,
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }

      })
    },
    // 添加
    handleAdd() {
      this.dialogVisible = true
      this.title = '新增车位'

    },
    // 新增
    sure() {
      this.axios({
        url: 'http://community.byesame.com/parking/addParkData',
        method: 'post',
        data: {
          parkname: this.ruleForm.parkname,
          parkpay: this.ruleForm.parkpay,
          parktype: this.ruleForm.parktype,
          parkstatus: this.ruleForm.parkstatus,
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.dialogVisible = false;
          this.handleReset();
          this.$message({
            message: '车位添加成功',
            type: 'success'
          })
        }

      })
    },
    // 编辑
    handleEdit(row, id) {
      this.dialogVisible = true
      this.title = '车位修改'
      this.ruleForm.parkname = row.parkname
      this.ruleForm.parktype = row.parktype
      this.ruleForm.parkpay = row.parkpay
      this.ruleForm.parkstatus = row.parkstatus
      this.u_id = id
      if (row.parkstatus == 1) {
        this.ruleForm.parkstatus = '已有车'
      } else {
        this.ruleForm.parkstatus = '未有车'
      }
      if (row.parktype == 1) {
        this.ruleForm.parktype = '地下'
      } else {
        this.ruleForm.parktype = '地上'
      }

    },

    // 保存
    save() {
      this.ruleForm.parkstatus = this.ruleForm.parkstatus === '已有车' ? '1' : '2';
      this.ruleForm.parktype = this.ruleForm.parktype === '地下' ? '1' : '2';
      this.axios({
        url: 'http://community.byesame.com/parking/editParkData',
        method: 'post',
        data: {
          u_id: this.u_id,
          parkname: this.ruleForm.parkname,
          parkpay: this.ruleForm.parkpay,
          parktype: this.ruleForm.parktype,
          parkstatus: this.ruleForm.parkstatus
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.dialogVisible = false;
          this.handleReset();
          this.handleGetList();
          this.$message({
            message: '车位修改成功',
            type: 'success'
          })
        }
      })
    },
    // 删除提示
    handleDel(id) {
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDel1(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除
    handleDel1(id) {
      this.axios({
        url: 'http://community.byesame.com/parking/delParkData',
        method: 'get',
        params: {
          id: id
        },
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.handleGetList();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },

    // 车位类型
    changeparktype(row) {
      this.axios({
        url: 'http://community.byesame.com/parking/editParkData',
        method: 'post',
        data: {
          u_id: row.id,
          parkname: row.parkname,
          parktype: row.parktype,
          parkpay: row.parkpay,
          parkstatus: row.parkstatus
        }
      }).then(res => {
        console.log(res);
        this.$message({
          type: 'success',
          message: '更新状态成功'
        });
        this.handleGetList()
      })
    },
    changeparkstatus(row) {

      this.axios({
        url: 'http://community.byesame.com/parking/editParkData',
        method: 'post',
        data: {
          u_id: row.id,
          parkname: row.parkname,
          parktype: row.parktype,
          parkpay: row.parkpay,
          parkstatus: row.parkstatus
        }
      }).then(res => {
        console.log(res);
        this.$message({
          type: 'success',
          message: '更新状态成功'
        });
        this.handleGetList()
      })
    },


    // 分配
    site(row) {
      console.log(row);
      this.parkId1=row.id;
      this.parkname1=row.parkname;

      this.parktype999=row.parktype;
      this.parkpay999=row.parkpay;
      console.log(this.parkpay999);
      this.drawer = true
      this.handleGetList2()
    },
    handleGetList2() {
      this.axios({
        url: 'http://community.byesame.com/users/getUsersData',
        method: 'get',
        params: {
          username: this.username,
          homeaddress: this.homeaddress,
          type: this.type,
          parkname: this.parkname,
          currPage: this.currPage2 - 1,
          pageNum: this.pageNum2
        },
        success: (res) => {
          console.log(res);
          this.tableData2 = res.data
          this.total2 = res.total

        }
      }).then(res => {
        console.log(res);
        this.tableData2 = res.data.data
        this.total2 = res.data.total
      })
    },
    cancel2() {
      this.drawer = false
    },
    handleAddSite() {
      this.$confirm("确定分配车位？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios({
          // url: `http://community.byesame.com/users/updateParkStatus?u_id=${this.uid}&parkId=${this.parkId}&parkname=${this.parkname}&parkstatus=${this.parkstatus}&token=${sessionStorage.token}`,
          url: `http://community.byesame.com/users/updateParkStatus`,
          method: 'post',
          data: {
            u_id: this.uid,
            parkId: this.parkId1,
            parkname: this.parkname1,
            parkstatus: 1,
            token: sessionStorage.token
          }
        }).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '智能设备状态改变成功!'
          });
          this.parkstatus="1";
          this.axios({
            url: 'http://community.byesame.com/parking/editParkData',
            method: 'post',
            data: {
              u_id: this.parkId1,
              parkname: this.parkname1,
              parktype: this.parktype999,
              parkpay: this.parkpay999,
              parkstatus: 1,
              token: sessionStorage.token
            }
          }).then(res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '更新状态成功'
            });
            this.cancel2();
            this.reset()
          })
        })
      })
    },
    handleselect(row) {
      console.log(row);
    },
    // 弹出框取消
    cancel() {
      this.dialogVisible = false
      this.handleReset()
    },

    // 弹出框重置
    handleReset() {
      this.ruleForm.parkname = ''
      this.ruleForm.parktype = ''
      this.ruleForm.parkpay = ''
      this.ruleForm.parkstatus = ''
    },

    // 重置
    reset() {
      this.parkname = '',
        this.parkpay = '',
        this.parktype = '',
        this.parkstatus = '',
        this.handleGetList()
    },
    // 分页
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
    // 分配车位
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.uid = this.multipleSelection[0].id;
      console.log(this.uid);
      this.parkname = this.multipleSelection[0].parkname;
      this.parkstatus = this.multipleSelection[0].parkstatus;
    },
    // 分配车位分页
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum2 = val
      this.handleGetList2()
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.currPage2 = val
      this.handleGetList2()
    },
  },
}
</script>
<style lang="scss" scoped>
.box::v-deep {
  display: flex;
  justify-content: space-between;

  .left {
    width: 22%;
    // height: 100px;
    // background: blue;
    padding-top: 30px;

    div {
      width: 100%;
      //   margin-top: 20px;
      margin-bottom: 20px;

      &:nth-child(4) {
        // margin-bottom: 0;

        border-bottom: 1px solid #ccc;
      }

      &:nth-child(5) {
        .el-button {
          margin-top: 10px;
          width: 44%;
          font-size: 14px;
        }
      }

      p {
        font-size: 14px;
        color: #606266;
        text-align: left;
        vertical-align: middle;
        padding: 0 0 12px 0;
      }

      .el-input {
        height: 36px;
        font-size: 14px;
      }
    }
  }

  .right {
    width: 78%;
    height: 100px;
    padding: 20px;

    .rt {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 24px;
        font-weight: 700;
      }

      .el-button {
        width: 8%;
        text-align: center;
        height: 32px;

        span {
          font-size: 12px;
          font-weight: normal;
        }
      }
    }

    .tab {
      .el-table {
        tr {
          height: 50px;
        }

        // text-align: center;
        .el-table__cell {
          width: 50px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          color: #000;
          border-color: rgb(223, 230, 236);
        }
      }

      .bt2 {
        color: rgb(98, 168, 234);
      }

      .bt3 {
        color: #000;
        border-color: #fbc4c4;
      }

      .bt3:hover {
        border-color: #f56c6c;
      }
    }

    .el-form-item {
      margin: 30px 0;
      padding-bottom: 0px;

      &:last-child {
        margin-bottom: 0px;
      }

      .el-input__inner {
        height: 36px;
      }
    }

    .el-select {
      width: 100%;

      .el-input__inner {
        width: 100%;
      }
    }
  }

  .site {
    .el-table th.el-table__cell {
      color: #000;
      background: rgb(238, 241, 246);
      border-color: rgb(223, 230, 236);
      text-align: center;
    }

    .el-table td.el-table__cell {
      color: #000;
      text-align: center;
    }
  }

  .botbtn {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
    text-align: center;

    .el-button {
      width: 30%;
      font-size: 14px;
    }
  }
}
</style>