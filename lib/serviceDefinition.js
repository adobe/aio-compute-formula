const asyncActionName = require("../actions/flow/v1/submitAsyncAction").actionName

const getSdf = function (prefix) {
    return {
        "apiName": "aioFlowCompute",
        "provider": "AIO Compute Formula",
        "i18n": {
            "en_US": {
                "name": "AIO Compute Formula",
                "filterName": "Formual Was Computed",
                "triggerName": "Formula Is Computed",
                "description": "Computes an Excel-style formula and returns the result to the selected field"
            }
        },
        "supportPage": "https://developers.marketo.com",
        "authSetting": {
            authType: "apiKey",
            headerName: "x-require-whisk-auth"
        },
        "primaryAttribute": "formula",
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
                    apiName: "returnString",
                    i18n: {
                        en_US: {
                            name: "Return String",
                            description: "Field to write data back to",
                            uiTooltip: "Field to write data back to"
                        }
                    },
                    dataType: "string",
                    picklistUrl: `${prefix}/getPicklist`,
                    hasPicklist: true,
                    enforcePicklistSelect: true

                },
                {
                    apiName: "returnNum",
                    i18n: {
                        en_US: {
                            name: "Return Number",
                            description: "Number field to write data back to",
                            uiTooltip: "Number field to write data back to"
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
            "subscriptionContext": true
        },
        "callbackPayloadDef": {
            attributes: [
                {
                    apiName: "computedFormula",
                    i18n: {
                        en_US: {
                            name: "Computed Formula",
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