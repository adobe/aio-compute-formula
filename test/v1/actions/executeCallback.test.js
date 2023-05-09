const {sumScoreReq, sumNegReq, compScoreReq, arithmeticStrReq, substituteTxtReq, tolowerReq, toUpperReq, toProperReq} = require("../../mocks/mockAsyncRequest");
const {main, computeFormula} = require("../../../actions/flow/v1/executeCallback");
const FormulaParser = require('hot-formula-parser').Parser;


describe('basic formula tests', () => {
    const parser = new FormulaParser();
    test('sum scores', async () => {
        const score1 = 1;
        const score2 = 2;
        const expectedScore = score1 + score2;
        const formula = `SUM(${score1}, ${score2})`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expectedScore)
    })
    test('sum scores w/ negative', async () => {
        const score1 = 1;
        const score2 = -2;
        const expectedScore = score1 + score2;
        const formula = `SUM(${score1}, ${score2})`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expectedScore)
    })
    test('weighted score', async () => {
        const score1 = 1;
        const score1Wt = .8;
        const score2 = -2;
        const score2wt = 1.7;
        const expectedScore = (score1 * score1Wt) + (score2 * score2wt);
        const formula = `SUM(PRODUCT(${score1}, ${score1Wt}), PRODUCT(${score2}, ${score2wt}))`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expectedScore)
    })
    test('simple sum string', async () => {
        const score1 = 1;
        const score2 = -2;
        const expectedScore = score1 + score2;
        const formula = `${score1} + ${score2}`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expectedScore)
    })
    test('substitute text', async () => {
        const original = "You're a wizard, Harry!"
        const toSub = "wizard"
        const subWith = "witch"
        const instanceNum = 1
        const formula = `SUBSTITUTE("${original}", "${toSub}", "${subWith}")`
        const expectedText = "You're a witch, Harry!"
        expect(computeFormula(parser, formula).result).toEqual(expectedText)
    })
    test('to upper', async () => {
        const string = "all lower case";
        const expected = "ALL LOWER CASE";
        const formula = `UPPER("${string}")`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expected)
    })
    test('to lower', async () => {
        const string = "ALL LOWER CASE";
        const expected = "all lower case";
        const formula = `LOWER("${string}")`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expected)
    })
    test('to proper case', async () => {
        const string = "uP aNd dOwN";
        const expected = "Up And Down";
        const formula = `PROPER("${string}")`
        expect(computeFormula(parser, formula)).toHaveProperty("result", expected)
    })
    //WEEKDAY

    //DATEDIF
    //Days to MQL, SQL, etc.

    //MOD for round robin assignment


})

describe('executeCallback Tests', () => {
    test('sum score', async ()=> {
        console.log(sumScoreReq)
        var resp = await main(sumScoreReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(sumScoreReq._expectedValue)
        console.log("sum score response: " + JSON.stringify(resp))
    })
    test('sum negative score', async ()=> {
        var resp = await main(sumNegReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(sumNegReq._expectedValue)
    })
    test('composite/weighted score', async ()=> {
        var resp = await main(compScoreReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(compScoreReq._expectedValue)
    })
    test('simple arithmetic expression', async ()=> {
        var resp = await main(arithmeticStrReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(arithmeticStrReq._expectedValue)
    })
    test('substitute text', async ()=> {
        var resp = await main(substituteTxtReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(substituteTxtReq._expectedValue)
    })
    test('To Lower', async ()=> {
        var resp = await main(tolowerReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(tolowerReq._expectedValue)
    })
    test('To Upper', async ()=> {
        var resp = await main(toUpperReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(toUpperReq._expectedValue)
    })
    test('to Proper', async ()=> {
        var resp = await main(toProperReq)
        expect(resp.body.objectData[0].leadData.testString).toEqual(toProperReq._expectedValue)
    })
    
})