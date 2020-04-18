<template>
  <Form ref="form" :model="form" :rules="rule" :label-width="90">
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="设备名称" prop="sn">
          <Input v-model="form.sn" placeholder="请输入设备名称" />
        </FormItem>
      </Col>
    </Row>
    <!-- <Row :gutter="32">
      <Col span="24">
        <FormItem label="设备子号" prop="simnum">
          <Input v-model="form.simnum" placeholder="请输入设备子号" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="SN号" prop="sn">
          <Input v-model="form.sn" placeholder="请输入SN号" />
        </FormItem>
      </Col>
    </Row> -->
    <!-- <Row :gutter="32">
      <Col span="24">
        <FormItem label="ICCI号" prop="iccid">
          <Input v-model="form.iccid" placeholder="请输入ICCI号" />
        </FormItem>
      </Col>
    </Row> -->
    <!-- <Row :gutter="32">
      <Col span="24">
        <FormItem label="设备版本号" prop="sWVersion">
          <Input v-model="form.sWVersion" placeholder="请输入设备版本号" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="IMSI" prop="imsi">
          <Input v-model="form.imsi" placeholder="请输入IMSI" />
        </FormItem>
      </Col>
    </Row> -->
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="蓝牙mac" prop="mac">
          <Input v-model="form.mac" placeholder="请输入蓝牙mac" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="密钥" prop="primaryKey">
          <Input v-model="form.primaryKey" placeholder="请输入密钥" />
        </FormItem>
      </Col>
    </Row>
    <!-- <Row :gutter="32">
      <Col span="24">
        <FormItem label="设备联系人" prop="ownername">
          <Input v-model="form.ownername" placeholder="请输入设备编号" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="联系人电话" prop="ownertele">
          <Input v-model="form.ownertele" placeholder="请输入联系人电话" />
        </FormItem>
      </Col>
    </Row> -->
    <!-- <Row :gutter="32">
      <Col span="24">
        <FormItem label="服务时间" prop="svrstarttime">
          <DatePicker
            type="date"
            placement="bottom-end"
            v-model="form.svrstarttime"
            placeholder="请输入服务开始时间"
          ></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="服务时间" prop="svrendtime">
          <DatePicker
            type="date"
            placement="bottom-end"
            v-model="form.svrendtime"
            placeholder="请输入服务截止时间"
          ></DatePicker>
        </FormItem>
      </Col>
    </Row> -->
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="设备厂家" prop="protocol">
          <Select v-model="form.protocol" placeholder="请选择设备厂家">
            <Option v-for="item in protocolList" :value="item.name" :key="item.name">{{ item.value }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="产品类型" prop="termtype">
          <Select v-model="form.termtype" placeholder="请选择产品类型">
            <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.value }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { Row,Col,Form,FormItem,Select,Option } from 'view-design' 
export default {
  name: "car_form",
  components: {
    Row,Col,Form,FormItem,Select,Option
  },
  props: {},
  data() {
    return {
      form: {},
      rule: {
        // carnum: [
        //   { required: true, message: "请输入设备名称", trigger: "change" }
        // ],
        // simnum: [
        //   { required: true, message: "请输入设备子号", trigger: "change" }
        // ],
        sn: [{ required: true, message: "请输入SN号", trigger: "change" }],
        iccid: [{ required: true, message: "请输入ICCI号", trigger: "change" }],
        termtype: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        protocol: [
          { required: true, message: "请选择设备厂家", trigger: "change" }
        ],
         mac: [
          { required: true, message: "请选择设备厂家", trigger: "change" }
        ],
         primaryKey: [
          { required: true, message: "清输入密钥", trigger: "change" }
        ]
      },
      protocolList: [
        {
          name: "SKET",
          value: "思科尔特"
        },
        {
          name: "WRT",
          value: "沃瑞特"
        }
      ],
      typeList: [
        {
          name: "PURIFY",
          value: "空气净化器"
        },
        {
          name: "CHARGE",
          value: "充电桩"
        },
        {
          name: "WASHER",
          value: "洗衣机"
        }
      ],
    };
  }
};
</script>
