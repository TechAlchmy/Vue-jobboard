<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <toolbar @toggle-drawer="toggleLeftDrawer" />
      <q-carousel v-if="$route.path === '/'" v-model="slide" class="full-width" animated height="50vh">
        <q-carousel-slide
          name="first"
          :img-src="background"
          class="text-white"
        >
          <div class="absolute-center full-width">
            <div class="claim text-center">{{ $t('sightly-different-jobboard') }}</div>
            <div class="full-width justify-center">
              <searchform />
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-header>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey">
        <q-tab name="imprint" :label="$t('imprint')" />
        <q-tab name="privary" :label="$t('privacy')" />
        <q-tab name="terms" :label="$t('terms')" />
        <div>{{ $t('Quasar v') + $q.version }}</div>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          {{ $t('differently_because') }}
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
    <q-page-sticky position="bottom-right" class="z-top" :offset="[20, 20]">
      <q-btn
        fab
        icon="add"
        color="secondary"
        :label="$t('create-job')"
        to="/info/stellenanzeige-erstellen"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>

import EssentialLink from 'components/EssentialLink.vue';
import Toolbar from 'components/Toolbar.vue';
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';
import searchform from 'src/components/SearchForm.vue';
import frontMatter from 'front-matter';

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

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    searchform,
    Toolbar
  },

  setup()
  {
    useMeta(metaData);
    const leftDrawerOpen = ref(false);

    return {
      slide: 'first',
      metas: [],
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
          icon: 'feed',
          link: 'https://form.yawik.org'
        },
        {
          title: this.$t('jobs_title'),
          caption: this.$t('jobs_caption'),
          icon: 'view_list',
          link: 'https://jobwizard.yawik.org'
        },
        {
          title: this.$t('docs'),
          caption: 'yawik',
          icon: 'auto_stories',
          link: 'https://jobwizard.yawik.org/docs'
        },
        {
          title: this.$t('src_title'),
          caption: this.$t('src_caption'),
          icon: 'code',
          link: 'https://gitlab.com/yawik/jobboard'
        },
      ];
      return linksList;
    },
    background()
    {
      return process.env.YAWIK_BACKGROUND;
    }
  },
  mounted()
  {
    const illustrations = require.context(
      '../pages/infos',
      true,
      /^.*\.md$/
    );

    const arr = illustrations.keys();
    const records = arr.slice(Math.max(arr.length - 6, 0)).reverse();

    records.forEach(fileName =>
    {
      const data = illustrations(fileName).default;
      const content = frontMatter(data);
      const attributes = content.attributes;
      console.log(fileName);

      attributes.filename = fileName;
      this.metas.push(content.attributes);
    });
  }
});

</script>

<style lang="scss">

.claim
{
  font-size: 3em;
  margin-bottom: 1em;
}

</style>

<i18n>
{
  "en": {
    "jobboard": "Job portal",
    "applicants": "Applicants",
    "search": "find jobs",
    "what": "what are you looking for?",
    "where": "where do you search?",
    "jobs": "Jobs",
    "create-job": "Create Job",
    "infos-for-applicant": "Candidate information",
    "jobs_title": "Ad management",
    "jobs_caption": "Create, manage and publish jobs",
    "form_title": "Application forms",
    "form_caption": "Structured applications by mail",
    "docs": "Documentation",
    "src_title": "Open Source",
    "src_caption": "Sources located at Gitlab",
    "sightly-different-jobboard": "a slightly different job board ...",
    "differently_because": "differently, because it's 100% open source."
  },
  "de": {
    "jobboard": "Stellenbörse",
    "applicants": "Bewerber",
    "search": "Jobs finden",
    "what": "was suchen sie?",
    "where": "wo suchen sie?",
    "create-job": "Stellenanzeige erstellen",
    "jobs": "Stellenanzeigen",
    "infos-for-applicant": "Bewerberinformatinen",
    "jobs_title": "Anzeigenverwaltung",
    "jobs_caption": "Stellenanzeigen anlegen, verwalten und veröffentlichen",
    "form_title": "Bewerbungsformulare",
    "form_caption": "Bewerbungen strukturiert per Mail",
    "docs": "Dokumentation",
    "src_title": "Open Source",
    "src_caption": "Quellen auf Gitlab",
    "sightly-different-jobboard": "eine etwas andere Stellenbörse ...",
    "differently_because": "anders, weil es 100% open source ist."
  },
  "fr": {
    "jobboard": "Bourse d'emploi",
    "applicants": "Candidates",
    "search": "Trouver des jobs",
    "what": "que cherchez-vous ?",
    "where": "où cherchez-vous ?",
    "create-job": "Créer une offre d'emploi",
    "jobs": "Offres d'emploi",
    "infos-for-applicant": "Informations sur le candidat",
    "jobs_title": "Gestion des annonces",
    "jobs_caption": "Créer, gérer et publier des offres d'emploi",
    "form_title": "Formulaires de candidature",
    "form_caption": "Candidatures structurées par e-mail",
    "docs": "Documentation",
    "src_title": "Open Source",
    "src_caption": "Les sources sur Gitlab",
    "sightly-different-jobboard": "une bourse de l'emploi un peu différente ...",
    "differently_because": "différent, car il est 100% open source."
  }
}
</i18n>
