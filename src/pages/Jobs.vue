<template>
  <q-page padding>
    <h1>{{ $t('jobs') }}</h1>
    <q-splitter
      v-model="splitterModel"
      style="height: 400px;"
    >
      <template #before>
        <searchresult @click="getEmittedData" />
      </template>

      <template #after>
        <div class="q-pa-md">
          <jobdetail :selected-job="selectedJob" />
        </div>
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
