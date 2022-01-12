<template>
  <div>
    <h1>{{ $t('cities') }}</h1>
    <div v-for="val in data" :key="val.name">
      {{ val }}
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
