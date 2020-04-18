<template>
  <Modal v-model="isShow" @on-cancel="handleClose" title="安装信息导入" width="68">
    <div>
      <h4>导入规则：</h4>
      <h4>1、请在模版的基础上添加相关信息，同时请不要随意删除和移动EXCEL中的列或者改变标题，否则将会引起导入失败；</h4>
      <h4>2、最多导入10000条数据；</h4>
    </div>
    <br />
    <br />
    <div>
      <Row>
        <Col span="12">
          <Button icon="ios-cloud-download-outline" type="text" @click="handleDownload">下载模板</Button>
        </Col>
        <Col span="12">
          <Upload
            ref="upload"
            :before-upload="handleBeforeUpload"
            :action="uploadUrl"
            :headers="{'token':token}"
            accept=".xls, .xlsx, .csv"
            :on-success="handleOnSuccess"
            :on-error="handlerOnError"
          >
            <Button icon="ios-cloud-upload-outline">选择excel文件上传</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <div v-show="showMsg">
      <h4>导入结果：</h4>
      <h4>{{uploadMsg}}</h4>
      <h4>失败记录如下：</h4>
      <dataTable
        ref="tables"
        v-model="tableData"
        pageType="client"
        :columns="columns"
        :loading="tableLoading"
      ></dataTable>
    </div>
    <br />
    <br />
    <div slot="footer">
      <Button type="text" size="large" @click="handleClose">取消</Button>
      <Button
        v-if="file !== null"
        type="primary"
        size="large"
        :loading="loadingStatus"
        @click="handleUpload"
      >{{ loadingStatus ? '正在导入中...' : '确定导入' }}</Button>
    </div>
  </Modal>
</template>

<script>
import { Modal,Row,Upload } from 'view-design' 
import DataTable from "_c/data-table";
import Base from "../../base/list.vue";
import Cookies from "js-cookie";
import baseURL from "_conf/url";
import excel from "@/libs/excel";
export default {
  name: "form_page",
  extends: Base,
  components: {
    Modal,Row,Upload,
    DataTable
  },
  props: {
    modelUpload: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isShow: false,
      file: null,
      loadingStatus: false,
      token: Cookies.get("token"),
      showMsg: false,
      uploadMsg: "",
      tableLoading: false,
      columns: [
        { title: "agentNo", key: "agentNo" },
        { title: "province", key: "province" },
        { title: "city", key: "city" },
        {
          title: "school",
          key: "school"
        },
        {
          title: "floor",
          key: "floor"
        },
        {
          title: "dormitory",
          key: "dormitory"
        },
        {
          title: "sn",
          key: "sn"
        },
        {
          title: "remark",
          key: "remark"
        }
      ]
    };
  },
  methods: {
    handleResetForm() {
      this.handleClose();
    },
    handleClose() {
      this.isShow = false;
      this.$emit("on-close");
    },
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls" || fileExt === "csv") {
        this.file = file;
        this.readFile(file);
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件，后者csv文件"
        });
      }
      return false;
    },
    handleUpload() {
      this.$refs.upload.post(this.file);
    },
    // 读取文件
    readFile(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.loadingStatus = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        // const data = e.target.result
        // const { header, results } = excel.read(data, 'array')
        // const tableTitle = header.map(item => { return { title: item, key: item } })
        // this.tableData = results
        // this.tableTitle = tableTitle
        this.loadingStatus = false;
        this.showProgress = true;
        // this.tableLoading = false
        // this.showRemoveFile = true
      };
    },
    handleDownload() {
      const params = {
        title: [
          "agentNo",
          "province",
          "city",
          "school",
          "floor",
          "dormitory",
          "sn",
          "remark"
        ],
        key: [
          "agentNo",
          "province",
          "city",
          "school",
          "floor",
          "dormitory",
          "sn",
          "remark"
        ],
        data: [],
        autoWidth: true,
        filename: "安装模版下载"
      };
      excel.export_array_to_excel(params);
      this.exportLoading = false;
    },
    handleOnSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.showMsg = true;
        this.uploadMsg = response.response.msg;
        this.tableData = response.response.errorList;
        this.$refs.tables.total = response.response.errorList.length;
        this.file = null;
        this.loadingStatus = false;
        this.tableLoading = false;
        // this.handleClose();
      } else {
        this.$Message.error("上传失败");
      }
    },
    handlerOnError(error, file, fileList) {
      
    },
    handleClose() {
      this.isShow = false;
      this.file = null;
      this.showMsg = false;
      this.$emit("on-close");
    }
  },
  watch: {
    modelUpload(value) {
      this.isShow = value;
    }
  },
  computed: {
    uploadUrl() {
      return baseURL + "api/careInstall/updateExcel";
    }
  }
};
</script>
