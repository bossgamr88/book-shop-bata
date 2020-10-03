// @ หมายถึง อ้างอิงถึง Folder scr 
import Api from '@/services/Api'
// Api = baseURL ที่ return เป็น function ออกมา
// Api = http://localhost:5000/ จาก Server
export default {
	index (search) {
		// http://localhost:5000/blogs
		// return Api().get('blogs')
		return Api().get('blogs',{
			params : {
				search : search
			}
		})
	},
	show (blogId) {
		return Api().get('blog/'+blogId)
	},
	post (blog) {
		return Api().post('blog',blog)
	},
	put (blog) {
		return Api().put('blog/'+blog.id,blog)
	},
	delete (blog) {
		return Api().delete('blog/'+blog.id,blog)
	},
}