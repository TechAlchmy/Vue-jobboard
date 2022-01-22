<template>
  <q-page padding>
    <h4>{{ $t('jobs') }}</h4>
    <q-splitter
      v-model="splitterModel"
      before-class="bg-secondary-light"
      style="height: 95%;"
    >
      <template #before>
        <searchresult @click="getEmittedData" />
      </template>

      <template #after>
        <jobdetail :selected-job="selectedJob" />
      </template>
    </q-splitter>
    <!-- content -->
    {{ grid }}
    {{ columns }}
  </q-page>
</template>

<script>
import searchresult from 'src/components/SearchResultSplitted.vue';
import jobdetail from 'src/components/JobDetail.vue';
import { ref } from 'vue';

export default {
  name: 'Jobs',
  setup()
  {
    return {
      splitterModel: ref(25), // start at 50%
    };
  },
  components:
      {
        searchresult,
        jobdetail
      },
  data()
  {
    return {
      selectedJob: null,
    };
  },
  methods:
      {
        getEmittedData(value)
        {
          this.selectedJob = value.job;
        }
      },

};
</script>
