<template>
  <div align="center">
    <h2>{{ $t('news-and-topics') }}</h2>
    <div class="row q-gutter-md justify-center">
      <span v-for="(val,index) in metas" :key="index" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="customers cursor-pointer" @click="route(val.filename)">
          <q-img fit="cover" :src="val.image" height="200px">
            <div class="absolute-bottom text-subtitle2 text-left">
              <div>{{ val.title }}</div>
            </div>
          </q-img>
          <q-separator />
          <q-card-section>
            <div>{{ val.desc }}</div>
          </q-card-section>
          <q-card-actions>
            <q-badge color="secondary">{{ val.cat }}</q-badge>
            <q-space />
            <date :date="val.date" />
          </q-card-actions>
        </q-card>
      </span>
    </div>
  </div>
</template>

<script>
import frontMatter from 'front-matter';

import { defineComponent } from 'vue';
import Date from 'src/components/Date.vue';

export default defineComponent({
  name: 'NewsAndTopics',
  components:
  {
    Date
  },
  data()
  {
    return {
      metas: []
    };
  },
  watch: {
    files()
    {
    }
  },
  mounted()
  {
    const illustrations = require.context(
      '../../pages/news',
      true, // subdirectories
      //      /((.*\.(md\.*))[^.]*$)/
      /^.*\.md$/
    );

    const arr = illustrations.keys();
    const records = arr.slice(Math.max(arr.length - 6, 0)).reverse();

    records.forEach(fileName =>
    {
      const data = illustrations(fileName).default;
      const content = frontMatter(data);
      const attributes = content.attributes;
      attributes.filename = this.getDateFromFileName(fileName);
      this.metas.push(content.attributes);
    });
  },
  methods:
      {
        route(filename)
        {
          const matches = filename.match(/(.*)\/(.*)/);
          this.$router.push({
            name: 'news',
            params: {
              date: matches[1],
              title: matches[2]
            }
          });
        },
        getDateFromFileName(fileName)
        {
          return fileName.replace('./', '').replace('.md', '');
        },
        getSubStr(str, start, end, index = 2)
        {
          return str.substring(
            str.indexOf(start) + index,
            str.lastIndexOf(end)
          );
        }
      }
});
</script>

<i18n>
{
  "en":
  {
    "news-and-topics": "News & Topics",
    "day_ago": "days ago"
  },
  "de":
  {
    "news-and-topics": "Aktuelles & Themen",
    "days_ago": "vor Tagen"
  }
}
</i18n>
