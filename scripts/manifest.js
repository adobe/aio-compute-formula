const fs = require('fs');
const yaml = require('js-yaml');

function renderManifest(path, apiKey, logLevel) {
    // console.log("Path: ", path)
    // var file = fs.readFileSync(path)
    var file = fs.readFileSync("./manifest-template.yml")
    // console.log("file: ", file)
    var template = yaml.load(file.toString());
    // console.log("yaml: ", template)
    try {
        Object.entries(template.packages["__APP_PACKAGE__"].actions).forEach(e => {
            console.log("Entry: ", e)
            if (logLevel != null) {
                template.packages.__APP_PACKAGE__.actions[e[0]].inputs.LOG_LEVEL = logLevel
            }
            if (template.packages.__APP_PACKAGE__.actions[e[0]].annotations != null
                //|| template.packages.__APP_PACKAGE__.actions[e[0]].annotations["require-whisk-auth"] != null
            ) {
                template.packages.__APP_PACKAGE__.actions[e[0]].annotations["require-whisk-auth"] = apiKey;
            }

        });
    } catch (error) {
        console.log(error)
    }


    var manifest = yaml.dump(template);

    fs.writeFileSync("./manifest.yml", manifest.toString())
}
function fetchKey(path) {
    try {
        var file = fs.readFileSync(path);

    } catch (error) {
        console.log(error)
    }
    var doc = yaml.load(file.toString())
    // console.log(JSON.stringify(doc))
    try {
        return doc.packages.__APP_PACKAGE__.actions.status.annotations["require-whisk-auth"]

    } catch (error) {
        return "key"
    }


}

module.exports = {
    renderManifest,
    fetchKey
}