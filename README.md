# aio-date-math

aio-date-math is an application that implements the Marketo Self-Service Flow Steps Service Provider interface.  Deploying and configuring this application in a Marketo instance will make the "Date Math" flow step available

To deploy this application. you must have an *Adobe IO Runtime* account, in addition to a Marketo engage instance.


## Setup

- [Get IO runtime credentials.](https://www.adobe.io/apis/experienceplatform/runtime/docs.html#!adobedocs/adobeio-runtime/master/getting_started.md) and save them locally
- [Download and install NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Download and install the AIO Command Line Application](https://developer.adobe.com/app-builder/docs/getting_started/)
- use `aio app use` to select your credentials and workspace


## Local Dev

- `aio app run --local` to start your local Dev server
- App will run on `localhost:9080` by default

By default the UI will be served locally but actions will be deployed and served from Adobe I/O Runtime. To start a
local serverless stack and also run your actions locally use the `aio app run --local` option.

## Test & Coverage

- to run local functional tests use `npm test`
- to 

## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

## Config & Deploy

- in a terminal, navigate to the local folder of this repository
- use `npm install` to install local dependencies
- use the `npm run render-manfest <path:'./manifest.yml'> <apiKey> <logLevel>` to render a minfest.yml file from `./manifest-template.yml`.  This allows you to set an api key and define a global log level for all of your actions
- use `aio app deploy` to deploy this application
- In Marketo, Navigate to the admin menu
- Navigate to the Service Providers menu
- From your terminal use `aio app get-url` and copy the URL for the serviceSwagger action
- In the Service Providers menu, click Add New Service
- Enter your API key in the authentication menu
- In the Map outgoing fields menu, add and enable all of the fields which you want this service to be able to operate on, e.g. Date of Birth, Registration Date...etc.
- In the Map Incoming Fields menu, add and enable all of the fields which you want the service to be able to write to, e..g Next Resgitration Anniversary
- Select values for the Global Attributes of your Service
- Confirm the requested contexts, and global configuration will be complete, and the flow step will be available in Smart Campaign menus

## Usage

Strings must be quoted