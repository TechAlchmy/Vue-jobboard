<template>
  <div class="full-width">
    <q-form>
      <q-toggle v-model="grid" />
    </q-form>
    <q-table
      ref="resultTable"
      v-model:pagination="pagination"
      :grid="grid"
      :title="`${pagination.rowsNumber} Stellenangebote`"
      :data="data"
      color="secondary"
      card-container-class="q-gutter-md"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="rowsPerPageOptions"
      :filter="tableFilter"
      :loading="loading"
      wrap-cells
      no-data-label="I didn't find anything for you"
      binary-state-sort
      @request="onRequest"
    >
      <template #top>
        <div class="row text-center full-width">
          <q-input
            ref="filterQuery"
            v-model="filter.q"
            class="col-md-4 col-xs-12"
            debounce="300"
            label="Beruf oder Firma"
            outlined
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-select
            ref="filterDistance"
            v-model="filter.d"
            class="col-md-2 col-xs-6"
            :options="distance"
            label="Umkreis"
            outlined
            clearable
            default="10 km"
          />
          <q-btn
            class="col-md-2 col-xs-12"
            color="primary"
            size="lg"
            text-color="white"
            label="Jobs finden"
            @click="setFilter"
          />
        </div>
      </template>

      <template #body-cell-id="props">
        <q-td>
          <div>
            <q-img
              :src="props.row.organizationLogo"
              fit="contain"
              style="width: 100px; max-height: 70px;"
            />
          </div>
        </q-td>
      </template>

      <template #body-cell-title="props">
        <q-td>
          <div>
            <a :href="props.row.link">
              {{ props.row.title }}
            </a>
            <br>
            {{ props.row.organization }}
          </div>
        </q-td>
      </template>

      <template #item="props">
        <q-card class="job col-lg-2 col-md-3 col-sm-6 col-xs-12">
          <q-card-section class="logo">
            <img :src="props.row.organizationLogo">
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item class="jobinfo items-stretch">
              <q-item-section>
                <q-item-label caption>
                  <a :href="props.row.link">{{ props.row.title }}</a>
                </q-item-label>
                <q-item-label caption>
                  {{ props.row.organization }}
                </q-item-label>
                <q-item-label caption wrap>
                  {{ props.row.location }}
                </q-item-label>
                <q-item-label caption>
                  {{ props.row.dateStart }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<script lang="javascript">

export default {
  name: 'Jobsearch',
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
        rowsPerPage: 10,
        rowsNumber: 10
      },
      grid: false,
      distance: ['5 km', '10 km', '20 km', '50 km', '100 km'],
      rowsPerPageOptions: [5, 10, 20, 50],
      columns: [
        {
          name: 'id',
          field: row => row.id,
          required: true
        },
        {
          name: 'title',
          required: true,
          label: 'Stellenangebot',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'location',
          label: 'Einsatzort',
          field: 'location',
          align: 'left',
          sortable: false
        },
        {
          name: 'dateStart',
          label: 'Datum',
          classes: 'no-wrap',
          field: 'dateStart',
          align: 'right',
          sortable: true
        }
      ],
      data: []
    };
  },
  computed: {
    host()
    {
      return process.env.YAWIK_INSTANCE ? process.env.YAWIK_INSTANCE : 'https://yawik.org/demo/de/jobboard';
    }
  },
  created()
  {
    this.grid = !!this.$q.platform.is.mobile;
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

<style lang="scss" scoped>

.job
{
  box-shadow: 0 0 3px #666;
  text-align: center;

  .jobinfo
  {
    background-color: #EEF4FB;
    text-align: left;
  }

  .logo
  {
    height: 80px;
  }

  img
  {
    max-height: 80px;
  }
}

</style>
