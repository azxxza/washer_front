<template>
  <div>
    <Card>
      <div>
        <Form :model="formSearch" inline label-position="left">
          <Row>
            <Col>
              <FormItem>
                <Input v-model="formSearch.name" placeholder="角色名称">
                  <span slot="prepend">角色名称</span>
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
            <Col>
              <FormItem>
                <Button type="primary" @click="modelAdd = true" v-has="has.save">
                  <Icon type="ios-add-circle-outline" size="15" />新增
                </Button>
                <Button type="primary" @click="handleEdit" v-has="has.update">
                  <Icon type="ios-create-outline" size="15" />修改
                </Button>
                <Button type="primary" @click="handleDelete" v-has="has.delete">
                  <Icon type="ios-trash" size="15" />删除
                </Button>
                <Button type="primary" @click="handlePerm" v-has="has.role_perm">
                  <Icon type="md-person" size="15" />权限配置
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
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
      />
      <role-add-form
        :model-add="modelAdd"
        @on-close="modelAdd = false"
        @on-search-table="handleSearch"
      />
      <role-edit-form
        :showForm="modelEdit"
        :formData="selectedData"
        @on-close="modelEdit = false"
        @on-search-table="handleSearch"
      />
      <role-perm-form
        :model-perm="modelPerm"
        :formData="selectedData"
        @on-close="modelPerm = false"
      />
    </Card>
  </div>
</template>

<script>
import { Message,Modal } from "view-design";
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { getRolePageList, saveRole, deleteRole } from "@/api/system/role_data";
import { formatDate, checkOneAndGetData } from "@/libs/tools.js";
import RoleAddForm from "./role_add.vue";
import RoleEditForm from "./role_edit.vue";
import RolePermForm from "./role_perm.vue";
import has from "@/directive/has.js";
export default {
  name: "role_page",
  extends: Base,
  components: {
    Message,Modal,
    DataTable,
    RoleAddForm,
    RoleEditForm,
    RolePermForm
  },
  data() {
    return {
      has: {
        save: "system_role_save",
        update: "system_role_update",
        delete: "system_role_delete",
        role_perm: "system_role_perm"
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
        { title: "角色名称", key: "name", align: "center" },
        { title: "别名", key: "tips", align: "center" }
      ],
      modelAdd: false,
      modelEdit: false,
      modelPerm: false
    };
  },
  methods: {
    handleDelete() {
      var data = checkOneAndGetData(this);
      if (data) {
        var _this = this;
        Modal.confirm({
          title: "提示",
          content: "<p>确定要删除选中的角色吗</p>",
          onOk: () => {
            var _this = this;
            deleteRole({ roleId: _this.selectedData.id }).then(function(data) {
              if (data) {
                Message.success("删除成功");
                _this.reset();
              }
            });
          }
        });
      } 
    },

    handleSearch(params) {
      if (this.formSearch.name) {
        params.name = this.formSearch.name;
      }
      this.loading = true;
      var _this = this;
      getRolePageList(params).then(res => {
        _this.loading = false;
        _this.tableData = res.response.records;
        _this.$refs.tables.total = res.response.total;
      });
    },
    handleEdit() {
      var data = checkOneAndGetData(this);
      if (data) {
        this.modelEdit = true;
        this.selectedData = data;
      }
    },
    handlePerm() {
      var data = checkOneAndGetData(this);
      if (data) {
        this.modelPerm = true;
      }
    }
  },
  mounted() {
    this.search();
  }
};
</script>
