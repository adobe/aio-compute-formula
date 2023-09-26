/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { Config } = require('@adobe/aio-sdk').Core



async function main(){
    var openwhisk = require('openwhisk');
    var ow = openwhisk({"api_key": Config.get("runtime.auth"), "apihost": Config.get("runtime.apihost")});
    
    var result = await ow.actions.invoke({"name": "mkto-flow-lookup-0.0.1/list-files ", "blocking":true, "result":true, params: {target: "/"}})
    
    console.log(JSON.stringify(result))
}

main()

module.exports ={
    main
}