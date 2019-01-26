const {PythonShell} = require('python-shell');
const util = require('util')
const runPy = util.promisify(PythonShell.run)
const path = require('path');

const runModel = async (video_file_path) => {
    const options = {args:[video_file_path]}
    const data = await runPy(path.join(__dirname,'../ML\ bakchodi/PredictCharacters.py'), options);
    // console.log("Done");
    // return JSON.parse(data.toString().replace(/'/g,"\""));
    return data;
}

(async () => {
    try{
        let data = await runModel(__dirname);
        console.log(typeof data);
        console.log(data);
    }
    catch(e){
        console.log(e);
    }
})();

module.exports = {
    runModel
}