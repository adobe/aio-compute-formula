/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { Config } = require('@adobe/aio-sdk').Core
const { Core } = require('@adobe/aio-sdk');
const fs = require('fs')

const AJV = require('ajv');
const ajv = new AJV({ unknownFormats: ["int32", "int64"] });

const { swagger } = require('../resources/v1/CFA-Swagger');
ajv.addSchema(swagger, 'cfa-swagger');

function getHostname() {
  return hostname;
}

function getRtPkgName(env, logger) {
  if (logger) {
    logger.debug(env)
  }
  if (env.__OW_ACTION_NAME != null) {
    return env.__OW_ACTION_NAME.split('/')[2];
  }

}



function getRtActionPrefix(env, namespace, hostname) {
  return `https://${namespace}.${hostname}/api/v1/web/${getRtPkgName(env)}`;
};


/**
 *
 * Returns a log ready string of the action input parameters.
 * The `Authorization` header content will be replaced by '<hidden>'.
 *
 * @param {object} params action input parameters.
 *
 * @returns {string}
 *
 */
function stringParameters(params) {
  // hide authorization token without overriding params
  let headers = params.__ow_headers || {}
  if (headers.authorization) {
    headers = { ...headers, authorization: '<hidden>' }
  }
  return JSON.stringify({ ...params, __ow_headers: headers })
}

/**
 *
 * Returns the list of missing keys giving an object and its required keys.
 * A parameter is missing if its value is undefined or ''.
 * A value of 0 or null is not considered as missing.
 *
 * @param {object} obj object to check.
 * @param {array} required list of required keys.
 *        Each element can be multi level deep using a '.' separator e.g. 'myRequiredObj.myRequiredKey'
 *
 * @returns {array}
 * @private
 */
function getMissingKeys(obj, required) {
  return required.filter(r => {
    const splits = r.split('.')
    const last = splits[splits.length - 1]
    const traverse = splits.slice(0, -1).reduce((tObj, split) => { tObj = (tObj[split] || {}); return tObj }, obj)
    return traverse[last] === undefined || traverse[last] === '' // missing default params are empty string
  })
}

/**
 *
 * Returns the list of missing keys giving an object and its required keys.
 * A parameter is missing if its value is undefined or ''.
 * A value of 0 or null is not considered as missing.
 *
 * @param {object} params action input parameters.
 * @param {array} requiredHeaders list of required input headers.
 * @param {array} requiredParams list of required input parameters.
 *        Each element can be multi level deep using a '.' separator e.g. 'myRequiredObj.myRequiredKey'.
 *
 * @returns {string} if the return value is not null, then it holds an error message describing the missing inputs.
 *
 */
function checkMissingRequestInputs(params, requiredParams = [], requiredHeaders = []) {
  let errorMessage = null

  // input headers are always lowercase
  requiredHeaders = requiredHeaders.map(h => h.toLowerCase())
  // check for missing headers
  const missingHeaders = getMissingKeys(params.__ow_headers || {}, requiredHeaders)
  if (missingHeaders.length > 0) {
    errorMessage = `missing header(s) '${missingHeaders}'`
  }

  // check for missing parameters
  const missingParams = getMissingKeys(params, requiredParams)
  if (missingParams.length > 0) {
    if (errorMessage) {
      errorMessage += ' and '
    } else {
      errorMessage = ''
    }
    errorMessage += `missing parameter(s) '${missingParams}'`
  }

  return errorMessage
}

/**
 *
 * Extracts the bearer token string from the Authorization header in the request parameters.
 *
 * @param {object} params action input parameters.
 *
 * @returns {string|undefined} the token string or undefined if not set in request headers.
 *
 */
function getBearerToken(params) {
  if (params.__ow_headers &&
    params.__ow_headers.authorization &&
    params.__ow_headers.authorization.startsWith('Bearer ')) {
    return params.__ow_headers.authorization.substring('Bearer '.length)
  }
  return undefined
}
/**
 *
 * Returns an error response object and attempts to log.info the status code and error message
 *
 * @param {number} statusCode the error status code.
 *        e.g. 400
 * @param {string} error the error.
 *        e.g. 'missing xyz parameter'
 * @param {*} [logger] an optional logger instance object with an `info` method
 *        e.g. `new require('@adobe/aio-sdk').Core.Logger('name')`
 *
 * @returns {object} the error object, ready to be returned from the action main's function.
 *
 */
function errorResponse(statusCode, error, logger) {
  if (logger && typeof logger.info === 'function') {
    logger.info(`${statusCode}: ${error}`)
  }
  return {
    "statusCode": statusCode,
    "body": {
      "error": error
    }
  }
}

/* async function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
} */

//TODO, replace w/ multipart library implementation
async function extractBoundary(headerString) {
  var parts = headerString.split(";");
  var boundary;
  parts.forEach(element => {
    if (element.indexOf("boundary") > -1) {
      boundary = element.split("=")[1];
    }
  });
  return boundary;
}

/**  
* Searches headers list for a given header regardless of case
* 
* @param headers {array} Headers list
* @param key {string} Header name to locate
*
* @returns The value of the desired header
*/

async function findHeaderIgnoreCase(headers, key) {
  return headers[Object.keys(headers)
    .find(k => k.toLowerCase() === key.toLowerCase())
  ];
}

async function handleFNF(error, logger) {
  if (error.code == "ERROR_FILE_NOT_EXISTS") {
    return errorResponse(404, error, logger);
  } else throw error;
}

/**
 * Used to validate incoming requests
 * 
 * @param {object} schemaKeyRef Schema reference to validate against
 * @param {object} object Object to be validated
 * 
 * @throws {error} List validation message
 * 
 * @returns {boolean}
 */

function validateSchema(schemaKeyRef, obj) {
  var valid = ajv.validate(schemaKeyRef, obj);
  if (ajv.errors && ajv.errors.length > 0) {
    throw new Error(ajv.errorsText(ajv.errors))
  }
  return valid;
}

module.exports = {
  errorResponse,
  getBearerToken,
  stringParameters,
  checkMissingRequestInputs,
  extractBoundary,
  findHeaderIgnoreCase,
  handleFNF,
  getRtActionPrefix,
  getHostname,
  getRuntimePkgName: getRtPkgName,
  validateSchema
}
