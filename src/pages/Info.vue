<template>
  <q-page padding>
    <h1 style="padding: 0; margin: 0;">{{ $t('info') }}</h1>
    <q-markdown :src="markdown" toc @data="onToc" />
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
import frontMatter from 'front-matter';

export default {
  name: 'Info',
  components: {
    QMarkdown
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
    import('./infos/Infos-test.md').then(m =>
    {
      const data = m.default;
      const content = frontMatter(data);
      const attributes = content.attributes;
      this.markdown = content.body;
      this.category = attributes.cat;
      this.date = attributes.date;
    });
  },
  methods: {
    onToc(toc)
    {
      this.toc = toc;
    }
  }
};
</script>
