<template>
  <div align="center">
    <h2>{{ $t('happy-customers') }}</h2>
    <div class="row justify-center q-gutter-md">
      <span v-for="val in data" :key="val.name" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="customers fit">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="val.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label align="left">{{ val.title }}</q-item-label>
              <q-item-label align="left" caption>
                {{ val.subtitle }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-card-section>
            <div class="text-h6">{{ val.title }}</div>
            <div class="text-subtitle2">{{ val.subtitle }}</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div>{{ val.description }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat>{{ $t('more') }}</q-btn>
          </q-card-actions>
        </q-card>
      </span>
    </div>
  </div>
</template>

<script>

import data from 'src/assets/happy-customers.json';

export default {
  name: 'HappyCustomers',
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
    "happy-customers": "Happy customers",
  },
  "de": {
    "happy-customers": "Zufriedene Kunden",
  }
}
</i18n>
