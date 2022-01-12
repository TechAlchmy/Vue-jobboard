<template>
  <div>
    <h1>{{ $t('companies') }}</h1>
    <div v-for="val in data" :key="val.name">
      {{ val }}
    </div>
  </div>
</template>

<script>
import companies from 'src/assets/companies.json';

export default {
  name: 'Companies',
  setup()
  {
    return {};
  },
  computed:
  {
    data()
    {
      return companies;
    }
  },
};
</script>
