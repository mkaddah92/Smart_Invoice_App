sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'SmartInvoiceApp/SmartInvoiceApp/test/integration/FirstJourney',
		'SmartInvoiceApp/SmartInvoiceApp/test/integration/pages/HeadersList',
		'SmartInvoiceApp/SmartInvoiceApp/test/integration/pages/HeadersObjectPage'
    ],
    function(JourneyRunner, opaJourney, HeadersList, HeadersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('SmartInvoiceApp/SmartInvoiceApp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheHeadersList: HeadersList,
					onTheHeadersObjectPage: HeadersObjectPage
                }
            },
            opaJourney.run
        );
    }
);