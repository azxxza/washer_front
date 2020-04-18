<template>
  <Form ref="form" :model="form" :rules="rule" :label-width="120">
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="微信openid">
          <Input v-model="form.wechatID" placeholder="请输入微信openid" :disabled="true" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="服务起始日期">
          <DatePicker
            v-model="form.bgnDate"
            type="datetime"
            placeholder="请输入服务起始日期"
            :disabled="true"
          />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="服务终止日期" prop="endDate">
          <DatePicker v-model="form.endDate" type="datetime" placeholder="请输入服务终止日期" />
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { Row,Col,Form,FormItem,DatePicker } from 'view-design'
export default {
  name: "lease_form",
  components: {
    Row,Col,Form,FormItem,DatePicker 
  },
  props: {},
  data() {
    return {
      form: {},
      rule: {
        endDate: [
          {
            required: true,
            message: "请输入服务终止日期",
            trigger: "change",
            type: "date"
          }
        ]
      }
    };
  }
};
</script>
