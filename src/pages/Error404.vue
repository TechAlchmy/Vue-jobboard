<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh;">404</div>

      <div class="text-h3" style="opacity: 0.4;">
        {{ $t('file-not-found') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="$t('go-home')"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default
{
  name: 'Error404'
};
</script>

<i18n>
  {
    "en": {
      "file-not-found": "The requested page could not be found",
      "go-home": "go to home page",
    },
    "de": {
      "go-home": "zur Startseite",
      "file-not-found": "Die angeforderte Seite konnte nicht gefunden werden"
    },
    "fr": {
      "go-home": "vers la page d'accueil",
      "file-not-found": "La page demandée n'a pas été trouvée"
    }
  }
</i18n>
