
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('src/pages/admin/Index.vue') },
      { path: 'inputkamar', name: 'inputKamar', component: () => import('src/pages/admin/InputKamar.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('src/pages/admin/DataUser.vue') },
      { path: 'datakamar', name: 'dataKamar', component: () => import('pages/admin/DataKamar.vue') },
      { path: 'editkamar/:id', name: 'editKamar', component: () => import('pages/admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/Index.vue') },
      { path: '/myorder', name: 'myOrder', component: () => import('pages/user/myOrder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/Register.vue')
  }
]

export default routes
