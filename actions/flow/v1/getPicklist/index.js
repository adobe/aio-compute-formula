/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs, handleFNF, validateSchema } = require('../../../../lib/actionUtils')
const { logChoices, logLvlChoices, rfChoices, } = require('./choices')

const actionName = "getPicklist";

const reqSchemaKey = "#/components/schemas/getPicklistRequest"
const respSchemaKey = "#/components/schemas/picklistObject"

async function main(params){
    const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))
    // try {
    //     validateSchema(reqSchemaKey, params)
    // } catch (error) {
    //     return errorResponse(400, error, logger)
    // }

    var choices;
    try {
        logger.debug(`Trying to get choices for field: ${params.name}`)
        if(params.name == "returnString"){
            choices = await rfChoices(params.fieldMappingContext, logger)
        }
        if(params.name == "returnNum"){
            choices = await rfChoices(params.fieldMappingContext, logger)
        }
        if(params.name.toLowerCase() ===  "x-ow-extra-logging"){
            choices = await logChoices(logger)
        }
        if(params.name.toLowerCase() === "log_level"){
            choices = await logLvlChoices(logger);
        }
        logger.debug(`Choices: ${JSON.stringify(choices)}`)
    } catch (error) {
        return errorResponse(500, error, logger)
    }

    var response = {
        statusCode: 200,
        body: {
            "choices": choices
        }
    }
    logger.debug(`Response: ${JSON.stringify(response)}`)
    return response
}
module.exports ={
    main,
    reqSchemaKey,
    respSchemaKey,
    actionName
}