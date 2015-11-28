'use strict';
/**
 * Works model tests - works file testing
 * 
 * This suite checks an individual works YAML file for consistency so that it
 * can be used by the API service to provide a well-formed response. This
 * method takes the works model as well as the complete (relative or absolute)
 * path to the works file being tested, implementing Should.js assertions in a
 * Mocha context.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.1.0
 */
module.exports = function(worksModel, workFilePath) {
    var workItem = worksModel.parseWorkFile(workFilePath);
    
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