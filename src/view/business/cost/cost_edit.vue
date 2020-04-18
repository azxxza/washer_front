<template>
  <Drawer title="费用管理-修改" v-model="isShow" width="420" :styles="styles" @on-close="handleClose">
    <costForm ref="baseForm" />
    <div class="demo-drawer-footer">
      <Button @click="handleResetForm()">取消</Button>
      <Button type="primary" @click="handleSubmit()" :loading="submitLoading">提交</Button>
    </div>
  </Drawer>
</template>

<script>
import { Drawer,Message } from 'view-design' 
import { update } from "@/api/business/cost";
import costForm from "./base/cost_form";
import { getCostModelList } from "@/api/business/cost_model";
export default {
  name: "form_page",
  components: {
    Drawer,Message,
    costForm
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
          update(this.$refs.baseForm.form).then(function(data) {
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
    },
    searchCostModelList() {
      const _this = this;
      var params = {
        costtype: this.$refs.baseForm.form.costtype
      };
      getCostModelList(params).then(function(response) {
        _this.$refs.baseForm.costModelList = response.response;
        _this.$refs.baseForm.form.costmodel = parseInt(
          _this.formData.costmodel
        );
      });
    }
  },
  watch: {
    drawerEdit(value) {
      this.isShow = value;
      if (value) {
        this.$refs.baseForm.form = JSON.parse(JSON.stringify(this.formData));
        this.$refs.baseForm.form.costtype = parseInt(this.formData.costtype);
        this.searchCostModelList();
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
