<template>
  <div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <br/>
    <div style="padding-top: 10px;padding-bottom: 40px;">
    <div style="float: right;" v-if="showPage">
        <Page :total="total" :current="pageData.current" :page-size="pageData.pageSize" :page-size-opts="pageData.pageSizeOpts" @on-change="handlePage" @on-page-size-change="handlePageSize" show-total show-elevator show-sizer></Page>
    </div>
    </div>
  </div>
</template>

<script>
import { Table,Page } from "view-design";
import "./index.less";
export default {
  name: "DataTable",
  components: {
     Table,
     Page
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    size: {
      type: String,
      default: "small"
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: true
    },
    rowClassName: {
      type: Function,
      default() {
        return "";
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    showPage: {
      type: Boolean,
      default: true
    },
    pageType: {
      type: String,
      default: 'server'
    },
    pageSize: {
      type: Number,
      default:  10
    },
    pageSizeOpts: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100]
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      insideColumns: [],
      insideTableData: [],
      total: 0,
      edittingCellId: "",
      edittingText: "",
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      pageData: {
        
      }
    };
  },
  methods: {
    suportEdit(item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            input: val => {
              this.edittingText = val;
            },
            "on-start-edit": params => {
              this.edittingCellId = `editting-${params.index}-${
                params.column.key
              }`;
              this.$emit("on-start-edit", params);
            },
            "on-cancel-edit": params => {
              this.edittingCellId = "";
              this.$emit("on-cancel-edit", params);
            },
            "on-save-edit": params => {
              this.value[params.row.initRowIndex][
                params.column.key
              ] = this.edittingText;
              this.$emit("input", this.value);
              this.$emit(
                "on-save-edit",
                Object.assign(params, { value: this.edittingText })
              );
              this.edittingCellId = "";
            }
          }
        });
      };
      return item;
    },
    surportHandle(item) {
      let options = item.options || [];
      let insideBtns = [];
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item]);
      });
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns;
      item.render = (h, params) => {
        params.tableData = this.value;
        return h("div", btns.map(item => item(h, params, this)));
      };
      return item;
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item;
        if (res.editable) res = this.suportEdit(res, index);
        if (res.key === "handle") res = this.surportHandle(res);
        return res;
      });
    },
    handlePage(value) {
      this.pageData.current = value;
      if (this.pageType === 'server') {
        var params = {
          pageNo: this.pageData.current,
          pageSize: this.pageData.pageSize
        };
        this.$emit("on-search", params);
        this.$emit("on-page-change")
      } else if (this.pageType === 'client') {
        this.$emit("on-page-change")
      } else {
        
      }
    },
    handlePageSize(value) {
      this.pageData.pageSize = value;
      var params = {
        pageNo: this.pageData.current,
        pageSize: this.pageData.pageSize
      };
      
      this.$emit("on-search", params);
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params);
    },
    clearCurrentRow() {
      this.$refs.tablesMain.clearCurrentRow();
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow);
    },
    onSelect(selection, row) {
      this.row = row;
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.row = undefined;
      this.$emit("on-select-cancel", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectAllCancel(selection) {
      this.$emit("on-select-all-cancel", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    },
    handleSearch() {
      this.insideTableData = this.value;
    },
    handleTableData() {
      this.insideTableData = this.value.map((item, index) => {
        let res = item;
        res.initRowIndex = index;
        return res;
      });
    },
    handlePageData () {
      this.pageData = {
        current: 1,
        pageSize: this.pageSize,
        pageSizeOpts: this.pageSizeOpts
      }
    }
  },
  watch: {
    columns(columns) {
      this.handleColumns(columns);
    },
    value(val) {
      this.handleSearch();
    },
    pageSize (val) {
      this.pageData.pageSize = val
    },
    pageSizeOpts (val) {
      this.pageData.pageSizeOpts = val
    }
  },
  mounted() {
    this.handleColumns(this.columns);
    this.handleTableData();
  },
  created () {
    this.handlePageData()
  }
};
</script>
