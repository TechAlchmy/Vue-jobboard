<template>
  <div class="row justify-center" align="center">
    <div class="text-h6">{{ $t('hightlights') }}</div>
    <ais-instant-search
      :search-client="searchClient"
      index-name="jobs"
    >
      <ais-state-results>
        <template #default="{ results: { hits } }">
          {{ query }}
          <q-table
            :title="$t('jobs')"
            :rows="hits"
            :columns="columns"
            :grid="grid"
            row-key="name"
            color="amber"
            class="full-width"
          />
        </template>
      </ais-state-results>
    </ais-instant-search>
  </div>
</template>

<script>

import algoliasearch from 'algoliasearch/lite';

export default {
  name: 'SearchResult',
  setup()
  {
    return {
      searchClient: algoliasearch(
        process.env.ALGOLIA_NAME,
        process.env.ALGOLIA_KEY
      )
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
            {
              name: 'company',
              align: 'left',
              label: this.$t('company'),
              field: 'organization',
              sortable: false
            }
          ];
        },
      },
};
</script>

<i18n>
{
  'en': {
    'search-placeholder': 'Job title, Company or Location',
  },
  'de': {
    'search-placeholder': 'Anzeigentitel, Firma oder Ort',
  }
}
</i18n>
