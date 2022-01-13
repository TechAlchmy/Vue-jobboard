<template>
  <div class="row">
    <q-card>
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        no-caps
        class="full-width bg-primary text-white shadow-2"
      >
        <q-tab name="highlights" icon="mdi-party-popper" :label="$t('hightlights')" />
        <q-tab name="industries" icon="mdi-factory" :label="$t('industries')" />
        <q-tab name="cities" icon="mdi-map-marker" :label="$t('cities')" />
        <q-tab name="companies" icon="mdi-domain" :label="$t('companies')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="highlights">
          <div class="text-h6">{{ $t('hightlights') }}</div>
          <highlights />
        </q-tab-panel>

        <q-tab-panel name="industries">
          <div class="text-h6">{{ $t('industries') }}</div>
          <industries />
        </q-tab-panel>

        <q-tab-panel name="cities">
          <div class="text-h6">{{ $t('cities') }}</div>
          <cities />
        </q-tab-panel>

        <q-tab-panel name="companies">
          <div class="text-h6">{{ $t('companies') }}</div>
          <companies />
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
    cities
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
    "companies": "Companies",
    "cities": "Cities",
    "industries": "Industries",
    "highlights": "Highlights",
  }
}
</i18n>
