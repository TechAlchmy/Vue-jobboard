<template>
  <q-page padding>
    <h1>{{ $t('news') }}</h1>
    <q-markdown :src="markdown" toc @data="onToc" />
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
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
    console.log(this.$route.params);
    const fileName = this.$route.params.filename + '.md';
    import('./' + fileName).then(m =>
    {
      const data = m.default;
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
