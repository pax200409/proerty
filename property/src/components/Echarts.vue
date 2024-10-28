<template>
<<<<<<< HEAD
  <div style="background-color: #e8e8e8">
    <el-row :gutter="20" style="margin: 0">
      <!-- 上方滚动条 -->
      <div class="poster">
        <div>
          <span
            style="
              color: #389af9;
              font-weight: 700;
              font-size: 14px;
              padding: 18px;
            "
          >
            <i class="el-icon-message-solid"></i>
            最新公告
          </span>
        </div>
        <!-- 轮播公告 -->
        <div class="newPost">
          <transition-group name="slide-up" tag="ul" class="post-list">
            <router-link
              to="service/postMessage"
              tag="li"
              v-for="(item, index) in banText"
              :key="item.p_id"
              class="post-item slide-up-item"
              v-show="index === currentIndex"
            >
              <span>{{ item.title }}</span>
              <span>{{ item.content }}</span>
              <span>
                {{ item.createtime }}
                <span style="color: #389af9; margin-left: 5px">更多</span>
              </span>
            </router-link>
          </transition-group>
        </div>
      </div>
      <!-- 下方四个卡片 -->
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          style="
            height: 100px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
        >
          <i class="el-icon-user-solid"></i>
          <span style="font-size: 32px; font-weight: bold">{{
            UsersData
          }}</span>
          <span>系统用户数</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          style="
            height: 100px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
        >
          <i class="el-icon-user-solid"></i>
          <span style="font-size: 32px; font-weight: bold">{{
            payMessage
          }}</span>
          <span>计费订单数量</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          style="
            height: 100px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
        >
          <i class="el-icon-user-solid"></i>
          <span style="font-size: 32px; font-weight: bold">{{
            ParkOrder
          }}</span>
          <span>车位数量</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          style="
            height: 100px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
        >
          <i class="el-icon-user-solid"></i>
          <span style="font-size: 32px; font-weight: bold">{{ FeedBack }}</span>
          <span>用户反馈数量</span>
        </div>
      </el-col>
      <!-- 小区分布统计 -->
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="
            height: 300px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
          id="distribution"
        ></div>
      </el-col>
      <!-- 车位数、已分配、已缴费 -->
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="
            height: 300px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
          id="Community"
        ></div>
      </el-col>
      <!-- 缴费项目订单 -->
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="
            height: 300px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
          id="Project"
        ></div>
      </el-col>
      <el-col :span="17">
        <div
          class="grid-content bg-purple"
          style="
            height: 300px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
          id="access"
        ></div>
      </el-col>
      <!-- 维修订单 -->
      <el-col :span="7">
        <div
          class="grid-content bg-purple"
          style="
            height: 300px;
            border-radius: 8px;
            margin: 5px;
            background-color: #fff;
          "
          id="Project"
        >
          <template>
            <el-table
              ref="filterTable"
              :data="tableData"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="name" label="维修内容" width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="报修日期"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="tag"
                label="状态"
                width="100"
                :filters="[
                  { text: '已维修', value: '已维修' },
                  { text: '未维修', value: '未维修' },
                ]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.tag === '已维修' ? 'success' : 'danger'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
=======
  <el-row :gutter="20" style="margin: 0">
    <!-- 上方滚动条 -->
    <el-col :span="24">
      <div
        class="grid-content bg-purple-dark"
        style="height: 56px; background-color: #ccc"
      ></div>
    </el-col>
    <!-- 下方四个卡片 -->
    <el-col :span="6">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 100px;
          border-radius: 8px;
          margin: 10px;
        "
      >
        <i class="el-icon-user-solid"></i>
        <span style="font-size: 32px; font-weight: bold">{{ UsersData }}</span>
        <span>系统用户数</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 100px;
          border-radius: 8px;
          margin: 10px;
        "
      >
        <i class="el-icon-user-solid"></i>
        <span style="font-size: 32px; font-weight: bold">{{ payMessage }}</span>
        <span>计费订单数量</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 100px;
          border-radius: 8px;
          margin: 10px;
        "
      >
        <i class="el-icon-user-solid"></i>
        <span style="font-size: 32px; font-weight: bold">{{ ParkOrder }}</span>
        <span>车位数量</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 100px;
          border-radius: 8px;
          margin: 10px;
        "
      >
        <i class="el-icon-user-solid"></i>
        <span style="font-size: 32px; font-weight: bold">{{ FeedBack }}</span>
        <span>用户反馈数量</span>
      </div>
    </el-col>
    <!-- 小区分布统计 -->
    <el-col :span="8">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 300px;
          border-radius: 8px;
          margin: 10px;
        "
      ></div>
    </el-col>
    <el-col :span="8">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 300px;
          border-radius: 8px;
          margin: 10px;
        "
        id="Community"
      ></div>
    </el-col>
    <el-col :span="8">
      <div
        class="grid-content bg-purple"
        style="
          background-color: #ccc;
          height: 300px;
          border-radius: 8px;
          margin: 10px;
        "
      ></div>
    </el-col>
  </el-row>
>>>>>>> b0d5195aa589ccabc8344205290a218429f95cde
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      UsersData: "",
      payMessage: "",
      ParkOrder: "",
      FeedBack: "",
      chartData: {
        a1: "",
        a2: "",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
        d1: "",
        d2: "",
        d3: "",
      },
    };
  },
  mounted() {
    this.getUsersData();
    this.getpayMessage();
    this.getpayParkOrder();
    this.getFeedBack();
    this.getEchartsDataa1();
    this.getEchartsDataa2();
    this.getEchartsDataa3();
    this.getEchartsDatab1();
    this.getEchartsDatab2();
    this.getEchartsDatab3();
    this.getEchartsDatac1();
    this.getEchartsDatac2();
    this.getEchartsDatac3();
    this.getEchartsDatad1();
    this.getEchartsDatad2();
    this.getEchartsDatad3();
<<<<<<< HEAD
    this.getDistributionDataA();
    this.getDistributionDataB();
    this.getDistributionDataC();
    this.getDistributionDataD();
    this.getEchartsDatathree1();
    this.getEchartsDatathree2();
    this.getEchartsDatathree3();
    this.getEchartsDatathree4();
    this.getEchartsDatathree5();
    this.getEchartsDatathree6();
    this.getEchartsDatafour();
    this.getorderData();
    this.getList();
    this.initEchartsone();
    this.initEchartstwo();
    this.initEchartsthree();
    this.initEchartsfour();
    // 初始化 ECharts
=======
    this.initEcharts(); // 初始化 ECharts
>>>>>>> b0d5195aa589ccabc8344205290a218429f95cde
    //调用a1的数据
  },
  methods: {
    getUsersData() {
      this.axios
        .get(
          "http://community.byesame.com/users/getUsersData?currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.UsersData = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getpayMessage() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getPayMessage?currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.payMessage = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getpayParkOrder() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkOrder?currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.ParkOrder = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFeedBack() {
      this.axios
        .get(
          "http://community.byesame.com/poster/getFeedBack?currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.FeedBack = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 初始化Echarts
    initEcharts() {
      const chartDom = document.getElementById("Community");
      const myChart = echarts.init(chartDom);
      const option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "车位数", "已分配量", "已缴费"],
            ["A区", this.chartData.a1, this.chartData.a2, this.chartData.a3],
            ["B区", this.chartData.b1, this.chartData.b2, this.chartData.b3],
            ["C区", this.chartData.c1, this.chartData.c2, this.chartData.c3],
            ["D区", this.chartData.d1, this.chartData.d2, this.chartData.d3],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };

      option && myChart.setOption(option);
    },
    // 调用Echarts中的动态数据
    getEchartsDataa1() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=A&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.a1 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDataa2() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=A&parkstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.a2 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDataa3() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkOrder?parkname=A&orderstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.a3 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatab1() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=B&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.b1 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatab2() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=B&parkstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.b2 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatab3() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkOrder?parkname=B&orderstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.b3 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatac1() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=C&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.c1 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatac2() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=C&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.c2 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatac3() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkOrder?parkname=C&orderstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.c3 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatad1() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=D&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.d1 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatad2() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkData?parkname=D&parkstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.d2 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatad3() {
      this.axios
        .get(
          "http://community.byesame.com/parking/getParkOrder?parkname=D&orderstatus=1&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.chartData.d3 = res.data.total;
          this.initEcharts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#Community {
  height: 300px; /* 确保有高度 */
  width: 100%; /* 确保有宽度 */
}
<<<<<<< HEAD
.poster {
  left: 0;
  width: 100%;
  background-color: #ffffff;
  height: 58px;
  display: flex;
  align-items: center;

  .newPost {
    overflow: hidden;
    display: flex;
    flex: 1;
    height: 58px;

    .post-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .post-item {
        width: 100%;
        height: 58px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
      }
    }
  }
}

// 往上划走的轮播公告过渡动画
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s;
}

.slide-up-enter {
  transform: translateY(0);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

//图表
.mid {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.mid-box {
  width: 485px;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
}
=======
>>>>>>> b0d5195aa589ccabc8344205290a218429f95cde
</style>
