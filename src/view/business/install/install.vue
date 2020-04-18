<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.agentNo" placeholder="代理商编号" clearable>
              <span slot="prepend">代理商编号</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.province" placeholder="省份" clearable>
              <span slot="prepend">省份</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.city" placeholder="城市" clearable>
              <span slot="prepend">城市</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.school" placeholder="学校" clearable>
              <span slot="prepend">学校</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.floor" placeholder="楼栋" clearable>
              <span slot="prepend">楼栋</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.dormitory" placeholder="宿舍号" clearable>
              <span slot="prepend">宿舍号</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.sn" placeholder="设备SN号" clearable>
              <span slot="prepend">设备SN号</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.remark" placeholder="备注" clearable>
              <span slot="prepend">备注</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.operator" placeholder="操作者" clearable>
              <span slot="prepend">操作者</span>
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
          <Button type="primary" @click="handleUpload">
            <Icon type="md-unlock" size="15" />导入
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
    <installAddForm :drawerAdd="drawerAdd" @on-close="drawerAdd = false" @on-search-table="reset" />
    <installEditForm
      :drawerEdit="drawerEdit"
      :formData="selectedData"
      @on-close="drawerEdit = false"
      @on-search-table="search"
    />
    <install-upload-form
      :modelUpload="modelUpload"
      :formData="selectedData"
      @on-close="modelUpload = false"
      @on-search-table="search"
    />
  </Card>
</template>

<script>
import { Modal,Message } from 'view-design' 
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { page, list, deleteInstall } from "@/api/business/install";
import { formatDate,checkOneAndGetData } from "@/libs/tools.js";
import InstallAddForm from "./install_add.vue";
import InstallEditForm from "./install_edit.vue";
import InstallUploadForm from "./install_upload.vue";
import has from "@/directive/has.js";
import excel from "@/libs/excel";

export default {
  name: "user_page",
  extends: Base,
  components: {
    Modal,Message,
    DataTable,
    InstallAddForm,
    InstallEditForm,
    InstallUploadForm
  },
  data() {
    return {
      has: {
        save: "device_install_save",
        update: "device_install_update",
        delete: "device_install_del"
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
                    _this.selectedIndex = params.index;
                  }
                }
              })
            ]);
          }
        },
        { title: "代理商编号", key: "agentNo", align: "center", minWidth: 100 },
        { title: "省份", key: "province", align: "center", minWidth: 100 },
        { title: "地市", key: "city", align: "center", minWidth: 100 },
        {
          title: "学校",
          align: "center",
          key: "school",
          minWidth: 130
        },
        {
          title: "楼栋",
          align: "center",
          key: "floor",
          minWidth: 100
        },
        {
          title: "宿舍号",
          align: "center",
          key: "dormitory",
          minWidth: 100
        },
        {
          title: "设备SN号",
          align: "center",
          key: "sn",
          minWidth: 100
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          minWidth: 100
        },
        {
          title: "操作者",
          align: "center",
          key: "operator",
          minWidth: 100
        },
        {
          title: "注册时间",
          align: "center",
          key: "createdAt",
          minWidth: 100
        },
        {
          title: "更新时间",
          align: "center",
          key: "updatedAt",
          minWidth: 100
        },
        {
          title: "二维码",
          align: "center",
          key: "updatedAt",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  textDecoration: "underline"
                },
                on: {
                  click: () => {
                    // this.handleLink(params.row);
                  }
                }
              },
            '预览'
            );
          }
        }
      ],
      drawerAdd: false,
      drawerEdit: false,
      drawerRole: false,
      modelUpload: false,
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
            deleteInstall({ installId: data.id }).then(function(
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
      this.exportLoading = true;
      var _this = this;
      list(params).then(res => {
        if (res.status === 200) {
          _this.exportLoading = false;
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
