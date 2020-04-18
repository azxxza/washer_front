<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.washerSN" placeholder="设备SN" clearable>
              <span slot="prepend">设备SN</span>
            </Input>
          </FormItem>
          <FormItem>
            <DatePicker v-model="formSearch.begTime" type="date" placeholder="起始日期" clearable />
          </FormItem>
          <FormItem>
            <DatePicker v-model="formSearch.endTime" type="date" placeholder="截止日期" clearable />
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.school" placeholder="学校" clearable>
              <span slot="prepend">学校</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.floor" placeholder="楼(栋)" clearable>
              <span slot="prepend">楼(栋)</span>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">
              <Icon type="md-search" size="15" />搜索
            </Button>
            <Button @click="reset" type="primary">
              <Icon type="md-backspace" size="17" />重置
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
      @on-search="handleSearch"
      @on-row-click="handRowClick"
    ></dataTable>
  </Card>
</template>

<script>
import { DatePicker } from 'view-design' 
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { page,list } from "@/api/business/idle_device";
import { formatDate } from "@/libs/tools.js";
import has from "@/directive/has.js";

export default {
  name: "user_page",
  extends: Base,
  components: {
    DatePicker,
    DataTable
  },
  data() {
    return {
      has: {
        save: "system_user_save",
        update: "system_user_update",
        delete: "system_user_delete",
        freeze: "system_user_freeze"
      },
      columns: [
        { title: "设备SN", key: "sn", align: "center", minWidth: 100 },
        { title: "学校", key: "school", align: "center", minWidth: 100 },
        { title: "楼（栋）", key: "floor", align: "center", minWidth: 100 },
        {
          title: "宿舍号",
          align: "center",
          key: "dormitory",
          minWidth: 130
        },
        {
          title: "openid",
          align: "center",
          key: "openid",
          minWidth: 100
        },
        {
          title: "昵称",
          align: "center",
          key: "nickname",
          minWidth: 100
        },
        {
          title: "手机号码",
          align: "center",
          key: "telephone",
          minWidth: 100
        },
        {
          title: "付费日期",
          align: "center",
          key: "opttime",
          minWidth: 100
        },
        {
          title: "包月截止日期",
          align: "center",
          key: "enddate",
          minWidth: 100
        },
        {
          title: "产品类型",
          align: "center",
          key: "remark",
          minWidth: 120
        },
        // {
        //   title: "更新时间",
        //   align: "center",
        //   key: "updatedAt",
        //   minWidth: 100
        // }
      ],
      drawerAdd: false,
      drawerEdit: false,
      drawerRole: false,
      exportLoading: false
    };
  },
  methods: {
    handleSearch(params) {
      this.loading = true;
      var _this = this;
      params = Object.assign({}, params, _this.formSearch);
      if (params.begTime) {
        params.begTime = formatDate(
          new Date(this.formSearch.begTime),
          "yyyy-MM-dd"
        );
      }
      if (params.endTime) {
        params.endTime = formatDate(
          new Date(this.formSearch.endTime),
          "yyyy-MM-dd"
        );
      }
      page(params).then(res => {
        _this.loading = false;
        if (res) {
          _this.tableData = res.response.records;
          _this.$refs.tables.total = res.response.total;
        }
      });
    },
    handleExport () {
      var params = {};
      params = Object.assign({}, params, this.formSearch);
      this.exportLoading = true;
      var _this = this
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
    }
  },
  mounted() {
    this.search();
  }
};
</script>
