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

async function refreshJobs(req){
    console.log("refreshjobs action");
    
    //Get selected item Id and fetch the dox_guid from entitiy Headers
    let headerID = req.params[0];
    let q1 = SELECT.from('Headers').where({ID:headerID});
    const sia = await cds.connect.to('Smart_Invoice_AppService');
    let jobs = await sia.run(q1);
    let jobId = jobs[0].dox_guid;
    //--------------------------------------------
    //call Dox service to fetch document extraction results
    const doxService = await cds.connect.to('dox');
    const doxJobsPath = "/document/jobs";
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://aiservices-dox.cfapps.eu10.hana.ondemand.com/document-information-extraction/v1/document/jobs/'+jobId,
    'headers': {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZW1lYS1zb3V0aC1zYXBidWlsZC1jbXRlOTFjcC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTEyMjgwNzczMSIsInR5cCI6IkpXVCIsImppZCI6ICJyMGw1UG5JRXc2eVI0T1VkL0xCZjI1c3Y3NlE2bW92bUZLbTJvS3VBLzJ3PSJ9.eyJqdGkiOiJlOGY1YzNkOTEyMmM0MTZiOTBlNDQwMWM3OGYzNjhhYyIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ZDBhNDFjZS1mMzM5LTRiN2YtYmM0OC1mZDQwYjczYzdhNmYiLCJ6ZG4iOiJlbWVhLXNvdXRoLXNhcGJ1aWxkLWNtdGU5MWNwIiwic2VydmljZWluc3RhbmNlaWQiOiI0OTc1YTQ2Ny04MGY0LTQzMWQtYWVkMy0xMjc5ZDE2OTI0MDAifSwic3ViIjoic2ItNDk3NWE0NjctODBmNC00MzFkLWFlZDMtMTI3OWQxNjkyNDAwIWIxNjkwNjB8bmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMSIsImF1dGhvcml0aWVzIjpbIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuaWRlbnRpZmllci5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5zY2hlbWEud3JpdGUiLCJ1YWEucmVzb3VyY2UiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRhdGEud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmNhcGFiaWxpdGllcy5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jb25maWcud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmNsaWVudC5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jb25maWcucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZG9jdW1lbnQud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRlY2huaWNhbHNjb3BlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jbGllbnQud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRlbXBsYXRlLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRvY3VtZW50LnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmlkZW50aWZpZXIud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRyYWluaW5nLWRhdGEucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEudGVtcGxhdGUud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRhdGEtZXhwb3J0LndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnJ1bGVzLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLWV4cG9ydC5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5zY2hlbWEucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEudHJhaW5pbmctZGF0YS53cml0ZSJdLCJzY29wZSI6WyJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmlkZW50aWZpZXIucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuc2NoZW1hLndyaXRlIiwidWFhLnJlc291cmNlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jYXBhYmlsaXRpZXMucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY29uZmlnLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jbGllbnQucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY29uZmlnLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRvY3VtZW50LndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50ZWNobmljYWxzY29wZSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY2xpZW50LndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50ZW1wbGF0ZS5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kb2N1bWVudC5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5pZGVudGlmaWVyLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50cmFpbmluZy1kYXRhLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRlbXBsYXRlLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLWV4cG9ydC53cml0ZSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZGF0YS5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5ydWxlcy53cml0ZSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZGF0YS1leHBvcnQucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuc2NoZW1hLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRyYWluaW5nLWRhdGEud3JpdGUiXSwiY2xpZW50X2lkIjoic2ItNDk3NWE0NjctODBmNC00MzFkLWFlZDMtMTI3OWQxNjkyNDAwIWIxNjkwNjB8bmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMSIsImNpZCI6InNiLTQ5NzVhNDY3LTgwZjQtNDMxZC1hZWQzLTEyNzlkMTY5MjQwMCFiMTY5MDYwfG5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEiLCJhenAiOiJzYi00OTc1YTQ2Ny04MGY0LTQzMWQtYWVkMy0xMjc5ZDE2OTI0MDAhYjE2OTA2MHxuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiJjMjhhNDc4YSIsImlhdCI6MTcxMzMzNjE4MCwiZXhwIjoxNzEzMzc5MzgwLCJpc3MiOiJodHRwczovL2VtZWEtc291dGgtc2FwYnVpbGQtY210ZTkxY3AuYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS9vYXV0aC90b2tlbiIsInppZCI6IjlkMGE0MWNlLWYzMzktNGI3Zi1iYzQ4LWZkNDBiNzNjN2E2ZiIsImF1ZCI6WyJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmNhcGFiaWxpdGllcyIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY2xpZW50Iiwic2ItNDk3NWE0NjctODBmNC00MzFkLWFlZDMtMTI3OWQxNjkyNDAwIWIxNjkwNjB8bmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZGF0YSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEucnVsZXMiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnNjaGVtYSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY29uZmlnIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5pZGVudGlmaWVyIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLWV4cG9ydCIsInVhYSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRyYWluaW5nLWRhdGEiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRvY3VtZW50IiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50ZW1wbGF0ZSJdfQ.UuAyld1H3Uzxwee4ugQptyDhXCJGduoH6_PBp5c-yZUztSobH9fWdi99OWGQkE1N9lU3lFbJtmRyueZ-dqJcLQe529hpRDswM2nzk7mWuNDzb1Iq-_6hfwkzSkAbcxmbrsbUI0ITcTd1cGqectZXpqk_WfL0VX9pzJB2nDLP6EnCMA_0lXf2an0NSM0cEHHnszMLcvdeExstd-WjOvNBgRlM63xtxTKXZ8UNKJtcglNg-kfurKLcXtXV-Y_sl7NSYkceFBEWahaOk5LxVMDPw0ZUG4UbunyVETIczrkLhW-ttM5tcmFWfm64X63bTF7Qq9rUa8zRgUAk-1QpYMdWHw'
    },
    formData: {

    }
    };
    request(options, async function (error, response) {
        if (error) throw new Error(error);
        let result = JSON.parse(response.body);
        let headerFields = result.extraction.headerFields;
        let lineItems = result.extraction.lineItems;
        //console.log(headerFields);
        //console.log(result);
       //--------------------------------------------
       //Update header with the extracted information 
        let q2 = UPDATE (Headers) .where ({dox_guid:jobId}).with({
            dox_status : result.status,
            invoiceNumber : headerFields[3].value,
            invoiceDate : headerFields[4].value,
            amount : headerFields[0].value,
            supplierName : headerFields[5].value,
            currency : headerFields[1].value,
            description : headerFields[2].value,
        
        });
        let exec = await sia.run(q2);
        //--------------------------------------------
        //insert extracted lineitems into items entity
        const { Items } = cds.entities
        let insertArray = [];
        let status = "";
        let poNumber = "";
        let poLineNumber = "";
        for(const lineItem of lineItems){
            //--------------------------------------------
             //Search purchaseOrders table for the PO number by the flight details
            let findPoQuery = SELECT.from('purchaseOrders').where(
                {flightNumber:lineItem[2].value, 
                landingDate: lineItem[3].value,
                landingTime:lineItem[4].value});
            let exec3 = await sia.run(findPoQuery);
            if(exec3.length != 0){
                status = "PO Found";
                poNumber = exec3[0].poNumber;
                poLineNumber = exec3[0].poLineNumber;
            }else{
                status = "PO Not Found";
                poNumber = "";
                poLineNumber = "";
            }
            //Create insert array to push the information to the Items table with the PO in formation and lookup resutls
            insertArray.push({
                header_ID: headerID,
                flightNumber: lineItem[2].value,
                flightDate: lineItem[3].value,
                flightTime:lineItem[4].value,
                quantity:lineItem[1].value,
                amount:lineItem[0].value,
                status: status,
                poNumber: poNumber,
                poLineNumber : poLineNumber
            });
        }
       
        let q3 = INSERT.into (Items) .entries (insertArray);
        let exec2 = await sia.run(q3);
        
        
    });

   
    
}



module.exports = {
    createInvoice, refreshJobs
}