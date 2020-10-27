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

    <div class="title">
      <h3><i class="el-icon-document"></i> 最新动态:</h3>
      <h2 @click="refresh()">
        <i class="el-icon-refresh-left"></i>
      </h2>
    </div>

    <ol class="newslist">
      <li v-for="(item, i) in article" :key="i">
        <p @click="newsdetails(item._id)">{{ item.title }}</p>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  inject: ["areload"],
  data() {
    return {
      time: "",
      residue: {
        day: "00",
        hour: "00",
        min: "00",
        sec: "00",
      },
      article: {},
    };
  },
  methods: {
    refresh() {
      this.areload();
    },
    currentTime() {
      const timer = setInterval(() => {
        const nowdate = new Date();
        this.time = nowdate;
      }, 1000);
    },
    residueTime() {
      const rtimer = setInterval(() => {
        var NowTime = new Date();
        var EndTime = new Date("2020/10/30 00:00:00");
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
    newsdetails(id) {
      this.$router.push({
        path: "/main/news/newsdetails",
        query: { id: id },
      });
    },
  },
  created() {
    this.currentTime();
    this.residueTime();
    this.$http.get("/api/admin/getAllArticle").then((res) => {
      this.article = res.data.articles;
    });
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
  .title {
    position: relative;

    h3 {
      position: absolute;
      left: 0;
    }
    h2 {
      position: absolute;
      right: 0;
      &:hover {
        color: skyblue;
        cursor: pointer;
      }
    }
  }
  .newslist {
    margin-top: 80px;
    li {
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        color: skyblue;
      }
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