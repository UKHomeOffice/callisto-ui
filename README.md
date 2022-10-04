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
VITE_LOCAL_API_URL="http://localhost:9090/"
VITE_TIMECARD_API_URL = "http://localhost:9090/"
```

Before running the application for the first time, install the node packages

`npm install`

### Run the application (using mock data)

`npm start`

Navigate to http://localhost:3000

### Run the application using local services

`npm run start:dev`

The default url will be http://localhost:5000 to override, add the following to .env.local:
`VITE_LOCAL_API_URL="http://{url:port}"`

Then run:
`npm run start:dev`

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
