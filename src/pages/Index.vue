<template>
  <q-page>
    <div class="row header-section">
      <div class="col-12">
        <div style="padding: 100px;">
          <h1 style="margin: 0;">{{ $t('sightly-different-jobboard') }}</h1>
        </div>
        <div class="row justify-center" style="margin: 20px 20px 50px 20px;">
          <q-input class="col-2" type="text" outlined :label="$t('what')" />
          <q-input class="col-2" type="text" outlined :label="$t('where')" />
          <q-btn class="col-2" color="primary" :label="$t('submit')" />
        </div>
      </div>
    </div>
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

<style>
  .header-section
  {
    background-image: url("/bg_image.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

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
