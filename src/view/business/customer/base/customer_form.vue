<template>
  <Form ref="form" :model="form" :rules="rule" :label-width="90">
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="电话号码" prop="phone">
          <Input v-model="form.phone" placeholder="请输入电话号码" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="姓名" prop="trueName">
          <Input v-model="form.trueName" placeholder="请输入姓名" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="状态" prop="status">
          <Select v-model="form.status" placeholder="状态">
            <Option  :value="0">休息</Option>
            <Option  :value="1">服务</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { Row,Col,Form,FormItem,Select,Option } from 'view-design' 
export default {
  name: "customer_form",
  components: {
    Row,Col,Form,FormItem,Select,Option
  },
  props: {},
  data() {
    return {
      form: {},
      rule: {
        phone: [
          { required: true, message: "请输入电话号码", trigger: "change" }
        ],
        trueName: [
          { required: true, message: "请输入真实姓名", trigger: "change" }
        ],
        status: [{ required: true,type:'number', message: "请选择客服状态", trigger: "change" }]
      }
    };
  }
};
</script>
