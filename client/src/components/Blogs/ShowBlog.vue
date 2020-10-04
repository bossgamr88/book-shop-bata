<template>

<div class="container component-wrapper">
  <main-header navsel="back"></main-header>
  <div class="blog-wrapper" v-if="blog != null">
    <h1>{{ blog.title }}</h1>
    <p><strong>Category: </strong>: {{ blog.category }}</p>
    <p><strong>Status:</strong> {{ blog.status }}</p>
    <div class="content" v-html="blog.content"></div>
  </div>
  <div class="back-nav"><button class="btn btn-success" v-on:click="navigateTo('/blogs')">
    <i class="fas fa-arrow-left"></i> Back..</button></div>
  <br>
</div>




<!--   <div>
    <h1>Show Blog</h1>
    <p>id: {{ blog.id }}</p>
    <p>title: {{ blog.title }}</p>
    <p>content: {{ blog.content }}</p>
    <p>category: {{ blog.category }}</p>
    <p>status: {{ blog.status }}</p>
    <p>
      <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">แก้ไข blog</button>
      <button v-on:click="navigateTo('/blogs')">กลับ</button>
    </p>
  </div> -->
</template>
<script>
import BlogsService from '@/services/BlogsService'
export default {
  data () {
    return {
      blog: null
    }
  },
  async created () {
    try {
      let blogId = this.$route.params.blogId
      this.blog = (await BlogsService.show(blogId)).data
    } catch (error) {
      console.log (error)
    }  
  },
  methods : {
    navigateTo (route) {
      this.$router.push(route)
    },
  }
}
</script>
<style scoped>
  .blog-wrapper {
    margin-top:20px;  
    margin-left: auto;
    margin-right: auto;
    padding: 40px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  }
  .back-nav {
    margin-top: 20px;
    text-align: center;
  }
  .blog-wrapper h1{
    text-align: center;
    font-family: 'kanit';
    padding-bottom: 50px;
  }
  .blog-wrapper p {
    font-family: 'kanit';
    font-size: 1.4em;
  }
  .blog-wrapper .content {
    font-family: 'kanit';
    font-size: 1.2em;
  }
</style>