## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Tue Mar 19 2024 15:42:23 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>@sap/generator-fiori-elements|
|**App Generator Version**<br>1.13.0|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>List Report Page V4|
|**Service Type**<br>Local Cap|
|**Service URL**<br>http://localhost:4004/service/Smart_Invoice_AppSvcs/
|**Module Name**<br>Smart_Invoice_App.SmartInvoiceApp|
|**Application Title**<br>Smart Invoice App|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.108.7|
|**Enable Code Assist Libraries**<br>False|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|
|**Main Entity**<br>Headers|
|**Navigation Entity**<br>None|

## Smart_Invoice_App.SmartInvoiceApp

My Invoice application

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply start your CAP project and navigate to the following location in your browser:

http://localhost:4004/Smart_Invoice_App.SmartInvoiceApp/webapp/index.html

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

#### login to UAECF subaccount 
cf login https://api.cf.eu10.hana.ondemand.com

#### bind to xsuaa and destination services in uaecf
cds bind -2 smt_inv_app-dest,smt_inv_app-uaa


