<template>
  <Drawer
    title="设备管理-新增"
    v-model="isShow"
    :mask-closable="false"
    width="420"
    :styles="styles"
    @on-close="handleClose"
  >
    <carForm ref="baseForm" />
    <div class="demo-drawer-footer">
      <Button @click="handleResetForm()">取消</Button>
      <Button type="primary" @click="handleSave()" :loading="submitLoading">提交</Button>
    </div>
  </Drawer>
</template>

<script>
import { Drawer,Message } from 'view-design' 
import { save } from "@/api/business/car";
import { formatDate } from "@/libs/tools.js";
import carForm from "./base/car_form";
export default {
  name: "car_add",
  components: {
    Drawer,
    Message,
    carForm
  },
  props: {
    drawerAdd: {
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

    handleSave() {
      var params = {};
      params = Object.assign({}, params, this.$refs.baseForm.form);
      if (params.svrstarttime) {
        params.svrstarttime = formatDate(
          new Date(params.svrstarttime),
          "yyyy-MM-dd"
        );
      }
      if (params.svrendtime) {
        params.svrendtime = formatDate(
          new Date(params.svrendtime),
          "yyyy-MM-dd"
        );
      }
      this.$refs.baseForm.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          var _this = this;
          save(params).then(function(data) {
            _this.submitLoading = false;
            if (data) {
              Message.success("保存成功");
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
    drawerAdd(value) {
      this.isShow = value;
      if (value) {
        this.$refs.baseForm.form.protocol = "protocol";
        this.$refs.baseForm.form.termtype = "WASHER";
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
