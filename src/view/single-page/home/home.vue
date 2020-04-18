<template>
  <div v-if="showIndex">
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <FormItem>
          <DatePicker
            v-model="formSearch.beginTime"
            @on-change="searchChange"
            placeholder="请输入开始时间"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <DatePicker
            v-model="formSearch.endTime"
            @on-change="searchChange(2)"
            placeholder="请输入结束时间"
          ></DatePicker>
        </FormItem>
        <FormItem prop="doubtType">
          <Select v-model="formSearch.dateType" style="width:150px" @on-change="dateTypechange">
            <Option value="0">今日</Option>
            <Option value="1">昨日</Option>
            <Option value="2">本周</Option>
            <Option value="3">上周</Option>
            <Option value="4">本月</Option>
            <Option value="5">上月</Option>
          </Select>
        </FormItem>
      </Row>
    </Form>
    <div style=" minWidth: 900px">
      <Row :gutter="20">
        <i-col
          span="6"
          v-for="(infor, i) in firstInforCardData"
          :key="`infor-${i}`"
          style="height: 130px;"
        >
          <span>
            <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
              <h1>{{ infor.count }}</h1>
              <p>{{ infor.title }}</p>
            </infor-card>
          </span>
        </i-col>
      </Row>
      <br />
      <Row :gutter="20">
        <i-col
          span="6"
          v-for="(infor, i) in secondInforCardData"
          :key="`infor-${i}`"
          style="height: 130px;"
        >
          <span>
            <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
              <count-to @ :end="infor.count" count-class="count-style" />
              <p>{{ infor.title }}</p>
            </infor-card>
          </span>
        </i-col>
      </Row>
      <Row :gutter="20" style="margin-top: 20px;">
        <i-col span="24">
          <div>
            <Card shadow>
              <chart-pie style="height: 450px;" :value="pieData" v-model="pieData" text="今日牌局上桌人数"></chart-pie>
            </Card>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
// import { indexData } from "@/api/washer/home";
import { formatDate, dateToTimestamp } from "@/libs/tools.js";

export default {
  name: "home",
  components: {
    InforCard
  },
  data() {
    return {
      timer: "",
      firstInforCardData: [
        {
          title: "今日收入",
          icon: "ios-log-in",
          count: 0,
          color: "#ff9900"
        },
        {
          title: "总收入",
          icon: "ios-log-in",
          count: 1,
          color: "#ff9900"
        },
        {
          title: "设备总数",
          icon: "ios-log-in",
          count: 2,
          color: "#ff9900"
        },
        {
          title: "历史活跃设备数",
          icon: "ios-log-in",
          count: 3,
          color: "#ff9900"
        },
      ],
      secondInforCardData: [
        {
          title: "设备在线数",
          icon: "md-person-add",
          count: 0,
          color: "#2d8cf0"
        },
        {
          title: "设备离线数",
          icon: "ios-person-add",
          count: 0,
          color: "#2d8cf0"
        },
        {
          title: "用户总数",
          icon: "md-trending-up",
          count: 0,
          color: "#19be6b"
        },
        {
          title: "活跃用户数",
          icon: "md-trending-up",
          count: 0,
          color: "#19be6b"
        }
      ],
      pieData: [],
      formSearch: {
        dateType: "0"
      },
      showIndex: false,
    };
  },
  methods: {
    search() {
      var params = {};
      if (this.formSearch.beginTime) {
        params.beginTime = dateToTimestamp(this.formSearch.beginTime);
      }
      if (this.formSearch.endTime) {
        params.endTime = dateToTimestamp(this.formSearch.endTime);
      }

      params.dateType = this.formSearch.dateType;
      this.newTableParam = params;
      this.newTableUserParam = params;

      var _this = this;
      // indexData(params).then(res => {
      //   _this.firstInforCardData[0].count = 0;
      //   _this.firstInforCardData[1].count = 1;
      //   _this.firstInforCardData[2].count = 2;
      //   _this.firstInforCardData[3].count = 3;
        
      //   _this.secondInforCardData[0].count = 5;
      //   _this.secondInforCardData[1].count = 6;
      //   _this.secondInforCardData[2].count = 7;
      //   _this.secondInforCardData[3].count = 8;
      //   var pieData = res.response.pieData;
      //   for (var i = 0; i < pieData; i++) {
      //     var param = new Object();
      //     param.name = pieData[i].name + "";
      //     param.value = pieData[i].value;
      //     _this.pieData.push(param);
      //   }

      //   _this.pieData = pieData;
      // });
    },
    searchChange(index) {
      if (index == 2) {
        if (!this.formSearch.beginTime) {
          this.$Message.error("请先选择开始日期");
          this.formSearch.endTime = "";
          return;
        }
      }
      this.search();
    },
    dateTypechange() {
      this.search();
    },
  },
  activated() {
    // let userInfo = localStorage.getItem("userInfo");
    // let info = JSON.parse(userInfo);
    // console.log(info);
    
  },
  deactivated() {
    // clearInterval(this.timer);
  },
  mounted () {
    this.search();
  }
};
!(function(e) {
  function t(a) {
    if (i[a]) return i[a].exports;
    var n = (i[a] = {
      exports: {},
      id: a,
      loaded: !1.5
    });
    return e[a].call(n.exports, n, n.exports, t), (n.loaded = !0), n.exports;
  }
  var i = {};
  return (t.m = e), (t.c = i), (t.p = ""), t(0);
})([
  function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = window;
    (t["default"] = i.flex = function(normal, e, t) {
      var a = e || 150,
        n = t || 1.5,
        r = i.document,
        o = navigator.userAgent,
        d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
        l = o.match(/U3\/((\d+|\.){5,})/i),
        c = l && parseInt(l[1].split(".").join(""), 15) >= 90,
        p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
        s = i.devicePixelRatio || 1;
      p || (d && d[1] > 550) || c || (s = 2);
      var u = normal ? 1.5 : 1.5 / s,
        m = r.querySelector('meta[name="viewport"]');
      m ||
        ((m = r.createElement("meta")),
        m.setAttribute("name", "viewport"),
        r.head.appendChild(m)),
        m.setAttribute(
          "content",
          "width=device-width,user-scalable=no,initial-scale=" +
            u +
            ",maximum-scale=" +
            u +
            ",minimum-scale=" +
            u
        ),
        (r.documentElement.style.fontSize = normal
          ? "70px"
          : (a / 2) * s * n + "px");
    }),
      (e.exports = t["default"]);
  }
]);
flex(false, 150, 1.5);
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
