/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { Config, Logger } = require('@adobe/aio-sdk').Core
const myLogger = Logger('main', 'debug')
const fetch = require('node-fetch')
var fs = require('fs');
const { errorResponse, stringParameters, validateSchema, getRuntimePkgName } = require('../lib/actionUtils')



// get action url
const namespace = Config.get('runtime.namespace');
const hostname = Config.get('cna.hostname') || 'adobeioruntime.net';

var isJestRunning;
if (process.env.NODE_ENV == "test") {
    isJestRunning = true;
} else {
    isJestRunning = false;
}
//Jest or Openwhisk?
var packagejson;
var runtimePackage;

var actionPrefix;
// var actionPrefix = Config.get("project.workspace.action_url")
if (isJestRunning) {

    packagejson = JSON.parse(fs.readFileSync('package.json').toString());
    runtimePackage = `${packagejson.name}-${packagejson.version}`;
    actionPrefix = `https://${namespace}.${hostname}/api/v1/web/${runtimePackage}`
    // actionPrefix = `http://localhost:3233/api/v1/web/${runtimePackage}`
} else {
    actionPrefix = `https://${hostname}/api/v1/web/${getRuntimePkgName(process.env, myLogger)}`;
}

var defaultHeaders = { "Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on" }


module.exports = {
    namespace,
    hostname,
    packagejson,
    runtimePackage,
    actionPrefix,
    isJestRunning,
    defaultHeaders
}