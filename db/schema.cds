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
    supplierNumber : String(100);
    currency : String(3);
}

entity Items : cuid
{   key header : Association to one Headers;
    ItemNum : String(100);
    flightNumber : String(100);
    flightDate : Date;
    flightTime : Time;
    quantity : Decimal;
    amount : Decimal;
    
}
