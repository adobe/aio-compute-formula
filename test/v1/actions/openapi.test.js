/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const meta = require('../../../resources/v1/CFA-Swagger').swagger
const swagger = require('../../../resources/v1/svcSwagger').swagger
const { actionPrefix} = require('../../../lib/constants')

const AJV = require('ajv');
const ajv = new AJV({unknownFormats: ["int32", "int64"]});
ajv.addMetaSchema(meta, "cfa-swagger")

describe('tests for serving swagger definition', ()=>{
    test('metaschema validation', async () => {
        expect(ajv.validateSchema(swagger(actionPrefix))).toEqual(true);
    })
})