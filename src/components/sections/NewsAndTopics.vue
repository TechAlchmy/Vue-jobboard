<template>
  <div>
    <h1>{{ $t('news-and-topics') }}</h1>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="customers">
          <img :src="val.image">
          <q-card-section class="bg-secondary text-white">
            <div class="text-h6">{{ val.title }}</div>
            <div class="text-subtitle2">{{ val.category }}</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div>{{ val.teaser }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat>{{ val.date }}</q-btn>
          </q-card-actions>
        </q-card>
      </span>
    </div>
  </div>
</template>

<script>
import data from 'src/assets/news-and-topics.json';

export default {
  name: 'NewsAndTopics',
  computed:
  {
    data()
    {
      return data;
    }
  },
};
</script>

<i18n>
{
  "en": {
    "news-and-topics": "News & Topics",
  },
  "de": {
    "news-and-topics": "Aktuelles & Themen",
  }
}
</i18n>
