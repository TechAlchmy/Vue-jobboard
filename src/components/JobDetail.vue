<template>
  <div class="row">
    <h1 style="padding: 0; margin: 0;">
      {{ $t('detail-view') }}
    </h1>
  </div>
  <div v-if="selectedJob!=null" class="row">
    <div class="col-12">
      <div class="q-pa-md" style="max-width: 500px;">
        <q-list bordered separator>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>{{ $t('job-title') }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.jobTitle }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>{{ $t('address') }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.formattedAddress }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JobDetail',
  setup()
  {
    return {
      jobDetailUrl: `${process.env.YAWIK_JOB_URL}`,
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: true,
        rowsNumber: 10,
        page: 1,
        rowsPerPage: 10
      },
    };
  },
  props: {
    selectedJob: {
      type: Object,
      required: true,
      default: null
    }
  },
  data()
  {
    return {
      rows: []
    };
  },
  watch: {
    selectedJob(newVal, oldVal)
    {
      console.log('Val changed');
    }
  },
  mounted()
  {
    this.getJob();
  },
  methods:
      {
        getJob(data = {})
        {
          this.loading = true;
          this.$axios.get(this.jobsUrl, {
            params: {
              populate: 'html,logo',
              sort: 'publishedAt:desc'
            }
          }
          ).then(response =>
          {
            this.rows = response.data.data;
          }).finally(() =>
          {
            this.loading = false;
          });
        },
      }
});
</script>

<style lang="scss">
  .highlights
  {
    background-color: $secondary;
  }
</style>

<i18n>
  {
  "en": {
  "search-placeholder": "Job title, Company or Location",
  "job-title": "Job title",
  "address": "Address",
  },
  "de": {
  "search-placeholder": "Anzeigentitel, Firma oder Ort",
  "job-title": "Job title",
  "address": "Address",
  }
  }
</i18n>
