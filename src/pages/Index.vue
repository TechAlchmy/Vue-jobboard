<template>
  <q-page class="flex flex-center">
    <AlgoliaSearch />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import AlgoliaSearch from 'src/components/AlgoliaSearch.vue';

export default defineComponent({
  name: 'Index',
  components: {
    AlgoliaSearch
  }
});
</script>
