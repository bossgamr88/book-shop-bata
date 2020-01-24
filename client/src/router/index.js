import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import UserIndex from '@/components/Users/Index'
import UserShow from '@/components/Users/ShowUser'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'

import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/Index'

import BlogIndex from '@/components/Blogs/Index'
import BlogShow from '@/components/Blogs/ShowBlog'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'



Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      // path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'users-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    // authen 
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // blogs
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
  ]
})


