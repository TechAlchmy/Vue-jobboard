<template>
  <div class="row justify-center" align="center">
    <div class="col-12">
      <div class="text-h6">{{ $t('first-ad') }}</div>
    </div>
    <div class="col-12">
      <div class="row justify-center q-gutter-md">
        <span v-for="val in rows" :key="val.id" class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
          <q-card class="jobs fit">
            <q-card-section>
              <q-item
                clickable
                @click="route(val.id, val.attributes.jobTitle)"
              >
                <q-item-section avatar>
                  <q-img fit="contain" :src="jobHost + val.attributes.logo.formats.thumbnail.url" height="50px"
                         width="100px"
                  />
                  <q-item-label align="left"
                                caption
                  >
                    {{ diff(today,val.attributes.createdAt) }} {{ $t('days') }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label align="left">
                    {{ val.attributes.jobTitle }}
                  </q-item-label>
                  <q-item-label align="left" caption>
                    {{ val.attributes.organization }}
                  </q-item-label>
                  <q-item-label align="left" caption>{{ val.attributes.formattedAddress }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </span>
        <span v-for="val in data" :key="val.id" class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
          <q-card class="jobs fit">
            <q-card-section>
              <q-item
                clickable
                disable
              >
                <q-item-section avatar>
                  <q-img fit="contain" :src="val.organizationLogo" width="100px" height="50px" />
                  <q-item-label align="left" caption>{{ diff(today,new Date(val.dateStart)) }} {{ $t('days') }}</q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label align="left">
                    {{ val.title }}
                  </q-item-label>
                  <q-item-label align="left" caption>
                    {{ val.organization }}
                  </q-item-label>
                  <q-item-label align="left" caption>{{ val.location }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import { date } from 'quasar';
// destructuring to keep only what is needed
const { getDateDiff } = date;

export default {
  name: 'Highlights',
  data()
  {
    return {
      filter: {
        q: '',
        l: '',
        d: ''
      },
      tableFilter: {},
      loading: false,
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 9,
        rowsNumber: 10
      },
      data: [],
      today: new Date(),
      rows: [],
      jobsUrl: `${process.env.YAWIK_API_URL}/api/jobs`,
    };
  },
  computed:
      {
        host()
        {
          return process.env.YAWIK_EXTERNAL_JOBS;
        },
        jobHost()
        {
          return process.env.YAWIK_JOB_URL;
        },
        diff()
        {
          return getDateDiff;
        }
      },
  mounted()
  {
    this.onRequest({
      pagination: this.pagination
    });
    this.getJobs();
  },
  methods: {
    route(id, title)
    {
      this.$router.push({
        name: 'jobs',
        params: {
          id: id,
          title: title
        }
      });
    },
    onRequest(props)
    {
      const {
        page,
        rowsPerPage,
        rowsNumber,
        sortBy,
        descending
      } = props.pagination;

      this.loading = true;

      // emulate server
      setTimeout(() =>
      {
        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage;

        // fetch data from "server"
        const returnedData = this.fetchFromServer(
          page,
          fetchCount,
          sortBy,
          descending,
          this.filter
        );
        console.log(returnedData);

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        // ...and turn of loading indicator
        this.loading = false;
      }, 2000);
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(page, count, sortBy, descending, filter)
    {
      const data = [];
      const query = {
        json: '1',
        page: page,
        count: count,
        q: 'vue',
        l: filter.l,
        d: filter.d,
      };

      const queryStr = Object.keys(query)
        .map(k => `${k}=${encodeURIComponent(query[k])}`)
        .join('&');

      this.$axios
        .get(this.host + '?' + queryStr)
        .then(response =>
        {
          this.data = response.data.jobs;
          this.pagination.rowsNumber = response.data.total;
          this.pagination.page = response.data.currentPage;
        })
        .catch(() =>
        {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          });
        });

      return data;
    },

    setFilter()
    {
      this.tableFilter = {
        q: this.filter.q,
        l: this.filter.l,
        d: this.filter.d
      };
    },
    getJobs(pagination = { pagination: this.pagination })
    {
      this.loading = true;
      this.$axios.get(this.jobsUrl, {
        params: {
          'pagination[page]': pagination.pagination.page,
          'pagination[pageSize]': pagination.pagination.rowsPerPage,
          populate: 'html,logo',
          sort: 'publishedAt:desc'
        }
      }
      ).then(response =>
      {
        this.rows = response.data.data;
        this.setPagination(response.data.meta.pagination);
      }).finally(() =>
      {
        this.loading = false;
      });
    },
    setPagination(pagination)
    {
      this.pagination = {
        sortBy: 'asc',
        descending: true,
        rowsNumber: pagination.total,
        page: pagination.page,
        rowsPerPage: pagination.pageSize
      };
    },
  }
};
</script>

<style lang="scss">

  body
  {
    font-family: sans-serif;
    padding: 1em;
  }

  .q-card,
  .ais-InstantSearch
  {
    width: 100%;
  }

  .jobs
  {
    background-color: $primary-light;
  }

</style>

<i18n>
  {
  "en": {
  "search-placeholder": "Job title, Company or Location",
  "first-ad": "Place your first ad! Free of charge.",
  "days": "days",
  },
  "de": {
  "search-placeholder": "Anzeigentitel, Firma oder Ort",
  "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos.",
  "days": "Tage"
  }
  }
</i18n>
