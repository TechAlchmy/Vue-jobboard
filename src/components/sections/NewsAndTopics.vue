<template>
  <div align="center">
    <h2>{{ $t('news-and-topics') }}</h2>
    <div class="row q-gutter-md justify-center">
      <span v-for="(val,index) in metas" :key="index" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="customers cursor-pointer" @click="route(val.date)">
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
            <q-badget color="red">{{ val.cat }}</q-badget>
            <q-space />
            <q-btn flat>{{ val.date }}</q-btn>
          </q-card-actions>
        </q-card>
      </span>
    </div>
  </div>
</template>

<script>
//import data from 'src/assets/news-and-topics.json';
import frontMatter from 'front-matter';

export default {
  name: 'NewsAndTopics',
  data()
  {
    return {
      metas: []
    };
  },
  computed:
      {},
  watch: {
    files()
    {
    }
  },
  mounted()
  {
    const illustrations = require.context(
      '../../pages/news',
      false,
      /^(?!.*test.md)((.*\.(md\.*))[^.]*$)/
      ///^.*\.md$/
    );

    const arr = illustrations.keys();
    const records = arr.slice(Math.max(arr.length - 6, 0)).reverse();

    records.forEach(fileName =>
    {
      const data = illustrations(fileName).default;
      const content = frontMatter(data);
      const attributes = content.attributes;
      attributes.date = this.getDateFromFileName(fileName);
      this.metas.push(content.attributes);

      // const str = this.getSubStr(data, '---', '---', 3)

      //  var firstLine = str.split('\n')[0];

      /* let description = this.getSubStr(data, '^', '^', 1);
         console.log('desc1 ' + description);
         description = data.replace(description, '').replace('^^', '');
         console.log('desc ' + description);
         const file = {
           title: this.getSubStr(data, '&&', '&&'),
           description: description,
           teaser: description.substring(1, 128),
           category: this.getSubStr(data, '@@', '@@'),
           image: this.getSubStr(data, '$$', '$$'),
           date: this.getDateFromFileName(fileName)
         };
         this.files.push(file);
         console.log(file);*/
    });
    console.log(this.metas);
  },
  methods:
      {
        route(filename)
        {
          this.$router.push({
            name: 'news',
            params: { filename: filename }
          });
          /*  this.$router.push({
              name: route,
            });*/
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
};
</script>

<i18n>
  {
  "en": {
  "news-and-topics": "News & Topics",
  },
  "de": {
  "news-and-topics": "Aktuelles & Themen",
  }
  }
</i18n>
