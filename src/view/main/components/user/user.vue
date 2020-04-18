<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar style="background-color: #2d8cf0" icon="ios-person"/>
      <!-- <Icon :size="18" type="md-arrow-dropdown"></Icon> -->
      <DropdownMenu slot="list">
        <DropdownItem name="userName">{{name}}</DropdownItem>
        <!-- <DropdownItem name="userInfo">个人资料</DropdownItem> -->
        <DropdownItem name="updatePwd">修改密码</DropdownItem>
        <!-- <DropdownItem name="updateCipher">修改二级密码</DropdownItem>
        <DropdownItem name="addRecord">添加记账名称</DropdownItem>-->

        <DropdownItem name="logout" divided>退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal v-model="isPwdShow" width="400" title="修改密码">
      <div>
        <Form ref="pwdForm" :model="pwdForm" :label-width="80" :rules="pwdRule">
          <FormItem label="原始密码" prop="oldPwd">
            <Input v-model="pwdForm.oldPwd" type="password" placeholder="请输入原始密码"/>
          </FormItem>
          <FormItem label="新密码" prop="pwd">
            <Input v-model="pwdForm.pwd" type="password" placeholder="请输入新密码"/>
          </FormItem>
          <FormItem label="确认新密码" prop="rePwd">
            <Input v-model="pwdForm.rePwd" type="password" placeholder="请再次输入新密码"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="isPwdShow = false">取消</Button>
        <Button type="primary" size="large" :loading="pwdLoading" @click="handleUpdatePwd">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Message,Form,FormItem,DropdownItem,DropdownMenu,Avatar,Dropdown,Modal } from "view-design";
import "./user.less";
import { mapActions } from "vuex";
import {
  updateUserPwd
} from "@/api/user";

export default {
   components: {
     Form,
    FormItem,
    Message,
    DropdownItem,
    DropdownMenu,
    Avatar,
    Dropdown,
    Modal
  },
  name: "User",
  props: {
    userAvator: {
      type: String,
      default: ""
    }
  },
  data() {
    const validataPass = (rule, value, callback) => {
      //var res= /^[\da-zA-Z!@#$%^&*]*$/;
      var res = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*./;']{6,}$/;
      if (!res.test(value)) {
        return callback(new Error("密码必须包含字母,数字且大于6位数"));
      } else {
        return callback();
      }
    };
    return {
      isPwdShow: false,
      isUserShow: false,
      isRecordShow: false,
      pwdLoading: false,
      infoLoading: false,
      pwdForm: {
        oldPwd: "",
        pwd: "",
        rePwd: ""
      },
      cipherForm: {
        oldCipher: "",
        cipher: "",
        reCipher: ""
      },
      infoForm: {
        recordName: ""
      },
      name: JSON.parse(localStorage.getItem("userInfo")).account,
      pwdRule: {
        pwd: [{ required: true, validator: validataPass }]
      },
      rule: {
        recordName: [
          { required: true, message: "请输入记账名称", trigger: "change" }
        ]
      }
    };
  },
  //  let info = JSON.parse(userInfo)
  // alert(info.account)
  methods: {
    ...mapActions(["getTodayRecord", "handleLogOut"]),
    handleUpdatePwd() {
      if (this.pwdForm.pwd !== this.pwdForm.rePwd) {
        Message.error("俩次密码输入的不一致,请重新输入");
        return;
      }
      this.pwdLoading = true;
      const _this = this;
      updateUserPwd(this.pwdForm).then(function(data) {
        _this.pwdLoading = false;
        if (data) {
          _this.isPwdShow = false;
          _this.$Modal.success({
            title: "提示",
            content: "修改成功"
          });

          _this.pwdForm.rePwd = "";
          _this.pwdForm.pwd = "";
          _this.pwdForm.oldPwd = "";
        }
      });
    },
    handleUpdateCipher() {
      if (this.cipherForm.cipher !== this.cipherForm.reCipher) {
        Message.error("俩次密码输入的不一致,请重新输入");
        return;
      }
      this.pwdLoading = true;
      const _this = this;
      updateUserCipher(this.cipherForm).then(function(data) {
        _this.pwdLoading = false;
        if (data) {
          _this.$Modal.success({
            title: "提示",
            content: "修改成功"
          });
          _this.cipherForm.reCipher = "";
          _this.cipherForm.cipher = "";
          _this.cipherForm.oldCipher = "";
        }
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.handleLogOut().then(() => {
            this.$router.push({
              name: "login"
            });
          });
          break;
        case "userInfo":
          this.isUserShow = true;
          break;
        case "updatePwd":
          this.isPwdShow = true;
          break;
        case "addRecord":
          this.isRecordShow = true;
          break;
      }
    },
    handleUserInfo() {
      let userInfo = localStorage.getItem("userInfo");
      let info = JSON.parse(userInfo);
      this.infoForm = info;
    }
  },
  mounted() {
    this.handleUserInfo();
  }
};
</script>
