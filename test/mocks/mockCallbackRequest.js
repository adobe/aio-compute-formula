/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { actionPrefix } = require('../../lib/constants')
const mockCallbackUrl = `${actionPrefix}/mockCallbackResponse`;

const mockSingleLead = {
        "munchkinId": "AAA-999-ZZZ",
        // "munchkin": "AAA-999-ZZZ",
        "token": "0550e558-530a-40aa-83a8-c02c7a6831cb",
        "time": new Date().toISOString(),
        "objectData": [
            {
                "leadData": {
                    "id": 1000,
                    "country-code-2": "ZW"
                },
                "activityData": {
                    "foo": "bar",
                    "baz": "foo",
                    "bar": "baz",
                    "int": 50
                }
            }
        ]
};

module.exports = {
    mockSingleLead
}