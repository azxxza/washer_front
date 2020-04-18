<template>
  <div>
    <Card>
      <div>
        <Form :model="formSearch" inline label-position="left">
          <Row>
            <FormItem>
              <Input v-model="formSearch.username" placeholder="操作人">
                <span slot="prepend">操作人</span>
              </Input>
            </FormItem>
            <FormItem>
              <DatePicker v-model="formSearch.startTime" type="datetime" placeholder="开始时间"></DatePicker>
            </FormItem>
            <FormItem>
              <DatePicker
                v-model="formSearch.endTime"
                type="datetime"
                placeholder="结束时间"
                @on-change="setStartTime"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="search">
                <Icon type="md-search" size="15"/>搜索
              </Button>
              <Button @click="reset" type="primary">
                <Icon type="md-backspace" size="17"/>重置
              </Button>
            </FormItem>
          </Row>
        </Form>
      </div>
      <dataTable
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        :loading="loading"
        @on-search="handleSearch"
      />
    </Card>
  </div>
</template>

<script>
import { DatePicker } from "view-design";
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { optLog } from "@/api/system/log";
import { formatDate, dateToTimestamp } from "@/libs/tools.js";

export default {
  name: "log_page",
  extends: Base,
  components: {
    DatePicker,
    DataTable
  },
  data() {
    return {
      columns: [
        { title: "日志模块", key: "logName", align: "center",minWidth: 100 },
        { title: "操作人", key: "username", align: "center",minWidth: 80 },
        { title: "结果", key: "result", align: "center",minWidth: 80 },
        { title: "IP", key: "ip", align: "center",minWidth: 100 },
        { title: "IP所在地", key: "address", align: "center",minWidth: 160 },
        { title: "gps", key: "gps", align: "center",minWidth: 100 },
        { title: "参数", key: "message", align: "center",minWidth: 100 },
        { title: "方法名", key: "method", align: "center",minWidth: 100 },
        {
          title: "操作时间",
          key: "createTime",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h(
              "div",
              formatDate(
                new Date(params.row.createTime * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )
            );
          }
        },
        { title: "类名", key: "className", align: "center",minWidth: 450 },
      ],
      logTypeList: []
    };
  },
  methods: {
    handleSearch(params) {
      if (this.formSearch.username) {
        params.username = this.formSearch.username;
      }
      if (this.formSearch.startTime) {
        params.startTime = dateToTimestamp(this.formSearch.startTime);
      }
      if (this.formSearch.endTime) {
        params.endTime = dateToTimestamp(this.formSearch.endTime);
      }
      var _this = this;
      this.loading = true
      optLog(params).then(res => {
        _this.loading = false
        _this.tableData = res.response.records;
        _this.$refs.tables.total = res.response.total;
      });
    },
    setStartTime() {
      if (!this.formSearch.startTime) {
        this.$Message.error("请先选择开始日期");
        this.formSearch.endTime = "";
      }
    }
  },
  mounted() {
    this.search();
  }
};
</script>
