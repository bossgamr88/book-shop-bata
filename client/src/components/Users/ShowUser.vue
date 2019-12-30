<template>
	<div>
		<h1>Show User</h1>
		<!-- <p>User ID: {{userId}}</p> -->
		<p>id : {{user.id}}</p>
		<p>ชื่อ-นามสกุล : {{user.name}} - {{user.lastname}}</p>
		<p>email : {{user.email}}</p>
		<p>password : {{user.password}}</p>
	</div>		

</template>

<script>
	import UsersService from '@/services/UsersService'
	export default {
		data(){
			return {
				// userId : 0
				user : null
			}
		},
		// created(){
		// 	this.userId = this.$route.params.userId
		// }
		async created(){
			try {
			let userId = this.$route.params.userId
			this.user = (await UsersService.show(userId)).data
			} catch(error) {
				console.log(error);
			}
		}
	}
</script>