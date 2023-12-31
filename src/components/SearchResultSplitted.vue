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
              <date :date="val.attributes.createdAt" />
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
import Date from 'src/components/Date.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResultSplitted',
  components:
  {
    Date
  },
  emits: ['click'],
  setup()
  {
    return {
      jobsUrl: `${process.env.YAWIK_JOB_URL}/api/jobs`,
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
            const selectedId = parseInt(this.$route.params.id);
            const index = this.rows.findIndex(({ id }) => id === selectedId);
            if (index !== -1)
            {
              this.emitData(this.rows[index], index);
            }
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
        convertToSlug(title)
        {
          return title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
        },
        emitData(job, index)
        {
          const id = job.id;
          const title = this.convertToSlug(job.attributes.jobTitle);
          window.history.pushState('', 'Title', '/jobs/' + id + '/' + title);
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
