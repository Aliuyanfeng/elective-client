<template>
  <div class="details_container">
    <div class="details_wrap">
      <div class="title">
        <h2>{{ currentNews.title }}</h2>
        <p>
          发布时间:{{ currentNews.ctime | dateFormat("YYYY-MM-DD HH:mm:ss") }}
          <span style="margin-left: 10px">点击量:{{currentNews.read}}</span>
        </p>
        <el-divider></el-divider>
      </div>
      <div class="article" v-html="currentNews.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      currentNews: {},
    };
  },
  methods: {
    getArticleById() {
      this.$http
        .get("/api/admin/getArticleById/" + this.$route.query.id)
        .then((res) => {
          if (res.data.status == 0) {
            this.currentNews = res.data.article;
          }
        });
    },
  },
  created() {
    this.getArticleById()
  },
  watch: {
    $route(to,form){
      if(this.$route.query.id){
        this.getArticleById()
      }
    }
  },
  components: {},
};
</script>
<style lang="less" soped>
.details_container {
  .details_wrap {
    padding: 10px;
    .title {
      background-color: #fff;
      height: 100px;
      color: #3c3c3c;
      padding: 5px 5px 5px 20px;
      border-radius: 10px;
      h1 {
        line-height: 1em;
      }
    }
    .article {
      margin-top: 30px;
      font-size: 1rem;
      line-height: 1.5em;
      text-indent: 2em;
    }
  }
}
</style>