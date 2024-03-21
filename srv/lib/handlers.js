const cds = require('@sap/cds');

let doxService = null;

(async function () {
    // Connect to external DoX OData services
    // doxService = await cds.connect.to('PLTUserManagement');
})();

/*** HANDLERS ***/

async function createInvoice(req){
    const uuid = generateUUID.v4();
}

module.exports = {
    createInvoice
}