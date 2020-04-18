<template>
  <Modal v-model="isShow" @on-cancel="handleClose" title="权限分配" width="20">
        <Divider orientation="center">{{roleName}}</Divider>

    <Tree ref="perm" :data="permList" show-checkbox></Tree>

    <div slot="footer">
      <Button type="text" size="large" @click="handleClose">取消</Button>
      <Button type="primary" size="large" :loading="submitLoading" @click="handleSave">确定</Button>
    </div>
  </Modal>
</template>

<script>

import { Modal,Divider,Tree,Message } from 'view-design' 
import { saveRolePerm, getPermList } from "@/api/system/perm_data";

export default {
  name: "form_page",
  components: {
    Modal,Divider,Tree,Message
  },
  props: {
    modelPerm: {
      type: Boolean,
      default() {
        return false;
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      roleTreeData: [],
      isShow: false,
      roleName:"",
      submitLoading: false,
      rule: {
        id: [
          {
            required: true,
            message: "请选择权限名称",
            trigger: "blur"
          }
        ],
      },
      permList: []
    };
  },
  methods: {
    handleResetForm() {
      this.handleClose();
    },
    handleSave() {
      var _this = this;
      let perms = this.$refs.perm.getCheckedAndIndeterminateNodes();
      var ids = "";
      for (var i = 0, l = perms.length; i < l; i++) {
        ids += "," + perms[i].id;
      }
      if (ids !== "") {
        let param = {
          perms: ids.substring(1),
          roleId: this.formData.id
        };
        this.submitLoading = true;
        saveRolePerm(param).then(function(data) {
          _this.submitLoading = false;
          if (data) {
            Message.success('保存成功');
            _this.handleResetForm();
            _this.$emit("on-search-table");
          }
        });
      } else {
        this.$Message.warning("请选择权限");
      }
    },
    handleClose() {
      this.isShow = false;
      this.$emit("on-close");
    },
    searchPermList() {
      var _this = this;
      var param = {
        roleId: _this.formData.id
      };
      getPermList(param).then(function(response) {
        _this.permList = response.response.list;
      });
    }
  },
  watch: {
    modelPerm(value) {
      this.isShow = value;
      if (value) {
        this.roleName = this.formData.name
        this.searchPermList();
      }
    }
  }
};
</script>
