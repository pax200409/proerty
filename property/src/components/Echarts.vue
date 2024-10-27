<template>
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
    this.initEcharts(); // 初始化 ECharts
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
</style>
