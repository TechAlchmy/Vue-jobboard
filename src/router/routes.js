
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('pages/Info.vue'),
      },
      {
        path: '2022-01-11',
        name: '2022-01-11',
        component: () => import('pages/news/News20220111.vue'),
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
