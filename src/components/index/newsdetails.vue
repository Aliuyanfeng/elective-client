<template>
  <div class="details_container">
    <div class="details_wrap">
      <div class="title">
        <h1>文章标题</h1>
        <p>
          发布时间:2018-07-06 15:46
          <span>点击量</span>
        </p>
      </div>
      <div class="article">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus
        recusandae eos animi cumque fuga placeat, tenetur ab modi iste natus
        quibusdam eum voluptates et nulla esse id sint minus obcaecati non
        deleniti odit quisquam, ipsam maxime. Voluptas laboriosam veritatis
        animi hic ipsum illo ducimus? Ex doloremque, nesciunt ducimus ut
        asperiores impedit quis cumque exercitationem enim ipsum laborum nobis
        sequi fugit a tempora reiciendis veritatis, non id voluptas cum
        laudantium repellat vero, maxime labore. Voluptates consequatur qui,
        magni voluptate ratione accusantium sapiente nesciunt quos neque, quo
        quod culpa laudantium eligendi? Commodi, tempore! Voluptatum quod
        doloremque impedit suscipit necessitatibus, sint obcaecati! Voluptatibus
        provident natus ipsum odio aperiam dolore? Perspiciatis corrupti
        voluptas ipsam. Voluptatum qui itaque repellat illo provident. Ducimus
        quae in reprehenderit ut eligendi nihil rem ratione officia
        necessitatibus numquam autem natus cupiditate tenetur ipsum vel animi
        quia amet quo sapiente ab, maiores nemo. Aspernatur, similique dolor.
        Voluptatibus repudiandae perspiciatis debitis. Eum distinctio accusamus
        modi expedita atque illum, in rerum cumque quisquam cupiditate delectus
        libero sunt nesciunt veritatis beatae? Sapiente aut maiores possimus
        aliquam impedit! Fuga dolores sit numquam atque mollitia vitae aliquid
        harum aperiam quod, voluptatum natus animi quo laborum ipsum aspernatur
        doloremque soluta repellat debitis laudantium quas velit nobis et.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {},
};
</script>
<style lang="less" soped>
.details_container {
  .details_wrap {
    // border: 1px solid red;

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
      margin-top: 20px;
      box-shadow: 0px 0px 5px 2px gray;
      font-size: 1rem;
      line-height: 1.5em;
      text-indent: 2em;
    }
  }
}
</style>