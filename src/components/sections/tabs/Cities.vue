<template>
  <div class="row q-gutter-md justify-center" align="center">
    <div class="text-h6 full-width">{{ $t('cities') }}</div>
    <span v-for="val in data" :key="val.name" class="col-md-3 col-sm-6 col-xs-12">
      <q-card class="q-py-md-md">
        <q-item>
          <q-item-section avatar>
            <q-icon size="xl" :name="val.wappen" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ val.name }}</q-item-label>
            <q-item-label caption>
              {{ val.region }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </span>
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
