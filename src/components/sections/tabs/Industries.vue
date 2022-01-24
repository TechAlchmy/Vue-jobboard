<template>
  <div class="row q-gutter-md justify-center" align="center">
    <div class="text-h6 full-width">{{ $t('industries') }}</div>
    <span v-for="val in data" :key="val.name" class="col-3">
      <q-btn class="full-width shadow-3" stack type="a" no-caps :href="val.url">
        <q-icon size="xl" :name="val.icon" color="secondary" />
        <div class="text-primary">{{ val.name }}</div>
      </q-btn>
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
