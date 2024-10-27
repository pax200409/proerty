<template>
  <div>123</div>
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

<style lang="scss" scoped></style>
