<template>
  <q-page padding>
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
  watch: {
    '$route'(path)
    {
      const file = this.$route.path.split('/').pop();
      this.load(file);
    }
  },
  mounted()
  {
    this.load();
  },
  methods: {
    onToc(toc)
    {
      this.toc = toc;
    },
    load(file)
    {
      const fileName = file || this.$route.params.filename;
      console.log('file', fileName);
      import('./infos/' + fileName + '.md').then(m =>
      {
        const data = m.default;
        const content = frontMatter(data);
        const attributes = content.attributes;
        this.markdown = content.body;
        this.category = attributes.cat;
        this.date = attributes.date;
      });
    }
  }
};
</script>
