const {renderManifest} = require("./manifest.js")

// const yargs = require('yargs/yargs')(process.argv.slice(2)).argv

function main(path, apiKey, logLevel) {
    // console.log(yargs)
    console.log(`render manifest params: path-${path}, key-${apiKey}, log-${logLevel}`)
    renderManifest(path, apiKey, logLevel)
}

// main(yargs.path, yargs.apiKey, yargs.logLevel)
main(process.env.npm_config_path, process.env.npm_config_apiKey, process.env.npm_config_logLevel)