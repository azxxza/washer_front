<script>
export default {
  name: "form",
  props: {
    showForm: {
      type: Boolean,
      default() {
        return false
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      submitLoading: false,
      isShow: false
    };
  },
  methods: {
    handleResetForm() {
      this.$refs["form"].resetFields();
      this.handleClose();
      this.$emit("on-search-table");
    },
    handleClose() {
      this.isShow = false;
      this.$emit("on-close");
    }
  }
};
</script>
