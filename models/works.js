/**
 * Works model
 * 
 * This model is responsible for the retrieval of portfolio work data from the
 * database. This is designed as a read-only accessor of the data created 
 * manaually (although may be extended in future to support the editing and
 * creation of new work).
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.0.1
 */
var worksModel = {};

/**
 * Retrieves a list of works that have been selected from the database with an
 * optional criteria supplied.
 * @param criteria {*}  A key-value based set of criteria for retrival of work.
 * @return {*}[]    Returns an array of work items and summarised work item
 *                  information. This is an array, sorted according to the
 *                  supplied criteria (or otherwise the default sort order).
 */
worksModel.listWorks = function(criteria) {
    return [];
}

module.exports = worksModel;