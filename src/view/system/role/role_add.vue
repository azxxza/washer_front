<template>
  <Modal v-model="isShow" @on-cancel="handleClose" title="新增角色" width="28">
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
import { saveRole } from "@/api/system/role_data";

export default {
  name: "form_page",
  components: {
    Modal,Row,Form,FormItem,Message
  },
  props: {
    modelAdd: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      roleTreeData: [],
      isShow: false,
      form: {
        name: "",
        tips: "",
        // pid: "",
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
        ],
        // pid: [
        //   {
        //     required: true,
        //     message: "请选择上级名称",
        //     trigger: "blur"
        //   }
        // ],
      },
      submitLoading: false
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
          saveRole(this.form).then(function(data) {
            _this.submitLoading = false;
            if (data) {
              Message.success('保存成功');
              _this.handleResetForm();
            }
          });
        }
      });
    },
     clickHandler() {
       let _selectDate =this.$refs.reference.getSelectedNodes()[0];
       this.treeName = _selectDate.title;
       this.form.pid = _selectDate.id;
    },
    handleClose() {
      this.isShow = false;
      this.$refs["form"].resetFields();
      this.$emit("on-close");
      this.$emit("on-search-table");

    }
  },
  watch: {
    modelAdd(value) {
      this.isShow = value;
    }
  }
};
</script>
