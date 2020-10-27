<template>
  <div class="news_container">
    <div class="news_list">
      <el-timeline>
        <el-timeline-item
          timestamp="2018/4/12"
          placement="top"
          v-for="(item, i) in AllArticle"
          :key="i"
        >
          <el-card>
            <h4 @click="getDetails(item._id)">{{ item.title }}</h4>
            <p>admin 发布于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      AllArticle: [],
    };
  },
  methods: {
    getDetails(id) {
      this.$router.push({
        path: "/main/news/newsdetails",
        query: {
          id: id,
        },
      });
    },
  },
  created() {
    this.$http.get("/api/admin/getAllArticle").then((res) => {
      if (res.data.status == 0) {
        this.AllArticle = res.data.articles;
      }
    });
  },
  components: {},
};
</script>
<style lang="less" soped>
.news_container {
  .news_list {
    padding: 10px;
    ul {
      padding: 0;
      margin: 0;
      h4 {
        cursor: pointer;
      }
    }
  }
}
</style>