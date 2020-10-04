<template>
  <div class="aside_container">
    <div class="timestamp">
      <p>
        <i class="el-icon-time"></i>
        当前时间：{{ time | dateFormat }}
      </p>
      <p>距离选课结束还有</p>
      <p>
        {{ residue.day }}天 {{ residue.hour }}时 {{ residue.min }}分{{
          residue.sec
        }}秒
      </p>
    </div>

    <h3><i class="el-icon-document"></i> 最新动态:</h3>
    <ol class="newslist">
      <li>
        <router-link to="/main/news/newsdetails">
          <p>公共选修课补选2 哈尔滨信息工程学院-智慧树⽹学习手册a</p>
        </router-link>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "",
      residue: {
        day: "",
        hour: "",
        min: "",
        sec: "",
      },
    };
  },
  methods: {
    currentTime() {
      const timer = setInterval(() => {
        const nowdate = new Date();
        this.time = nowdate;
      }, 1000);
    },
    residueTime() {
      const rtimer = setInterval(() => {
        var NowTime = new Date();
        var EndTime = new Date("2020/10/15 00:00:00");
        var ResTime = EndTime - NowTime;
        var day = Math.floor(ResTime / 1000 / 60 / 60 / 24);
        var hour = Math.floor((ResTime / 1000 / 60 / 60) % 24);
        var min = Math.floor((ResTime / 1000 / 60) % 60);
        var sec = Math.floor((ResTime / 1000) % 60);
        this.residue.day = day;
        this.residue.hour = hour;
        this.residue.min = min;
        this.residue.sec = sec;
      }, 1000);
    },
  },
  created() {
    this.currentTime();
    this.residueTime();
  },
};
</script>
<style lang="less" scoped>
.aside_container {
  // border: 1px solid red;
  padding: 10px;
  width: 23%;
  .timestamp {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .newslist {
    li {
      margin-top: 10px;
      a {
        text-decoration: none;
        color: #3c3c3c;
        &:hover {
          color: skyblue;
        }
      }
    }
  }
}
</style>