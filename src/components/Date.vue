<template>
  <q-item-label align="center" caption>
    <q-tooltip :delay="1000">{{ new Date(date).toLocaleString($root.$i18n.locale) }}</q-tooltip>
    {{ since(date) }}
  </q-item-label>
</template>

<script>

import { date } from 'quasar';
// destructuring to keep only what is needed
const { getDateDiff } = date;
const today = new Date();

export default {
  name: 'Date',
  props: {
    date: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    since(time)
    {
      const s = getDateDiff(today, time, 'seconds');
      const day = 86400;
      const week = 7 * day;
      const month = 4 * week;
      let text = '';

      if (s < day)
      {
        text = this.$t('today');
      }
      else if (s >= day && s < 2 * day)
      {
        text = this.$t('yesterday');
      }
      else if (s >= 2 * day && s < 7 * day)
      {
        text = this.$t('n-days', [Math.round(s / day)]);
      }
      else if (s >= 7 * day && s < 14 * day)
      {
        text = this.$t('1-week');
      }
      else if (s >= 14 * day && s < 30 * day)
      {
        text = this.$t('n-weeks', [Math.round(s / week)]);
      }
      else if (s >= 30 * day && s < 60 * day)
      {
        text = this.$t('1-month');
      }
      else if (s >= 60 * day && s < 365 * day)
      {
        text = this.$t('n-months', [Math.round(s / month)]);
      }
      else if (s >= 365 * day && s < 750 * day)
      {
        text = this.$t('1-year');
      }
      else if (s >= 750 * day)
      {
        text = this.$t('n-years', [Math.round(s / (12 * month))]);
      }
      return text;
    }
  }
};
</script>

<i18n>
{
  "en": {
    "search-placeholder": "Job title, Company or Location",
    "first-ad": "Place your first ad! Free of charge.",
    "today": "today",
    "yesterday": "yesterday",
    "n-days": "{0} days ago",
    "1-week": "one week ago",
    "n-weeks": "{0} weeks ago",
    "1-month": "one month ago",
    "n-months": "{0} months ago",
    "1-year": "one year ago",
    "n-years": "{0} years ago"
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos.",
    "today": "Heute",
    "yesterday": "Gestern",
    "n-days": "vor {0} Tagen",
    "1-week": "vor einer Woche",
    "n-weeks": "vor {0} Wochen",
    "1-month": "vor einem Monat",
    "n-months": "vor {0} Monaten",
    "1-year": "vor einem Jahr",
    "n-years": "vor {0} Jahren"
  },
  "fr": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos.",
    "today": "Aujourd'hui",
    "yesterday": "Hier",
    "n-days": "il y a {0} jours",
    "1-week": "il y a une semaine",
    "n-weeks": "il y a {0} semaines",
    "1-month": "il y a un mois",
    "n-months": "il y a {0} mois",
    "1-year": "il y a un an",
    "n-years": "il y a {0} an"
  },
}
</i18n>
