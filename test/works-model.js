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

describe('Works model', function() {
    var worksModel = require("../models/works.js"),
        should = require('should'),
        sqlite = require('sqlite3'),
        db = new sqlite.Database(':memory:');
        
    before("Set up temporary database", );
    it("Retrieve all works", function(done) {
        (worksModel.listWorks()).should.be.a.array;
        done();
    });
});