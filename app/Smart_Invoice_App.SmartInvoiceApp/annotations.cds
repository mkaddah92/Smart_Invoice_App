using Smart_Invoice_AppService as service from '../../srv/service';

annotate service.Headers with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : dox_guid,
            Label : 'dox_guid',
        },
        {
            $Type : 'UI.DataField',
            Label : 'dox_status',
            Value : dox_status,
        },
        {
            $Type : 'UI.DataField',
            Label : 'invoiceNumber',
            Value : invoiceNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'invoiceDate',
            Value : invoiceDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'supplierNumber',
            Value : supplierNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'currency',
            Value : currency,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'Smart_Invoice_AppService.EntityContainer/submitInvoice',
            Label : 'submitInvoice',
        },
    ]
);
annotate service.Headers with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'dox_status',
                Value : dox_status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'invoiceNumber',
                Value : invoiceNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'invoiceDate',
                Value : invoiceDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'supplierNumber',
                Value : supplierNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'currency',
                Value : currency,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
