<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.sn" placeholder="SN号" clearable>
              <span slot="prepend">SN号</span>
            </Input>
          </FormItem>
          <!-- <FormItem>
            <Input v-model="formSearch.iccid" placeholder="ICCID" clearable>
              <span slot="prepend">ICCID</span>
            </Input>
          </FormItem> -->
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
          <Button type="primary" @click="handleUpload">
            <Icon type="ios-trash" size="15" />导入
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
    <carAddForm :drawerAdd="drawerAdd" @on-close="drawerAdd = false" @on-search-table="reset" />
    <carEditForm
      :drawerEdit="drawerEdit"
      :formData="selectedData"
      @on-close="drawerEdit = false"
      @on-search-table="search"
    />
    <car-upload-form
      :modelUpload="modelUpload"
      :formData="selectedData"
      @on-close="modelUpload = false"
      @on-search-table="search"
    />
  </Card>
</template>

<script>
import { Message,Modal } from "view-design";
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { page, list, deleteInstall } from "@/api/business/car";
import CarUploadForm from "./car_upload.vue";
import { formatDate,checkOneAndGetData } from "@/libs/tools.js";
import CarAddForm from "./car_add.vue";
import CarEditForm from "./car_edit.vue";
import has from "@/directive/has.js";
import excel from "@/libs/excel";
export default {
  name: "user_page",
  extends: Base,
  components: {
    Message,Modal,
    DataTable,
    CarAddForm,
    CarEditForm,
    CarUploadForm
  },
  data() {
    return {
      has: {
        save: "settting_car_save",
        update: "settting_car_update",
        delete: "settting_car_del"
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
        { title: "SN号", key: "sn", align: "center", minWidth: 100 },
         { title: "密钥", key: "primaryKey", align: "center", minWidth: 100 },
         { title: "蓝牙mac", key: "mac", align: "center", minWidth: 100 },
        // { title: "ICCID", key: "iccid", align: "center", minWidth: 100 },
        {
          title: "厂家",
          key: "protocol",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var protocol = params.row.protocol;
            if (protocol === "WRT") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "沃瑞特"
              );
            } else if (protocol === "SKET") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "思科尔特"
              );
            }
          }
        },
        {
          title: "产品类型",
          align: "center",
          key: "termtype",
          minWidth: 130,
          render: (h, params) => {
            var termtype = params.row.termtype;
            if (termtype === "PURIFY" || termtype === "purify") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "空气净化器"
              );
            } else if (termtype === "washer" || termtype === "WASHER") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "洗衣机"
              );
            } else if (termtype === "charge" || termtype === "CHARGE") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "充电桩"
              );
            }
          }
        },
        {
          title: "注册时间",
          align: "center",
          key: "createdAt",
          minWidth: 100
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
            deleteInstall({ carId: this.selectedData.id }).then(function(
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
