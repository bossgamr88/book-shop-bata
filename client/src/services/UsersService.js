// @ หมายถึง อ้างอิงถึง Folder scr 
import Api from '@/services/Api'
// Api = baseURL ที่ return เป็น function ออกมา
// Api = http://localhost:5000/ จาก Server
export default {
	index (search) {
		// http://localhost:5000/users
		return Api().get('users')
	},
	show (userId) {
		return Api().get('user/'+userId)
	},
	post (user) {
		return Api().post('user',user)
	},
	put (user) {
		return Api().put('user/'+user.id,user)
	},
	delete (user) {
		return Api().delete('user/'+user.id,user)
	},
}
