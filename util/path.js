/**
 * This file will normalise the path from main directory (i.e project directory)
 * "proccess" is a global variable to access path from OS
 */

const path = require('path');

module.exports = path.dirname(process.mainModule.filename);