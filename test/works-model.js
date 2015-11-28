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

describe('Works model', function() {
    it(
        "Work files exist in the directory specified (config.json)",
        function(done) {
            var workFiles = fs.readdirSync(config.worksPath);
            workFiles = workFiles.filter(worksModel.fileNameFilter);
            
            workFiles.should.be.a.array;
            (worksModel.listWorks()).should.be.a.array;
            done();
        }
    );
});

describe('Checking work files', function() {
    var workFiles = fs.readdirSync(config.worksPath);
    workFiles = workFiles.filter(worksModel.fileNameFilter);
    
    for (var i in workFiles) {
        var fileName = workFiles[i],
            filePath = path.join(config.worksPath, fileName);

        describe("Verifying `" + filePath + "`",
            function() {
                var workItem = worksModel.parseWorkFile(filePath);
                it("Has a name", function(done) {
                    workItem.name.should.be.a.string; 
                    done();
                });
                it("Has a work type", function(done) {
                    workItem.type.should.be.a.string;
                    done();
                });
                it("Has a deployment date", function(done) {
                    var published = workItem.published,
                        pubParts = published.split('-'),
                        year = parseInt(pubParts[0]),
                        quarter = pubParts[1];

                    workItem.published.should.be.a.string;
                    year.should.be.an.int;
                    /^[q][1-4]$/i.test(quarter).should.be.true;

                    done();
                });
                it("Has a description", function(done) {
                    workItem.description.should.be.a.string;
                    done();
                });
                if (typeof(workItem.awards) !== 'undefined')
                    it(
                        "Awards correctly formatted",
                        function(done) {
                            workItem.awards.should.be.an.array;
                            done();
                        }
                    );
            }
        );
    }
});