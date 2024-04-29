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
            Value : ID,
            Label : '{i18n>dox_guid}',
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>dox_status}',
            Value : dox_status,
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : '{i18n>supplierName}',
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>invoiceNumber}',
            Value : invoiceNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>invoiceDate}',
            Value : invoiceDate,
        },
        {
            $Type : 'UI.DataField',
            Value : description,
            Label : '{i18n>description}',
        },
        {
            $Type : 'UI.DataField',
            Value : amount,
            Label : '{i18n>totalAmount}',
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>currency}',
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
                Label : '{i18n>dox_status}',
                Value : dox_status,
            },
            {
                $Type : 'UI.DataField',
                Label : '{invoiceNumber}',
                Value : invoiceNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>invoiceDate}',
                Value : invoiceDate,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>supplierNumber}',
                Value : supplierNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>currency}',
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
            Label : '{i18n>flightNumber}',
        },
        {
            $Type : 'UI.DataField',
            Value : flightDate,
            Label : '{i18n>flightDate}',
        },
        {
            $Type : 'UI.DataField',
            Value : flightTime,
            Label : '{i18n>flightTime}',
        },
        {
            $Type : 'UI.DataField',
            Value : quantity,
            Label : '{i18n>quantity}',
        },
        {
            $Type : 'UI.DataField',
            Value : amount,
            Label : '{i18n>amount}',
        },
        {
            $Type : 'UI.DataField',
            Value : matchingStatus,
            Label : '{i18n>matchingStatus}',
        },
        {
            $Type : 'UI.DataField',
            Value : workflowStatus,
            Label : '{i18n>workflowStatus}',
        },
        {
            $Type : 'UI.DataField',
            Value : poNumber,
            Label : '{i18n>poNumber}',
        },
        {
            $Type : 'UI.DataField',
            Value : poLineNumber,
            Label : '{i18n>poLineNumber}',
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
                Label : '{i18n>supplierName}',
            },{
                $Type : 'UI.DataField',
                Value : invoiceNumber,
                Label : '{i18n>invoiceNumber}',
            },{
                $Type : 'UI.DataField',
                Value : invoiceDate,
                Label : '{i18n>invoiceDate}',
            },
            {
                $Type : 'UI.DataField',
                Value : amount,
                Label : '{i18n>totalAmount}',
            },{
                $Type : 'UI.DataField',
                Value : currency,
                Label : '{i18n>currency}',
            },{
                $Type : 'UI.DataField',
                Value : description,
                Label : '{i18n>description}',
            },],
    }
);
