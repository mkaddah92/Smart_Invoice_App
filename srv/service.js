// https://github.tools.sap/btp-use-case-factory/cap-dms/blob/5acd04e6272876789f71105e1b927fc7e7514e81/srv/dms-service.js
const cds = require("@sap/cds");
const generateUUID = require('@sap/cds-foss')('uuid');

const{createInvoice, refreshJobs, startWorkflow} = require('./lib/handlers');

module.exports = async (srv) => {

    const{Headers} = srv.entities;

    srv.on(["createInvoice"], createInvoice);
    srv.on(["refreshJob"], Headers, refreshJobs);
}