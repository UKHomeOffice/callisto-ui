# Callisto UI

[![Build Status](https://drone-gl.acp.homeoffice.gov.uk/api/badges/callisto/ui/status.svg)](https://drone-gl.acp.homeoffice.gov.uk/callisto/ui)

## Prerequisites

Install [Node](https://nodejs.org) and validate with `node -v`

Install Docker, validate with `docker -v` to ensure the docker service is running

## Getting started

Create an .env.local file in the root and add the following:

```
VITE_KC_URL="http://localhost:8080/auth/"
VITE_KC_REALM="callistorealm"
VITE_KC_CLIENTID="callistoreactclientid"

VITE_TIMECARD_API_URL = "http://localhost:3000/"
VITE_ACCRUALS_API_URL = "http://localhost:3000/"
```

Before running the application for the first time, install the node packages

`npm install`

### Run the application

`npm start`

Navigate to http://localhost:3000

The application will serve mock data from JSON server by default

### To use your local API e.g. for Timecard

1. Set the \_API_URL environment variables to the local dev server (currently 'http://localhost:3000')
2. Set the \_API_URL_PROXY to your local API

```
VITE_TIMECARD_API_URL = "http://localhost:3000/"
VITE_TIMECARD_API_URL_PROXY = "http://localhost:9090/"
```

#### How is this working?

The dev server is running on 'http://localhost:3000' and the proxy (see [vite.config.js](https://github.com/UKHomeOffice/callisto-ui/blob/main/vite.config.js) server > proxy) listens for requests based on a particular path. Any requests matching that path e.g. a call from the Timecard Service to http://localhost:3000/resources/time-period-types, will have the appropriate proxy config applied.

```
server: {
      proxy: {
        '/resources/time-period-types': timecardConfig,
```

The config below 'proxies' the request to the target, which in this case will be the value defined in the timecard '\_PROXY' environment variable

```
const timecardConfig = {
   target: getUrl('TIMECARD'),
   changeOrigin: true,
   xfwd: true,
 };

 const getUrl = (apiName) => {
   const keyName = 'VITE_' + apiName + '_API_URL_PROXY';
   const proxyToUrl = process.env[keyName];
   console.log('Proxying ' + apiName + ' to: ' + proxyToUrl);
   return proxyToUrl;
 };
```

Read more about the [Vite Proxy](https://vitejs.dev/config/server-options.html#server-proxy) options

### To use a mix of mock data and a local API

You can explicitly set the '\_PROXY' environment variable to the JSON Server url http://localhost:3001. Or remove the '\_PROXY' environment variable and that API call will use mock data by default.

The below examples are both valid to set Timecard to use mock data and Accruals to use the local service running on port 9091.

```
Example 1:
VITE_TIMECARD_API_URL="http://localhost:3000/"
VITE_ACCRUALS_API_URL="http://localhost:3000/"
VITE_TIMECARD_API_URL_PROXY="http://localhost:3001/"
VITE_ACCRUALS_API_URL_PROXY="http://localhost:9091/"
```

```
Example 2:
VITE_TIMECARD_API_URL="http://localhost:3000/"
VITE_ACCRUALS_API_URL="http://localhost:3000/"
VITE_ACCRUALS_API_URL_PROXY="http://localhost:9091/"
```

### Build the application for Production

`npm run build`

### View the Production application

`npm vite preview`

## Recommended Dev Tools

1. VS Code and VS Code extensions

   `brew install --cask visual-studio-code`

   - ESLint
   - Prettier
   - SonarLint
   - GitLens

2. Google Chrome and Developer Tools

   `brew install --cask google-chrome`

   - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
   - [axe Dev Tools (Web Accessibility Testing)](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

### Development Dependencies

| **Dependency** | **Use**                                                 |
| -------------- | ------------------------------------------------------- |
| json-server    | Mock API that simulates create, update, delete          |
| vite           | Bundler with plugin ecosystem and integrated dev server |
| npm-run-all    | Run parallel npm commands cross O/S                     |

## Troubleshooting

If you’re using an AMD (M1,M2) chip mac, you might encounter problems starting the keycloak docker container. We’ve had some success building a new image locally, as per the instructions in this github thread: https://github.com/docker/for-mac/issues/5310#issuecomment-877653653

If you are running the tests and it's failing with with an error like the one below of just seems to not recognise any React syntax you should delete the node_module_linux folder. Now only the UI tests should run.
```
Error: Cannot parse /<Callisto UI repo path>/node_modules_linux/resolve/test/resolver/malformed_package_json/package.json as JSON: Unexpected end of JSON input
```

## Running UI in LocalDev Environment

### Step 1

Download Callisto LocalDev repository from https://github.com/UKHomeOffice/callisto-localdev and follow the instruction in the callisto-localdev repository to start local environment.

### Step 2

Stop `web` (UI) service using command `docker compose stop web` (Make sure you are in the localdev project directory where the docker-compose.yml file used to start the localdev environment is located)

### Step 3

Run command `docker compose up -d` from the root level of the local Callisto UI project.

## LocalDev solution and .env file

`.env` shouldn't be changed. It contain variables used by LocalDev solution.

If you want to use mock data or any other, custom values for environment variables, please create file `.env.local` and set those values in that file

**NPM** has priority when using .env files

Files on the left have more priority than files on the right

`npm start: .env.development.local, .env.local, .env.development, .env`

These variables will act as the defaults if the machine does not explicitly set them.

### Scenario 1

I want to use UI within the LocalDev solution, but I need to work with Timecard-restapi mock api and data.

Steps:

Create file .env.local (if not exists) in the root of the project.

Override .env VITE_TIMECARD_API_URL variable to point Timecard-restapi mock:

`VITE_TIMECARD_API_URL = "http://localhost:50001/"`

Re-run container to use updated env variables by using commands `docker compose restart web` and
