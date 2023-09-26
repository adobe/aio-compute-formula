/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const token = require('../.secrets/auth').access_token

function getBearerTokenString(){
    return `Bearer ${token}`
}
function logBearerTokenString(){
    console.log(getBearerTokenString())
}

module.exports = {
    getBearerTokenString,
    logBearerTokenString
}

logBearerTokenString()