<template>
  <div class="row">
    <span v-for="(val, index) in rows" :key="val.id" class="col-12">
      <q-card class="jobs fit">
        <q-card-section>
          <q-item
            :class="index==selectedIndex?'highlights':''"
            clickable
            @click="emitData(val, index)"
          >
            <q-item-section avatar>
              <q-img fit="contain" :src="jobHost + val.attributes.logo.formats.thumbnail.url" height="50px"
                     width="100px"
              />
              <q-item-label align="left"
                            caption
              >{{ diff(today,val.attributes.createdAt) }} {{ $t('days') }}</q-item-label>
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
      jobsUrl: `${process.env.YAWIK_STRAPI_URL}/api/jobs`,
      jobDetailUrl: `${process.env.YAWIK_STRAPI_URL}`,
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
      rows: [],
      selectedIndex: null
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
        emitData(job, index)
        {
          this.selectedIndex = index;
          this.$emit('click', { job: job });
        }
      }
});
</script>

<style lang="scss" scoped>

  .highlights
  {
    background-color: $secondary-light;
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
