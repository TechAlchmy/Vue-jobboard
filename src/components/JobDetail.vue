<template>
  <div v-if="selectedJob!=null" class="row">
    <div class="col-12 q-pa-md text-center">
      <q-btn rounded size="xl" color="secondary">{{ $t('apply') }} </q-btn>
    </div>
    <div class="col-12">
      <div class="q-pa-md">
        <q-card bordered>
          <q-item>
            <q-item-section avatar>
              <q-img fit="contain" :src="jobDetailUrl + selectedJob.attributes.logo.formats.small.url" height="100px" width="150px" />
            </q-item-section>

            <q-item-section>
              <q-item-label align="left">{{ selectedJob.attributes.jobTitle }}</q-item-label>
              <q-item-label align="left" caption>
                {{ selectedJob.attributes.jobTitle }}
              </q-item-label>
              <q-item-label caption>{{ selectedJob.attributes.formattedAddress }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.introLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.attributes.intro" />
              <h2>{{ selectedJob.attributes.jobTitle }}</h2>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.taskLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.attributes.tasks" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.profileLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.attributes.profile" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.offerLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.attributes.offer" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.attributes.contactInfoLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.attributes.contactInfo" />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JobDetail',
  setup()
  {
    const title = ref('yawik jobboard');
    const description = ref('yawik jobboard');
    const keywords = ref('yawik jobboard');

    // NOTICE the parameter here is a function
    // Under the hood, it is converted to a Vue computed prop for reactivity
    useMeta(() =>
    {
      return {
        // whenever "title" from above changes, your meta will automatically update
        title: title.value,
        titleTemplate: title => `${title} - Yawik News`,
        meta: {
          description: {
            name: 'description',
            content: description.value
          },
          keywords: {
            name: 'keywords',
            content: keywords.value
          },
        }
      };
    });

    function pageTitle(val)
    {
      title.value = val; // will automatically trigger a Meta update due to the binding
    }
    function pageKeywords(val)
    {
      title.value = val; // will automatically trigger a Meta update due to the binding
    }
    function pageDescription(val)
    {
      title.value = val; // will automatically trigger a Meta update due to the binding
    }
    return {
      jobDetailUrl: `${process.env.YAWIK_JOB_URL}`,
      pageTitle,
      pageDescription,
      pageKeywords
    };
  },
  props: {
    selectedJob: {
      type: Object,
      required: true,
      default: null
    }
  },
  watch: {
    selectedJob(newVal, oldVal)
    {
      console.log('Val changed');
      this.pageTitle(newVal.attributes.jobTitle);
    }
  },
  mounted()
  {
  },
  methods:
  {
  }
});
</script>

<style lang="scss">
  .highlights
  {
    background-color: $secondary;
  }
</style>

<i18n>
{
  "en": {
    "search-placeholder": "Job title, Company or Location",
    "job-title": "Job title",
    "address": "Address",
    "apply": "Apply"
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "job-title": "Job title",
    "address": "Address",
    "apply": "Bewerben"
  }
}
</i18n>
