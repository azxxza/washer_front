<template>
  <Card>
    <Form :model="formSearch" inline label-position="left">
      <Row>
        <Col :lg="36" :md="24">
          <FormItem>
            <Input v-model="formSearch.openid" placeholder="openid" clearable>
              <span slot="prepend">openid</span>
            </Input>
          </FormItem>
          <!-- <FormItem>
            <Input v-model="formSearch.unionid" placeholder="unionid" clearable>
              <span slot="prepend">unionid</span>
            </Input>
          </FormItem> -->
          <FormItem>
            <Input v-model="formSearch.nickname" placeholder="昵称" clearable>
              <span slot="prepend">昵称</span>
            </Input>
          </FormItem>
          <FormItem>
            <Input v-model="formSearch.phone" placeholder="联系电话" clearable>
              <span slot="prepend">联系电话</span>
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
        <Col :lg="36" :md="24" :sm="36" :xs="36">
          <Button type="primary" @click="handleExport" :loading="exportLoading">
            <Icon type="md-checkmark-circle-outline" size="15" />导出
          </Button>
        </Col>
      </Row>
    </Form>
    <br />
    <dataTable
      ref="tables"
      editable
      searchable
      search-place="top"
      v-model="tableData"
      :columns="columns"
      :loading="loading"
      @on-search="handleSearch"
      @on-row-click="handRowClick"
    ></dataTable>
  </Card>
</template>

<script>
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import { page,list } from "@/api/business/wechat_users";
import { formatDate } from "@/libs/tools.js";
import has from "@/directive/has.js";

export default {
  name: "user_page",
  extends: Base,
  components: {
    DataTable
  },
  data() {
    return {
      has: {
        save: "system_user_save",
        update: "system_user_update",
        delete: "system_user_delete",
        freeze: "system_user_freeze"
      },
      columns: [
        {
          title: " ",
          key: "checked",
          align: "center",
          minWidth: 50,
          render: (h, params) => {
            let selected = false;
            if (this.selectedData && this.selectedData.id === params.row.id) {
              selected = true;
            }
            var _this = this;
            return h("div", [
              h("Radio", {
                props: {
                  value: selected
                },
                on: {
                  input: function() {
                    _this.selectedData = params.row;
                  }
                }
              })
            ]);
          }
        },
        { title: "openid", key: "openid", align: "center", minWidth: 100 },
        // { title: "unionid", key: "unionid", align: "center", minWidth: 100 },
        { title: "昵称", key: "nickname", align: "center", minWidth: 100 },
        {
          title: "头像",
          align: "center",
          key: "headimgurl",
          minWidth: 130,
          render: (h, params) => {
            if (params.row.headimgurl) {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.headimgurl
                  },
                  style: {
                    width: "40px",
                    height: "40px"
                  }
                })
              ]);
            }
          
          }
        },
        {
          title: "性别",
          align: "center",
          key: "sex",
          minWidth: 100,
          render: (h, params) => {
            var sex = params.row.sex;
            if (sex === "1") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "男"
              );
            } else if (sex === "2") {
              return h(
                "Tag",
                {
                  props: {
                    color: "error"
                  }
                },
                "女"
              );
            }
          }
        },
        {
          title: "联系电话",
          align: "center",
          key: "phone",
          minWidth: 100
        },
        {
          title: "国家",
          align: "center",
          key: "country",
          minWidth: 100
        },
        {
          title: "省份",
          align: "center",
          key: "province",
          minWidth: 100
        },
        {
          title: "城市",
          align: "center",
          key: "city",
          minWidth: 100
        },
        {
          title: "状态",
          align: "center",
          key: "subscribe",
          minWidth: 120,
          render: (h, params) => {
            var subscribe = params.row.subscribe;
            if (subscribe === "1") {
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                "已关注"
              );
            } else {
              return h(
                "Tag",
                {
                  props: {
                    color: "error"
                  }
                },
                "取消关注"
              );
            }
          }
        },
        {
          title: "关注时间",
          align: "center",
          key: "subscribeTime",
          minWidth: 100
        },
        {
          title: "抓取时间",
          align: "center",
          key: "createdAt",
          minWidth: 100
        }
      ],
      exportLoading: false
    };
    
  },
  methods: {
    handleSearch(params) {
      this.loading = true;
      var _this = this;
      params = Object.assign({}, params, _this.formSearch);
      page(params).then(res => {
        _this.loading = false;
        if (res) {
          _this.tableData = res.response.records;
          _this.$refs.tables.total = res.response.total;
        }
      });
    },
    handleExport () {
      var params = {};
      params = Object.assign({}, params, this.formSearch);
      this.exportLoading = true;
      var _this = this
      list(params).then(res => {
        _this.exportLoading = false;
        if (res.status === 200) {
          _this.$refs.tables.exportCsv({
            filename: "数据",
            columns: _this.columns,
            data: res.response
          });
        }
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
