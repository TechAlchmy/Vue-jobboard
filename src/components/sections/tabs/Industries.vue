<template>
  <div>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-btn class="full-width" stack no-caps size="xl" :label="val.name" :icon="val.icon" type="a" :href="val.url" />
      </span>
    </div>
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
