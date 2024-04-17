using { sia as my } from '../db/schema';

@path : '/service/Smart_Invoice_AppSvcs'
service Smart_Invoice_AppService
{
    entity Headers as
        projection on my.Headers
        actions
        {
            action refreshJob
            (
            );
            
        };

    entity Items as
        projection on my.Items

    action createInvoice
    (
        file : String
    )
    returns String;

    entity PurchaseOrders as
        projection on my.PurchaseOrders;
}

annotate Smart_Invoice_AppService with @requires :
[
    'authenticated-user'
];
