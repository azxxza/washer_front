<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.account" placeholder="账号" clearable>
              <span slot="prepend">账号</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.name" placeholder="姓名" clearable>
              <span slot="prepend">姓名</span>
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
          <Button type="primary" @click="handleFreeze" v-has="has.freeze">
            <Icon type="md-unlock" size="15" />冻结
          </Button>
          <Button type="primary" @click="handleUnfreeze" v-has="has.unFreezeUser">
            <Icon type="md-checkmark-circle-outline" size="15" />解冻
          </Button>
          <Button type="primary" @click="handleResetPwd" v-has="has.resetPwd">
            <Icon type="md-refresh" size="15" />重置密码
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
    <userAddForm :drawerAdd="drawerAdd" @on-close="drawerAdd = false" @on-search-table="reset" />
    <userEditForm
      :drawerEdit="drawerEdit"
      :formData="selectedData"
      @on-close="drawerEdit = false"
      @on-search-table="search"
    />
  </Card>
</template>

<script>
import { Message,Modal } from "view-design";
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import {
  getUserPageList,
  resetPwd,
  freezeUser,
  unFreezeUser,
  deleteUser
} from "@/api/system/user_data";
import { formatDate, checkOneAndGetData } from "@/libs/tools.js";
import UserAddForm from "./user_add.vue";
import UserEditForm from "./user_edit.vue";
import has from "@/directive/has.js";

export default {
  name: "user_page",
  extends: Base,
  components: {
    Message,
    Modal,
    DataTable,
    UserAddForm,
    UserEditForm
  },
  data() {
    return {
      has: {
        save: "system_user_save",
        update: "system_user_update",
        delete: "system_user_delete",
        freeze: "system_user_freeze",
        unFreezeUser: "system_user_unFreezeUser",
        resetPwd: "system_user_resetPwd"
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
        { title: "账号", key: "account", align: "center", minWidth: 100 },
        { title: "姓名", key: "name", align: "center", minWidth: 100 },
        { title: "角色", align: "center", key: "roleName", minWidth: 100 },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          minWidth: 130,
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
        {
          title: "状态",
          align: "center",
          key: "status",
          minWidth: 100,
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
                "正常"
              );
            } else {
              return h(
                "Tag",
                {
                  props: {
                    color: "warning"
                  }
                },
                "冻结"
              );
            }
          }
        }
      ],
      drawerAdd: false,
      drawerEdit: false,
      drawerRole: false,
      roleList: []
    };
  },
  methods: {
    handleDelete() {
      if (checkOneAndGetData(this)) {
        Modal.confirm({
          title: "提示",
          content: "<p>确定要删除选中的用户吗</p>",
          onOk: () => {
            var _this = this;
            deleteUser({ userId: this.selectedData.id }).then(function(result) {
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
      if (this.formSearch.account) {
        params.account = this.formSearch.account;
      }
      if (this.formSearch.name) {
        params.name = this.formSearch.name;
      }
      this.loading = true;
      var _this = this;
      getUserPageList(params).then(res => {
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
    handleResetPwd() {
      var data = checkOneAndGetData(this);
      if (data) {
        this.selectedData = data;
        Modal.confirm({
          title: "提示",
          content: "<p>确定要要重置选中的用户密码为123456</p>",
          onOk: () => {
            const _this = this;
            this.loading = true;
            resetPwd({ userId: this.selectedData.id }).then(function(response) {
              _this.loading = false;
              if (response) {
                Message.success("重置成功");
              } else {
                Message.error("操作失败");
              }
            });
          }
        });
      } 
    },
    handleFreeze() {
      var data = checkOneAndGetData(this);
      if (data) {
        this.selectedData = data;
        Modal.confirm({
          title: "提示",
          content: "<p>确定要冻结选中的用户吗</p>",
          onOk: () => {
            this.loading = true;
            var _this = this;
            freezeUser({ userId: this.selectedData.id }).then(function(result) {
              _this.loading = false;
              if (result) {
                Message.success("冻结成功");
                _this.search();
              }
            });
          }
        });
      } 
    },
    handleUnfreeze() {
       var data = checkOneAndGetData(this);
      if (data) {
        this.selectedData = data;
        Modal.confirm({
          title: "提示",
          content: "<p>确定要解冻选中的用户吗</p>",
          onOk: () => {
            this.loading = true;
            var _this = this;
            unFreezeUser({ userId: this.selectedData.id }).then(function(
              response
            ) {
              _this.loading = false;
              if (response) {
                Message.success("解冻成功");
                _this.search();
              }
            });
          }
        });
      } 
    }
  },
  mounted() {
    this.search();
  }
};
</script>
