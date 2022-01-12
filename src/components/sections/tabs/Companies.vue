<template>
  <div>
    <h1>{{ $t('companies') }}</h1>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ val.name }}</div>
            <div class="text-subtitle2">{{ val }}</div>
          </q-card-section>

          <q-separator />

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
import companies from 'src/assets/companies.json';

export default {
  name: 'Companies',
  computed:
  {
    data()
    {
      return companies;
    }
  },
};
</script>
