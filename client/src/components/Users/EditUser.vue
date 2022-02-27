<template>
<!-- 	<div>
		<h1>Edit User</h1>
		<form @submit.prevent="editUser">
			<p>name : <input type="text" v-model="user.name"></p>
			<p>lastname : <input type="text" v-model="user.lastname"></p>
			<p>email : <input type="text" v-model="user.email"></p>
			<p>password : <input type="text" v-model="user.password"></p>
			<p><button type="submit">edit user</button></p>
		</form>
		<br><br><hr>
		<div>
		<h1>Show User</h1>
		<p>id : {{user.id}}</p>
		<p>ชื่อ-นามสกุล : {{user.name}} - {{user.lastname}}</p>
		<p>email : {{user.email}}</p>
		<p>password : {{user.password}}</p>
		</div>

	</div> -->

	<div class="user-wrapper container">
			  <main-header navsel="back"></main-header>

		<main-header navsel="back"></main-header>
		<h1>แก้ไขข้อมูลผู้ใช้งาน</h1>
		<div class="form-wrapper">
			<form v-on:submit.prevent = "editUser" class="form-horizontal">

				<div class="form-group">
				  <label for="" class="control-label col-md-2">Name: </label>
				  <div class="col-md-8">
				    <input class="form-control" type="text" v-model="user.name" required>
				  </div>
				</div>

				<div class="form-group">
				  <label for="" class="control-label col-md-2">Lastname: </label>
				  <div class="col-md-8">
				    <input class="form-control" type="text" v-model="user.lastname" required>
				  </div>
				</div>

				<div class="form-group">
				  <label for="" class="control-label col-md-2">Email: </label>
				  <div class="col-md-8">
				    <input class="form-control" type="email" v-model="user.email" required>
				  </div>
				</div>

				<div class="form-group">
				   <label class="control-label col-md-2">Password: </label>
				   <div class="col-md-8">
				     <input class="form-control" type="password" v-model="user.password" required>
				   </div>
				 </div>				

				 <div class="form-group">
				   <label class="control-label col-md-2">Type: </label>
				   <div class="col-md-8">
				     <select class="form-control" v-model="user.type" required>
				       <option value="admin">Admin</option>
				       <option value="user">User</option>
				     </select>
				   </div>
				 </div>

				 <div class="form-group">
				   <div class="col-md-offset-2 col-md-8">                    
				     <button class="btn btn-success" type="submit"><i class="fas fa-check"></i> Edit User</button>            
				     <button class="btn btn-default" type="button" v-on:click="navigateTo('/users')">Back</button>
				   </div>
				 </div>
			</form>
		</div>
	</div>


</template>

<script>
	import UsersService from '@/services/UsersService'
	export default {
		data(){
			return {
				user: {
					name : '',
					lastname : '',
					email : '',
					password : '',
					status : 'active',
					type: ''
				}
			}
		},
		methods : {
			async editUser(){
				try {
					await UsersService.put(this.user)
					this.$router.push({
						name : 'users'
					})
				} catch(error) {
					console.log(error);
				}
			},
			navigateTo (route) {
			  this.$router.push(route)
			}, 
		},
		async created(){
			try {
			let userId = this.$route.params.userId
			this.user = (await UsersService.show(userId)).data
			this.user.password = ""
			} catch(error) {
				console.log(error);
			}
		}
	}	
</script>