<template>
  <div class="row">
    <span v-for="val in rows" :key="val.id" class="col-12">
      <q-card class="jobs fit">
        <q-card-section>
          <q-item
            clickable
            @click="emitData"
          >
            <q-item-section avatar>
              <q-img fit="contain" :src="jobHost + val.attributes.logo.formats.thumbnail.url" height="50px" width="100px" />
              <q-item-label align="left" caption>{{ diff(today,val.attributes.createdAt) }} {{ $t('days') }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label align="left">
                {{ val.attributes.jobTitle }}
              </q-item-label>
              <q-item-label align="left" caption>
                {{ val.attributes.organization }}
              </q-item-label>
              <q-item-label align="left" caption>{{ val.attributes.formattedAddress }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </span>
  </div>
</template>

<script>
import { date } from 'quasar';
// destructuring to keep only what is needed
const { getDateDiff } = date;
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResultSplitted',
  emits: ['click'],
  setup()
  {
    return {
      jobsUrl: `${process.env.YAWIK_API_URL}/api/jobs`,
      jobDetailUrl: `${process.env.YAWIK_JOB_URL}`,
      loading: false,
      rowsPerPageOptions: [10, 25, 50, 100],
      pagination: {
        sortBy: 'desc',
        descending: true,
        rowsNumber: 10,
        page: 1,
        rowsPerPage: 10
      },
      today: new Date()
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
    jobHost()
    {
      return process.env.YAWIK_JOB_URL;
    },
    diff()
    {
      return getDateDiff;
    }
  },
  mounted()
  {
    this.getJobs();
  },
  methods:
  {
    getJobs(pagination = { pagination: this.pagination })
    {
      this.loading = true;
      this.$axios.get(this.jobsUrl, {
        params: {
          'pagination[page]': pagination.pagination.page,
          'pagination[pageSize]': pagination.pagination.rowsPerPage,
          populate: 'html,logo',
          sort: 'publishedAt:desc'
        }
      }
      ).then(response =>
      {
        this.rows = response.data.data;
        this.setPagination(response.data.meta.pagination);
      }).finally(() =>
      {
        this.loading = false;
      });
    },
    setPagination(pagination)
    {
      this.pagination = {
        sortBy: 'asc',
        descending: true,
        rowsNumber: pagination.total,
        page: pagination.page,
        rowsPerPage: pagination.pageSize
      };
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
