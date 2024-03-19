using { sia as my } from '../db/schema';

@path : '/service/Smart_Invoice_AppSvcs'
service Smart_Invoice_AppService
{
    entity Headers as
        projection on my.Headers
        actions
        {
            action uploadInvoice
            (
                file : String(100)
            )
            returns Headers;
        };

    entity Items as
        projection on my.Items;

    action createInvoice
    (
        file : String(100)
    )
    returns Headers;
}

annotate Smart_Invoice_AppService with @requires :
[
    'authenticated-user'
];
