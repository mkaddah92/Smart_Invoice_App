using { sia as my } from '../db/schema';

@path : '/service/Smart_Invoice_AppSvcs'
service Smart_Invoice_AppService
{
    //@odata.draft.enabled
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

    action submitInvoice
    (
        file : String(100)
    )
    returns Headers;
}

annotate Smart_Invoice_AppService with @requires :
[
    'authenticated-user'
];
