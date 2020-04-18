<template>
      <Modal
        v-model="isShow"
        @on-cancel="handleClose"
        title="详情"
        width="25"
        footer-hide
        >
         <div>
           {{text}}
        </div>
   
    </Form>
    </Modal>
</template>

<script>
import { formatDate } from "@/libs/tools.js";

export default {
  name: "show_details",
  components: {},
  props: {
    text:{
      type: String,
      default(){
        return "";
      }
    },
    showDetailsEdit: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
       handleClose() {
      this.isShow = false;
      this.$emit("on-close");
    },
  },
  watch: {
    showDetailsEdit(value) {
      this.isShow = value;
    }
  },
  mounted() {}
};
</script>