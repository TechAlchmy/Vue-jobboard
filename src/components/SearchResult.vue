<template>
  <div class="row">
    <q-table
      :title="$t('jobs')"
      :rows="rows"
      :columns="columns"
      :grid="grid"
      row-key="name"
      :rows-per-page-options="rowsPerPageOptions"
      class="full-width"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="company" :props="props">
            <q-img v-if="props.row.attributes.logo" fit="contain" :src="jobDetailUrl + props.row.attributes.logo.formats.thumbnail.url" spinner-color="primary" height="50px" width="100px" />
            <q-icon v-if="!props.row.attributes.logo" size="xl" name="domain" style="width: 100px;" />
            {{ props.row.attributes.organization }}
          </q-td>
          <q-td key="title" :props="props">
            <a v-if="props.row.attributes.html" target="_new" :href="jobDetailUrl + props.row.attributes.html.url">
              <span class="cursor-pointer jobtitle">
                {{ props.row.attributes.jobTitle }}
              </span>
              <q-tooltip> {{ props.row.attributes.tasks }}</q-tooltip>
            </a>
            <span v-if="!props.row.attributes.html" class="jobtitle">
              {{ props.row.attributes.jobTitle }}
            </span>
            <div>
              <span v-if="props.row.attributes.meta?.salary">
                <q-badge>{{ props.row.attributes.meta?.salary.label }}</q-badge>
              </span>
              <span v-if="props.row.attributes.meta?.workKind && props.row.attributes.meta?.workKind.length > 0">
                <q-badge color="secondary">{{ props.row.attributes.meta?.workKind.map(item => `${$t('label.' + item)}`).join(', ') }}</q-badge>
              </span>
              <span v-if="props.row.attributes.meta?.workDuration && props.row.attributes.meta?.workDuration.length > 0">
                <q-badge color="green">{{ props.row.attributes.meta?.workDuration.map(item => `${$t('label.' + item)}`).join(', ') }}</q-badge>
              </span>
            </div>
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.attributes.formattedAddress }}
            <div v-if="props.row.attributes.meta?.remoteWork">
              <q-badge>{{ $t('label.homeoffice') }}</q-badge>
            </div>
          </q-td>
          <q-td key="date" :props="props">
            {{ new Date(props.row.attributes.publishedAt).toLocaleString($root.$i18n.locale) }}
          </q-td>
        </q-tr>
      </template>

      <template #top-right>
        <q-btn color="primary" no-caps :label="$t('create_job')" type="a" :href="'https://jobwizard.yawik.org/' + $root.$i18n.locale" />
      </template>
    </q-table>
  </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResult',
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
    grid()
    {
      return this.$q.platform.is.mobile;
    },
    columns()
    {
      return [
        {
          name: 'company',
          align: 'left',
          label: this.$t('company'),
          field: 'organization',
          sortable: false
        },
        {
          name: 'date',
          align: 'left',
          label: this.$t('date'),
          field: 'createdAt',
          sortable: false
        },
        {
          name: 'title',
          required: true,
          label: this.$t('job_title'),
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: false
        },
        {
          name: 'location',
          align: 'left',
          label: this.$t('location'),
          field: 'formattedAddress',
          sortable: false
        },
      ];
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
