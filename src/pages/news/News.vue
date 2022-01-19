<template>
  <q-page padding>
    <h1>{{ $t('news') }}</h1>
    <q-markdown :src="markdown" toc @data="onToc" />
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
//import markdown from './2022-01-18.md';
import frontMatter from 'front-matter';

export default {
  name: 'News',
  components: {
    QMarkdown
  },
  data()
  {
    return {
      markdown: null,
      toc: []
    };
  },
  computed: {},
  mounted()
  {
    const fileName = this.$route.params.filename + '.md';
    import('./' + fileName).then(m =>
    {
      const data = m.default;

      /* const subStr = data.substring(
           data.indexOf('^') + 1,
           data.lastIndexOf('^')
         );
         const description = data.replace(subStr, '').replace('^^', '');*/
      this.markdown = frontMatter(data).body;
    });
  },
  methods: {
    onToc(toc)
    {
      console.log('TOC ' + JSON.stringify(toc));
      this.toc = toc;
    }
  }
};
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>
