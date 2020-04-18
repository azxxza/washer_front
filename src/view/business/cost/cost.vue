<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.costname" placeholder="费用名称" clearable>
              <span slot="prepend">费用名称</span>
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
          <Button type="primary" @click="drawerAdd =true" v-has="has.save">
            <Icon type="ios-add-circle-outline" size="15" />新增
          </Button>
          <Button type="primary" @click="handleEdit" v-has="has.update">
            <Icon type="ios-create-outline" size="15" />修改
          </Button>
          <Button type="primary" @click="handleDelete" v-has="has.delete">
            <Icon type="ios-trash" size="15" />删除
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
    <costAddForm :drawerAdd="drawerAdd" @on-close="drawerAdd = false" @on-search-table="reset" />
    <costEditForm
      :drawerEdit="drawerEdit"
      :formData="selectedData"
      @on-close="drawerEdit = false"
      @on-search-table="search"
    />
  </Card>
</template>

<script>
import { Modal,Message } from 'view-design' 
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import {
  page,
  list,
  deleteCost
} from "@/api/business/cost";
import { formatDate,checkOneAndGetData } from "@/libs/tools.js";
import CostAddForm from "./cost_add.vue";
import CostEditForm from "./cost_edit.vue";
import has from "@/directive/has.js";

export default {
  name: "cost_page",
  extends: Base,
  components: {
    Modal,Message,
    DataTable,
    CostAddForm,
    CostEditForm
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
          minWidth: 50,
          render: (h, params) => {
            let selected = false;
            if (this.selectedData && this.selectedData.id === params.row.id) {
              selected = true;
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
        { title: "费用名称", key: "costname", align: "center", minWidth: 100 },
        { title: "费用类型", key: "costtypeName", align: "center", minWidth: 100 },
        { title: "费用模式", key: "costmodelName", align: "center", minWidth: 100 },
        {
          title: "费用(单位:元)",
          align: "center",
          key: "cost",
          minWidth: 130
        },
        {
          title: "赠送天数",
          align: "center",
          key: "discount",
          minWidth: 100
        },
        {
          title: "押金(单位:元)",
          align: "center",
          key: "deposit",
          minWidth: 100
        },
        {
          title: "自然月",
          align: "center",
          key: "naturalMon",
          minWidth: 100,
          render: (h, params) => {
            var naturalMon = params.row.naturalMon;
            if (naturalMon === 1) {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "自然月"
              );
            } else {
              return h(
                "Tag",
                {
                  props: {
                    color: "error"
                  }
                },
                "非自然月"
              );
            }
          }
        },
        {
          title: "优惠描述",
          align: "center",
          key: "discountDesc",
          minWidth: 100
        },
        {
          title: "操作者",
          align: "center",
          key: "operator",
          minWidth: 100
        },
        {
          title: "创建时间",
          align: "center",
          key: "createdAt",
          minWidth: 100
        },
        {
          title: "更新时间",
          align: "center",
          key: "updatedAt",
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
    handleDelete() {
      var data = checkOneAndGetData(this);
      if (data) {
        Modal.confirm({
          title: "提示",
          content: "<p>确定要删除选中的记录吗</p>",
          onOk: () => {
            var _this = this;
            deleteCost({ costId: this.selectedData.id }).then(function(result) {
              if (result) {
                Message.success("删除成功");
                _this.reset();
              }
            });
          }
        });
      } 
    },
    handleSearch(params) {
      this.loading = true;
      var _this = this;
      params = Object.assign({},params,_this.formSearch);
      page(params).then(res => {
        _this.loading = false;
        if (res) {
          _this.tableData = res.response.records;
          _this.$refs.tables.total = res.response.total;
        }
      });
    },
    handleEdit() {
      var data = checkOneAndGetData(this);
      if (data) {
        this.drawerEdit = true;
        this.selectedData = data;
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
