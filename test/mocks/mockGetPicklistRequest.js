/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

var monthsReq = {
    "name": "overrideMonth",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}
var knReq = {
    "name": "keyName",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}
var kvReq = {
    "name": "keyValField",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}
var kvReqNoCtxt = {
    "name": "keyValField",
    "type": "flow"
}
var lookupReq = {
    "name": "lookupField",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}
var lookupReqNoCtxt = {
    "name": "lookupField",
    "type": "flow",
    
}
var rfReq = {
    "name": "returnField",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}
var dateReq = {
    "name": "date",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}
var rfReqNoCtxt = {
    "name": "returnField",
    "type": "flow"
}
var logReq = {
    "name": "X-OW-EXTRA-LOGGING",
    "type": "header"
}
var logLvlReq = {
    "name": "LOG_LEVEL",
    "type": "global"
}

var unitReq = {
    "name": "unit",
    "type": "flow",
    "fieldMappingContext": {
        "invocation": [
            {
                "marketoAttribute": "country",
                "serviceAttribute": "country"
            }
        ],
        "callback": [
            {
                "marketoAttribute": "countryCode2",
                "serviceAttribute": "countryCode2"
            }
        ]
    }
}

module.exports = {
    monthsReq,
    knReq,
    kvReq,
    lookupReq,
    rfReq,
    rfReqNoCtxt,
    lookupReqNoCtxt,
    kvReqNoCtxt,
    logReq,
    unitReq,
    dateReq
}