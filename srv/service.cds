using { sia as my } from '../db/schema';

@path : '/service/Smart_Invoice_AppSvcs'
service Smart_Invoice_AppService
{
    entity Headers as
        projection on my.Headers
        actions
        {
            @cds.odata.bindingparameter.name : '_it'
            @Common.SideEffects : 
            {
                SourceEntities :
                [
                    _it
                ],
                TargetEntities :
                [
                    _it
                ]
            }
            action refreshJob
            (
            );
        };

    entity Items as
        projection on my.Items;

    action createInvoice
    (
        file : LargeBinary
    )
    returns String;

    entity PurchaseOrders as
        projection on my.PurchaseOrders;
}

annotate Smart_Invoice_AppService with @requires :
[
    'authenticated-user'
];
