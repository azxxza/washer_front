<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.sn" placeholder="设备SN号" clearable>
              <span slot="prepend">设备SN号</span>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">
              <Icon type="md-search" size="15" />搜索
            </Button>
            <Button @click="reset" type="primary">
              <Icon type="md-backspace" size="17" />重置
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <br />
    <dataTable
      ref="basicTables"
      editable
      searchable
      search-place="top"
      v-model="basicTableData"
      :columns="basicColumns"
      :loading="basicInfoLoading"
      :show-page="false"
    ></dataTable>
    <dataTable
      ref="orderTables"
      editable
      searchable
      search-place="top"
      v-model="orderTableData"
      :columns="orderColumns"
      :loading="orderInfoLoading"
      @on-search="handleSearchOrder"
    ></dataTable>
  </Card>
</template>

<script>
import { Card,Row,Col,Form,FormItem,Icon } from "view-design";
import DataTable from "_c/data-table";
import { basicInfo, orderInfo } from "@/api/business/fault";
import { formatDate } from "@/libs/tools.js";
import has from "@/directive/has.js";

export default {
  name: "user_page",
  components: {
    Card,Row,Col,Form,FormItem,Icon,
    DataTable
  },
  data() {
    return {
      basicTableData: [],
      orderTableData: [],
      formSearch: {},
      basicInfoLoading: false,
      orderInfoLoading: false,
      basicColumns: [
        { title: "设备SN号", key: "sn", align: "center", minWidth: 100 },
        { title: "地市", key: "city", align: "center", minWidth: 100 },
        { title: "学校", key: "school", align: "center", minWidth: 100 },
        {
          title: "楼（栋）",
          align: "center",
          key: "floor",
          minWidth: 100
        },
        {
          title: "宿舍号",
          align: "center",
          key: "dormitory",
          minWidth: 100
        },
        {
          title: "末次心跳时间",
          align: "center",
          key: "heartbeattime",
          minWidth: 100
        },
        {
          title: "末次登陆时间",
          align: "center",
          key: "heartbeattime",
          minWidth: 100
        }
      ],
      orderColumns: [
        { title: "设备SN号", key: "simnum", align: "center", minWidth: 100 },
        {
          title: "操作时间",
          key: "createTime",
          align: "center",
          minWidth: 100
        },
        { title: "流水号", key: "OrderID", align: "center", minWidth: 100 },
        {
          title: "指令描述",
          align: "center",
          key: "optDesc",
          minWidth: 100
        },
        {
          title: "操作类型",
          align: "center",
          key: "responseType",
          minWidth: 100
        },
        {
          title: "描述",
          align: "center",
          key: "Description",
          minWidth: 100
        }
      ]
    };
  },
  methods: {
    handleDelete() {
      if (this.selectedData) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定要删除选中的记录吗</p>",
          onOk: () => {
            var _this = this;
            deleteCost({ costId: this.selectedData.id }).then(function(result) {
              if (result) {
                _this.$Message.success("删除成功");
                _this.reset();
              }
            });
          }
        });
      }
    },
    handleSearchBasic() {
      var params = {};
      if (this.formSearch.sn) {
        params = Object.assign({}, params, this.formSearch);
        this.basicInfoLoading = true;
        var _this = this;
        basicInfo(params).then(res => {
          _this.basicInfoLoading = false;
          if (res) {
            _this.basicTableData = res.response;
          }
        });
      }
    },
    handleSearchOrder(params) {
      if (this.formSearch.sn) {
        params = Object.assign({}, params, this.formSearch);
        this.orderInfoLoading = true;
        var _this = this;
        orderInfo(params).then(res => {
          _this.orderInfoLoading = false;
          if (res) {
            _this.orderTableData = res.response.records;
            _this.$refs.orderTables.total = res.response.total;
          }
        });
      } 
    },
    search() {
      this.handleSearchBasic();
      this.handleSearchOrder();
    },
    reset() {}
  },
  mounted() {}
};
</script>
