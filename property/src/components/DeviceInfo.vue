<template>
  <div class="box">
    <div class="top">
      <el-select v-model="smartstatus" placeholder="智能设备状态">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" clearable>
        </el-option>
      </el-select>
      <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-input v-model="homenum" placeholder="房号" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" style="width: 8%; font-size: 14px; margin-left: 10px;"
        @click="search">查询</el-button>
    </div>
    <div class="tab">
      <el-tabs type="border-card">
        <el-tab-pane label="智能设备">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="unitname" label="单元名称" min-width="220">
            </el-table-column>
            <el-table-column prop="buildnum" label="幢号" min-width="100">
            </el-table-column>
            <el-table-column prop="homenum" label="房号" min-width="113">
            </el-table-column>
            <el-table-column prop="homename" label="房主" min-width="143">
            </el-table-column>
            <el-table-column prop="airnum" label="空调" min-width="86">
            </el-table-column>
            <el-table-column prop="wifiname" label="Wi-Fi" min-width="186">
            </el-table-column>
            <el-table-column prop="washnum" label="洗衣机" min-width="86">
            </el-table-column>
            <el-table-column prop="createtime" label="授予时间" min-width="258">
            </el-table-column>
            <el-table-column prop="smartstatus" label="状态" min-width="129">
              <el-tooltip :content="'Switch value4: ' + value4" placement="top" slot-scope="scope">
                <span v-if="scope.row.smartstatus === 1">完好</span>
                <span v-else>待维修</span>
              </el-tooltip>

            </el-table-column>
            <el-table-column label="操作状态" min-width="114">
              <el-tooltip :content="'Switch value4: ' + value4" placement="top" slot-scope="scope">
                <el-switch v-model="scope.row.smartstatus" active-color="#409eff" inactive-color="#dcdfe6"
                  :active-value="1" :inactive-value="2" @change="changestatus(scope.row)">
                </el-switch>

              </el-tooltip>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block" style="text-align: right ; margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage4" :page-sizes="[7, 10, 20, 50]" :page-size="10"
              layout="total, sizes, prev, pager, next,jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="家居设备">
          <el-table :data="tableData2" border style="width: 100%">
            <el-table-column prop="unitname" label="单元名称" min-width="260">
            </el-table-column>
            <el-table-column prop="buildnum" label="幢号" min-width="143">
            </el-table-column>
            <el-table-column prop="homenum" label="房号" min-width="143">
            </el-table-column>
            <el-table-column prop="homename" label="房主" min-width="143">
            </el-table-column>
            <el-table-column prop="homedesk" label="书桌" min-width="86">
            </el-table-column>
            <el-table-column prop="homechair" label="椅子" min-width="86">
            </el-table-column>
            <el-table-column prop="homeclothes" label="衣柜" min-width="86">
            </el-table-column>
            <el-table-column prop="createtime" label="授予时间" min-width="258">
            </el-table-column>
            <el-table-column prop="familystatus" label="状态" min-width="114">
              <el-tooltip :content="'Switch value4: ' + value4" placement="top" slot-scope="scope">
                <span v-if="scope.row.familystatus === 1">完好</span>
                <span v-else>待维修</span>
              </el-tooltip>
            </el-table-column>
            <el-table-column label="操作状态" min-width="114">
              <el-tooltip :content="'Switch value4: ' + value4" placement="top" slot-scope="scope">
                <el-switch v-model="scope.row.familystatus" active-color="#13CE66" inactive-color="#FF4949"
                  :active-value="1" :inactive-value="2" @change="changefamilystatus(scope.row)">
                </el-switch>

              </el-tooltip>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block" style="text-align: right ; margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage4" :page-sizes="[7, 10, 20, 50]" :page-size="10"
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
      unitname: "",
      buildnum: "",
      homenum: "",
      homename: "",
      airnum: "",
      wifiname: "",
      washnum: "",
      createtime: "",
      smartstatus: null,

      homechair: "",
      homeclothes: "",
      homedesk: "",
      homestatus: "",

      familystatus: "",
      startDate: "",
      endDate: "",
      currPage: 1,
      pageNum: 10,

      value: '',
      value4: '',

      currentPage4: 1,
      total: null,

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
      value2: '',

      tableData: [],
      tableData2: [],

      options: [{
        value: '1',
        label: '完好'
      }, {
        value: '2',
        label: '待维修'
      },],
    }
  },
  mounted() {
    this.handleGetList()
    this.handleGetList2()
  },
  methods: {
    // 获取数据
    handleGetList() {
      this.axios({
        url: 'http://community.byesame.com/house/searchdeviceList',
        method: 'get',
        params: {
          smartstatus: this.smartstatus,
          familystatus: this.familystatus,
          homenum: this.homenum,
          startDate: this.startDate,
          endDate: this.endDate,
          currPage: this.currPage - 1,
          pageNum: this.pageNum,
          token: sessionStorage.token
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        if (res.status == 200) {
          res.data.data.forEach(item => {
            item.createtime = this.formatCreateTime(item.createtime);
          });
          console.log(res);
          this.tableData = res.data.data;
        }
      }
      )
    },
    // 查找
    search() {
      this.axios({
        url: 'http://community.byesame.com/house/searchdeviceList',
        method: 'get',
        params: {
          smartstatus: this.smartstatus,
          familystatus: this.familystatus,
          homenum: this.homenum,
          startDate: this.startDate,
          endDate: this.endDate,
          currPage: this.currPage - 1,
          pageNum: this.pageNum,
          token: sessionStorage.token
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        if (res.status == 200) {
          res.data.data.forEach(item => {
            item.createtime = this.formatCreateTime(item.createtime);
          });
          console.log(res);
          this.tableData = res.data.data;
          // this.handleGetList()
        }
      }
      )
    },
    // 开关
    changestatus(row) {
      this.$confirm("确定更新该智能设备状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios({
          url: 'http://community.byesame.com/house/updatesmartStatus',
          method: 'post',
          data: {
            id: row.id,
            smartstatus: row.smartstatus,
            token: sessionStorage.token
          }
        }).then(res=>{
          console.log(res);
          if(res.status==200){
            this.$message({
                type: 'success',
                message: '智能设备状态改变成功!'
              });
              this.handleGetList()
          }
        })
      })
    },
    changefamilystatus(row) {
      this.$confirm("确定更新该智能设备状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios({
          url: 'http://community.byesame.com/house/updatefamilyStatus',
          method: 'post',
          data: {
            id: row.id,
            familystatus: row.familystatus,
            token: sessionStorage.token
          }
        }).then(res=>{
          console.log(res);
          if(res.status==200){
            this.$message({
                type: 'success',
                message: '智能设备状态改变成功!'
              });
              this.handleGetList()
          }
        })
      })
    },
    // 家居
    handleGetList2() {
      this.axios({
        url: 'http://community.byesame.com/house/searchdeviceList',
        method: 'get',
        params: {
          homestatus: this.homestatus,
          familystatus: this.familystatus,
          homenum: this.homenum,
          startDate: this.startDate,
          endDate: this.endDate,
          currPage: this.currPage - 1,
          pageNum: this.pageNum,
          token: sessionStorage.token
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        if (res.status == 200) {
          res.data.data.forEach(item => {
            item.createtime = this.formatCreateTime(item.createtime);
          });
          console.log(res);
          this.tableData2 = res.data.data;
        }
      }
      )
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = val
      this.handleGetList()
      this.handleGetList2()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currPage = val
      this.handleGetList()
      this.handleGetList2()
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
  }
}

</script>
<style lang="scss" scoped>
.box::v-deep {
  .top {
    display: flex;
    justify-content: left;

    .el-input {
      width: 21%;
      font-size: 14px;
      margin-left: 10px;

      &:nth-child(1) {
        margin-left: 0;
      }

      input {
        height: 36px;
      }
    }

    .el-select {
      width: 21%;
    }

    .el-input:nth-child(1) {
      width: 100%;
      margin-left: 0px;
    }

    .el-range-editor--small.el-input__inner {
      height: 36px;
      margin-left: 10px;
      width: 21%;
    }
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