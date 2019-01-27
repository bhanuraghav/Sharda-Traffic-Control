const {PythonShell} = require('python-shell');
const util = require('util')
const runPy = util.promisify(PythonShell.run)
const path = require('path');

const runModel = async (video_file_path) => {
    // console.log("here")
    const options = {scriptPath: '/home/utkarsh/Desktop/Sharda-Traffic-Control/ML'}
    // console.log("here")
    const data = await runPy('PredictCharacters.py', options);
    return data[0];
    // console.log("Done");
    // return JSON.parse(data.toString().replace(/'/g,"\""));
}

// (async () => {
//     try{
//         let data = await runModel(__dirname);
//         console.log(typeof data);
//         console.log(data);
//     }
//     catch(e){
//         console.log(e);
//     }
// })();

module.exports = {
    runModel
}