<template>
  <div>
    <div class="row">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="fit">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ val.name }}</div>
          </q-card-section>
          <q-img :src="val.logo" fit="contain" img-class="company-logo" height="50px" />
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

<style lang="scss">

.company-logo
{
  filter: grayscale(1);
}

.company-logo:hover
{
  filter: grayscale(0);
}

</style>
