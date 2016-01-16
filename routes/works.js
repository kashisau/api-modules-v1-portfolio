var express = require('express');
var router = express.Router();

/**
 * Portfolio router - Works method
 * 
 * This router handles requests to the Works method of the Portfolio API.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.1.0
 */
router
    .get('(.xml|.json)?', function(req, res, next) {
        // Handle the portoflio/works.json GET request
        // JSON API spec: http://jsonapi.org/
        if ( ! req.auth.functions.minAccessLevel(1, req, res, next))
            return;
        var worksModel = require('./../models/works.js');
        
        res.json(
            {
                data: {
                    works: worksModel.listWorks()
                }
            }
        );
    });
    
module.exports = router;