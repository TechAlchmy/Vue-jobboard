<template>
  <div v-if="selectedJob!=null" class="row">
    <div class="q-pa-md">
      <q-btn rounded size="xl" color="secondary">{{ $t('apply') }} </q-btn>
    </div>
    <div class="col-12">
      <div class="q-pa-md">
        <q-card bordered>
          <q-item>
            <q-item-section avatar>
              <q-img fit="contain" :src="jobDetailUrl + selectedJob.attributes.logo.formats.small.url" height="100px" width="150px" />
            </q-item-section>

            <q-item-section>
              <q-item-label align="left">{{ selectedJob.attributes.jobTitle }}</q-item-label>
              <q-item-label align="left" caption>
                {{ selectedJob.attributes.jobTitle }}
              </q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.formattedAddress }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.introLabel }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.intro }}</q-item-label>
              <h2>{{ selectedJob.attributes.jobTitle }}</h2>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.taskLabel }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.tasks }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.profileLabel }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.profile }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.offerLabel }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.offer }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.contactInfoLabel }}</q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.contactInfo }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
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
  "apply": "Apply"
  },
  "de": {
  "search-placeholder": "Anzeigentitel, Firma oder Ort",
  "job-title": "Job title",
  "address": "Address",
  "apply": "Bewerben"
  }
  }
</i18n>
