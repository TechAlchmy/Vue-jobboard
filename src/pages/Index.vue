<template>
  <q-page>
    <h1>{{ $t('sightly-different-jobboard') }}</h1>
    <SearchSection />
    <Advantages />
    <HappyCustomers />
    <NewsAndTopics />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import SearchSection from 'src/components/sections/SearchSection.vue';
import Advantages from 'src/components/sections/Advantages.vue';
import HappyCustomers from 'src/components/sections/HappyCustomers.vue';
import NewsAndTopics from 'src/components/sections/NewsAndTopics.vue';

export default defineComponent({
  name: 'Index',
  components: {
    SearchSection,
    Advantages,
    HappyCustomers,
    NewsAndTopics
  }
});
</script>

<i18n>
{
  "en": {
    "sightly-different-jobboard": "a slightly different jobboard",
    "cities": "Cities",
    "industries": "Industries",
    "highlights": "Highlights",
  },
  "de": {
    "sightly-different-jobboard": "ein etwas anderes Jobportal.",
    "cities": "Städte",
    "industries": "Branchen",
    "highlights": "Highlights",
  }
}
</i18n>
