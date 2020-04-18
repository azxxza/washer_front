<template>
  <Drawer title="新增用户" v-model="isShow" :mask-closable="false" width="420" :styles="styles" @on-close="handleClose">
    <Form ref="form" :model="form" :rules="rule" :label-width="90">
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="账号" prop="account">
            <Input v-model="form.account" placeholder="请输入账号"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="姓名" prop="name">
            <Input v-model="form.name" placeholder="请输入姓名"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="确认密码" prop="confirm_password">
            <Input type="password" v-model="form.confirm_password" placeholder="请输入确认密码"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="角色" prop="roleId">
            <Select v-model="form.roleId" placeholder="请选择角色" multiple>
              <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="demo-drawer-footer">
      <Button @click="handleResetForm()">取消</Button>
      <Button type="primary" @click="handleSave()" :loading="submitLoading">提交</Button>
    </div>
  </Drawer>
</template>

<script>
import { Drawer,Row,Col,Form,FormItem,Select,Option,Message } from 'view-design' 
import { saveUser } from "@/api/system/user_data";
import { getRoleList } from "@/api/system/role_data";

export default {
  name: "user_add",
  components: {
    Drawer,
    Row,
    Col,
    Form,
    FormItem,Select,Option
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
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("俩次密码输入不同,请重新输入!"));
      } else {
        callback();
      }
    };
    return {
      isShow: false,
      form: {
        account: "",
        password: "",
        confirm_password: "",
        name: "",
        sex: "",
        birthday: "",
        roleId: "",
        phone: ""
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      rule: {
        account: [{ required: true, message: "请输入账号", trigger: "change" }],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        confirm_password: [
          { required: true, validator: validatePassCheck, trigger: "change" }
        ],
        roleId: [
          {
            required: true,
            type: "array",
            message: "请选择角色",
            trigger: "blur"
          }
        ]
      },
      submitLoading: false,
      roleList: []
    };
  },
  methods: {
    handleResetForm() {
      this.handleClose();
    },

    handleSave() {
      var _this = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          saveUser(this.form).then(function(data) {
            _this.submitLoading = false;
            if (data) {
              Message.success("保存用户成功");
              _this.handleResetForm();
            }
          });
        }
      });
    },
    handleClose() {
      this.isShow = false;
      this.$refs["form"].resetFields();
      this.$emit("on-close");
      this.$emit("on-search-table");
    },
    searchRoleList() {
      const _this = this;
      getRoleList().then(function(response) {
        _this.roleList = response.response;
      });
    }
  },
  watch: {
    drawerAdd(value) {
      this.isShow = value;
      if (value) {
        this.searchRoleList();
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
