'use strict';
/**
 * Works model tests - file loading
 * 
 * This suite simply checks that the works files (YAML) are correctly located 
 * and loaded from the directory specified in the config file for this module.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 1.0.0
 */
module.exports = function(worksModel, worksConfig) {
    var fs = require('fs');

    it(
        "Work files exist in the directory specified (config.json)",
        function(done) {
            var workFiles = fs.readdirSync(worksConfig.worksPath);
            workFiles = workFiles.filter(worksModel.fileNameFilter);
            
            workFiles.should.be.a.array;
            (worksModel.listWorks()).should.be.a.array;
            done();
        }
    );
}