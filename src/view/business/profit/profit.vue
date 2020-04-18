<template>
  <Card>
    <Form :model="formSearch" inline label-position="left" :label-width="70">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem label="统计类型">
            <RadioGroup v-model="formSearch.statType" @on-change="handleOnChange">
              <Radio label="1">按天统计</Radio>
              <Radio label="2">按月统计</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="统计时间">
            <DatePicker type="date" v-if="this.formSearch.statType === '1'" v-model="formSearch.statDate"></DatePicker>
            <DatePicker type="month" v-if="this.formSearch.statType === '2'" v-model="formSearch.statDate"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">
              <Icon type="md-search" size="15" />搜索
            </Button>
          </FormItem>
        </Col>
        <Col :lg="36" :md="24" :sm="36" :xs="36">
          <Button type="primary" @click="handleExport" :loading="exportLoading">
            <Icon type="md-checkmark-circle-outline" size="15" />导出
          </Button>
        </Col>
      </Row>
    </Form>
    <br />
    <dataTable
      ref="tables"
      editable
      searchable
      search-place="top"
      v-model="tableData"
      :columns="columns"
      :loading="loading"
      pageType="client"
      @on-search="handleSearch"
      @on-row-click="handRowClick"
    ></dataTable>
  </Card>
</template>

<script>
import { RadioGroup,DatePicker } from 'view-design' 
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { page, list } from "@/api/business/profit";
import { formatDate } from "@/libs/tools.js";
import has from "@/directive/has.js";

export default {
  name: "user_page",
  extends: Base,
  components: {
    RadioGroup,
    DatePicker,
    DataTable
  },
  data() {
    return {
      formSearch: {
        statType: "1"
      },
      type: "date",
      columns: [
        { title: "统计时间", key: "statDate", align: "center", minWidth: 100 },
        // { title: "设备数量", key: "termCount", align: "center", minWidth: 100 },
        {
          title: "单次合计金额",
          key: "dcRenewMoney",
          align: "center",
          minWidth: 100
        },
        {
          title: "单次付费次数",
          align: "center",
          key: "dcRenewCount",
          minWidth: 100
        },
        {
          title: "租赁合计金额",
          align: "center",
          key: "byRenewMoney",
          minWidth: 100
        },
        {
          title: "租赁付费次数",
          align: "center",
          key: "byRenewCount",
          minWidth: 100
        },
        {
          title: "总收益金额",
          align: "center",
          key: "totalProfit",
          minWidth: 100
        }
      ],
      exportLoading: false
    };
  },
  methods: {
    handleSearch(params) {
      this.loading = true;
      var _this = this;
      params = Object.assign({}, params, _this.formSearch);
      if (params.statDate) {
        var format = 'yyyy-MM-dd'
        if (params.statType === '2') {
          format = 'yyyy-MM'
        }
        params.statDate = formatDate(
          new Date(this.formSearch.statDate),
          format
        );
      }
      list(params).then(res => {
        _this.loading = false;
        if (res) {
          _this.tableData = res.response;
          _this.$refs.tables.total = _this.tableData.length;
        }
      });
    },
    handleExport() {
      var params = {};
      params = Object.assign({}, params, this.formSearch);
      this.exportLoading  = true;
      var _this = this;
      list(params).then(res => {
        _this.exportLoading = false;
        if (res.status === 200) {
          _this.$refs.tables.exportCsv({
            filename: "数据",
            columns: _this.columns,
            data: res.response
          });
        }
      });
    },
    handleOnChange (value) {
      this.search();
    }
  },
  mounted() {
    this.search();
  }
};
</script>
