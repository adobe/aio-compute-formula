const fetch = require('node-fetch')
const { uploadUrl, actionPrefix } = require('../../../lib/constants');
const {addAuthHeaders, getInitializationError} = require("../../../test/lib/testUtils")


const actionUrl = `${actionPrefix}/serviceSwagger.json`


const meta = require('../../../resources/v1/CFA-Swagger').swagger
const swagger = require('../../../resources/v1/svcSwagger').swagger

const AJV = require('ajv');
const ajv = new AJV({unknownFormats: ["int32", "int64"]});
ajv.addMetaSchema(meta, "cfa-swagger")

describe('e2e tests for serving swagger definition', ()=>{
    test('metaschema validation', async () => {
        var res = await fetch(actionUrl, { headers: { "Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on" }, method: "GET" })
        if(res.status > 201){
            console.log("init error: ", await getInitializationError(res.headers.get('x-openwhisk-activation-id')))
        }
        var json = await res.json();
        console.log(json)
        expect(res.status).toEqual(200);
    })
})