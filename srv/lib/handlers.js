const cds = require('@sap/cds');
const b64ToBlob = require('b64-to-blob');

function _detectMimeType(b64) {
    const signatures = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpeg"
    };

    for (var s in signatures) {
        if (b64.indexOf(s) === 0) {
            return signatures[s];
        }
    }
};

(async function () {
    // Connect to external DoX OData services
    // doxService = await cds.connect.to('PLTUserManagement');
})();

/*** HANDLERS ***/

async function createInvoice(req){
    
    const sia = await cds.connect.to('Smart_Invoice_AppService');
    const doxService = await cds.connect.to('dox');

    let clientId = "ma_00";
    let doxSchemaId = "ea717c53-4f1e-4dc3-8a42-0b3343fd285e";
    try {

        console.log(`--- Creating new DOX job ---`);
        
        let data = req.data;
        let b64Data = data.file;
        
        //The atob function will decode a base64-encoded string into a new string with a character for each byte of the binary data.
        const byteCharacters = atob(b64Data);


        //create an array of byte values by applying this using the .charCodeAt method for each character in the string.
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        // convert this array of byte values into a real typed byte array by passing it to the Uint8Array constructor.
        const byteArray = new Uint8Array(byteNumbers);
        // This in turn can be converted to a Blob by wrapping it in an array and passing it to the Blob constructor.
        const blob = new Blob([byteArray], {type: 'application/pdf'});



        let documentName = "default-inovoice";       
        let fileName = documentName+'.pdf';
        
        //Post the document to SAP Document Information Extraction
        let formData = new FormData(),
            headers = { "Content-Type": "multipart/form-data" },
            options = {
                "clientId": clientId, //your dox clientId
                "schemaId": doxSchemaId //your schema ID
            };
        formData.append("options", JSON.stringify(options));
        formData.append("file", blob, fileName);
       
        var oNewJobResponse = await doxService.send({
            method: 'POST',
            path: `/document-information-extraction/v1/document/jobs`,
            data: formData,
            headers: headers
        });

        //Update table Headers with the new uploaded invoice
        let q1 = INSERT.into (Headers) .entries ({
            dox_guid : oNewJobResponse.id,
            dox_status : oNewJobResponse.status
        });
        let exec = await sia.run(q1);
        //*/
    }catch (error) {
        console.error(error);
      }
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

    var oNewJobResponse = await doxService.send({
        method: 'GET',
        path: '/document-information-extraction/v1/document/jobs/'+jobId,
    });
    
    let headerFields = oNewJobResponse.extraction.headerFields;
    let lineItems = oNewJobResponse.extraction.lineItems;
    //--------------------------------------------
    //Update header with the extracted information 
    let q2 = UPDATE (Headers) .where ({ID:headerID}).with({
        dox_status : 'Under Approval',
        amount : headerFields[0].value,
        currency : headerFields[1].value,
        description : headerFields[2].value,
        unitPrice :  headerFields[3].value,
        unit : headerFields[4].value,
        invoiceNumber : headerFields[5].value,
        invoiceDate : headerFields[6].value,
        supplierName : headerFields[7].value           
    });
    let exec = await sia.run(q2);
    //--------------------------------------------
    //insert extracted lineitems into items entity
    const { Items } = cds.entities
    let insertArray = [];
    let postArray = [];
    let validateArray = [];
    let matchingStatus = "";
    let workflowStatus = "";
    let poNumber = "";
    let poLineNumber = "";
    let SupplierNumber = "";
    for(const lineItem of lineItems){
        //--------------------------------------------
        //Search purchaseOrders table for the PO number by the flight details
        let findPoQuery = SELECT.from('purchaseOrders').where({
            flightNumber:lineItem[2].value, 
            landingDate: lineItem[3].value,
            landingTime:lineItem[4].value
        });
        let exec3 = await sia.run(findPoQuery);
        if(exec3.length != 0){
            //Add flignt line Item with status 'PO Found' to the array of items that is will be auto posted
            matchingStatus = "PO Found";
            workflowStatus = "Pending Auto Posting";
            poNumber = exec3[0].poNumber;
            poLineNumber = exec3[0].poLineNumber;
            SupplierNumber = exec3[0].supplierNumber;
            postArray.push({
                quantity:Number(lineItem[1].value),
                amount:Number(lineItem[0].value),
                poNumber: poNumber,
                poLineNumber : poLineNumber,
                matchingStatus: matchingStatus,
                workflowStatus : workflowStatus,
                flightNumber: lineItem[2].value,
                flightDate: lineItem[3].value,
                flightTime:lineItem[4].value
            });
            }else{
                //Add flignt line Item with status 'PO Not Found' to the array of items that needs validating
                matchingStatus = "PO Not Found";
                workflowStatus = "Manual Verification";
                poNumber = "";
                poLineNumber = "";
                validateArray.push({
                    quantity:Number(lineItem[1].value),
                    amount:Number(lineItem[0].value),
                    poNumber: poNumber,
                    poLineNumber : poLineNumber,
                    matchingStatus: matchingStatus,
                    workflowStatus : workflowStatus,
                    flightNumber: lineItem[2].value,
                    flightDate: lineItem[3].value,
                    flightTime:lineItem[4].value
                });
            }
            //Create insert array to push the flight line items to the local Items table with the PO in formation and lookup resutls
            insertArray.push({
                header_ID: headerID,
                flightNumber: lineItem[2].value,
                flightDate: lineItem[3].value,
                flightTime:lineItem[4].value,
                quantity:lineItem[1].value,
                amount:lineItem[0].value,
                matchingStatus: matchingStatus,
                workflowStatus : workflowStatus,
                poNumber: poNumber,
                poLineNumber : poLineNumber
            });
            
    }
    let q3 = INSERT.into (Items) .entries (insertArray);
    let exec2 = await sia.run(q3);
    //Update header with the matched supplier number from PurchaseOrders Table 
    let q4 = UPDATE (Headers) .where ({dox_guid:jobId}).with({
        supplierNumber : SupplierNumber
    });
    let exec4 = await sia.run(q4);
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    //Trigger the approval workflows in Build Process Automation
    let autoPostWorkflowContent = {
        "definitionId": "eu10.emea-south-sapbuild-cmte91cp.smartinvoiceprocess.invoicePostingApproval",
        "context": {
            "status": "Auto",
            "invoiceheader": {
                "totalAmount": Number(headerFields[0].value),
                "currency": headerFields[1].value,
                "description": headerFields[2].value,
                "unitPrice" : headerFields[3].value,
                "unit" : headerFields[4].value,
                "invoiceNumber": headerFields[5].value,
                "invoiceDate": headerFields[6].value,
                "supplierName": headerFields[7].value,
                "supplierNumber": SupplierNumber,
                
            },
            "invoiceitems": postArray
        }
    };
    let validateWorkflowContent  = {
        "definitionId": "eu10.emea-south-sapbuild-cmte91cp.smartinvoiceprocess.invoicePostingApproval",
            "context": {
                "status": "Manual",
                "invoiceheader": {
                    "totalAmount": Number(headerFields[0].value),
                    "currency": headerFields[1].value,
                    "description": headerFields[2].value,
                    "unitPrice" : headerFields[3].value,
                    "unit" : headerFields[4].value,
                    "invoiceNumber": headerFields[5].value,
                    "invoiceDate": headerFields[6].value,
                    "supplierName": headerFields[7].value,
                    "supplierNumber": SupplierNumber,
                },
                "invoiceitems": validateArray
            }
    }

    const SBPA_API = await cds.connect.to('spa_api');
    const result1 = await SBPA_API.send('POST', '/workflow/rest/v1/workflow-instances', JSON.stringify(autoPostWorkflowContent), { "Content-Type": "application/json" });
    const result2= await SBPA_API.send('POST', '/workflow/rest/v1/workflow-instances', JSON.stringify(validateWorkflowContent), { "Content-Type": "application/json" });

   
    
}



module.exports = {
    createInvoice, refreshJobs
}