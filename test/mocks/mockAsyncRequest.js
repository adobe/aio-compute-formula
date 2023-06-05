const { actionPrefix } = require('../../lib/constants')

// const namespace = Config.get('runtime.namespace');
// const hostname = Config.get('cna.hostname') || 'adobeioruntime.net';
// const packagejson = JSON.parse(fs.readFileSync('package.json').toString());
// const runtimePackage = `${packagejson.name}-${packagejson.version}`
// const actionPrefix = `https://${namespace}.${hostname}/api/v1/web/${runtimePackage}`
const mockCallbackUrl = `${actionPrefix}/mockCallbackResponse`;

const testDt = "2022-01-01T00:00:00Z";

var mockSingleLead = {
    "_isTest": true,
    "id": 1001,
    "batchid": "9e7df252-1969-4f22-861a-82d19769eb1b",
    "campaignId": 1001,
    "type": "dummy",
    "callbackUrl": mockCallbackUrl,
    "token": "eb26ba28-e3f4-4423-a75d-28118b81828c",
    "context": {
        "subscription": {
            "munchkinId": "AAA-999-ZZZ",
            "prefix": "marketob2"
        },
        "admin": {
            "foo": "bar",
            "LOG_LEVEL": "debug"
        },
        "campaign": {
            "id": 1001,
            "name": "mock"
        },
        "program": {
            "id": 1001,
            "name": "mock"
        }
    },
    "objectData": [
        {
            "objectType": "lead",
            "objectContext": {
                "id": 1000000,
                "email": "test@example.com",
                "country": "Zimbabwe",
                "dateOfBirth": testDt
            },
            "flowStepContext": {
                //date, operation, returnField, unit, amount
                "formula": "",
                "returnString": "testString"
            }
        }
    ]
}


let sumScoreReq = Object.assign(mockSingleLead, {} )
sumScoreReq.objectData[0].flowStepContext.formula = "SUM(1,2)"
sumScoreReq._expectedValue = 3

let sumNegReq = Object.assign(mockSingleLead, {} )
sumNegReq.objectData[0].flowStepContext.formula = "SUM(1,-2)"
sumNegReq._expectedValue = -1

let compScoreReq = Object.assign(mockSingleLead, {} )
compScoreReq.objectData[0].flowStepContext.formula = "SUM(PRODUCT(1, .8), PRODUCT(-1, 1.7))"
compScoreReq._expectedValue = -0.9

let arithmeticStrReq = Object.assign(mockSingleLead, {} )
arithmeticStrReq.objectData[0].flowStepContext.formula = "1 + -2"
arithmeticStrReq._expectedValue = -1

let substituteTxtReq = Object.assign(mockSingleLead, {} )
substituteTxtReq.objectData[0].flowStepContext.formula = `SUBSTITUTE("You're a wizard, Harry!", "wizard", "witch")`
substituteTxtReq._expectedValue = "You're a witch, Harry!"

let tolowerReq = Object.assign(mockSingleLead, {} )
tolowerReq.objectData[0].flowStepContext.formula = `LOWER("LOWERCASE")`
tolowerReq._expectedValue = "lowercase"

let toUpperReq = Object.assign(mockSingleLead, {} )
toUpperReq.objectData[0].flowStepContext.formula = `UPPER("uppercase")`
toUpperReq._expectedValue = "UPPERCASE"

let toProperReq = Object.assign(mockSingleLead, {} )
toProperReq.objectData[0].flowStepContext.formula = `PROPER("estados unidos")`
toProperReq._expectedValue = "Estados Unidos"

module.exports = {
    sumScoreReq,
    sumNegReq,
    compScoreReq,
    arithmeticStrReq,
    substituteTxtReq,
    tolowerReq,
    toUpperReq,
    toProperReq
}