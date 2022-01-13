<template>
  <div>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="my-card">
          <img :src="val.logo" style="height: 50px;">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ val.name }}</div>
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
