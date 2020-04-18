<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.washerSN" placeholder="设备SN号" clearable>
              <span slot="prepend">设备SN号</span>
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
            <Input v-model="formSearch.floor" placeholder="楼层" clearable>
              <span slot="prepend">楼层</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.renewMoney" placeholder="消费金额" clearable>
              <span slot="prepend">消费金额</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.openid" placeholder="openid" clearable>
              <span slot="prepend">openid</span>
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
import { page,list } from "@/api/business/pay_info";
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
        { title: "openid", key: "weChat", align: "center", minWidth: 200 },
        { title: "昵称", key: "nickname", align: "center", minWidth: 100 },
        { title: "联系电话", key: "telephone", align: "center", minWidth: 100 },
        {
          title: "订单号",
          align: "center",
          key: "orderCode",
          minWidth: 130
        },
        {
          title: "设备SN",
          align: "center",
          key: "washerSN",
          minWidth: 100
        },
        {
          title: "学校",
          align: "center",
          key: "school",
          minWidth: 100
        },
        {
          title: "楼层",
          align: "center",
          key: "floor",
          minWidth: 100
        },
        {
          title: "宿舍",
          align: "center",
          key: "dormitory",
          minWidth: 100
        },
        {
          title: "洗衣模式",
          align: "center",
          key: "washerModel",
          minWidth: 100
        },
        {
          title: "消费类型",
          align: "center",
          key: "costtypename",
          minWidth: 100
        },
        {
          title: "消费金额",
          align: "center",
          key: "renewMoney",
          minWidth: 100
        },
        {
          title: "支付方式",
          align: "center",
          key: "paymodel",
          minWidth: 120,
          render: (h, params) => {
            var paymodel = params.row.paymodel;
            var color = "";
            var desc = "";
            if (paymodel === 0) {
              color = "primary";
              desc = "月卡";
            } else if (paymodel === 1) {
              color = "success";
              desc = "微信支付";
            }  else {
              color = "error";
              desc = "未知";
            }
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              desc
            );
          }
        },
         {
          title: "状态",
          align: "center",
          key: "orderStatus",
          minWidth: 120,
          render: (h, params) => {
            var orderStatus = params.row.orderStatus;
            var color = "";
            var desc = "";
            if (orderStatus === '0') {
              color = "error";
              desc = "失败";
            } else if (orderStatus === '1') {
              color = "success";
              desc = "成功";
            }  
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              desc
            );
          }
        },
        {
          title: "消费时间",
          align: "center",
          key: "opttime",
          minWidth: 100
        }
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
        _this.exportLoading =false;
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
