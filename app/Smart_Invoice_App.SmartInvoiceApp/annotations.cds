using Smart_Invoice_AppService as service from '../../srv/service';

annotate service.Headers with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'Smart_Invoice_AppService.refreshJob',
            Label : 'Refresh Job',
            Inline : true,
            ![@UI.Hidden] : false,
        },
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
            Value : supplierName,
            Label : 'supplierName',
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
            Value : description,
            Label : 'description',
        },
        {
            $Type : 'UI.DataField',
            Value : amount,
            Label : 'amount',
        },
        {
            $Type : 'UI.DataField',
            Label : 'currency',
            Value : currency,
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
            Label : 'Flight Services List',
            ID : 'itemsList',
            Target : 'item/@UI.LineItem#itemsList',
        },
    ]
);
annotate service.Items with @(
    UI.LineItem #itemsList : [
        {
            $Type : 'UI.DataField',
            Value : flightNumber,
            Label : 'flightNumber',
        },
        {
            $Type : 'UI.DataField',
            Value : flightDate,
            Label : 'flightDate',
        },
        {
            $Type : 'UI.DataField',
            Value : flightTime,
            Label : 'flightTime',
        },
        {
            $Type : 'UI.DataField',
            Value : quantity,
            Label : 'quantity',
        },
        {
            $Type : 'UI.DataField',
            Value : amount,
            Label : 'amount',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
        {
            $Type : 'UI.DataField',
            Value : poNumber,
            Label : 'poNumber',
        },
        {
            $Type : 'UI.DataField',
            Value : poLineNumber,
            Label : 'poLineNumber',
        },]
);
annotate service.Headers with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Invoice Details',
            ID : 'SupplierName',
            Target : '@UI.FieldGroup#SupplierName',
        },
    ],
    UI.FieldGroup #SupplierName : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : supplierName,
                Label : 'supplierName',
            },{
                $Type : 'UI.DataField',
                Value : invoiceNumber,
                Label : 'invoiceNumber',
            },{
                $Type : 'UI.DataField',
                Value : invoiceDate,
                Label : 'invoiceDate',
            },
            {
                $Type : 'UI.DataField',
                Value : amount,
                Label : 'amount',
            },{
                $Type : 'UI.DataField',
                Value : currency,
                Label : 'currency',
            },{
                $Type : 'UI.DataField',
                Value : description,
                Label : 'description',
            },],
    }
);
