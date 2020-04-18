<template>
  <div>
    <Card>
      <div>
        <Form :model="formSearch" inline label-position="left">
          <Row>
            <Col>
              <FormItem>
                <Input v-model="formSearch.title" placeholder="菜单名称">
                  <span slot="prepend">菜单名称</span>
                </Input>
              </FormItem>
              <FormItem>
                <Select v-model="formSearch.isMenu" placeholder="请选择类型" style="width:150px">
                  <Option value>全部</Option>
                  <Option value="1">菜单</Option>
                  <Option value="0">按钮</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Input v-model="formSearch.parentId" placeholder="上级权限Id">
                  <span slot="prepend">上级权限Id</span>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="search">
                  <Icon type="md-search" size="15" />搜索
                </Button>
                <Button @click="handleReset" type="primary">
                  <Icon type="md-backspace" size="17" />重置
                </Button>
              </FormItem>
            </Col>
            <Col>
              <FormItem>
                <Button type="primary" @click="drawerAdd = true" v-has="has.save">
                  <Icon type="ios-add-circle-outline" size="15" />新增
                </Button>
                <Button type="primary" @click="handleEdit" v-has="has.update">
                  <Icon type="ios-create-outline" size="15" />修改
                </Button>
                <Button type="primary" @click="handleDelete" v-has="has.delete">
                  <Icon type="ios-trash" size="15" />删除
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div style="minWidth: 800px">
        <Row>
          <Col span="4">
            <Tree :data="permList" @on-select-change="onSelectChange" :expand="false"></Tree>
          </Col>
          <Col span="20">
            <dataTable
              ref="tables"
              editable
              searchable
              search-place="top"
              v-model="tableData"
              :columns="columns"
              :loading="loading"
              @on-search="handleSearch"
              @on-current-change="handleCurrentChange"
            />
          </Col>
        </Row>
      </div>
      <perm-add-form
        :drawerAdd="drawerAdd"
        @on-close="drawerAdd = false"
        @on-search-table="handleSearchTableAndTree"
      />
      <perm-edit-form
        :drawerEdit="drawerEdit"
        :formData="permData"
        @on-close="drawerEdit = false"
        @on-search-table="handleSearchTableAndTree"
      />
    </Card>
  </div>
</template>

<script>
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Icon,
  Tree,
  Select,
  Option,
  Message,
  Modal
} from "view-design";
import DataTable from "_c/data-table";
import { getPermList, getPermPage, deletePerm } from "@/api/system/perm_data";
import PermAddForm from "./perm_add.vue";
import PermEditForm from "./perm_edit.vue";
import has from "@/directive/has.js";
export default {
  name: "perm_page",
  components: {
    Card,
    Row,
    Col,
    Form,
    FormItem,
    Icon,
    Tree,
    Select,
    Option,
    Message,
    Modal,
    DataTable,
    PermAddForm,
    PermEditForm
  },
  data() {
    return {
      menuTypeList: [
        { value: "", label: "全部" },
        { value: "1", label: "菜单" },
        { value: "0", label: "按钮" }
      ],
      has: {
        save: "system_role_save",
        update: "system_role_update",
        delete: "system_role_delete"
      },
      columns: [
        {
          title: " ",
          key: "checked",
          align: "center",
          minWidth: 50,
          render: (h, params) => {
            let id = params.row.id;
            let selected = false;
            if (this.permData && this.permData.id === id) {
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
                    _this.permData = params.row;
                  }
                }
              })
            ]);
          }
        },
        { title: "权限Id", key: "id", align: "center", minWidth: 100 },
        { title: "权限值", key: "name", align: "center", minWidth: 100 },
        { title: "权限名称", key: "title", align: "center", minWidth: 100 },
        { title: "图标", key: "icon", align: "center", minWidth: 100 },
        { title: "排序", key: "num", align: "center", minWidth: 100 },
        {
          title: "上级权限Id",
          key: "parentId",
          align: "center",
          minWidth: 100
        },
        {
          title: "是否菜单",
          key: "isMenu",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var isMenu = params.row.isMenu;
            if (isMenu === 1) {
              return h(
                "Tag",
                {
                  props: {
                    color: "success"
                  }
                },
                "菜单"
              );
            } else if (isMenu === 0) {
              return h(
                "Tag",
                {
                  props: {
                    color: "warning"
                  }
                },
                "按钮"
              );
            }
          }
        },
        { title: "访问地址", key: "url", align: "center", minWidth: 100 }
      ],
      tableData: [],
      formSearch: {
        title: "",
        isMenu: "",
        parentId: ""
      },
      drawerAdd: false,
      drawerEdit: false,
      permList: [],
      permData: {},
      loading: false
    };
  },
  methods: {
    handleSearch(params) {
      if (this.formSearch.title) {
        params.title = this.formSearch.title;
      }
      if (this.formSearch.isMenu) {
        params.isMenu = this.formSearch.isMenu;
      }
      if (this.formSearch.parentId) {
        params.parentId = this.formSearch.parentId;
      }
      var _this = this;
      this.loading = true;
      getPermPage(params).then(res => {
        _this.loading = false;
        if (res) {
          _this.tableData = res.response.records;
          _this.$refs.tables.total = res.response.total;
        }
      });
    },
    handleReset() {
      this.formSearch.title = "";
      this.formSearch.isMenu = "";
      this.search();
    },
    handleDelete() {
      if (this.permData) {
        Modal.confirm({
          title: "提示",
          content: "<p>确定删除选中的权限和子权限吗</p>",
          onOk: () => {
            var _this = this;
            deletePerm({ permId: this.permData.id }).then(function(response) {
              if (response) {
                Message.success("删除成功");
                _this.search();
              }
            });
          }
        });
      }
    },
    searchPermList() {
      var _this = this;
      var param = {
        title: this.formSearch.title
      };
      getPermList(param).then(function(data) {
        if (data) {
          _this.permList = data.response.list;
        }
      });
    },
    search() {
      var params = {
        pageNo: this.$refs.tables.pageData.current,
        pageSize: this.$refs.tables.pageData.pageSize
      };
      this.searchPermList();
      this.handleSearch(params);
    },
    onSelectChange(data) {
      var row = data[0];
      var permId = row.id;
      var param = {
        id: permId,
        pageNo: this.$refs.tables.pageData.current,
        pageSize: this.$refs.tables.pageData.pageSize
      };
      this.handleSearch(param);
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.permData = currentRow;
    },
    handleEdit() {
      if (this.permData && this.permData.id) {
        this.drawerEdit = true;
      }
    },
    handleSearchTableAndTree() {
      this.search();
      this.searchPermList();
    }
  },
  mounted() {
    this.handleSearchTableAndTree();
  }
};
</script>
