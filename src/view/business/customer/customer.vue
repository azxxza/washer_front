<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <!-- <FormItem>
            <Input v-model="formSearch.sn" placeholder="SN号" clearable>
              <span slot="prepend">SN号</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.iccid" placeholder="ICCID" clearable>
              <span slot="prepend">ICCID</span>
            </Input>
          </FormItem> -->
          <FormItem>
            <!-- <Button type="primary" @click="search">
              <Icon type="md-search" size="15" />刷新
            </Button> -->
            <!-- <Button @click="reset" type="primary">
              <Icon type="md-backspace" size="17" />重置
            </Button> -->
          </FormItem>
        </Col>
        <Col :lg="36" :md="24" :sm="36" :xs="36">
        <Button type="primary" @click="search">
              <Icon type="md-search" size="15" />刷新
            </Button>
          <Button type="primary" @click="drawerAdd =true" v-has="has.save">
            <Icon type="ios-add-circle-outline" size="15" />新增
          </Button>
          <Button type="primary" @click="handleEdit" v-has="has.update">
            <Icon type="ios-create-outline" size="15" />修改
          </Button>
          <Button type="primary" @click="handleDelete" v-has="has.delete">
            <Icon type="ios-trash" size="15" />删除
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
    <customerAddForm :drawerAdd="drawerAdd" @on-close="drawerAdd = false" @on-search-table="reset" />
    <customerEditForm
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
import { page, list, deleteInstall } from "@/api/business/customer";
import { formatDate,checkOneAndGetData } from "@/libs/tools.js";
import CustomerAddForm from "./customer_add.vue";
import CustomerEditForm from "./customer_edit.vue";
import has from "@/directive/has.js";
import excel from "@/libs/excel";

export default {
  name: "customer_page",
  extends: Base,
  components: {
    Modal,Message,
    DataTable,
    CustomerAddForm,
    CustomerEditForm
  },
  data() {
    return {
      has: {
        save: "settting_customer_save",
        update: "settting_customer_update",
        delete: "settting_customer_del"
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
                  'on-change': () => {
                    alert();
                    if (
                      _this.selectedData &&
                      _this.selectedData.id === params.row.id
                    ) {
                      _this.selectedData = undefined;
                      _this.selectedIndex = undefined;
                    } else {
                      _this.selectedData = params.row;
                      _this.selectedIndex = params.index;
                    }
                  }
                }
              })
            ]);
          }
        },
        { title: "手机号码", key: "phone", align: "center", minWidth: 100 },
        { title: "姓名", key: "trueName", align: "center", minWidth: 100 },
        { title: "创建时间", key: "createTime", align: "center", minWidth: 100,
        render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.createTime * 1000), "yyyy-MM-dd hh:mm:ss")
            );
          } },
        { title: "修改时间", key: "updateTime", align: "center", minWidth: 100,
        render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.updateTime * 1000), "yyyy-MM-dd hh:mm:ss")
            );
          } },
        {
          title: "状态",
          align: "center",
          key: "status",
          minWidth: 130,
          render: (h, params) => {
            var status = params.row.status;
            if (status === 1) {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "服务中"
              );
            } else {
              return h(
                "Tag",
                {
                  props: {
                    color: "#c5c8ce"
                  }
                },
                "休息中"
              );
            } 
          }
        }
      ],
      drawerAdd: false,
      drawerEdit: false,
      drawerRole: false,
      modelUpload: false,
      roleList: []
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
            deleteInstall({ customerId: this.selectedData.id }).then(function(
              result
            ) {
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
      var data = checkOneAndGetData(this);
      if (data) {
        this.drawerEdit = true;
        this.selectedData = data;
      }
    },
    handleUpload() {
      this.modelUpload = true;
    },
    handleExport() {
      var params = {};
      params = Object.assign({}, params, this.formSearch);
      var data = [];
      var _this = this;
      list(params).then(res => {
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
