<template>
  <div class="row q-gutter-md justify-center" align="center">
    <div class="text-h6 full-width">{{ $t('companies') }}</div>
    <span v-for="val in data" :key="val.name" class="col-md-3">
      <q-card class="fit">
        <q-card-section>
          <q-img :src="val.logo" fit="contain" img-class="company-logo" height="50px" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>{{ val.description }}</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn disable no-caps flat>{{ $t('jobs') }}</q-btn>
          <q-btn icon="mdi-wikipedia" type="a" :href="val.wikipedia" flat />
        </q-card-actions>
      </q-card>
    </span>
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

.flip-card
{
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner
{
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner
{
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back
{
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front
{
  background-color: #BBB;
  color: black;
}

.flip-card-back
{
  background-color: #2980B9;
  color: white;
  transform: rotateY(180deg);
}

</style>
