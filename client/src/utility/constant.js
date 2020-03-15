import {devBaseUrl, prodBaseUrl, BackEnd_BaseUrl} from "../config/private";
import React from "react";
export const apiBaseUrl =  BackEnd_BaseUrl;

export const apiUrl = () => {
    if(process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return devBaseUrl
    } else {
        return prodBaseUrl
    }
};

export const sidenav = [
    {
        id: 4,
        name: 'Requisition',
        icon: 'fas fa-history',
        subCat: true,
        categories: [
            {
                id: 4,
                name: 'New Requisition',
                link: '/requisition',
                icon: "far fa-keyboard"
            },
            {
                id: 5,
                name: 'My Requisition Status',
                link: '/requisition-status',
                icon: "far fa-keyboard"
            },
            {
                id: 1,
                name: 'Requisition List',
                link: '/request-history',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Delivery Request',
                link: '/delivery-request',
                icon: "fab fa-500px"
            },
            {
                id: 3,
                name: 'My Delivery',
                link: '/approved-delivery',
                icon: "far fa-keyboard"
            },
            {
                id: 6,
                name: 'Delivery Received',
                link: '/delivery-received',
                icon: "far fa-keyboard"
            },
        ]
    },
    {
        id: 5,
        name: 'Asset',
        icon: 'fas fa-chart-pie',
        subCat: true,
        categories: [
            {
                id: 9,
                name: 'New Asset Registration',
                link: '/stock-reg',
                icon: ""
            },
            {
                id: 1,
                name: 'Open Challan List',
                link: '/challan',
                icon: ""
            },
            {
                id: 2,
                name: 'Own Stock',
                link: '/own-stock',
                icon: ""
            },
            {
                id: 17,
                name: 'Asset Details',
                link: '/asset-details',
                icon: ""
            },
            {
                id: 14,
                name: 'Asset Transfer',
                link: '/asset-transfer',
                icon: ""
            },
            {
                id: 11,
                name: 'Asset Disposal',
                link: '/asset-disposal',
                icon: ""
            },
            {
                id: 12,
                name: 'Disposal Asset List',
                link: '/asset-disposal-list',
                icon: ""
            },
            {
                id: 3,
                name: 'Lost Assets Information',
                link: '/lost-assets',
                icon: ""
            },
            {
                id: 4,
                name: 'Lost Assets Status',
                link: '/lost-assets-status',
                icon: ""
            },
            {
                id: 15,
                name: 'Repair & Maintenance',
                link: '/asset-repair',
                icon: ""
            },
            {
                id: 16,
                name: 'Repair & Maintenance List',
                link: '/asset-repair-list',
                icon: ""
            },
        ]
    },
    {
        id: 6,
        name: 'Report',
        icon: 'icofont-chart-histogram',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Delivery Report',
                link: '/delivery-report',
                icon: ""
            },
            {
                id: 2,
                name: 'Lost Assets Report',
                link: '/lost-assets-report',
                icon: ""
            },
            {
                id: 3,
                name: 'Asset Disposal Report',
                link: '/asset-disposal-report',
                icon: ""
            },
            {
                id: 4,
                name: 'Maintenance Report',
                link: '/maintenance-report',
                icon: ""
            }
        ]
    },
    {
        id: 8,
        name: 'Complaints',
        icon: 'fas fa-book-dead',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Complaints',
                link: '/complain',
                icon: ""
            },
        ]
    },
]

export const systemAdmin = [
    {
        id: 10,
        name: 'System Config',
        icon: 'icofont-ui-settings',
        subCat: true,
        categories: [
            {
                id: 14,
                name: 'Modules',
                link: '/admin/modules',
                icon: ""
            },
            {
                id: 12,
                name: 'User Roles',
                link: '/admin/user-roles',
                icon: ""
            },
            {
                id: 10,
                name: 'Location Hierarchies',
                link: '/admin/loc_hierarchies',
                icon: ""
            },
            {
                id: 17,
                name: 'Approval Level',
                link: '/admin/approval-level',
                icon: ""
            },
            {
                id: 7,
                name: 'Depreciation Methods',
                link: '/admin/depreciation-methods',
                icon: ""
            },
            {
                id: 8,
                name: 'Menu',
                link: '/admin/menu',
                icon: ""
            },
        ]
    },
    {
        id: 9,
        name: 'Settings',
        icon: 'fas fa-user-shield',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Project',
                link: '/admin/project',
                icon: ""
            },
            {
                id: 2,
                name: 'Vendor',
                link: '/admin/vendor',
                icon: ""
            },
            {
                id: 4,
                name: 'Brands',
                link: '/admin/brand',
                icon: ""
            },
            {
                id: 3,
                name: 'Models',
                link: '/admin/model',
                icon: ""
            },
            {
                id: 5,
                name: 'Asset Category',
                link: '/admin/asset-category',
                icon: ""
            },
            {
                id: 5,
                name: 'Asset Sub Category',
                link: '/admin/asset-sub-category',
                icon: ""
            },
            {
                id: 6,
                name: 'Product',
                link: '/admin/product',
                icon: ""
            },
            {
                id: 8,
                name: 'Asset Types',
                link: '/admin/asset-types',
                icon: ""
            },
            {
                id: 9,
                name: 'Conditions',
                link: '/admin/conditions',
                icon: ""
            },
            {
                id: 11,
                name: 'Locations',
                link: '/admin/assign-locations',
                icon: ""
            },
            {
                id: 16,
                name: 'Register User',
                link: '/admin/register-user',
                icon: ""
            },
            {
                id: 15,
                name: 'Assign User Role ',
                link: '/admin/user-associate-role',
                icon: ""
            },
            {
                id: 17,
                name: 'AMC Types',
                link: '/admin/amc-types',
                icon: ""
            },
        ]
    },
    {
        id: 7,
        name: 'MIS Config',
        icon: 'fas fa-reply-all',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Indicator Category',
                link: '/admin/mis/indicator/category',
                icon: ""
            },
            {
                id: 2,
                name: 'Indicator List',
                link: '/admin/mis/indicator/list',
                icon: ""
            },
            {
                id: 3,
                name: 'Import CSV Data',
                link: '/admin/mis/import/csv',
                icon: ""
            },
        ]
    },
    {
        id: 10,
        name: 'Log',
        icon: 'icofont-ui-note',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'User Login',
                link: '/admin/user-login-log',
                icon: ""
            }
        ]
    },
    {
        id: 11,
        name: 'Complaints',
        icon: 'fas fa-book-dead',
        subCat: true,
        categories: [
            {
                id: 3,
                name: 'Complaints',
                link: '/admin/complaint',
                icon: ""
            },
            {
                id: 1,
                name: 'Complaint Category',
                link: '/admin/complain-category',
                icon: ""
            },
            {
                id: 2,
                name: 'Complaint Sub Category',
                link: '/admin/complain-sub-category',
                icon: ""
            }
        ]
    },
    {
        id: 20,
        name: 'Report',
        icon: 'icofont-chart-histogram',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Delivery Report (All)',
                link: '/admin/delivery-report/all',
                icon: ""
            },
            {
                id: 2,
                name: 'Assets Report (All)',
                link: '/admin/asset-report/all',
                icon: ""
            },
        ]
    },
];

export const locationCategory = [
    {
        id: 10,
        name: 'All Branches',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/location'
    },
    {
        id: 9,
        name: 'Detailed Location',
        icon: 'fas fa-map-marked-alt',
        subCat: false,
        link: '/location/details'
    },
];

export const misCategory = [
    {
        id: 10,
        name: 'Dashboard',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/mis'
    },
    {
        id: 11,
        name: 'Basic Reports',
        icon: 'fas fa-map-marked-alt',
        subCat: true,
        categories: [
            {
                id: 3,
                name: 'Daily',
                link: '/mis/daily-report',
                icon: ""
            },
            {
                id: 1,
                name: 'Weekly',
                link: '/mis/weekly-report',
                icon: ""
            },
            {
                id: 4,
                name: 'Monthly',
                link: '/mis/monthly-report',
                icon: ""
            }
        ]
    },
];

export const documentNav = [
    {
        id: 11,
        name: 'Advance Search',
        link: '/documents/document-list-search',
        icon: "fas fa-search"
    },
    {
        id: 12,
        name: 'Document',
        icon: 'far fa-file',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Category',
                link: '/documents/document-category',
                icon: ""
            },
            {
                id: 2,
                name: 'Sub Category',
                link: '/documents/document-sub-category',
                icon: ""
            },
            {
                id: 3,
                name: 'New Document/Circular',
                link: '/documents/document-list',
                icon: ""
            }
        ]
    }
];

export const homeBanner = [
    {
        title: "Manage Your Business Easily",
        btnText: "MIS Report",
        link: "/",
        img: "/media/banner/b_1.png"
    },
    {
        title: "Manage Your Asset quickly",
        btnText: "Asset Requisition & Tracking",
        link: "/request-history",
        img: "/media/banner/b_2.png"
    },
    {
        title: "Manage Your Documents Easily",
        btnText: "Document Management",
        link: "/document-list-search",
        img: "/media/banner/b_3.png"
    },
    {
        title: "Find your Locations",
        btnText: "Location Finder",
        link: "/location",
        img: "/media/banner/b_4.png"
    },
];