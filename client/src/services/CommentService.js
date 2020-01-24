// @ หมายถึง อ้างอิงถึง Folder scr 
import Api from '@/services/Api'
// Api = baseURL ที่ return เป็น function ออกมา
// Api = http://localhost:5000/ จาก Server
export default {
	index () {
		// http://localhost:5000/comments
		return Api().get('comments')
	},
	show (commentId) {
		return Api().get('comment/'+commentId)
	},
	post (comment) {
		return Api().post('comment',comment)
	},
	put (comment) {
		return Api().put('comment/'+comment.id,comment)
	},
	delete (comment) {
		return Api().delete('comment/'+comment.id,comment)
	},
}