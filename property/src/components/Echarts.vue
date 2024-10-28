<template>
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
            line-height: 100px;
            text-align: center;
          "
        >
          <i
            class="el-icon-user-solid"
            style="color: #389af9; font-size: 66px"
          ></i>
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
            line-height: 100px;
            text-align: center;
          "
        >
          <i
            class="el-icon-document"
            style="color: #aee86a; font-size: 66px"
          ></i>
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
            line-height: 100px;
            text-align: center;
          "
        >
          <i class="el-icon-truck" style="color: #f2b90e; font-size: 66px"></i>
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
            line-height: 100px;
            text-align: center;
          "
        >
          <i
            class="el-icon-edit-outline"
            style="color: #b28b7c; font-size: 66px"
          ></i>
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
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      banText: [],
      currentIndex: 0, // 当前显示的公告索引
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
      distributionData: {
        valueA: "10",
        valueB: "20",
        valueC: "30",
        valueD: "40",
      },
      radarData: {
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: "",
        a6: "",
      },
      accessData: {
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: "",
        a6: "",
      },
      tableData: [],
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
    //调用a1的数据
  },
  methods: {
    getList() {
      this.axios
        .get(
          "http://community.byesame.com/poster/getPosterData?currPage=0&pageNum=100",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          const res = response.data; // 获取响应数据
          res.data.forEach((item) => {
            item.createtime = this.formatTime(item.createtime); // 格式化时间
          });
          this.banText = res.data; // 将数据赋值给 banText
          console.log(this.banText);
          this.startCarousel(); // 启动轮播
        })
        .catch((error) => {
          console.error("Error fetching poster data:", error); // 处理错误
        });
    },
    // 启动定时轮播公告
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.banText.length;
      }, 3000); // 每3秒轮播一次
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    // 获取用户数据
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
    // 获取计费订单数量
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
    // 获取车位数量
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
    // 获取用户反馈数量
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
    // 初始化第一个Echarts
    initEchartsone() {
      const chartDom = document.getElementById("distribution");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "小区分布统计",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "小区分布",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.distributionData.valueA, name: "A区" },
              { value: this.distributionData.valueB, name: "B区" },
              { value: this.distributionData.valueC, name: "C区" },
              { value: this.distributionData.valueD, name: "D区" },
            ],
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      };
      option && myChart.setOption(option);
    },
    // 初始化第二个Echarts
    initEchartstwo() {
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
    // 初始化第三个Echarts
    initEchartsthree() {
      const chartDom = document.getElementById("Project");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "缴费项目订单",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["计费项目"],
        },
        radar: {
          // shape: 'circle', // 雷达图绘制类型，支持 'polygon' 和 'circle'。
          indicator: [
            { name: "电费单", max: 50 },
            { name: "定月单", max: 50 },
            { name: "按量单", max: 50 },
            { name: "天然气单", max: 50 },
            { name: "物业费", max: 50 },
            { name: "宽带费", max: 50 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [
                  this.radarData.a1,
                  this.radarData.a2,
                  this.radarData.a3,
                  this.radarData.a4,
                  this.radarData.a5,
                  this.radarData.a6,
                ],
                name: "计费项目",
              },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },
    // 初始化第四个Echarts
    initEchartsfour() {
      const chartDom = document.getElementById("access");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "当月用户访问情况",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: Array.from({ length: 31 }, (_, i) =>
            (i + 1).toString().padStart(1, "0")
          ), // 从01到31的天数
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: Array(31).fill(0), // 初始化为零
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
    },
    getDistributionDataA() {
      this.axios
        .get(
          "http://community.byesame.com/house/searchList?unitname=A&currPage=1&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.distributionData.valueA = res.data.total;
          // this.initEchartsone();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDistributionDataB() {
      this.axios
        .get(
          "http://community.byesame.com/house/searchList?unitname=B&currPage=1&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.distributionData.valueB = res.data.total;
          // this.initEchartsone();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDistributionDataC() {
      this.axios
        .get(
          "http://community.byesame.com/house/searchList?unitname=C&currPage=1&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.distributionData.valueC = res.data.total;
          // this.initEchartsone();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDistributionDataD() {
      this.axios
        .get(
          "http://community.byesame.com/house/searchList?unitname=D&currPage=1&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.distributionData.valueD = res.data.total;
          this.initEchartsone();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 第二个Echarts图中的数据
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          // this.initEchartstwo();
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
          this.initEchartstwo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 第三个Echarts图中的数据
    getEchartsDatathree1() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getCostData?c_id=7&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.radarData.a1 = res.data.total;
          // this.initEchartsthree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatathree2() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getCostData?c_id=8&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.radarData.a2 = res.data.total;
          // this.initEchartsthree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatathree3() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getCostData?c_id=9&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.radarData.a3 = res.data.total;
          // this.initEchartsthree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatathree4() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getCostData?c_id=10&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.radarData.a4 = res.data.total;
          // this.initEchartsthree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatathree5() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getCostData?c_id=11&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.radarData.a5 = res.data.total;
          // this.initEchartsthree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEchartsDatathree6() {
      this.axios
        .get(
          "http://community.byesame.com/cost/getCostData?c_id=12&currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.total);
          this.radarData.a6 = res.data.total;
          this.initEchartsthree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 第四个Echarts图中的数据
    getEchartsDatafour() {
      this.axios
        .get("http://community.byesame.com/users/getLoginMonth", {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          const times = res.data.map((item) => item.createtime);
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();
          const dayCount = Array(31).fill(0); // 为每一天初始化计数

          times.forEach((dateString) => {
            const date = new Date(dateString);
            // 检查日期是否在当前月份和年份
            if (
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear
            ) {
              const day = date.getDate();
              dayCount[day - 1]++; // 增加特定天的计数
            }
          });
          console.log(dayCount);

          // 用新数据更新图表
          const chartDom = document.getElementById("access");
          const myChart = echarts.getInstanceByDom(chartDom);
          myChart.setOption({
            series: [
              {
                data: dayCount, // 使用统计好的每一天的登录次数
              },
            ],
          });
        })
        .catch((err) => {
          console.error("获取数据时出错:", err);
        });
    },
    // 筛选日期和状态
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 获取维修订单的数据
    getorderData() {
      this.axios
        .get(
          "http://community.byesame.com/poster/getRepairData?currPage=0&pageNum=4",
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data); // 输出整个响应
          const orderData = res.data.data.map((item) => {
            return {
              date: this.formatDate(item.createtime), // 格式化日期
              name: item.repaircontent,
              tag: item.resultstatus === 1 ? "已维修" : "未维修", // 根据 resultstatus 设置状态
            };
          });
          console.log(orderData); // 输出转换后的数据

          // 将 orderData 赋值给 tableData
          this.tableData = orderData; // 直接赋值
          console.log(this.tableData); // 确保 tableData 被正确赋值
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 格式化日期的方法
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        console.error("Invalid date:", dateString); // 打印错误信息
        return dateString; // 返回原始字符串以防格式化失败
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>

<style lang="scss" scoped>
#Community {
  height: 300px; /* 确保有高度 */
  width: 100%; /* 确保有宽度 */
}
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
</style>
