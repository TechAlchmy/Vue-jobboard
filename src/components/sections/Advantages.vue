<template>
  <div>
    <h1>{{ $t('advantages') }}</h1>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="advantages">
          <img :src="val.logo">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ val.title }}</div>
            <div class="text-subtitle2">{{ val.description }}</div>
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
import data from 'src/assets/advantages.json';
export default {
  name: 'Advantages',
  computed:
  {
    data()
    {
      return data;
    }
  },
};
</script>

<style lang="scss">

.advantages
{
  color: red;
}

</style>
