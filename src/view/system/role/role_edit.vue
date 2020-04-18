<template>
  <Modal v-model="isShow" @on-cancel="handleClose" title="修改角色">
    <div style="text-align:center">
      <Form ref="form" :model="form" :label-width="80" :rules="rule">
        <FormItem label="角色名称" prop="name">
          <Input v-model="form.name" placeholder="请输入角色名称"/>
        </FormItem>
        <FormItem label="角色别名" prop="tips">
          <Input v-model="form.tips" placeholder="请输入角色别名"/>
        </FormItem>
      </Form> 
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click="handleClose">取消</Button>
      <Button type="primary" size="large" :loading="submitLoading" @click="handleSubmit">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { Modal,Row,Form,FormItem,Message } from 'view-design' 
import { updateRole } from "@/api/system/role_data";
import BaseForm from "../../base/form.vue";

export default {
  name: "form_page",
  extends: BaseForm,
  components: {
    Modal,Row,Form,FormItem,Message
  },
  props: {
    
  },
  data() {
    return {
      form: {
        name: "",
        tips: ""
      },
      rule: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "change" }
        ],
        tips: [
          {
            required: true,
            message: "请输入角色别名",
            trigger: "change"
          }
        ]
      },
      submitLoading: false,
      treeName:"请输入上级名称",
    };
  },
  methods: {
    handleResetForm() {
      this.handleClose();
    },
    handleSubmit() {
      var _this = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          updateRole(this.form).then(function(data) {
            _this.submitLoading = false;
            if (data) {
             Message.success('修改成功');
              _this.handleResetForm(); 
            }
          });
        }
      });
    },
    handleClose() {
      this.isShow = false;
      this.$emit("on-close");
      //this.$refs["form"].resetFields();
      this.$emit("on-search-table");

    }
  },
  watch: {
    showForm(val) {
      this.isShow = val
      this.form = this.formData
    }
  }
};
</script>
