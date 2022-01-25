<template>
  <q-toolbar class="row">
    <q-btn
      flat
      dense
      round
      icon="menu"
      :aria-label="$t('menu')"
      @click="emitData"
    >
      <q-tooltip delay="1000">
        {{ $t('for-developers') }}
      </q-tooltip>
    </q-btn>
    <q-toolbar-title>
      <q-btn no-caps flat :icon="$q.config.logo" to="/">
        {{ '&nbsp;' + $q.config.sitename }}
      </q-btn>
    </q-toolbar-title>

    <q-separator dark vertical />
    <q-btn v-for="(val1,idx1) in top" :key="idx1" stretch flat no-caps :label="$t(val1.label)">
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
      >
        <q-list>
          <q-item
            v-for="(val2,idx2) in top[idx1].items"
            :key="idx2"
            clickable
            :disable="val2.disable ? true : false"
            :to="val2.to"
          >
            <q-item-section avatar>
              <q-icon
                :color="val2.color ? val2.color : 'secondary'"
                :name="val2.icon"
              />
            </q-item-section>
            <q-item-section>{{ $t(val2.label) }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <q-separator v-if="idx1 != top[idx1].items.length" style="margin: 0 -16px 0 16px;" dark vertical />
    </q-btn>
    <q-separator dark vertical />
    <q-space />
    <switch-language />
  </q-toolbar>
</template>

<script>

import { defineComponent } from 'vue';
import menu from 'src/assets/menu/top';
import SwitchLanguage from 'src/components/SwitchLanguage.vue';

export default defineComponent({
  name: 'Toolbar',
  emits: ['toggle-drawer'],
  components: {
    SwitchLanguage
  },
  computed:
  {
    top()
    {
      return menu;
    }
  },
  methods:
  {
    emitData(toggleLeftDrawer)
    {
      this.$emit('toggle-drawer');
    }
  }
});
</script>

<i18n>
{
  "en": {
    "for-applicants": "for applicants",
    "for-companies": "for companies",
    "for-developers": "for software developers",
    "create-jobs": "create job posting",
    "find-jobs": "find jobs",
    "general": "general",
    "prices": "prices",
    "remembered-jobs": "gespeicherte Stellenanzeigen",
    "about-yawik": "about Yawik"
  },
  "de": {
    "for-applicants": "für Bewerber",
    "for-companies": "für Unternehmen",
    "for-developers": "für Software-Entwickler",
    "create-jobs": "Stellenanzeige anlegen",
    "find-jobs": "Jobs finden",
    "general":" Allgemein",
    "prices": "Preise",
    "remembered-jobs": "gespeicherte Stellenanzeigen",
    "about-yawik": "über Yawik"
  },
  "fr": {
    "for-applicants": "for applicants",
    "for-companies": "for companies",
    "for-developers": "pour les développeurs de logiciels",
    "create-jobs": "create job posting",
    "find-jobs": "find jobs",
    "general": "général",
    "prices": "prices",
    "remembered-jobs": "saved jobs",
    "about-yawik": "à propos de Yawik"
  }
}
</i18n>
