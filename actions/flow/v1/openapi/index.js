const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs, handleFNF, validateSchema } = require('../../../../lib/actionUtils')
const { swagger } = require("../../../../resources/v1/svcSwagger")

function main(params) {
    const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.info(stringParameters(params))
    logger.info('env: ', JSON.stringify(process.env))

    var pkgName = process.env.__OW_ACTION_NAME.split('/')[2]
    var namespace = process.env.__OW_ACTION_NAME.split('/')[1]
    var host = `https://${namespace}.adobeioruntime.net/api/v1/web/${pkgName}`
    return {
        statusCode: 200,
        body: swagger(host)
    }
    // return {
    //     statusCode: 200,
    //     body: {
    //         "env": process.env,
    //         "params": params
    //     }
    // }
}
module.exports = { main }