<template>
  <el-container>
    <el-aside width="20%">
      <h3>Apk基本信息</h3>
      <el-table :data="apkInfo" :show-header="false" :border="false">
        <el-table-column prop="name" label="name" width="100px"></el-table-column>
        <el-table-column prop="value" label="value"></el-table-column>
      </el-table>
    </el-aside>
    <el-main>
      <div class="step-container">
        <el-steps v-bind:active="stepIndex" simple width="80%">
          <el-step title="上传Apk" icon="el-icon-sell"></el-step>
          <el-step title="加固并生成渠道包" icon="el-icon-s-check"></el-step>
          <el-step title="上传Oss" icon="el-icon-upload"></el-step>
        </el-steps>
      </div>

      <div class="upload" v-if="stepIndex == 0">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8081/upload"
          accept="application/vnd.android.package-archive"
          :limit="1"
          :on-success="handleUploadApkSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传Apk文件</div>
        </el-upload>
      </div>

      <div class="generate-channels" v-if="stepIndex == 1">
        <div class="log-pane">
          <div
            class="log-pane-item"
            v-for="item in buildChannelsLog"
            :key="item.time"
          >{{item.time}} {{item.text}}</div>
        </div>
      </div>

      <div class="oss-result" v-if="stepIndex == 2 || stepIndex == 3">
        <el-table :data="ossResult" style="width: 80%" border>
          <el-table-column prop="channel" label="渠道名" width="180" align="center"></el-table-column>
          <el-table-column prop="progress" label="上传进度" align="center">
            <template slot-scope="scope">
              <el-progress
                :stroke-width="12"
                v-bind:percentage="scope.row.progress"
                color="#FD7A86"
                :show-text="false"
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="下载" width="180px" align="center">
            <template slot-scope="scope">
              <el-link type="primary" v-bind:href="scope.row.url">下载</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "ApkDistMain",
  props: {},
  methods: {
    debug(value) {
      window.console.log(value);
    },
    handleUploadApkSuccess() {
      let loading = Loading.service({
        lock: true,
        text: "正在处理",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.refreshStatus(() => {
          let handle = setInterval(() => {
            if (this.stepIndex == 3) {
              this.$notify({
                title: "Done",
                message: "请下载渠道包上传相应市场",
                type: "success"
              });
              clearInterval(handle);
              return;
            }
            this.refreshStatus();
          }, 1000);
        });
      }, 2000);
    },
    refreshStatus(callback) {
      this.axios.get("http://localhost:8081/status").then(response => {
        this.debug(response.data);
        this.updateApkInfo(response.data.apkInfo);
        this.updateStep(response.data.step.name);
        this.buildChannelsLog = response.data.buildChannelsLog;
        this.ossResult = response.data.ossResult;
        if (callback) {
          callback();
        }
      });
    },
    updateStep(step) {
      var stepIndex = 0;
      switch (step) {
        case "idle":
        case "upload-apk":
          stepIndex = 0;
          break;
        case "jiagu":
        case "build-channel":
          stepIndex = 1;
          break;
        case "oss-upload":
          stepIndex = 2;
          break;
        case "done":
          stepIndex = 3;
          break;
      }
      this.stepIndex = stepIndex;
    },
    updateApkInfo(info) {
      if (info) {
        this.debug(info);
        var data = Array();
        data.push({ name: "应用名", value: info.name });
        data.push({ name: "包名", value: info.packageName });
        data.push({ name: "Ver.Name", value: info.versionName });
        data.push({ name: "Ver.Code", value: info.versionCode });
        data.push({ name: "Channel", value: info.channel });
        this.apkInfo = data;
      }
    }
  },
  data() {
    return {
      apkInfo: [],
      buildChannelsLog: [],
      ossResult: [],
      stepIndex: 0
    };
  },
  mounted: function() {
    this.refreshStatus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-container {
  width: auto;
  height: 100%;
}
.el-aside {
  color: white;
  height: 100%;
  text-align: left;
  width: 300px;
  padding: 10px;
  border-right: 1px solid #eaecef;
  background-color: #333;
}

.el-aside .el-table {
  height: 100%;
  position: relative;
  background-color: transparent;
  top: 0px;
  color: white;
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
  width: 30rem;
  height: auto;
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

.oss-result .el-table {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}
</style>
