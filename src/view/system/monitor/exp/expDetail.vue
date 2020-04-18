


<template>
  <!-- <Modal v-model="isShow" @on-cancel="handleClose" title="异常详细信息" width="50">
    <div>{{resultData}}</div>
    <div slot="footer"><Button size="large" @click="handleClose">关闭</Button></div>
  </Modal>-->
  <p>Name: {{ resultData }}</p>
</template>

<script>
import FormList from "../../../base/list_form.vue";
import { getDetail } from "@/api/system/monitor/exp/expRecordLog";

export default {
  name: "expDetailForm",
  extends: FormList,
  components: {},
  props: {},
  data() {
    return {
      isShow: false,
      resultData: ""
    };
  },
  methods: {
    handleSearch(params) {
      if (this.formData.id) {
        params.id = this.formData.id;
      }
      var _this = this;
      this.loading = true;
      getDetail(params).then(function(res) {
        _this.loading = false;
        _this.resultData = res.response.expContent;
      });
    },
    clickOk() {
      this.$emit("on-close");
      this.isShow = false;
    },
    clickCancle() {
      this.$emit("on-close");
      this.isShow = false;
    }
  },
  watch: {
    showForm(value) {
      this.isShow = value;
      if (value) {
        this.handleSearch({});
        this.$Modal.confirm({
          render: h => {
            return h("span", {
              domProps: {
                innerHTML: this.resultData
              }
            });
          },
          width: 800,
          onOk: this.clickOk,
          onCancel: this.clickCancle
        });
      }
    }
  },
  mounted() {}
};
</script>
