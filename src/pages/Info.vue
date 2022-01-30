<template>
  <q-page padding>
    <q-card
      v-if="toc.length"
      class="gt-xs float-right q-ma-md"
      flat
      bordered
    >
      <q-card-section horizontal>
        <!-- We use 'q-expansion-item' to enable toggling (hide/show) the TOC -->
        <q-expansion-item
          default-opened
          icon="toc"
          label="Table of contents"
        >
          <q-separator />
          <q-list>
            <template v-for="item in toc">
              <q-item
                v-if="!item.children.length"
                :key="item.id"
                :to="`#${item.id}`"
              >
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
              <q-expansion-item
                v-else
                :key="item.id"
                default-opened
                :label="item.label"
                :to="`#${item.id}`"
              >
                <q-list>
                  <q-item
                    v-for="childItem in item.children"
                    :key="childItem.id"
                    dense
                    :inset-level="0.2"
                    :to="`#${childItem.id}`"
                  >
                    <q-item-section>{{ childItem.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </template>
          </q-list>
        </q-expansion-item>
      </q-card-section>
    </q-card>
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
