namespace sia;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    extensible,
    managed,
    temporal
}
from '@sap/cds/common';

entity Headers : cuid
{
    item : Composition of many Items on item.header = $self;
    dox_guid : UUID;
    dox_status : String(100);
    invoiceNumber : String(100);
    invoiceDate : Date;
    amount : Decimal;
    supplierName : String(100);
    supplierNumber : String(100);
    currency : String(3);
    description : String;
    unit : String(5);
    unitPrice : Decimal;
}

entity Items : cuid
{   
    key header : Association to one Headers;
    ItemNum : String(100);
    flightNumber : String(100);
    flightDate : Date;
    flightTime : String;
    quantity : Decimal;
    amount : Decimal;
    matchingStatus : String(100);
    workflowStatus : String(100);
    poNumber : String(100);
    poLineNumber : String(100);
    
}
entity PurchaseOrders : cuid
{
    supplierNumber : String(100);
    poNumber : String(100);
    poLineNumber : String(100);
    flightNumber: String;
    departureDate : Date;
    departureTime : Time;
    landingDate : Date;
    landingTime : Time;

}