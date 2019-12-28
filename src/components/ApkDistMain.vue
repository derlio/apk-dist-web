<template>
  <el-container>
    <el-aside>
      <h3>Apk基本信息</h3>
      <el-table :data="tableData" :show-header="false" :border="false">
        <el-table-column prop="name" label="姓名" width="100px"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-aside>
    <el-main>
      <div class="step-container">
        <el-steps :active="0" simple width="80%">
          <el-step title="上传Apk" icon="el-icon-sell"></el-step>
          <el-step title="加固并生成渠道包" icon="el-icon-s-check"></el-step>
          <el-step title="上传Oss" icon="el-icon-upload"></el-step>
        </el-steps>
      </div>

      <div class="upload" style="display:none;">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept="application/vnd.android.package-archive"
          :before-remove="beforeRemove"
          :limit="limitnum"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :beforeUpload="beforeAvatarUpload"
          :http-request="httpRequestUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传Apk文件</div>
        </el-upload>
      </div>

      <div class="generate-channels" style="display:none;">
        <div class="log-pane">
          <div class="log-pane-item">你们是不是不想活了</div>
          <div class="log-pane-item">你们是不是不想活了</div>
        </div>
      </div>

      <div class="oss-result" >
        <el-table :data="tableData" style="width: 80%" border>
          <el-table-column prop="channel_name" label="渠道名" width="180" align="center"></el-table-column>
          <el-table-column prop="link_address" label="Oss地址" align="center"></el-table-column>
          <el-table-column prop="link_address" label="下载"  width="180px" align="center"><el-link type="primary">下载</el-link></el-table-column>
          
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ApkDistMain",
  props: {
    msg: String
  },
  data() {
    return {
      tableData: [
        {
          name: "应用名",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "包名",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          name: "Ver.Name",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          name: "Ver.Code",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  text-align: left;
  width: 25rem;
  padding: 10px;
  border-right: 1px solid #eaecef;
}

.el-aside .el-table {
  height: 100%;
  position: relative;
  background-color: transparent;
  top: 0px;
}

.el-aside .el-table__row > td {
  border: none;
}

.el-aside .el-table tr {
  border: none;
  background-color: transparent;
}

.el-aside .el-table::before {
  height: 0px;
}

.el-main {
  color: #333;
  text-align: center;
  width: auto;
}

.el-main .el-steps {
  width: 64%;
  margin: auto;
}
.el-main .el-upload {
  margin: 50px;
  width: 64%;
  height: 100%;
  top: 50px;
  text-align: center;
  justify-content: center; /*水平居中*/
  align-items: Center; /*垂直居中*/
}

.el-main .el-upload .el-upload-dragger {
  position: relative;
  margin: auto;
  width: 80%;
  height: 300px;
}

/* .generate-channels .el-progress {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
} */

.generate-channels .log-pane {
  color: white;
  width: 80%;
  padding: 10px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  height: 500px;
  background-color: black;
  margin-top: 40px;
}

.generate-channels .log-pane .log-pane-item {
  color: white;
  width: auto;
  text-align: left;
  font-size: 14px;
  background-color: black;
  margin: 4px;
}

.oss-result .el-table{
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}
</style>
