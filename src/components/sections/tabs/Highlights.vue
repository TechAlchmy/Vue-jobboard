<template>
  <div class="row justify-center" align="center">
    <div class="text-h6">{{ $t('first-ad') }}</div>
    <ais-instant-search
      :search-client="searchClient"
      index-name="jobs"
    >
      <ais-state-results>
        <template #default="{ results: { hits } }">
          <div class="row justify-center q-gutter-md">
            <span v-for="val in hits" :key="val.id" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <q-card class="advantages fit">
                <q-card-section>
                  <q-item>
                    <q-item-section avatar>
                      <q-img fit="contain" :src="'https://api.yawik.org' + val.logo" width="50px" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label align="left">{{ val.title }}</q-item-label>
                      <q-item-label align="left" caption>
                        {{ val.organization }}
                      </q-item-label>
                      <q-item-label align="left" caption>{{ val.formattedAddress }}</q-item-label>
                    </q-item-section>
                  </q-item>

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
  "en": {
    "search-placeholder": "Job title, Company or Location",
    "first-ad": "Place your first ad! Free of charge."
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos."
  }
}
</i18n>
