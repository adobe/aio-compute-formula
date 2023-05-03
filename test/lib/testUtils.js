const { Config } = require('@adobe/aio-sdk').Core
const fs = require('fs')
const fetch = require('node-fetch')

var openwhisk = require('openwhisk');
// console.log("local key: ", Config.get("runtime.auth"))
var ow = openwhisk({"api_key": Config.get("runtime.auth"), "apihost": Config.get("runtime.apihost")});
// var ow = openwhisk();

/**
 * Returns error message from bad ow activation
 * 
 * @param {string} activationId id of the activation to retrieve error from
 * @returns {string} error message from "dev error" ow invocation
 */
async function getInitializationError(activationId){
try {
	    var act = await ow.activations.get(activationId)
	    return act.response.result.error;
} catch (error) {
	return error
}
}

// /**
//  * 
//  * @returns access token from .secrets/auth
//  */
// function getAccessToken(){
//     return require('../../.secrets/auth').access_token
// }

// /**
//  * Adds an access_token to a headers object
//  * 
//  * @param {Object} headers list of headers to add to
//  */
// function addTokenHeader(headers){
//     headers["Authorization"] = `Bearer ${getAccessToken()}`
// }

function addOrgHeader(headers){
    headers["x-gw-ims-org-id"] = Config.get("ims.contexts.aio-4566206088344642952.ims_org_id");
}

function addAPIKeyHeader(headers, key){
    headers['x-require-whisk-auth'] = key
}

function addAuthHeaders(headers, key){
    addAPIKeyHeader(headers, key)
    // addTokenHeader(headers);
    // addOrgHeader(headers)
}
module.exports = {
    getInitializationError,
    addOrgHeader,
    addAuthHeaders
}