<template>
<div>
<div class="container component-wrapper">
  	<main-header navsel="front"></main-header>
	<!-- <div class="hero-warpper"> -->
    <div class="component-wrapper">
        <div class="hero">
            <img src="@/assets/logo.png" class="logo" style="float:left">
            <h1>Webblog from nodejs + vue2 Ebook 2019</h1>
            <p>By Gooddev.ME</p>
        </div>
    </div>
	<!-- </div> -->

    <div class="blog-wrapper" v-if="blog != null">
    <h1>{{ blog.title }}</h1>
    <p><strong>Category: </strong>: <a href="#" v-on:click.prevent="navigateTo(`/front?search=${blog.category}`)" >{{blog.category}}</a></p>
    <div class="content" v-html="blog.content"></div>
  </div>
  </div>
  <div class="back-nav"><button class="btn btn-success" v-on:click="navigateTo('/front')">
    <i class="fas fa-arrow-left"></i> Back..</button></div>
  
    <transition name="fade">
        <div v-if="resultUpdated != ''" class="popup-msg">
            <p>{{resultUpdated}}</p>
        </div>
    </transition>  
  <br>
</div>
</template>
<script>
import BlogsService from '@/services/BlogsService'
// import UserService from '@/services/UserService'

export default {
  data () {
    return {
      blog: null,
      resultUpdated: '',
      user:null
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
    .popup-msg {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        border: solid 1px #ddd;
        background: #fff;
        max-width: 200px;
        padding: 10px;
        position: fixed;
        bottom: 0;
        right: 0;
        border-radius: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
    }
    .hero{
		margin-top:80px;
		border-radius: 5px;
		background: darkcyan;
		height: 250px;
		color: white;
		padding: 20px;
	}
    .hero h1{
        margin-top: 30px;
    }

  .blog-wrapper {
    margin-top:20px;  
    padding: 40px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  }
  .back-nav {
    margin-top: 20px;
    text-align: center;
  }
  .blog-wrapper h1{
      text-align: center;
      font-family:'kanit';
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