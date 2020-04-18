<template>
<Drawer
      title="修改权限"
      v-model="isShow"
      width="420"
      :styles="styles"
      @on-close="handleClose">
      <Form ref="form"  :model="form"  :rules="rule" :label-width="100">
          <Row :gutter="32">
              <Col span="24">
                  <FormItem label="菜单名称" prop="title">
                      <Input v-model="form.title" placeholder="请输入菜单名称" />
                  </FormItem>
              </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
                  <FormItem label="菜单权限值" prop="name">
                      <Input v-model="form.name" placeholder="请输入菜单权限值"/>
                  </FormItem>
              </Col>
          </Row>

          <Row :gutter="32">
            <Col span="24">
                  <FormItem label="访问地址" prop="url">
                      <Input v-model="form.url" placeholder="访问地址"/>
                  </FormItem>
              </Col>
          </Row>

          <Row :gutter="32">
            <Col span="24">
                  <FormItem label="菜单" prop="parent">
                      <Cascader :data="data" v-model="form.parent" :value="form.parent" placeholder="请选择上级菜单" :change-on-select="true"></Cascader>
                  </FormItem>
              </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
                  <FormItem label="是否菜单" prop="isMenu">
                      <RadioGroup v-model="form.isMenu">
                        <Radio :label="1" >是</Radio>
                        <Radio :label="0">否</Radio>
                    </RadioGroup>
                  </FormItem>
              </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
                  <FormItem label="图标" prop="icon">
                      <Input v-model="form.icon" placeholder="请输入图标"/>
                  </FormItem>
              </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
                  <FormItem label="排序" prop="num">
                      <Input v-model="form.num" placeholder="请输入排序"/>
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
import { Drawer,Row,Col,Form,FormItem,Cascader,RadioGroup,Message } from 'view-design' 
import { updatePerm,getPermCascader } from '@/api/system/perm_data'
export default {
  name: 'form_page',
  components: {
    Drawer,Row,Col,Form,FormItem,Cascader,RadioGroup,Message
  },
  props: {
    drawerEdit: {
      type: Boolean,
      default () {
        return false
      }
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  data () {
    return {
      isShow: false,
      data: [],
      form: {
        title: "",
        name: "",
        isMenu: "",
        parent: [],
        parentId: [],
        num: ''
      },
      styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
      },
      rule: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入菜单权限值', trigger: 'change' }
        ],
        isMenu: [
          { required: true, type:'integer', message: '请选择是否是菜单', trigger: 'change' }
        ],
      },
      submitLoading: false,
      changeOnSelect: true
    }
  },
  methods: {
    handleResetForm() {
      this.handleClose()
    },
    handleSave() {
      var _this = this
      this.form.parentId = this.form.parent[this.form.parent.length - 1]
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          updatePerm(this.form).then(function (data) {
            _this.submitLoading = false
            if (data) {
              Message.success("更新成功");
              _this.handleResetForm()
             
            } 
          })
        } 
      }
    )},
    handleClose () {
      this.form.parentId =[];
      this.isShow = false
      this.$emit('on-close')
      this.$emit('on-search-table')
    },
    searchPermList () {
      var _this = this
      getPermCascader().then(function (data) {
        _this.data = data.response
      })
    }
  },
  watch: {
    drawerEdit (value) {
      this.isShow = value
      this.form = this.formData
      this.form.parentId =this.formData.parentId
      this.searchPermList()
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="less">
   .demo-drawer-footer{
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
