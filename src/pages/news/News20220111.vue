<template>
  <q-page padding>
    <h1>{{ $t('news') }}</h1>
    <q-markdown :src="markdown" toc @data="onToc" />
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
import markdown from './test.md';

export default {
  name: 'News20220111',
  components: {
    QMarkdown
  },
  data()
  {
    return {
      markdown: markdown,
      toc: []
    };
  },
  computed: {},
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
