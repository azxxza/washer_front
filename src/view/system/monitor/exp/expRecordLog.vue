<template>
    <Card>
      <Form :model="formSearch" inline label-position="left">
        <Row>
          <Col :lg="36" :md="24">
            <FormItem>
                  <Input v-model="formSearch.userName" placeholder="账号" clearable>
                  <span slot="prepend">账号</span>
                  </Input>
            </FormItem>
            </FormItem>
                  <Button type="primary" @click="search">
                  <Icon type="md-search" size="15"/>搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col style="margin-bottom: -19px;">
              <FormItem> 
                <Button type="primary" @click="openExpDetailMessage">
                  <Icon type="md-warning" size="15"/>异常定位
                </Button>
              </FormItem>
            </Col>
        </Row>
      </Form>
        <br>
      <dataTable ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" :loading="loading"
        @on-search="handleSearch" @on-current-change="handleCurrentChange"/>
        <expDetailForm :showForm="modelEdit1" :formData="userData" @on-close="modelEdit1 = false"/>
    </Card>
</template>

<script>
import { Card,Row,Col,Form,FormItem,Icon } from "view-design";
import DataTable from '_c/data-table'
import {getPageList} from '@/api/system/monitor/exp/expRecordLog'
import {formatDate} from '@/libs/tools.js'
import expDetailForm from "./expDetail.vue";

export default {
  name: 'user_page',
  components: {
    Card,Row,Col,Form,FormItem,Icon,
    DataTable,
    expDetailForm
  },
  data () {  
    return {    
     /**自定义js变量 */
      modelEdit1: false,
      userData: {},
     /** Form的model值*/
      formSearch: {userName: '',creatorId:null},
     /**列表相关变量*/
      tableData: [],
      loading: false,
      columns: [
        {
          title: ' ',
          key: 'checked',
          align: 'center',
          minWidth: 50,
          render: (h, params) => {
            let id = params.row.id
            let selected = false
            if (this.userData && this.userData.id === id) {
              selected = true
            }
            var _this = this
            return h('div',
              [
                h(
                  'Radio',
                  {
                    props: {
                      value: selected
                    },
                    on: {
                      input: function () {
                        _this.userData = params.row
                      }
                    }
                  }
                )
              ]
            )
          }
        },
        {title: '异常时间',align: 'center',key: 'createTime',minWidth: 150,render: (h, params) => {
            return h(
              "div",
              formatDate(
                new Date(params.row.createTime * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )
            );
          }},
        {title: '用户', align: 'center', key: 'userName',minWidth:200},
        {title: '访问路径', align: 'center', key: 'url',minWidth:200},
        {title: '异常类型', align: 'center', key: 'expType',minWidth: 420},
        {title: '异常原因', align: 'center', key: 'expReason',minWidth: 1000}
      ],
    }
  },


  methods: {

    /**
     * 自定义js方法
     */

    search () {
      var params = {
        pageNo: this.$refs.tables.pageData.current,
        pageSize: this.$refs.tables.pageData.pageSize
      }
      this.handleSearch(params)
    },


    /**
     * 事件相关方法
     */
    handleSearch (params) {
      var _this = this
      this.loading = true
      if (this.formSearch.userName) {
        params.userName = this.formSearch.userName
      }
      getPageList(params).then(res => {
        _this.loading = false
        if (res) {
          _this.tableData = res.response.records
          _this.$refs.tables.total = res.response.total
        }
      })
    },
  
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.userData = currentRow
    },

    openExpDetailMessage() {
      if (this.userData && this.userData.id) {
        this.modelEdit1 = true;
      } 
    },
  },

  mounted () {
    this.search()
  }
  
}
</script>
