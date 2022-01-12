<template>
  <div>
    <h1>{{ $t('industries') }}</h1>
    <span v-for="val in data" :key="val.name">
      <q-btn no-caps size="xl" :label="val.name" :icon="val.icon" type="a" :href="val.url" />
    </span>
  </div>
</template>

<script>
import industries from 'src/assets/industries.json';

export default {
  name: 'Industries',
  computed:
  {
    data()
    {
      return industries;
    }
  },
};
</script>
