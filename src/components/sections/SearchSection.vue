<template>
  <div class="row">
    <q-card>
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        no-caps
        active-color="primary"
        indicator-color="secondary"
        class="full-width"
      >
        <q-tab class="col-md-2" name="highlights" icon="mdi-party-popper" :label="$t('hightlights')" />
        <q-tab class="col-md-2" name="industries" icon="mdi-factory" :label="$t('industries')" />
        <q-tab class="col-md-2" name="cities" icon="location_city" :label="$t('cities')" />
        <q-tab class="col-md-2" name="companies" icon="mdi-domain" :label="$t('companies')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="highlights">
          <highlights />
        </q-tab-panel>

        <q-tab-panel name="highlights">
          <highlights />
        </q-tab-panel>

        <q-tab-panel name="industries">
          <industries />
        </q-tab-panel>

        <q-tab-panel name="cities">
          <cities :title="$t('cities')" />
        </q-tab-panel>

        <q-tab-panel name="companies">
          <companies :title="$t('companies')" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>

import { ref } from 'vue';
import highlights from 'src/components/sections/tabs/Highlights.vue';
import companies from 'src/components/sections/tabs/Companies.vue';
import industries from 'src/components/sections/tabs/Industries.vue';
import cities from 'src/components/sections/tabs/Cities.vue';

export default {
  name: 'SearchSection',
  components: {
    highlights,
    industries,
    companies,
    cities,
  },
  setup()
  {
    return {
      tab: ref('highlights'),
    };
  }
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
  "en": {
    "companies": "big Companies",
    "cities": "Cities",
    "industries": "Industries",
    "highlights": "Highlights",
  },
  "de": {
    "companies": "große Unternehmen",
    "cities": "Städte",
    "industries": "Branchen",
    "highlights": "Highlights",
  },
  "fr": {
    "companies": "grandes entreprises",
    "cities": "Villes",
    "industries": "Branches",
    "highlights": "Points forts",
  }
}
</i18n>
