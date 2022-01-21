<template>
  <div class="row">
    <h1>
      {{ $t('detail-view') }}
      {{ row }}
    </h1>
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
  data()
  {
    return {
      rows: []
    };
  },
  computed:
  {

  },
  mounted()
  {
    this.getJob();
  },
  methods:
  {
    getJob(data = { })
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
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
  }
}
</i18n>
