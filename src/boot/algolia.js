// import something here
import { boot } from 'quasar/wrappers';
import InstantSearch from 'vue-instantsearch/vue3/es';
import 'instantsearch.css/themes/algolia.css';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ app }) =>
{
  // something to do
  app.use(InstantSearch);
});
