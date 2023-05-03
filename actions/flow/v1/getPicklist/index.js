const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs, handleFNF, validateSchema } = require('../../../../lib/actionUtils')
const {operationChoices, unitChoices, logChoices, logLvlChoices, rfChoices, dateChoices, monthChoices} = require('./choices')

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
        if(params.name === "operation"){
            choices = await operationChoices(logger)
        }
        if(params.name === "dateField"){
            choices = await dateChoices(params.fieldMappingContext, logger)
        }
        if(params.name == "unit"){
            choices = await unitChoices(logger)
        }
        if(params.name == "returnField"){
            choices = await rfChoices(params.fieldMappingContext, logger)
        }
        if(params.name.toLowerCase() ===  "x-ow-extra-logging"){
            choices = await logChoices(logger)
        }
        if(params.name.toLowerCase() === "log_level"){
            choices = await logLvlChoices(logger);
        }
        if(params.name.toLowerCase() === "overridemonth"){
            choices = await monthChoices(logger)
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