import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import yawik from './yawik';

export default store(function(/* { ssrContext } */)
{
  const Store = createStore({
    modules: {
      yawik
    },
    plugins:
      [
        createPersistedState({
          key: 'yawik',
          paths: [
            'yawik.form',
            'yawik.settings'
          ]
        })
      ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  if (process.env.DEV && module.hot)
  {
    module.hot.accept(['./yawik'], () =>
    {
      const newData = require('./yawik').default;
      Store.hotUpdate({ modules: { yawik: newData } });
    });
  }
  return Store;
});

export { store };
