<template>
	<div>
		<h1>Get All User</h1>
		<p><button v-on:click="navigateTo('user/create/')">สร้างผู้ใช้งาน</button></p>
		<p><button v-on:click="logout">Logout</button></p>
		<h4>จำนวนผู้ใช้งาน {{users.length}}</h4>
			<div v-for="user in users" :key="user.id">
				<p>id : {{user.id}}</p>
				<p>ชื่อ-นามสกุล : {{user.name}} - {{user.lastname}}</p>
				<p>email : {{user.email}}</p>
				<p>password : {{user.password}}</p>
				<p><button v-on:click="navigateTo('user/'+user.id)">ดูข้อมูลผู้ใช้งาน</button>
				<button v-on:click="navigateTo('user/edit/'+user.id)">เเก้ไขข้อมูล</button>
				<button v-on:click="deleteUser(user)">ลบข้อมูล</button>
				</p>
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
			try {
				this.users = (await UsersService.index()).data
			} catch(error) {	
				console.log(error);
			}
		},
		methods : {
			navigateTo (route){
				this.$router.push(route)
			},
			async deleteUser (user){
			let result = confirm("Want to Delete?")
			if (result){
				try {
				await UsersService.delete(user)
				this.refreshData()
				} catch(error) {
					console.log(error);
				}
			}
		},
		async refreshData(){
			this.users = (await UsersService.index()).data
		},
		logout(){
			this.$store.dispatch('setToken',null)
			this.$store.dispatch('setUser',null)
			this.$router.push({
				name : 'login'
			})
		}

	}
}
</script>