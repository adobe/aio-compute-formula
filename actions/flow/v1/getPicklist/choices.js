/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

async function logChoices(logger){
    var choices = [];
    choices.push(await choice("on", true, null, logger));
    choices.push(await choice("off", false, null, logger));
    return choices
}
async function rfChoices(fieldMappingContext, logger) {
    var choices = []
    if(fieldMappingContext != null  && fieldMappingContext.callback != null && fieldMappingContext.callback.length > 0){
        for(var i = 0; i < fieldMappingContext.callback.length; i++ ){
            choices.push(await choice(fieldMappingContext.callback[i].marketoAttribute, fieldMappingContext.callback[i].marketoAttribute, null, logger ))
        }
    }


    return choices;
}

async function logLvlChoices(logger){
    var choices = [];
    choices.push(await choice("debug", "debug", null, logger));
    choices.push(await choice("info", "info", null, logger));
    choices.push(await choice("warning", "warning", null, logger));
    choices.push(await choice("error", "error", null, logger));
    return choices
}


async function choice(en_US, submitVal, translations, logger) {
    var choice = {
        displayValue: {
            en_US: en_US
        },
        submittedValue: submitVal
    }
    if (translations != null && translations.length > 0) {
        translations.forEach(t => {
            choice.displayValue[t.key] = t.val
        })
    }
    logger.debug(`Choice: ${JSON.stringify(choice)}`)
    return choice
}

module.exports = {
    logChoices,
    logLvlChoices,
    rfChoices,
    choice
}