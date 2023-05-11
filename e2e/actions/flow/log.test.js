const { Config } = require('@adobe/aio-sdk').Core
const fs = require('fs')
const fetch = require('node-fetch')
const { uploadUrl, actionPrefix } = require('../../../lib/constants');
const { sumScoreReq } = require("../../../test/mocks/mockAsyncRequest");
const {addAuthHeaders} = require("../../../test/lib/testUtils")
const {fetchKey} = require("../../../scripts/manifest.js")


const actionUrl = `${actionPrefix}/log`;

describe('log e2e test', () => {
    test('log', async () => {
        var headers = { "Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on" };
        var key = fetchKey("./manifest.yml")
        addAuthHeaders(headers, key)
        console.log(headers)
        var res = await fetch(actionUrl, { headers: headers, body: JSON.stringify(sumScoreReq),  method: "POST" })
        var json = await res.json();
        console.log(json)
        expect(res).toEqual(expect.objectContaining({ status: 200 }))
        
    })
})