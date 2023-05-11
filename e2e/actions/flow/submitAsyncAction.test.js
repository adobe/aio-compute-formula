const { Config } = require('@adobe/aio-sdk').Core
const fs = require('fs')
const fetch = require('node-fetch')
const { uploadUrl, actionPrefix } = require('../../../lib/constants');
const {sumScoreReq} =  require("../../../test/mocks/mockAsyncRequest")
const { addAuthHeaders, getInitializationError } = require("../../../test/lib/testUtils")
const {fetchKey} = require("../../../scripts/manifest.js")

const actionUrl = `${actionPrefix}/submitAsyncAction`;

describe('submitAsyncAction e2e test', () => {
    var openwhisk = require('openwhisk');
    var ow = openwhisk({ "api_key": Config.get("runtime.auth"), "apihost": Config.get("runtime.apihost") });
    var cbActId;
    test('submit async w/ valid params', async () => {
        // console.log(JSON.stringify(mockSingleLead))
        var headers = { "Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on" };
        var key = fetchKey("./manifest.yml")
        addAuthHeaders(headers, key)
        // console.log(headers)
        var res = await fetch(actionUrl, { headers: headers, body: JSON.stringify(sumScoreReq), method: "POST" })
        console.log(res.headers);
        console.log("response: ", JSON.stringify(res))
        //get callback activation id
        // cbActId = await res.headers.get("X-CB-Activation-Id");
        // console.log("initialization error: ", await getInitializationError(cbActId))
        expect(res).toEqual(expect.objectContaining({ status: 201 }))

    })
    // test('validate callback activation', async () => {
    //     setTimeout(async () => {
    //         var cbAct = await ow.activations.get(cbActId);
    //         // console.log("cbAct: ", cbAct);
    //         expect(cbAct.response.result.body.objectData[0].leadData).toEqual(expect.objectContaining({ "countryCode2": "ZW", "id": 1000000 }));
    //     }, 1000);

    // })
})