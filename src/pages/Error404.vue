<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh;">
        404
      </div>

      <div class="text-h2" style="opacity: 0.4;">
        {{ $t('file-not-found') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="$t('label.home')"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404'
});
</script>

<i18n>
{
  "en": {
    "file-not-found": "Ops... file not found.",
  },
  "de": {
    "file-not-found": "Upps... Datei nicht gefunden.",
  }
}
</i18n>
