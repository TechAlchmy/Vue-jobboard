# Yawik Jobboard

The Yawik Jobboard is a portal for job advertisements and serves as an example of a Quasar app that can be used as a job board. 

All job advertisements are "real". Posting ads is free of charge. All ads placed are manually checked and activated.

## Install
```bash
git clone git@gitlab.com:yawik/jobbord.git
cd jobboard
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
```

### Lint the files
```bash
yarn lint
```
to fix lint errors

```bash
yarn lintfix
```

### Build the app for production
```bash
quasar build
```

### Customize

The jobboard is .env-aware. All possible values are locatewd in `.env`. 
Values in `.env.local` overwrite those in `.env`

| Name                         | Value                                      | 
|------------------------------|--------------------------------------------|
| YAWIK_BACKGROUND             | Background Image on Startpage              |
| YAWIK_EXTERNAL_JOBS          | https://yawik.org/demo/de/jobboard         |
| YAWIK_JOB_URL                | Endpoint for job details                   |
| YAWIK_API_URL                | Endpoint for job lists                     |
| YAWIK_URL_OPERATOR           | Links to the opeartor of the form          |
| YAWIK_URL_IMPRINT            | Link to the Imprint of the operator        |
| YAWIK_URL_PRIVACY            | Link to the Privacy notes                  |



