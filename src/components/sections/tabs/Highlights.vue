<template>
  <div class="row">
    <ais-instant-search
      :search-client="searchClient"
      index-name="jobs"
    >
      <ais-search-box
        :placeholder="$t('search-placeholder')"
        submit-title="string"
        reset-title="string"
        :autofocus="true"
      />
      <ais-state-results>
        <template #default="{ results: { hits, query } }">
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
  name: 'Highlights',
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

<style>

body
{
  font-family: sans-serif;
  padding: 1em;
}

</style>

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
