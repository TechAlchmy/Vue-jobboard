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
import { useMeta } from 'quasar';

const metaData = {
  title: 'JobBoard',
  titleTemplate: title => `${title} - Stellenanzeigen finden`,
  meta: {
    description: {
      name: 'description',
      content: 'Das Yawik Jobboard bietet eine Suche für Stellenanzeigen, die mit dem Jobwizard erstellt wurden'
    },
    keywords: {
      name: 'keywords',
      content: 'Jobboard, Stellenanzeigen, Stellenangebote'
    }
  },
  link: {
    material: {
      rel: 'canonical',
      href: 'https://jobboard.yawik.org' + window.location.pathname
    }
  },
  noscript: {
    default: 'Das Yawik Jobboard benötigt Javascript'
  }
};

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
    useMeta(metaData);

    return {
      leftDrawerOpen,
      toggleLeftDrawer()
      {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  computed:
  {
    essentialLinks()
    {
      const linksList = [

        {
          title: this.$t('form_title'),
          caption: this.$t('form_caption'),
          icon: 'favorite',
          link: 'https://form.yawik.org'
        },
        {
          title: this.$t('jobs_title'),
          caption: this.$t('jobs_caption'),
          icon: 'favorite',
          link: 'https://jobwizard.yawik.org'
        },
        {
          title: this.$t('docs'),
          caption: 'yawik',
          icon: 'school',
          link: 'https://jobwizard.yawik.org/docs'
        },
        {
          title: this.$t('src_title'),
          caption: this.$t('src_caption'),
          icon: 'code',
          link: 'https://gitlab.com/yawik/job-portal'
        },
      ];
      return linksList;
    }
  }
});

</script>

<i18n>
{
  "en": {
    "job-portal": "Job portal",
    "jobs": "Jobs",
    "create-job": "Create Job",
    "infos-for-applicant": "Candidate information",
    "jobs_title": "Ad management",
    "jobs_caption": "Create, manage and publish jobs",
    "form_title": "Application forms",
    "form_caption": "Structured applications by mail",
    "docs": "Documentation",
    "src_title": "Open Source",
    "src_caption": "Sources located at Gitlab"
  },
  "de": {
    "job-portal": "Stellenbörse",
    "create-job": "Stellenanzeige erstellen",
    "jobs": "Stellenanzeigen",
    "infos-for-applicant": "Bewerberinformatinen",
    "jobs_title": "Anzeigenverwaltung",
    "jobs_caption": "Stellenanzeigen anlegen, verwalten und veröffentlichen",
    "form_title": "Bewerbungsformulare",
    "form_caption": "Bewerbungen strukturiert per Mail",
    "docs": "Dokumentation",
    "src_title": "Open Source",
    "src_caption": "Quellen auf Gitlab"
  }
}
</i18n>
