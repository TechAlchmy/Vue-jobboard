<template>
  <div class="row justify-center" align="center">
    <div class="text-h6">{{ $t('first-ad') }}</div>
    <ais-instant-search
      :search-client="searchClient"
      index-name="jobs"
    >
      <ais-state-results>
        <template #default="{ results: { hits } }">
          <div class="row justify-center q-gutter-md">
            <span v-for="val in hits" :key="val.id" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <q-card class="jobs fit">
                <q-card-section>
                  <q-item>
                    <q-item-section avatar>
                      <q-img fit="contain" :src="'https://api.yawik.org' + val.logo" width="50px" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label align="left">{{ val.title }}</q-item-label>
                      <q-item-label align="left" caption>
                        {{ val.organization }}
                      </q-item-label>
                      <q-item-label align="left" caption>{{ val.formattedAddress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </span>
            <span v-for="val in data" :key="val.id" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <q-card class="jobs fit">
                <q-card-section>
                  <q-item>
                    <q-item-section avatar>
                      <q-img fit="contain" :src="val.organizationLogo" width="50px" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label align="left">{{ val.title }}</q-item-label>
                      <q-item-label align="left" caption>
                        {{ val.organization }}
                      </q-item-label>
                      <q-item-label align="left" caption>{{ val.formattedAddress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </span>
          </div>
        </template>
      </ais-state-results>
    </ais-instant-search>
  </div>
</template>

<script>

import algoliasearch from 'algoliasearch/lite';

export default {
  name: 'Highlights',
  setup()
  {
    return {
      searchClient: algoliasearch(
        process.env.ALGOLIA_NAME,
        process.env.ALGOLIA_KEY
      ),
    };
  },
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
      data: []
    };
  },
  computed: {
    host()
    {
      return process.env.YAWIK_EXTERNAL_JOBS;
    }
  },
  mounted()
  {
    this.onRequest({
      pagination: this.pagination
    });
  },
  methods: {
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
        q: filter.q,
        l: filter.l,
        d: filter.d
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
    }
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
    "first-ad": "Place your first ad! Free of charge."
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos."
  }
}
</i18n>
