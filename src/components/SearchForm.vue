<template>
  <q-form action="/jobs" method="post" class="row justify-center q-gutter-md">
    <q-input bg-color="white" class="z-top col-md-4 col-xs-6" type="text" outlined :label="$t('what')" />
    <q-input bg-color="white" class="z-top col-md-4 col-xs-6" type="text" outlined :label="$t('where')" />
    <q-btn class="col-md-2 col-xs-12" color="primary" no-caps :label="$t('search')" to="jobs" />
  </q-form>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchForm',
  setup()
  {
    return {};
  },
});
</script>

<i18n>
{
  "en": {
    "search": "find jobs",
    "what": "what are you looking for?",
    "where": "where do you search?",
  },
  "de": {
    "search": "Jobs finden",
    "what": "was suchen sie?",
    "where": "wo suchen sie?",
  },
  "fr": {
    "search": "Trouver des jobs",
    "what": "que cherchez-vous ?",
    "where": "où cherchez-vous ?",
  }
}
</i18n>
