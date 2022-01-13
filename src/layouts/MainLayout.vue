<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          :aria-label="$t('menu')"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="logo">
          <q-btn no-caps flat icon="img:../../yawik_logo-mobile.svg" to="/">
            {{ '&nbsp;' + $t('job portal') }}
          </q-btn>
        </q-toolbar-title>
        <q-separator dark vertical />
        <q-btn no-caps stretch flat :label="$t('jobs')" to="jobs" />
        <q-separator dark vertical />
        <q-btn no-caps stretch flat :label="$t('infos-for-applicant')" to="info" />
        <q-separator dark vertical />
        <q-space />
        <SwitchLanguage />
        <q-btn outline class="shadow-2" color="white" type="a" href="https://jobwizard.yawik.org" :label="$t('create-job')" />
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs v-model="footer" no-caps active-color="primary" indicator-color="transparent" class="text-grey">
        <q-tab name="imprint" :label="$t('imprint')" />
        <q-tab name="privary" :label="$t('privacy')" />
        <q-tab name="terms" :label="$t('terms')" />
        <div>{{ $t('Quasar v') + $q.version }}</div>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          {{ $t('Essential Links') }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue';
import SwitchLanguage from 'src/components/SwitchLanguage.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    SwitchLanguage
  },

  setup()
  {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer()
      {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});

</script>

<i18n>
{
  "en": {
    "job-portal": "Job portal",
    "jobs": "Jobs",
    "create-job": "Create Job",
    "infos-for-applicant": "Candidate information"
  },
  "de": {
    "job-portal": "Stellenbörse",
    "create-job": "Stellenanzeige erstellen",
    "jobs": "Stellenanzeigen",
    "infos-for-applicant": "Bewerberinformatinen"
  }
}
</i18n>
