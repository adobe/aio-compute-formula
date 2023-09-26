/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const {validateSchema} = require('../../../lib/actionUtils')
const { Core } = require('@adobe/aio-sdk')
const {main} = require('../../../actions/flow/v1/getPicklist')
const {rfReq} = require("../../mocks/mockGetPicklistRequest")

describe('getPicklist local', () =>{
    const logger = Core.Logger('main', 'debug' )
    test('rfChoices', async () => {
        var resp = await main(rfReq);
        console.log(resp)
        expect(resp.body.choices[0].displayValue.en_US).toEqual("countryCode2");
        expect(resp.body.choices[0].submittedValue).toEqual("countryCode2");
    })
})