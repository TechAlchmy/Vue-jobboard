<template>
  <q-page padding>
    <q-badge>{{ $t('Neuigkeiten von Yawik') }}</q-badge>
    <q-badge>{{ category }}</q-badge>{{ new Date(date).toLocaleString($root.$i18n.locale) }}
    <q-markdown :src="markdown" toc @data="onToc" />
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
import frontMatter from 'front-matter';
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'News',
  components: {
    QMarkdown
  },
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
      keywords.value = val;
    }
    function pageDescription(val)
    {
      description.value = val;
    }

    return {
      pageTitle,
      pageDescription,
      pageKeywords
    };
  },
  data()
  {
    return {
      markdown: null,
      date: null,
      category: null,
      toc: [],
    };
  },
  mounted()
  {
    //iconsole.log(this.$route.params);
    const fileName = this.$route.params.date + '/' + this.$route.params.title;
    import('./' + fileName + '.md').then(m =>
    {
      const data = m.default;
      const content = frontMatter(data);
      const attributes = content.attributes;
      this.markdown = content.body;
      console.log('data', attributes);
      this.pageDescription(attributes.desc);
      this.pageTitle(attributes.title);
      this.pageKeywords(attributes.keywords);
      this.category = attributes.cat;
      this.date = attributes.date;
    });
  },
  methods: {
    onToc(toc)
    {
      this.toc = toc;
      this.pageTitle(toc[0].label);
    }
  }
});
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>
