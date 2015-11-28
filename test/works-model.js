'use strict';
/**
 * Portoflio module - works retrieval
 * 
 * This this suite checks that the works model retrieves work successfully and
 * heeds criterion and sorting instructions.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.0.1
 */

var fs = require('fs'),
    worksModel = require("../models/works.js"),
    config = require("../config/config.json"),
    should = require('should'),
    path = require('path');

describe('Works model works listing', function() {
    require("./model/file-loading.js")(worksModel, config);
});

describe('Checking work files', function() {
    var workFiles = fs.readdirSync(config.worksPath);
    workFiles = workFiles.filter(worksModel.fileNameFilter);
    
    for (var i in workFiles) {
        var fileName = workFiles[i],
            filePath = path.join(config.worksPath, fileName);

        describe("Verifying `" + filePath + "`",
            function() {
                require('./model/check-work-file.js')(worksModel, filePath);
            }
        );
    }
});