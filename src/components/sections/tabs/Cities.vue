<template>
  <div>
    <h1>{{ $t('cities') }}</h1>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="my-card">
          <q-icon size="xl" :name="val.wappen" />
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ val.name }}</div>
            <div class="text-subtitle2">{{ val }}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat>1</q-btn>
            <q-btn flat icon="mdi-wikipedia">2</q-btn>
          </q-card-actions>
        </q-card>
      </span>
    </div>
  </div>
</template>

<script>
import cities from 'src/assets/cities.json';

export default {
  name: 'Cities',
  computed:
  {
    data()
    {
      return cities;
    }
  },
};
</script>
