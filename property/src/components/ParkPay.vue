<template>
  <div class="box">
    <div class="top">
      <el-input v-model="parkname" placeholder="车位名称"></el-input>
      <el-input v-model="orderpay" placeholder="应缴金额"></el-input>

      <el-select v-model="orderstatus" placeholder="缴费状态" style="margin-left: 10px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 30px; font-size: 14px; width: 8%;" icon="el-icon-search"
        @click="search">查询</el-button>
      <el-button type="success" icon="el-icon-document-copy" style="width: 8%; font-size: 14px;"
        @click="exportAll">全量导出</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" style="font-size: 14px; width: 8%;"
        @click="reset2">重置</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%;margin-top:20px" border>
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="parkname" label="车位名称" min-width="220">
        </el-table-column>
        <el-table-column prop="parkpay" label="车位金额" min-width="200">
        </el-table-column>
        <el-table-column prop="startdate" label="开始时间" min-width="220">
          <template v-slot="scope">
            {{scope.row.startdate == "" ? '暂无' : scope.row.startdate}}
          </template>
</el-table-column>
<el-table-column prop="enddate" label="结束时间" min-width="220">
  <template v-slot="scope">
            {{scope.row.enddate == "" ? '暂无' : scope.row.enddate}}
          </template>

</el-table-column>
<el-table-column prop="orderpay" label="应缴金额" min-width="140">
  <template v-slot="scope">
            {{scope.row.orderpay == null ? '暂无' : scope.row.orderpay}}
          </template>
</el-table-column>
<el-table-column prop="orderstatus" label="缴费状态" min-width="170">
  <el-tooltip :content="'Switch value4: ' + value4" placement="top" slot-scope="scope">
    <el-switch v-model="scope.row.orderstatus" active-color="#13CE66" inactive-color="#FF4949" :active-value="1"
      :inactive-value="2" @change="changeorderstatus(scope.row)" disabled>
    </el-switch>
  </el-tooltip>
</el-table-column>
<el-table-column label="操作" min-width="220">
  <template slot-scope="scope">
            <el-button type="text" size="small" class="btn1" @click="call(scope.row)">
              <el-tag color="white">通知缴费</el-tag>
            </el-button>
            <el-button type="text" size="small" class="btn2" @click="detail(scope.row)">
              <el-tag color="white">缴费详情</el-tag>
            </el-button>
          </template>
</el-table-column>
</el-table>
<div class="block" style="text-align: right; margin-top: 20px;">
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
    :page-sizes="[5, 10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next" :total="total">
  </el-pagination>
</div>
</div>
<div class="box2">
  <!-- 弹出框 -->
  <el-dialog :title="title" :visible.sync="dialogVisible" width="900px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="开始时间" prop="startdate">
        <el-date-picker v-model="ruleForm.startdate" type="date" placeholder="选择日期" :disabled="this.title =='车位订单详情'">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="enddate">
        <el-date-picker v-model="ruleForm.enddate" type="date" placeholder="选择日期" :disabled="this.title =='车位订单详情'">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="应缴金额" prop="orderpay">
        <el-input v-model="ruleForm.orderpay" :disabled="this.title =='车位订单详情'"></el-input>
      </el-form-item>
      <el-form-item label="缴费状态" prop="orderstatus">
        <el-select v-model="ruleForm.orderstatus" placeholder="请选择" :disabled="this.title =='车位订单详情'">
          <el-option label="已缴费" value="1"></el-option>
          <el-option label="未缴费" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知缴费" prop="textarea">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.textarea"
          :disabled="this.title =='车位订单详情'">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">关闭</el-button>
      <el-button type="primary" v-if="this.title !=='车位订单详情'" @click="sendMsg">通知</el-button>
      <el-button type="primary" @click="reset" v-if="this.title !=='车位订单详情'">重置</el-button>
      <!-- <el-button type="primary" @click="sure" v-if="this.title=='新增车位'">确 定</el-button>
          <el-button type="primary" @click="save" v-if="this.title=='车位修改'">保 存</el-button> -->
    </span>
  </el-dialog>
</div>
</div>
</template>
<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      dialogVisible: false,
      title: '',
      ruleForm: {
        startdate: '',
        enddate: '',
        textarea: '',
        orderstatus: '',
        orderpay: '',
        id: '',
      },
      rules: {
        startdate: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' },
        ],
        enddate: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
        ],
        orderstatus: [
          { required: true, message: '应缴金额不能为空', trigger: 'blur' },
        ],
        orderpay: [
          { required: true, message: '缴费状态不能为空', trigger: 'blur' },
        ]
      },
      value1: '',
      value2: '',
      textarea: '',

      tableData: [],
      currentPage: 1,
      total: null,

      currPage: 1,
      pageNum: 10,

      parkname: '',
      orderstatus: '',
      orderpay: '',

      startdate: "",
      enddate: "",

      options: [{
        value: '1',
        label: '已缴费'
      }, {
        value: '2',
        label: '未缴费'
      },],
      value: true,

      value4: '',


      // 导出
      exportData: [], // 用于存储所有数据
      exportLoading: false, // 加载状态
    }
  },

  mounted() {
    this.handleGetList()
  },
  methods: {
    // 获取列表
    async handleGetList() {
      const { data: res } = await this.axios.get("http://community.byesame.com/parking/getParkOrder", {
        params: {
          parkname: this.parkname,
          orderstatus: this.orderstatus,
          orderpay: this.orderpay,
          currPage: this.currPage - 1,
          pageNum: this.pageNum
        }
      });
      console.log(res);
      res.data.forEach(item => {
        item.startdate = this.formatCreateTime(item.startdate),
          item.enddate = this.formatCreateTime(item.enddate);
      });
      console.log(res);
      this.tableData = res.data;
      this.total = res.total
    },
    // 通知缴费
    call(row) {
      this.dialogVisible = true
      this.title = '车位订单通知'
      console.log(row);
      this.ruleForm = row

    },
    // 缴费详情
    detail(row) {
      console.log(row);
      this.dialogVisible = true
      this.title = '车位订单详情'
      this.ruleForm = row
    },
    // 发送通知
    sendMsg() {
      this.$axiosToken({
        url: "parking/editParkOrder",
        method: 'post',
        data: {
          startdate: this.ruleForm.startdate,
          enddate: this.ruleForm.enddate,
          orderpay: this.ruleForm.orderpay,
          orderstatus: this.ruleForm.orderstatus,
          note: this.ruleForm.note,
          u_id: this.ruleForm.id
        },
        success: (res) => {
          console.log(res);
          if (res) {
            this.$message({
              type: 'success',
              message: '通知成功!'
            });
          }
          this.dialogVisible = false
          this.handleGetList()
        }
      })
    },
    // 取消
    cancel() {
      this.dialogVisible = false
      this.handleGetList()
    },
    // 重置
    reset() {
      this.ruleForm.startdate = ''
      this.ruleForm.enddate = ''
      this.ruleForm.textarea = ''
      this.ruleForm.orderstatus = ''
      this.ruleForm.orderpay = ''
      // this.handleGetList()
    },
    // 页面重置
    reset2() {
      this.parkname = ''
      this.orderstatus = ''
      this.orderpay = ''
      this.handleGetList()
    },


    changeorderstatus(row) {
      console.log(row);
      this.$confirm("确定更新该智能设备状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
      })
    },
    // 查询
    search() {
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
    // 时间格式化
    formatCreateTime(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString.replace("T", " ").replace("Z", ""));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    // 导出
    exportAll() {
      this.exportLoading = true;
      this.exportData = []; // 清空数据
      let pageNum = 1; // 初始页码

      this.$confirm("确定全量导出excel文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const fetchData = () => {
          this.axios({
            url: "http://community.byesame.com/parking/getParkOrder",
            method: "get",
            params: {
              parkname: this.parkname,
              orderstatus: this.orderstatus,
              orderpay: this.orderpay,
              currPage: pageNum - 1,
              pageNum: 100 // 每次请求尽可能多的数据
            }
          }).then(res=>{
            console.log(res);
            const newData = res.data.data.map(item => ({
                ...item,
                startdate: this.formatCreateTime(item.startdate),
                enddate: this.formatCreateTime(item.enddate),
              }));
              this.exportData = [...this.exportData, ...newData];
              pageNum++;
              if (res.total > pageNum * 100) {
                // 如果还有更多数据，则继续请求下一页
                fetchData();
              } else {
                // 所有数据获取完毕，开始导出Excel文件
                this.exportToExcel();
              }
          })
        };

        fetchData(); // 开始获取数据
      }).catch(() => {
        this.exportLoading = false; // 用户取消操作
      });
    },
    // 导出
    // exportAll() {
    //   this.exportLoading = true;
    //   this.exportData = []; // 清空数据
    //   let pageNum = 1; // 初始页码

    //   this.$confirm("确定全量导出excel文件?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     const fetchData = () => {
    //       this.$Axios({
    //         url: "parking/getParkOrder",
    //         method: "get",
    //         data: {
    //           parkname: this.parkname,
    //           orderstatus: this.orderstatus,
    //           orderpay: this.orderpay,
    //           currPage: pageNum - 1,
    //           pageNum: 100 // 每次请求尽可能多的数据
    //         },
    //         success: (res) => {
    //           const newData = res.data.map(item => ({
    //             ...item,
    //             startdate: this.formatCreateTime(item.startdate),
    //             enddate: this.formatCreateTime(item.enddate),
    //           }));
    //           this.exportData = [...this.exportData, ...newData];
    //           pageNum++;
    //           if (res.total > pageNum * 100) {
    //             // 如果还有更多数据，则继续请求下一页
    //             fetchData();
    //           } else {
    //             // 所有数据获取完毕，开始导出Excel文件
    //             this.exportToExcel();
    //           }
    //         }
    //       });
    //     };

    //     fetchData(); // 开始获取数据
    //   }).catch(() => {
    //     this.exportLoading = false; // 用户取消操作
    //   });
    // },
    // 将数据导出为Excel文件
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // 生成Excel文件并下载
      XLSX.writeFile(workbook, 'ParkingOrders.xlsx');
      this.exportLoading = false;
    }
  },
}
</script>
<style lang="scss" scoped>
.box::v-deep {
  .top {
    .el-input {
      width: 300px;
      font-size: 14px;
      margin-left: 10px;

      &:nth-child(1) {
        margin-left: 0;
      }

      input {
        height: 36px;
      }
    }
  }

  .table {
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
      font-size: 14px;
      color: #000;
    }

    .el-button--small {
      border-radius: 5px;
      height: 27px;
    }

    .el-button {
      height: 30px !important;
      padding-top: 0;

      .el-tag--small {
        padding: 10px 15px;
        line-height: 5px;
        height: 25px;
      }
    }

    .btn1 {
      .el-tag {
        color: #606266;
      }
    }


  }

  .box2 {
    .el-date-editor.el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }
  }

}
</style>