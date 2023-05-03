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