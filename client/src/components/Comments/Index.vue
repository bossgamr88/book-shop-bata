<template>
	<div>
		<h2>Get all Comments</h2>
	<p><button v-on:click="logout">Logout</button></p>	
	<h4>จำนวน Comment {{comments.length}}</h4>
	 <div v-for="comment in comments" v-bind:key="comment.id">
    <p>id: {{ comment.id }}</p>
    <p>blogId: {{ comment.blogId }}</p>
    <p>comment : {{comment.comment}}</p>
<!--     <p>
      <button v-on:click="navigateTo('/comment/'+ comment.id)">ดู comment</button>
      <button v-on:click="deleteBlog(comment)">ลบข้อมูล</button>
    </p> -->
	</div>
</div>
</template>
<script>
	import CommentService from '@/services/CommentService'
	export default {
		data(){
			return{
				comments : []
			}
		},
		async created(){
			try {
				this.comments = (await CommentService.index()).data
			} catch(error) {	
				console.log(error);
			}
		},
		methods: {
		  logout () {
		    this.$store.dispatch('setToken', null)
		    this.$store.dispatch('setBlog', null)
		    this.$router.push({
		      name: 'login'
		    })
		  },
		  navigateTo (route) {
		    this.$router.push(route)
		},
		 async deleteBlog (comment) {
		    let result = confirm("Want to delete?")
		    if (result) {
		      try {
		        await CommentService.delete(comment)
		        this.refreshData()
		      } catch (err) {
		        console.log(err)
		      }
		    }
		  },
		  async refreshData() {
		    this.comments = (await CommentService.index()).data
		 }	
	}
}	
</script>