const cds = require('@sap/cds');

let doxService = null;
let doxToken = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZW1lYS1zb3V0aC1zYXBidWlsZC1jbXRlOTFjcC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTEyMjgwNzczMSIsInR5cCI6IkpXVCIsImppZCI6ICJEY2QvZXVFWUZza0czc0w3ZnVqeXVNZG1sQi9SaUdwNGYwSGtZU0lGZkhzPSJ9.eyJqdGkiOiJmMWYyZDRkOTZiNmY0YmY3ODE0NGM1MDgwNTg1MjVmOSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ZDBhNDFjZS1mMzM5LTRiN2YtYmM0OC1mZDQwYjczYzdhNmYiLCJ6ZG4iOiJlbWVhLXNvdXRoLXNhcGJ1aWxkLWNtdGU5MWNwIiwic2VydmljZWluc3RhbmNlaWQiOiI0OTc1YTQ2Ny04MGY0LTQzMWQtYWVkMy0xMjc5ZDE2OTI0MDAifSwic3ViIjoic2ItNDk3NWE0NjctODBmNC00MzFkLWFlZDMtMTI3OWQxNjkyNDAwIWIxNjkwNjB8bmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMSIsImF1dGhvcml0aWVzIjpbIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuaWRlbnRpZmllci5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5zY2hlbWEud3JpdGUiLCJ1YWEucmVzb3VyY2UiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRhdGEud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmNhcGFiaWxpdGllcy5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jb25maWcud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmNsaWVudC5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jb25maWcucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZG9jdW1lbnQud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRlY2huaWNhbHNjb3BlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jbGllbnQud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRlbXBsYXRlLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRvY3VtZW50LnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmlkZW50aWZpZXIud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRyYWluaW5nLWRhdGEucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEudGVtcGxhdGUud3JpdGUiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRhdGEtZXhwb3J0LndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnJ1bGVzLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLWV4cG9ydC5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5zY2hlbWEucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEudHJhaW5pbmctZGF0YS53cml0ZSJdLCJzY29wZSI6WyJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmlkZW50aWZpZXIucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuc2NoZW1hLndyaXRlIiwidWFhLnJlc291cmNlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jYXBhYmlsaXRpZXMucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY29uZmlnLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5jbGllbnQucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY29uZmlnLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRvY3VtZW50LndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50ZWNobmljYWxzY29wZSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY2xpZW50LndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50ZW1wbGF0ZS5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kb2N1bWVudC5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5pZGVudGlmaWVyLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50cmFpbmluZy1kYXRhLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRlbXBsYXRlLndyaXRlIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLWV4cG9ydC53cml0ZSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZGF0YS5yZWFkIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5ydWxlcy53cml0ZSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZGF0YS1leHBvcnQucmVhZCIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuc2NoZW1hLnJlYWQiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRyYWluaW5nLWRhdGEud3JpdGUiXSwiY2xpZW50X2lkIjoic2ItNDk3NWE0NjctODBmNC00MzFkLWFlZDMtMTI3OWQxNjkyNDAwIWIxNjkwNjB8bmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMSIsImNpZCI6InNiLTQ5NzVhNDY3LTgwZjQtNDMxZC1hZWQzLTEyNzlkMTY5MjQwMCFiMTY5MDYwfG5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEiLCJhenAiOiJzYi00OTc1YTQ2Ny04MGY0LTQzMWQtYWVkMy0xMjc5ZDE2OTI0MDAhYjE2OTA2MHxuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiJjMjhhNDc4YSIsImlhdCI6MTcxNDExOTI5OSwiZXhwIjoxNzE0MTYyNDk5LCJpc3MiOiJodHRwczovL2VtZWEtc291dGgtc2FwYnVpbGQtY210ZTkxY3AuYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS9vYXV0aC90b2tlbiIsInppZCI6IjlkMGE0MWNlLWYzMzktNGI3Zi1iYzQ4LWZkNDBiNzNjN2E2ZiIsImF1ZCI6WyJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmNhcGFiaWxpdGllcyIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY2xpZW50Iiwic2ItNDk3NWE0NjctODBmNC00MzFkLWFlZDMtMTI3OWQxNjkyNDAwIWIxNjkwNjB8bmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuZGF0YSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEucnVsZXMiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnNjaGVtYSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEuY29uZmlnIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5pZGVudGlmaWVyIiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS5kYXRhLWV4cG9ydCIsInVhYSIsIm5hLWYyMDU0OGMwLTE1N2QtNDE3Yi04YmJiLTFjOWYzNWVjZmIyZCFiMjA4MjEiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLnRyYWluaW5nLWRhdGEiLCJuYS1mMjA1NDhjMC0xNTdkLTQxN2ItOGJiYi0xYzlmMzVlY2ZiMmQhYjIwODIxLmRvY3VtZW50IiwibmEtZjIwNTQ4YzAtMTU3ZC00MTdiLThiYmItMWM5ZjM1ZWNmYjJkIWIyMDgyMS50ZW1wbGF0ZSJdfQ.KA-5kz7Z-uyh_-wfXX-cMjpVMQrl3f86vV0eZa5zWJK-TpU3vNjQBZHDqeYNTNIiZS41qryGAnq8lvMiz_pgZKVAfNxmCBp7OV7mxILpHr_q-WfSweRcO-ISTa209odwM6OCoTYHO9wrTt1XkT3oTftAbPrjsUhsF0QMA2Uiw7CvZ3fjwKh97PDFLIr1paG2QNDF5GKgu42PViMt6Oyb51A3hAukppbFS1wygD8V-YAeydmjGFOc80VQsWZpVXSRfqzO0ODvji6iVYdDcP4RxSqgQFXe8VRcgaMM-AbkuoLCi-70hhqyVHyhYY2FjfdpxkawTuXi1Z6kzrUuNClang";
let sbpaToken = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZW1lYS1zb3V0aC1zYXBidWlsZC1jbXRlOTFjcC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTEyMjgwNzczMSIsInR5cCI6IkpXVCIsImppZCI6ICJRUHBDNHhsdEdUaVJGNnhEZjd6UXJwQ1lnMDcyZUJSZDQvQ1dmcE1oRm9jPSJ9.eyJqdGkiOiI0NzE5YWY0YTVmZGE0MGRmOWE3YmNiNzg4MWE0ZDM0NyIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ZDBhNDFjZS1mMzM5LTRiN2YtYmM0OC1mZDQwYjczYzdhNmYiLCJ6ZG4iOiJlbWVhLXNvdXRoLXNhcGJ1aWxkLWNtdGU5MWNwIiwic2VydmljZWluc3RhbmNlaWQiOiJjMDdlY2I1ZC1iNjZjLTRlNDgtYmViMy04ZDUxMWM2MzhmZmMifSwic3ViIjoic2ItYzA3ZWNiNWQtYjY2Yy00ZTQ4LWJlYjMtOGQ1MTFjNjM4ZmZjIWIxNjkwNjB8eHN1YWEhYjEyMDI0OSIsImF1dGhvcml0aWVzIjpbInVhYS5yZXNvdXJjZSJdLCJzY29wZSI6WyJ1YWEucmVzb3VyY2UiXSwiY2xpZW50X2lkIjoic2ItYzA3ZWNiNWQtYjY2Yy00ZTQ4LWJlYjMtOGQ1MTFjNjM4ZmZjIWIxNjkwNjB8eHN1YWEhYjEyMDI0OSIsImNpZCI6InNiLWMwN2VjYjVkLWI2NmMtNGU0OC1iZWIzLThkNTExYzYzOGZmYyFiMTY5MDYwfHhzdWFhIWIxMjAyNDkiLCJhenAiOiJzYi1jMDdlY2I1ZC1iNjZjLTRlNDgtYmViMy04ZDUxMWM2MzhmZmMhYjE2OTA2MHx4c3VhYSFiMTIwMjQ5IiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiJhZjE3MGFlIiwiaWF0IjoxNzE0MTE5Mjc3LCJleHAiOjE3MTQxNjI0NzcsImlzcyI6Imh0dHBzOi8vZW1lYS1zb3V0aC1zYXBidWlsZC1jbXRlOTFjcC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOWQwYTQxY2UtZjMzOS00YjdmLWJjNDgtZmQ0MGI3M2M3YTZmIiwiYXVkIjpbInVhYSIsInNiLWMwN2VjYjVkLWI2NmMtNGU0OC1iZWIzLThkNTExYzYzOGZmYyFiMTY5MDYwfHhzdWFhIWIxMjAyNDkiXX0.SknQ3gBl7-KJcfwBNTCx9mVN0eHoc5YVpEk0DTc03WdWwJMB9KSDksCOGpc71MLN3j-XZL1LZIttnLf8GvUdr46hyJbIvIUSyCHEa5W0iaueyh7G44hKGHYw0upryPnVZFS4hwLqxx1Cz_jHloDEAnfN1qLus2z3Le4SZ8Ok-pEtfYfn_zqxiI_Xi1WPIYC3m3It-Uv67ATcGRxB49pdSBmYI5mXWFW39QGiX7MRyqaIyofLu_unHBUskmdLdZoqkgv2TV5Atauc_wiJrNCpoze9TWycGMYlv894gbaiojUiruLadgLbhnpxoZayXlH_k7H0O2CIt3_hw5nETC7-ug";

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
    const doxBasePath = "document-information-extraction/v1";
    var request = require('request');
    let clientId = "ma_00";
    let doxSchemaId = "ea717c53-4f1e-4dc3-8a42-0b3343fd285e";
    try {
        console.log(`--- Creating new DOX job ---`);
        console.log(req);
        let data = req.data;
        let rawBinaryData = data.file;
        
        // Assume 'rawBinaryData' contains the raw binary data of the PDF file

        // Step 1: Convert the raw binary data to a Uint8Array/*
        const uint8Array = new Uint8Array(rawBinaryData.length);
        for (let i = 0; i < rawBinaryData.length; i++) {
            uint8Array[i] = rawBinaryData.charCodeAt(i);
        }

        // Step 2: Create a Blob object using the Uint8Array data
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        
        // Now 'blob' contains the PDF file in Blob format
        let documentName = "default-inovoice";       
        let fileName = documentName+'.pdf';
        

        /*
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
            path: `${doxBasePath}/document/jobs`,
            data: formData,
            headers: headers
        });
        //*/
        //Update table Headers with the new uploaded invoice
        let dox_guid = "385e5da4-3e1a-4110-83b0-70da4029e5ea";
        let newHeader = {
            dox_guid : dox_guid,
            dox_status : "Processing "
        }
        let q1 = INSERT.into (Headers) .entries (newHeader);
        let exec = await sia.run(q1);

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
    const doxJobsPath = "/document/jobs";
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://aiservices-dox.cfapps.eu10.hana.ondemand.com/document-information-extraction/v1/document/jobs/'+jobId,
    'headers': {
        'Authorization': 'Bearer '+doxToken
    },
    formData: {

    }
    };
    request(options, async function (error, response) {
        if (error) throw new Error(error);
        let result = JSON.parse(response.body);
        let headerFields = result.extraction.headerFields;
        console.log(headerFields);
        let lineItems = result.extraction.lineItems;
        //console.log(headerFields);
        //console.log(result);
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
            let findPoQuery = SELECT.from('purchaseOrders').where(
                {flightNumber:lineItem[2].value, 
                landingDate: lineItem[3].value,
                landingTime:lineItem[4].value});
            let exec3 = await sia.run(findPoQuery);
            if(exec3.length != 0){
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
            //Create insert array to push the information to the Items table with the PO in formation and lookup resutls
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
        
        //Triggering the workflow for the extracted items that would be auto posted
        var request = require('request');
        var options = {
        'method': 'POST',
        'url': 'https://spa-api-gateway-bpi-eu-prod.cfapps.eu10.hana.ondemand.com/workflow/rest/v1/workflow-instances',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sbpaToken
        },
        body: JSON.stringify({
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
        })
        
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
            console.log(response.body);
        });
        //-----------------------------------------------------------------
        //Triggering the workflow for the extracted items that would requires verification
        var request = require('request');
        var options = {
        'method': 'POST',
        'url': 'https://spa-api-gateway-bpi-eu-prod.cfapps.eu10.hana.ondemand.com/workflow/rest/v1/workflow-instances',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sbpaToken
        },
        body: JSON.stringify({
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
        })
        
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
            console.log(response.body);
        });
        //*/
       
        
    });

   
    
}



module.exports = {
    createInvoice, refreshJobs
}