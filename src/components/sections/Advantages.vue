<template>
  <div align="center">
    <h1>{{ $t('advantages') }}</h1>
    <div class="row items-center">
      <span v-for="val in data" :key="val.name" class="col-3">
        <q-card class="advantages">
          <q-icon style="font-size: 6em;" color="primary" :name="val.icon" />
          <q-card-section>
            <div class="text-h6">{{ $t(val.title) }}</div>
            <div class="text-subtitle2">{{ $t(val.description) }}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat>{{ $t('more') }}</q-btn>
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

<i18n>
{
  "en": {
    "advantages": "Advantages",
    "fast": "Schnell",
    "fast-text": "You get applications quickly. Don't negotiate long, just get started.",
    "simple": "Simple",
    "simple-text": "Everything is simple. Entering a job advertisement. Integrating it into the homepage and placing it on Google",
    "open-source": "Open Source",
    "open-source-text": "You can try out everything and decide at the end whether yawik will help you further",
    "more": "more"
  },
  "de": {
    "advantages": "Ihre Vorteile",
    "fast": "Schnell",
    "fast-text": "Sie bekommen schnell Bewerbungen. Nicht lange verhandeln, einfach loslegen.",
    "simple": "Einfach",
    "simple-text": "Alles ist einfach. Die Eingabe einer Stellenanzeige. Das einbinden in der Hompage und das schalten auf Google",
    "open-source": "Open Source",
    "open-source-text": "Sie können alles ausprobieren und am Ende entscheiden, ob yawik sie weiterbringt",
    "more": "mehr"
  }
}
</i18n>
