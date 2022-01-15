<template>
  <div class="row justify-center" align="center">
    <div class="text-h6">{{ $t('hightlights') }}</div>
    <ais-instant-search
      :search-client="searchClient"
      index-name="jobs"
    >
      <ais-state-results>
        <template #default="{ results: { hits } }">
          <div class="row justify-center q-gutter-md">
            <span v-for="val in hits" :key="val.id" class="col-3">
              {{ row }}
              <q-card class="advantages fit">
                <q-card-section>
                  <div class="text-h6">{{ $t(val.title) }}</div>
                  <div class="text-subtitle2">{{ $t(val.formattedAddress) }}</div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn color="primary" outline flat>{{ $t('more') }}</q-btn>
                </q-card-actions>
              </q-card>
            </span>
          </div>
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
};
</script>

<style>

body
{
  font-family: sans-serif;
  padding: 1em;
}

.q-card,
.ais-InstantSearch
{
  width: 100%;
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
