
/**
 * 
 */

async function dateChoices(fieldMappingContext, logger){
    var choices = [];
    if(fieldMappingContext != null  && fieldMappingContext.invocation != null && fieldMappingContext.invocation.length > 0){
        for(var i = 0; i < fieldMappingContext.invocation.length; i++ ){
            choices.push(await choice(fieldMappingContext.invocation[i].marketoAttribute, fieldMappingContext.invocation[i].marketoAttribute, null, logger ))
        }
    }
    return choices
}
async function operationChoices(logger) {
    var choices = [];
    choices.push(await choice("Add", "add", null, logger))
    choices.push(await choice("Subtract", "subtract", null, logger))
    return choices
}
async function unitChoices(logger) {
    var choices = [];
    choices.push(await choice("Years", "years", null, logger))
    choices.push(await choice("Months", "months", null, logger))
    choices.push(await choice("Days", "days", null, logger))
    choices.push(await choice("Hours", "hours", null, logger))
    choices.push(await choice("Minutes", "minutes", null, logger))
    choices.push(await choice("Seconds", "seconds", null, logger))
    
    return choices
}
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
async function monthChoices(logger){
    var choices = [];
    choices.push(await choice("January", 0, null, logger))
    choices.push(await choice("February", 1, null, logger))
    choices.push(await choice("March", 2, null, logger))
    choices.push(await choice("April", 3, null, logger))
    choices.push(await choice("May", 4, null, logger))
    choices.push(await choice("June", 5, null, logger))
    choices.push(await choice("July", 6, null, logger))
    choices.push(await choice("August", 7, null, logger))
    choices.push(await choice("September", 8, null, logger))
    choices.push(await choice("October", 9, null, logger))
    choices.push(await choice("November", 10, null, logger))
    choices.push(await choice("December", 11, null, logger))
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
    monthChoices,
    operationChoices,
    unitChoices,
    logChoices,
    logLvlChoices,
    rfChoices,
    dateChoices,
    choice
}