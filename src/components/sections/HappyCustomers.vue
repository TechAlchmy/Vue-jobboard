<template>
  <div>
    <h1>{{ $t('happy-customers') }}</h1>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="customers">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="val.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ val.title }}</q-item-label>
              <q-item-label caption>
                {{ val.subtitle }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <img :src="val.logo">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ val.title }}</div>
            <div class="text-subtitle2">{{ val.subtitle }}</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div>{{ val.description }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat>1</q-btn>
            <q-btn flat>2</q-btn>
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
