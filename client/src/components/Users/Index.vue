<template>
	<div>
		<h1>Get All User</h1>
		<h4>จำนวนผู้ใช้งาน {{users.length}}</h4>
			<div v-for="user in users" :key="user.id">
				<p>id : {{user.id}}</p>
				<p>ชื่อ-นามสกุล : {{user.name}} - {{user.lastname}}</p>
				<p>email : {{user.email}}</p>
				<p>password : {{user.password}}</p>
				<p><button v-on:click="navigateTo('user/'+user.id)">ดูข้อมูลผู้ใช้งาน</button></p>
			</div>		
		</div>
</template>

<script>
	import UsersService from '@/services/UsersService'
	export default {
		data(){
			return {
				users : []
			}
		},
		async created(){
			// let results = (await UsersService.index()).data
			// console.log(results)
			this.users = (await UsersService.index()).data
		},
		methods : {
			navigateTo (route){
				this.$router.push(route)
			}
		}
	}
</script>