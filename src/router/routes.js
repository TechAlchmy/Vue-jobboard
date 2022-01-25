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
        path: 'jobs/:id/:title',
        name: 'selected-job',
        props: true,
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'info/:filename',
        name: 'info',
        component: () => import('pages/Info.vue'),
      },
      {
        path: 'news/:date/:title',
        name: 'news',
        props: true,
        component: () => import('pages/news/News.vue'),
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
