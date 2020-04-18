<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.wechatID" placeholder="openid" clearable>
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
          <Button type="primary" @click="handleEdit">
            <Icon type="md-checkmark-circle-outline" size="15" />编辑
          </Button>
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
    <leaseEditForm
      :drawerEdit="drawerEdit"
      :formData="selectedData"
      @on-close="drawerEdit = false"
      @on-search-table="search"
    />
  </Card>
</template>

<script>
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import LeaseEditForm from "./lease_edit.vue";
import { page, list } from "@/api/business/lease";
import { formatDate } from "@/libs/tools.js";
import has from "@/directive/has.js";

export default {
  name: "user_page",
  extends: Base,
  components: {
    DataTable,
    LeaseEditForm
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
        {
          title: " ",
          key: "checked",
          align: "center",
          width: 50,
          render: (h, params) => {
            let selected = false;
            if (this.selectedData && this.selectedData.id === params.row.id) {
              selected = true;
              this.selectedIndex = params.index;
            }
            var _this = this;
            return h("div", [
              h("Radio", {
                props: {
                  value: selected
                },
                on: {
                  input: function() {
                    _this.selectedData = params.row;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "微信openID",
          key: "wechatID",
          align: "center",
          minWidth: 200
        },
        {
          title: "头像",
          align: "center",
          key: "headimgurl",
          minWidth: 130,
          render: (h, params) => {
            if (params.row.headimgurl) {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.headimgurl
                  },
                  style: {
                    width: "40px",
                    height: "40px"
                  }
                })
              ]);
            }
          }
        },
        {
          title: "服务起始日期",
          key: "bgnDate",
          align: "center",
          minWidth: 100
        },
        {
          title: "服务终止日期",
          key: "endDate",
          align: "center",
          minWidth: 100
        },
        {
          title: "缴费时间",
          align: "center",
          key: "createdAt",
          minWidth: 130
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
      page(params).then(res => {
        _this.loading = false;
        if (res) {
          _this.tableData = res.response.records;
          _this.$refs.tables.total = res.response.total;
        }
      });
    },
    handleEdit() {
      if (this.selectedIndex !== undefined) {
        this.drawerEdit = true;
        this.selectedData = this.tableData[this.selectedIndex];
      }
    },
    handleExport() {
      var params = {};
      params = Object.assign({}, params, this.formSearch);
      this.exportLoading = true;
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
    }
  },
  mounted() {
    this.search();
  }
};
</script>
