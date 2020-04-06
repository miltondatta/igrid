'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('challans', [
            {
                "challan_no"          : "cha-0604380001",
                "challan_date"        : "01-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-20310305001",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 1,
                "is_closed"           : false,
                "received_by"         : "Shams Imran",
                "added_by"            : 1,
                "attachment"          : "1586150534221-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350003",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-1837JHU5402",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 6,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586158776080-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350002",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-20310305003",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "Shams Imran",
                "added_by"            : 1,
                "attachment"          : "1586155381397-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350012",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "PO-SOFT98IJU7",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 1,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586160519497-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350015",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "PO-S98jhy67",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586164283648-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604380201",
                "challan_date"        : "01-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-20310305201",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 1,
                "is_closed"           : false,
                "received_by"         : "Shams Imran",
                "added_by"            : 1,
                "attachment"          : "1586150534221-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350203",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-1837JHU5102",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 6,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586158776080-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350202",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-20310305503",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "Shams Imran",
                "added_by"            : 1,
                "attachment"          : "1586155381397-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350212",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "PO-SOFT98IJU76",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 1,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586160519497-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350215",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "PO-S98jhy678u",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586164283648-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604380301",
                "challan_date"        : "01-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-20310305801",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 1,
                "is_closed"           : false,
                "received_by"         : "Shams Imran",
                "added_by"            : 1,
                "attachment"          : "1586150534221-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350303",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-1837JHU5492",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 6,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586158776080-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350302",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "po-20310315003",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "Shams Imran",
                "added_by"            : 1,
                "attachment"          : "1586155381397-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350312",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "PO-SOFT98IJv9",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 1,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586160519497-ReferenceCard.pdf",
                "comments"            : ""
            },
            {
                "challan_no"          : "cha-0604350315",
                "challan_date"        : "06-04-20",
                "challan_description" : "",
                "purchase_order_no"   : "PO-S98J9U6794",
                "purchase_order_date" : "06-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "Shuvo",
                "added_by"            : 1,
                "attachment"          : "1586164283648-ReferenceCard.pdf",
                "comments"            : ""
            }
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('challans', null, {});
    }
};
