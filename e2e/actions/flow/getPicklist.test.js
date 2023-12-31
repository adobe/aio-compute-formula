/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

//const { Config } = require('@adobe/aio-sdk').Core
const fs = require('fs')
const fetch = require('node-fetch')
const { uploadUrl, actionPrefix } = require('../../../lib/constants');
const { rfReq } = require('../../../test/mocks/mockGetPicklistRequest')
const { addAuthHeaders, getInitializationError } = require("../../../test/lib/testUtils")
const {fetchKey} = require("../../../scripts/manifest.js")

const { reqSchemaKey, respSchemaKey } = require('../../../actions/flow/v1/getPicklist')
const { validateSchema } = require('../../../lib/actionUtils')

const actionUrl = `${actionPrefix}/getPicklist`;


describe('getPicklist e2e test', () => {
    var headers = { "Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on" };
    var key = fetchKey("./manifest.yml")
    addAuthHeaders(headers, key)
    test('months test', async () => {
        var res = await fetch(actionUrl, { method: "POST", body: JSON.stringify(rfReq), headers: headers });
        if (res.status >= 400) {
            console.log(await getInitializationError(res.headers.get('x-openwhisk-activation-id')))
        }
        console.log("res: ", res)
        var json = await res.json();


    })
})