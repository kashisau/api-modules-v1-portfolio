/**
 * Works model
 * 
 * This model is responsible for the retrieval of portfolio work data from the
 * database. This is designed as a read-only accessor of the data created 
 * manaually (although may be extended in future to support the editing and
 * creation of new work).
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.1.0
 */
var worksModel = (function() {

    var worksModelAPI = {};

    var config = require('../config/config.json');
    
    var yaml = require('js-yaml');
    var fs = require('fs');
    var path = require('path');

/**
 * Retrieves a list of works that have been selected from the database with an
 * optional criteria supplied. Errors raised by the file handling methods
 * invoked are supressed (the unit tests for this model will verify that each
 * of the work files are syntactically correct.).
 * @param {string} worksPath    The directory in which to look for the YAML
 *                              portfolio files.
 * @param criteria {*}  (Optional) key-value set of criteria for retrival of 
 *                      work items. Default {"orderby":{"published": "desc"}}.
 * @return {*}[]    Returns an array of work items and summarised work item
 *                  information. This is an array, sorted according to the
 *                  supplied criteria (or otherwise the default sort order).
 */
worksModelAPI.listWorks = function(worksPath, criteria) {
    var worksPath = config.worksPath,
        workFiles = fs.readdirSync(worksPath),
        works = [],
        filePath,
        fileName;

    for (var i in workFiles) {
        fileName = workFiles[i];
        filePath = path.join(worksPath, fileName);

        if ( ! /\.yaml$/i.test(fileName)) continue;
        if (/sample\.yaml$/i.test(fileName)) continue;

        try {
            works.push(worksModelAPI.parseWorkFile('..' + filePath));
        } catch (fileErr) {}
    }
    
    return works;
}

/**
 * Parses a portfolio work YAML file (as found in the `works/` folder) into
 * a JavaScript object so that it may be used by the application. The YAML
 * file supplied must follow the structure of the (version controlled) example
 * `works/sample.md` to create a valid Work object.
 * @param {string} workFile The file in which to look for the YAML portfolio
 *                          item details.
 * @return {Work}   Returns an object of type Work with information about the
 *                  specific work contained in the markdown file.
 * @throws {Error}  Thrown if the file was not found with error code
 *                  works_file_not_found.
 * @throws {Error}  Thrown if the file could not be parsed with error code
 *                  works_file_oarse_error.
 */
worksModelAPI.parseWorkFile = function(workFile) {
    var workYaml,
        parseError;
    
    try {
        workYaml = yaml.safeLoad(fs.readFileSync(workFile, 'utf8'));
    } catch (err) {
        if (err.code === "ENOENT") {
            praseError = new Error("There was an error locating the " + 
                "file in " + workFile + ".");
            parseError.code = "works_file_not_found";
            throw parseError;
        }
        parseError = new Error("There was an error parsing the works file " +
            workFile + ". See internal error.");
        parseError.innerError = err;
        throw parseError;
    }
    return workYaml;
};

/**
 * Used with the Array.filter method to remove elements that don't confrom to 
 * the expected works YAML filename. This is designed to be used when listing
 * the contents of a directory and deciding which files should be included in
 * the list of works. Sample files (*sample.yaml) and non-YAML files (!*.yaml)
 * will be rejected.
 * This method does not inspect the contents of the files.
 * @param {string} fileName The file name that should be assessed for
 *                          suitability.
 * @return {bool}   Returns TRUE if the file name is expected to be a works
 *                  item, FALSE if not.
 */
worksModelAPI.fileNameFilter = function(fileName) {
    if ( ! /\.yaml$/i.test(fileName)) return false
    if (/sample\.yaml$/i.test(fileName)) return false;
    
    return true;
}

return worksModelAPI;
    
})();

module.exports = worksModel;