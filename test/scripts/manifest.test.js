/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// const {renderManifest} = require("../../scripts/manifest")
const {renderManifest} = require("../../scripts/manifest.js")
const yaml = require('js-yaml');
const fs = require('fs')

describe('test manifest', () => {
    test('test render manifest', async () => {
        renderManifest("./manifest-template.yml", "key", "debug");
        expect(yaml.load(fs.readFileSync("./manifest.yml")).packages.__APP_PACKAGE__.actions["getServiceDefinition"].annotations["require-whisk-auth"]).toEqual("key")
    })
})