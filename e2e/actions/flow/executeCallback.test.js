// const { Config } = require('@adobe/aio-sdk').Core
// const fs = require('fs')
const fetch = require('node-fetch')
const { sumScoreReq} = require('../../../test/mocks/mockAsyncRequest')
const {addAuthHeaders, getInitializationError} = require("../../../test/lib/testUtils")
const {fetchKey} = require("../../../scripts/manifest.js")
const {actionPrefix } = require('../../../lib/constants');


const actionUrl = `${actionPrefix}/executeCallback`;


describe('executeCallback e2e test', () => {
    test('exec w/ valid params', async () => {
        const expectedDt = "2023-01-01T00:00:00Z"

        var headers = {"Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on"};
        var key = fetchKey("./manifest.yml")
        addAuthHeaders(headers, key)
        var res = await fetch(actionUrl, {"headers": headers, body: JSON.stringify(sumScoreReq), method: "POST"})
        console.log(res);
        if(res.status > 201){
            console.log("init error: ", await getInitializationError(res.headers.get('x-openwhisk-activation-id')))
        }
        var json = await res.json();
        console.log(JSON.stringify(json))
        expect(json.objectData[0].leadData).toEqual(expect.objectContaining({"testString": sumScoreReq._expectedValue}))
    })

})