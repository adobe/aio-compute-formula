const asyncActionName = require("../actions/flow/v1/submitAsyncAction").actionName

const getSdf = function (prefix) {
    return {
        "apiName": "aioDateMate2",
        "provider": "Marketo Date Math2",
        "i18n": {
            "en_US": {
                "name": "Date Math2",
                "filterName": "Date was changed2",
                "triggerName": "Date was changed2",
                "description": "Performs arithmetic on a date field, and writes it back to the designated date field"
            }
        },
        "supportPage": "https://developers.marketo.com",
        "supportEmail": "test@example.com",
        "authSetting": {
            authType: "apiKey",
            headerName: "x-require-whisk-auth"
        },
        //TODO is this right?
        "primaryAttribute": "dateField",
        "invocationPayloadDef": {
            //invocationAttributeObject
            "globalAttributes": [{
                "apiName": "LOG_LEVEL",
                "i18n": {
                    "en_US": {
                        "name": "LOG_LEVEL"
                    }
                },
                "dataType": "string",
                "hasPicklist": true
            }],
            "headers": [{
                "name": "X-OW-EXTRA-LOGGING",
                "hasPicklist": true,
                "description": {
                    "en_US": "Enable extra logging for successful actions"
                }
            }],
            "flowAttributes": [
                {
                    apiName: "formula",
                    i18n: {
                        en_US: {
                            name: "Formula",
                            description: "Formula to compute",
                            uiTooltip: "Formula to compute"
                        }
                    },
                    dataType: "text",
                    hasPicklist: false
                },
                {
                    apiName: "returnField",
                    i18n: {
                        en_US: {
                            name: "Return Field",
                            description: "Field to write data back to",
                            uiTooltip: "Field to write data back to"
                        }
                    },
                    dataType: "string",
                    picklistUrl: `${prefix}/getPicklist`,
                    hasPicklist: true,
                    enforcePicklistSelect: true

                }
                

            ],
            //serviceFieldMapping
            // "fields": [],
            "userDrivenMapping": false,
            "programContext": false,
            "campaignContext": false,
            "triggerContext": false,
            "programMemberContext": false,
            "subscriptionContext": false
        },
        "callbackPayloadDef": {
            attributes: [
                {
                    apiName: "formula",
                    i18n: {
                        en_US: {
                            name: "Formula",
                            description: "The formula which was computed",
                            uiTooltip: "The formula which was computed"
                        }
                    },
                    dataType: "string"
                },
                {
                    apiName: "returnVal",
                    i18n: {
                        en_US: {
                            name: "Returned Value",
                            description: "The value returned by the service",
                            uiTooltip: "The value returned by the service"
                        }
                    },
                    dataType: "string"
                },
                {
                    apiName: "returnFieldName",
                    i18n: {
                        en_US: {
                            name: "Return Field",
                            description: "Name of the field to which the value was written",
                            uiTooltip: "Name of the field to which the value was written"
                        }
                    },
                    dataType: "string"
                }
            ],
            userDrivenMapping: true
        }
    }
}



module.exports = {
    getSdf
}