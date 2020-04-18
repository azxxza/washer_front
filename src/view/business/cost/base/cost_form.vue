<template>
  <Form ref="form" :model="form" :rules="rule" :label-width="130">
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="费用名称" prop="costname">
          <Input v-model="form.costname" placeholder="请输入费用名称" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="费用类型" prop="costtype">
          <Select v-model="form.costtype" placeholder="请选择费用类型" @on-change="changeCosttype()">
            <Option
              v-for="item in costTypeList"
              :value="item.id"
              :key="item.id"
            >{{ item.costtypename }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="费用模式" prop="costmodel">
          <Select v-model="form.costmodel" placeholder="请选择费用类型">
            <Option
              v-for="item in costModelList"
              :value="item.costmodelid"
              :key="item.costmodelid"
            >{{ item.displayname }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="费用" prop="cost">
          <Input v-model="form.cost" placeholder="请输入费用" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="赠送天数" prop="discount">
          <Input v-model="form.discount" placeholder="请输入赠送天数" number />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="押金" prop="deposit">
          <Input v-model="form.deposit" placeholder="请输入押金" number />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="备注提示" prop="remark">
          <Input v-model="form.remark" placeholder="请输入备注提示提示" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="是否自然月计费" prop="naturalMon">
          <RadioGroup v-model="form.naturalMon">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="自然月提示" prop="naturalMonDesc">
          <Input v-model="form.naturalMonDesc" placeholder="自然月提示" />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="32">
      <Col span="24">
        <FormItem label="优惠描述" prop="discountDesc">
          <Input v-model="form.discountDesc" placeholder="优惠描述" />
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { Row,Col,Form,FormItem,Select,Option,RadioGroup } from 'view-design'
import { save } from "@/api/business/cost";
import { getCostTypeList } from "@/api/business/cost_type";
import { getCostModelList } from "@/api/business/cost_model";
export default {
  name: "user_add",
  components: {
    Row,Col,Form,FormItem,Select,Option,RadioGroup
  },
  props: {},
  data() {
    return {
      isShow: false,
      form: {},
      rule: {
        costname: [
          { required: true, message: "请输入费用名称", trigger: "change" }
        ],
        costtype: [
          {
            required: true,
            type: "number",
            message: "请选择费用类型",
            trigger: "change",
            type: "number"
          }
        ],
        costmodel: [
          {
            required: true,
            message: "请输入费用模式",
            trigger: "change",
            type: "number"
          }
        ],
        cost: [{ required: true, message: "请输入费用", trigger: "change" }],
        discount: [
          {
            required: true,
            message: "请输入赠送天数",
            trigger: "change",
            type: "number"
          }
        ],
        deposit: [
          {
            required: true,
            message: "请输入押金",
            trigger: "change",
            type: "number"
          }
        ],
        remark: [
          { required: false, message: "请输入备注提示提示", trigger: "change" }
        ],
        naturalMon: [
          {
            message: "是否自然月计费",
            trigger: "change",
            type: "number"
          }
        ],
        naturalMonDesc: [
          { required: false, message: "自然月提示", trigger: "change" }
        ]
      },
      costTypeList: [],
      costModelList: []
    };
  },
  methods: {
    searchCostTypeList() {
      const _this = this;
      getCostTypeList().then(function(response) {
        _this.costTypeList = response.response;
      });
    },
    changeCosttype() {
      const _this = this;
      if (this.form.costtype) {
        var params = {
          costtype: this.form.costtype
        };
        getCostModelList(params).then(function(response) {
        _this.costModelList = response.response;
        _this.form.costmodel = _this.costModelList[0].id
      });
      }
    }
  },
  mounted() {
    this.searchCostTypeList();
  }
};
</script>
