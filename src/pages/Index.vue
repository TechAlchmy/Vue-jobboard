<template>
  <q-page>
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
