<script>
import { Card,Row,Col,Form,FormItem,Icon } from "view-design";
export default {
  components: {
    Card,Row,Col,Form,FormItem,Icon
  },
  name: "base",
  data() {
    return {
      tableData: [],
      formSearch: {},
      loading: false,
      selectedData: undefined,
      selectedIndex: undefined
    };
  },
  methods: {
    search() {
      var arr = Object.keys(this.formSearch);
      if (arr.length > 0) {
        this.$refs.tables.pageData.current = 1;
      } 
      var total = this.$refs.tables.total;
      var pageNo = this.$refs.tables.pageData.current;
      var pageSize = this.$refs.tables.pageData.pageSize;
      var params = {
        pageNo: pageNo,
        pageSize: pageSize
      }
      this.handleSearch(params)
    },
    reset() {
        this.formSearch = {}
        this.$refs.tables.pageData.current = 1;
        this.search();
        this.selectedData = undefined
        this.selectedIndex = undefined
    },
    handRowClick (rowData,index) {
      if (this.selectedData && this.selectedData.id === rowData.id) {
        this.selectedData = undefined;
        this.selectedIndex = undefined;
      } else {
        this.selectedData = rowData;
        this.selectedIndex = index;
      }
    },
    exp () {
      this.$refs.tables.exportCsv({
        filename: '数据'
      });
    }
  }
};
</script>
