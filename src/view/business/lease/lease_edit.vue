<template>
  <Modal v-model="isShow" @on-cancel="handleClose" title="租赁管理-修改">
    <leaseForm ref="baseForm" />
    <div slot="footer">
      <Button @click="handleClose()">取消</Button>
      <Button type="primary" @click="handleSubmit()" :loading="submitLoading">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { Modal,Message } from 'view-design' 
import { update } from "@/api/business/lease";
import leaseForm from "./base/lease_form";
import { formatDate } from "@/libs/tools.js";
export default {
  name: "lease_edit",
  components: {
    Modal,Message,
    leaseForm
  },
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    drawerEdit: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isShow: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      submitLoading: false
    };
  },
  methods: {
    handleResetForm() {
      this.handleClose();
      this.$emit("on-search-table");
    },
    handleSubmit() {
      var _this = this;
      this.$refs.baseForm.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          var params = {
            id: this.$refs.baseForm.form.id,
            endDate: formatDate(
              new Date(this.$refs.baseForm.form.endDate),
              "yyyy-MM-dd hh:mm:ss"
            )
          };
          update(params).then(function(data) {
            _this.submitLoading = false;
            if (data) {
              Message.success("更新成功");
              _this.handleResetForm();
            }
          });
        }
      });
    },
    handleClose() {
      this.isShow = false;
      this.$refs.baseForm.$refs.form.resetFields();
      this.$emit("on-close");
    }
  },
  watch: {
    drawerEdit(value) {
      this.isShow = value;
      if (value) {
        this.$refs.baseForm.form = JSON.parse(JSON.stringify(this.formData));
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
