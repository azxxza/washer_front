<template>
    <Form ref="form" :model="form" :rules="rule" :label-width="90">
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="代理商编号" prop="agentNo">
            <Input v-model="form.agentNo" placeholder="请输入代理商编号" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="省份" prop="province">
            <Input v-model="form.province" placeholder="请输入省份" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="城市" prop="city">
            <Input v-model="form.city" placeholder="请输入城市" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="学校" prop="school">
            <Input v-model="form.school" placeholder="请输入学校" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="楼栋" prop="floor">
            <Input v-model="form.floor" placeholder="请输入楼栋" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="宿舍号" prop="dormitory">
            <Input v-model="form.dormitory" placeholder="请输入宿舍号" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="设备编号" prop="sn">
            <Input v-model="form.sn" placeholder="请输入设备编号" type="number"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="产品类型" prop="remark">
            <Select v-model="form.remark" placeholder="请选择产品类型">
              <Option v-for="item in typeList" :value="item.type" :key="item.type">{{ item.type }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
</template>

<script>

import { Row,Col,Form,FormItem,Select,Option } from 'view-design' 
export default {
  name: "install_form",
  components: {
    Row,Col,Form,FormItem,Select,Option
  },
  props: {
    
  },
  data() {
    return {
      form: {
      },
      rule: {
        agentNo: [{ required: true, message: "请输入代理商编号", trigger: "change" }],
        province: [{ required: true, message: "请输入省份", trigger: "change" }],
        city: [{ required: true, message: "请输入城市", trigger: "change" }],
        school: [{ required: true, message: "请输入学校", trigger: "change" }],
        floor: [{ required: true, message: "请输入楼栋", trigger: "change" }],
        dormitory: [{ required: true, message: "请输入宿舍号", trigger: "change" }],
        sn: {required: true, pattern: /^\d+$/, message: '请输入设备编号'},
        remark: [
          {
            required: true,
            message: "请选择产品类型",
            trigger: "blur"
          }
        ]
      },
      typeList: [
        {
          type: "用户包月"
        },
        {
          type: "用户按次"
        },
        {
          type: "管家包月"
        },
        {
          type: "店长包月"
        },
        {
          type: "公寓支付"
        }
      ]
    };
  }
};
</script>
