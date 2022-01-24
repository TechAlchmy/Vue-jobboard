<template>
  <div align="center">
    <h2>{{ $t('happy-customers') }}</h2>
    <div class="row justify-center q-gutter-md">
      <span v-for="val in data" :key="val.name" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="customers fit">
          <q-item>
            <q-chat-message
              :name="val.title"
              :avatar="val.avatar + ', ' + val.subtitle"
              :text="val.description"
              size="9"
              stamp="3 minutes ago"
              text-color="white"
              bg-color="primary"
            />
          </q-item>

          <q-card-actions align="center">
            <q-btn no-caps type="a" :href="val.more" flat>
              <q-img height="50px" fit="contain" :src="val.logo" />
              <span>{{ val.company }}</span>
            </q-btn>
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
