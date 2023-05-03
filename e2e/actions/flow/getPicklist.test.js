//const { Config } = require('@adobe/aio-sdk').Core
const fs = require('fs')
const fetch = require('node-fetch')
const { uploadUrl, actionPrefix } = require('../../../lib/constants');
const { monthsReq } = require('../../../test/mocks/mockGetPicklistRequest')
const { addAuthHeaders, getInitializationError } = require("../../../test/lib/testUtils")
const { reqSchemaKey, respSchemaKey } = require('../../../actions/flow/v1/getPicklist')
const { validateSchema } = require('../../../lib/actionUtils')

const actionUrl = `${actionPrefix}/getPicklist`;


describe('getPicklist e2e test', () => {
    var headers = { "Content-Type": "application/json", "X-OW-EXTRA-LOGGING": "on" };
    test('months test', async () => {
        var res = await fetch(actionUrl, { method: "POST", body: JSON.stringify(monthsReq), headers: headers });
        if (res.status >= 400) {
            console.log(await getInitializationError(res.headers.get('x-openwhisk-activation-id')))
        }
        console.log("res: ", res)
        var json = await res.json();
        console.log(JSON.stringify(json))
        expect(res).toEqual(expect.objectContaining({ status: 200 }))

        expect(json.choices[0].displayValue.en_US).toEqual("January");
        expect(json.choices[0].submittedValue).toEqual(0);
        expect(json.choices[1].displayValue.en_US).toEqual("February");
        expect(json.choices[1].submittedValue).toEqual(1);
        expect(json.choices[2].displayValue.en_US).toEqual("March");
        expect(json.choices[2].submittedValue).toEqual(2);
        expect(json.choices[3].displayValue.en_US).toEqual("April");
        expect(json.choices[3].submittedValue).toEqual(3);
        expect(json.choices[4].displayValue.en_US).toEqual("May");
        expect(json.choices[4].submittedValue).toEqual(4);
        expect(json.choices[5].displayValue.en_US).toEqual("June");
        expect(json.choices[5].submittedValue).toEqual(5);
        expect(json.choices[6].displayValue.en_US).toEqual("July");
        expect(json.choices[6].submittedValue).toEqual(6);
        expect(json.choices[7].displayValue.en_US).toEqual("August");
        expect(json.choices[7].submittedValue).toEqual(7);
        expect(json.choices[8].displayValue.en_US).toEqual("September");
        expect(json.choices[8].submittedValue).toEqual(8);
        expect(json.choices[9].displayValue.en_US).toEqual("October");
        expect(json.choices[9].submittedValue).toEqual(9);
        expect(json.choices[10].displayValue.en_US).toEqual("November");
        expect(json.choices[10].submittedValue).toEqual(10);
        expect(json.choices[11].displayValue.en_US).toEqual("December");
        expect(json.choices[11].submittedValue).toEqual(11);
        // expect(validateSchema(respSchemaKey, json)).toEqual(true);

    })
})