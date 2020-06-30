'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('menus', [
            {
                "id": 1,
                "name": "Requisition",
                "icon": "fas fa-history",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 2,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 2,
                "name": "New Requisition",
                "icon": "far fa-keyboard",
                "sub_menu": false,
                "link": "/requisition",
                "parent_id": 1,
                "module_id": 2,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 3,
                "name": "My Requisition Status",
                "icon": "far fa-keyboard",
                "sub_menu": false,
                "link": "/requisition-status",
                "parent_id": 1,
                "module_id": 2,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 4,
                "name": "Requisition List",
                "icon": "fas fa-satellite",
                "sub_menu": false,
                "link": "/request-history",
                "parent_id": 1,
                "module_id": 2,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 5,
                "name": "Delivery Request",
                "icon": "fab fa-500px",
                "sub_menu": false,
                "link": "/delivery-request",
                "parent_id": 1,
                "module_id": 2,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 6,
                "name": "My Delivery",
                "icon": "far fa-keyboard",
                "sub_menu": false,
                "link": "/approved-delivery",
                "parent_id": 1,
                "module_id": 2,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 7,
                "name": "Delivery Received",
                "icon": "far fa-keyboard",
                "sub_menu": false,
                "link": "/delivery-received",
                "parent_id": 1,
                "module_id": 2,
                "visible": true,
                "order_by": 6,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 8,
                "name": "Asset",
                "icon": "fas fa-chart-pie",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 2,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 9,
                "name": "New Asset Registration",
                "icon": "",
                "sub_menu": false,
                "link": "/stock-reg",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 9,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 10,
                "name": "Open Challan List",
                "icon": "",
                "sub_menu": false,
                "link": "/challan",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 11,
                "name": "Own Stock",
                "icon": "",
                "sub_menu": false,
                "link": "/own-stock",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 12,
                "name": "Asset Details",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-details",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 17,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 13,
                "name": "Asset Transfer",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-transfer",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 14,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 14,
                "name": "Asset Disposal",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-disposal",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 11,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 15,
                "name": "Disposal Asset List",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-disposal-list",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 12,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 16,
                "name": "Lost Assets Information",
                "icon": "",
                "sub_menu": false,
                "link": "/lost-assets",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 17,
                "name": "Lost Assets Status",
                "icon": "",
                "sub_menu": false,
                "link": "/lost-assets-status",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 18,
                "name": "Repair & Maintenance",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-repair",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 15,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 19,
                "name": "Repair & Maintenance List",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-repair-list",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 16,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 20,
                "name": "Report",
                "icon": "icofont-chart-histogram",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 2,
                "visible": true,
                "order_by": 6,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 21,
                "name": "Stock Report",
                "icon": "",
                "sub_menu": false,
                "link": "/stock-report",
                "parent_id": 20,
                "module_id": 2,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 87,
                "name": "Depreciation  Report",
                "icon": "",
                "sub_menu": false,
                "link": "/stock-depriciation-report",
                "parent_id": 20,
                "module_id": 2,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 22,
                "name": "Delivery Report",
                "icon": "",
                "sub_menu": false,
                "link": "/delivery-report",
                "parent_id": 20,
                "module_id": 2,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 23,
                "name": "Lost Assets Report",
                "icon": "",
                "sub_menu": false,
                "link": "/lost-assets-report",
                "parent_id": 20,
                "module_id": 2,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 24,
                "name": "Asset Disposal Report",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-disposal-report",
                "parent_id": 20,
                "module_id": 2,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 25,
                "name": "Maintenance Report",
                "icon": "",
                "sub_menu": false,
                "link": "/maintenance-report",
                "parent_id": 20,
                "module_id": 2,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 26,
                "name": "Complaints",
                "icon": "fas fa-book-dead",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 2,
                "visible": true,
                "order_by": 8,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 27,
                "name": "New Complaint",
                "icon": "",
                "sub_menu": false,
                "link": "/complaint",
                "parent_id": 26,
                "module_id": 2,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 28,
                "name": "My Complaint Status",
                "icon": "",
                "sub_menu": false,
                "link": "/my-complaint-status",
                "parent_id": 26,
                "module_id": 2,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 29,
                "name": "Assign Complaint",
                "icon": "",
                "sub_menu": false,
                "link": "/assign-complaint",
                "parent_id": 26,
                "module_id": 2,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 30,
                "name": "Complaint Report",
                "icon": "",
                "sub_menu": false,
                "link": "/complaint-report",
                "parent_id": 26,
                "module_id": 2,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 83,
                "name": "Delivery Report (All)",
                "icon": "",
                "sub_menu": false,
                "link": "/delivery-report/all",
                "parent_id": 26,
                "module_id": 2,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 84,
                "name": "Assets Report (All)",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-report/all",
                "parent_id": 26,
                "module_id": 2,
                "visible": true,
                "order_by": 6,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 31,
                "name": "System Configuration",
                "icon": "icofont-ui-settings",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 1,
                "visible": true,
                "order_by": 10,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 32,
                "name": "Modules",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/modules",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 14,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 33,
                "name": "User Roles",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/user-roles",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 12,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 34,
                "name": "Location Hierarchies",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/loc_hierarchies",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 10,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 35,
                "name": "Approval Level",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/approval-level",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 17,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 36,
                "name": "Register User",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/register-user",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 16,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 37,
                "name": "Assign User Role",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/user-associate-role",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 15,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 38,
                "name": "Depreciation Methods",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/depreciation-methods",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 7,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 39,
                "name": "Menu",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/menu",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 8,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 40,
                "name": "Menu Assign",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/menu/assign",
                "parent_id": 31,
                "module_id": 1,
                "visible": true,
                "order_by": 9,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 41,
                "name": "Asset Configuration",
                "icon": "fas fa-user-shield",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 1,
                "visible": true,
                "order_by": 9,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 42,
                "name": "Asset Category",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/asset-category",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 43,
                "name": "Asset Sub Category",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/asset-sub-category",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 5,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 44,
                "name": "Project",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/project",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 45,
                "name": "Vendor",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/vendor",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 46,
                "name": "Brands",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/brand",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 47,
                "name": "Models",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/model",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 48,
                "name": "Product",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/product",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 6,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 49,
                "name": "Asset Types",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/asset-types",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 8,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 50,
                "name": "Conditions",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/conditions",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 9,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 51,
                "name": "Locations",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/assign-locations",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 11,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 52,
                "name": "AMC Types",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/amc-types",
                "parent_id": 41,
                "module_id": 1,
                "visible": true,
                "order_by": 17,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 53,
                "name": "MIS Configuration",
                "icon": "fas fa-reply-all",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 1,
                "visible": true,
                "order_by": 7,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 54,
                "name": "Indicator Category",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/mis/indicator/category",
                "parent_id": 53,
                "module_id": 1,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 55,
                "name": "Indicator List",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/mis/indicator/list",
                "parent_id": 53,
                "module_id": 1,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 56,
                "name": "Import CSV Data",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/mis/import/csv",
                "parent_id": 53,
                "module_id": 1,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 57,
                "name": "Log",
                "icon": "icofont-ui-note",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 1,
                "visible": true,
                "order_by": 10,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 58,
                "name": "User Login",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/user-login-log",
                "parent_id": 57,
                "module_id": 1,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 59,
                "name": "Complaints",
                "icon": "fas fa-book-dead",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 1,
                "visible": true,
                "order_by": 11,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 60,
                "name": "Complaint Category",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/complain-category",
                "parent_id": 59,
                "module_id": 1,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 61,
                "name": "Complaint Sub Category",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/complain-sub-category",
                "parent_id": 59,
                "module_id": 1,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 62,
                "name": "Complaint Mapping",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/complaint-mapping",
                "parent_id": 59,
                "module_id": 1,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 63,
                "name": "Report",
                "icon": "",
                "sub_menu": true,
                "link": "icofont-chart-histogram",
                "parent_id": 0,
                "module_id": 1,
                "visible": true,
                "order_by": 20,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 64,
                "name": "Delivery Report (All)",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/delivery-report/all",
                "parent_id": 63,
                "module_id": 1,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 65,
                "name": "Assets Report (All)",
                "icon": "",
                "sub_menu": false,
                "link": "/admin/asset-report/all",
                "parent_id": 63,
                "module_id": 1,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 66,
                "name": "All Branches",
                "icon": "fab fa-fort-awesome",
                "sub_menu": false,
                "link": "/location",
                "parent_id": 0,
                "module_id": 5,
                "visible": true,
                "order_by": 10,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 67,
                "name": "Detailed Location",
                "icon": "fas fa-map-marked-alt",
                "sub_menu": false,
                "link": "/location/details",
                "parent_id": 0,
                "module_id": 5,
                "visible": true,
                "order_by": 9,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 68,
                "name": "Dashboard",
                "icon": "fab fa-fort-awesome",
                "sub_menu": false,
                "link": "/mis/dashboard",
                "parent_id": 0,
                "module_id": 3,
                "visible": true,
                "order_by": 10,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 69,
                "name": "Extended Dashboard",
                "icon": "fas fa-tachometer-alt",
                "sub_menu": false,
                "link": "/mis/extended-dashboard",
                "parent_id": 0,
                "module_id": 3,
                "visible": true,
                "order_by": 12,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 70,
                "name": "Basic Reports",
                "icon": "fas fa-map-marked-alt",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 3,
                "visible": true,
                "order_by": 11,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 71,
                "name": "Daily",
                "icon": "",
                "sub_menu": false,
                "link": "/mis/daily-report",
                "parent_id": 70,
                "module_id": 3,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 72,
                "name": "Weekly",
                "icon": "",
                "sub_menu": false,
                "link": "/mis/weekly-report",
                "parent_id": 70,
                "module_id": 3,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 73,
                "name": "Monthly",
                "icon": "",
                "sub_menu": false,
                "link": "/mis/monthly-report",
                "parent_id": 70,
                "module_id": 3,
                "visible": true,
                "order_by": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 74,
                "name": "Profile",
                "icon": "fab fa-fort-awesome",
                "sub_menu": false,
                "link": "/profile",
                "parent_id": 0,
                "module_id": 6,
                "visible": true,
                "order_by": 31,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 75,
                "name": "Update Password",
                "icon": "fab fa-fort-awesome",
                "sub_menu": false,
                "link": "/profile/pass-reset",
                "parent_id": 0,
                "module_id": 6,
                "visible": true,
                "order_by": 32,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 76,
                "name": "Settings",
                "icon": "fab fa-fort-awesome",
                "sub_menu": false,
                "link": "/admin/user-login-log",
                "parent_id": 0,
                "module_id": 6,
                "visible": true,
                "order_by": 33,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 77,
                "name": "Logout",
                "icon": "fab fa-fort-awesome",
                "sub_menu": false,
                "link": "/",
                "parent_id": 0,
                "module_id": 6,
                "visible": true,
                "order_by": 34,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 78,
                "name": "Advance Search",
                "icon": "fas fa-search",
                "sub_menu": false,
                "link": "/documents/document-list-search",
                "parent_id": 0,
                "module_id": 4,
                "visible": true,
                "order_by": 11,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 79,
                "name": "Document",
                "icon": "far fa-file",
                "sub_menu": true,
                "link": "",
                "parent_id": 0,
                "module_id": 4,
                "visible": true,
                "order_by": 12,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 80,
                "name": "Category",
                "icon": "",
                "sub_menu": false,
                "link": "/documents/document-category",
                "parent_id": 79,
                "module_id": 4,
                "visible": true,
                "order_by": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 81,
                "name": "Sub Category",
                "icon": "",
                "sub_menu": false,
                "link": "/documents/document-sub-category",
                "parent_id": 79,
                "module_id": 4,
                "visible": true,
                "order_by": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 82,
                "name": "New Document/Circular",
                "icon": "",
                "sub_menu": false,
                "link": "/documents/document-list",
                "parent_id": 79,
                "module_id": 4,
                "visible": true,
                "order_by": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 85,
                "name": "Asset Transfer Request",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-transfer-request",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 14,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 86,
                "name": "Asset Life Cycle",
                "icon": "",
                "sub_menu": false,
                "link": "/asset-life-cycle",
                "parent_id": 8,
                "module_id": 2,
                "visible": true,
                "order_by": 18,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('menus', null, {});
    }
};
