<script>
export default {
  name: "list_form",
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
      isShow: false,
      tableData: [],
      formSearch: {},
      loading: false,
      selectedData: undefined,
      selectedIndex: -1,
    };
  },
  methods: {
    handleResetForm() {
      this.$refs["form"].resetFields();
      this.handleClose();
      this.$emit("on-search-table");
    },
    handleClose() {
      this.$emit("on-close")
      this.isShow = false
    },
    search() {
      var params = {
        pageNo: this.$refs.tables.pageData.current,
        pageSize: this.$refs.tables.pageData.pageSize
      }
      this.handleSearch(params)
      this.selectedIndex = -1
      this.selectedData = undefined
    },
    reset() {
        this.formSearch = {}
        this.$refs.tables.pageData.current = 1;
        this.search();
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selectedData = currentRow
    },
    handRowClick (rowData,index) {
      this.selectedIndex = index
      this.selectedData = rowData 
    } 
  }
};
</script>
