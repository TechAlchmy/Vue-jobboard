<template>
  <q-page padding>
    <h1>{{ $t('jobs') }}</h1>
    <!-- content -->
    <searchresult />
    {{ grid }}
    {{ columns }}
  </q-page>
</template>

<script>
import searchresult from 'src/components/SearchResult.vue';

export default {
  name: 'Jobs',
  components:
  {
    searchresult
  },
};
</script>
