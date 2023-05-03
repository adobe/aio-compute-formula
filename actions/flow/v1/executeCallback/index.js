const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs, handleFNF, validateSchema } = require('../../../../lib/actionUtils')

const actionName = "executeCallback";

const cbSchema = "#/components/schemas/flowCallBack"

const FormulaParser = require('hot-formula-parser').Parser;


async function main(params) {
    const logger = Core.Logger('main', { level: params.context.admin.LOG_LEVEL || 'debug' })

    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.info(stringParameters(params))

    // try {
    //     validateSchema(cbSchema, cbData)
    // } catch (error) {
    //     logger.info(error);
    //     return errorResponse(400, error, logger)
    // }

    var cbData = {
        "munchkinId": params.context.subscription.munchkinId,
    };
    var cbReq = {};

    var objectData = []
    try {
        var parser = new FormulaParser();
        params.objectData.forEach(l => {
            var result = {
                "leadData": {},
                "activityData": {}
            }
            // logger.info(`Field: ${l.flowStepContext.dateField}, Value: ${l.objectContext[l.flowStepContext.dateField]}`)

            try {
                var computedVal;
                if (l.flowStepContext.formula != null && l.flowStepContext.returnField !=  null) {
                    computedVal = computeFormula(parser, l.flowStepContext.formula).result
                }
                // result.leadData[l.flowStepContext.returnField] = dateResult.toISOString().split(".")[0] + offset;
                result.leadData["id"] = l.objectContext.id;
                result.leadData[l.flowStepContext.returnField] = computedVal;
                result.activityData["returnFieldName"] = l.flowStepContext.returnField;
                objectData.push(result)
            } catch (error) {
                logger.info(error)
                result.leadData["id"] = l.objectContext.id;
                result.activityData.success = false
                result.activityData.reason = error.messager
                result.activityData.formula = error.formula
                result.activityData.errorCode = "UNKNOWN_ERROR"
            }
        });
        logger.info("Result set: " + JSON.stringify(objectData))
    } catch (error) {
        logger.info("Caught error while iterating over leads: ", error)
        return errorResponse(500, error, logger)
    }
    cbData["objectData"] = objectData
    cbReq["body"] = cbData;


    var cbRes;
    try {
        var callbackUrl;
        callbackUrl = params.callbackUrl;
        var ioApiKey;
        ioApiKey = params.apiCallBackKey;




        var headers = {
            "Content-Type": "application/json",
            "X-OW-EXTRA-LOGGING": "on",
            //This is the token unique to each request
            "x-callback-token": params.token,
            //API Key for Gateway
            "x-api-key": ioApiKey,
            // "x-callback-token": ioApiKey,
            // "x-api-key": params.token,
        }
        logger.info(JSON.stringify(headers))
        if (!params._isTest || params._isTest == null) {
            logger.info(JSON.stringify(cbData))
            cbRes = await fetch(callbackUrl, { body: JSON.stringify(cbData), headers: headers, method: "POST" })
            var json = await cbRes.json();
            logger.info(JSON.stringify(json));
            logger.info(`CB Status: ${cbRes.status} ${cbRes.statusText}`)
            try {
                logger.info(`Callback Response JSON: ${JSON.stringify(json)}`);
            } catch (error) {
                logger.info("Caught error after invoking callback: ", error)
                return errorResponse(500, error, logger)
            }
        }

    } catch (error) {
        logger.info("Caught an unknown error: ", error);
        return errorResponse(500, error, logger)
    }

    return cbReq;



}

const FORMULA_ERROR_STRINGS = {
    "#ERROR!"   : "Could not compute formula",
    "#DIV/0!"   : "Formula tried to perform division by zero",
    "#NAME?"    : "Function name not recognized",
    "#N/A"      : "A value was missing from the formula",
    "#NUM!"     : "Invalid number in formula",
    "#VALUE!"   : "An argument in the formula is of the wrong type"
}

function computeFormula(parser, formula){
    var resultObj = parser.parse(formula);
    var computedResult = {
    };
    if(resultObj.error != null){
        console.error("Computed formula '" + formula + "' threw error " + resultObj.error);
        throw new friendlyError(resultObj.error, formula);
    }else{
        computedResult.result = resultObj.result;
        return computedResult;
    }
}

function friendlyError(errStr, formula){
    var err = {};
    
    if (FORMULA_ERROR_STRINGS[errStr]){
        err.message = FORMULA_ERROR_STRINGS[errStr];
    }else{
        err.message = "Unknown error occurred";
    }
    err.formula = formula;
    return err;
}

function leadFormulaResult(leadId, targetField, result){
    var lfr = {
        "leadId": leadId
    }
    if(result.error != null){
        lfr.success = false;
        lfr.error = result.error;
        return lfr;
    }else{
        lfr[targetField] = result.result;
        lfr.success = true;
        return lfr;
    }
}


module.exports = {
    main,
    actionName,
    computeFormula
}