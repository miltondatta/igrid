import {devBaseUrl, prodBaseUrl} from "../config/private";
import React from "react";
export const apiBaseUrl =  'http://localhost:5000/';

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
                name: 'Approved Delivery',
                link: '/approved-delivery',
                icon: "far fa-keyboard"
            },
            {
                id: 4,
                name: 'Material Requisition',
                link: '/asset',
                icon: "far fa-keyboard"
            },
            {
                id: 5,
                name: 'Requisition Status',
                link: '/requisition-status',
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
                name: 'Asset Registration',
                link: '/stock-reg',
                icon: ""
            },
            {
                id: 1,
                name: 'Stock',
                link: '/challan',
                icon: ""
            },
            {
                id: 4,
                name: 'Lost Assets Information',
                link: '',
                icon: ""
            },
            {
                id: 11,
                name: 'Asset Dispose',
                link: '/asset-dispose',
                icon: ""
            },
            {
                id: 14,
                name: 'Asset Transfer',
                link: '/asset-transfer',
                icon: ""
            },
            {
                id: 15,
                name: 'Repair & Maintenance',
                link: '/asset-repair',
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
                link: '/request-history',
                icon: ""
            },
            {
                id: 2,
                name: 'Stock Report',
                link: '/branch-requesition',
                icon: ""
            }
        ]
    },
    {
        id: 7,
        name: 'MIS',
        icon: 'fas fa-reply-all',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Indicator Category',
                link: '/mis-indicator-category',
                icon: ""
            },
            {
                id: 2,
                name: 'Indicator',
                link: '/mis-indicator',
                icon: ""
            },
        ]
    }
]

export const systemAdmin = [
    {
        id: 9,
        name: 'Setting',
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
                id: 3,
                name: 'Models',
                link: '/admin/model',
                icon: ""
            },
            {
                id: 4,
                name: 'Brands',
                link: '/admin/brand',
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
                id: 15,
                name: 'User Associate Role',
                link: '/admin/user-associate-role',
                icon: ""
            },
            {
                id: 16,
                name: 'Register User',
                link: '/admin/register-user',
                icon: ""
            },
        ]
    },
    {
        id: 10,
        name: 'Configuration',
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
                name: 'New Document',
                link: '/documents/document-list',
                icon: ""
            }
        ]
    }
];

export const homeBanner = [
    {
        title: "Manage your Business Easily",
        btnText: "MIS Report",
        link: "/",
        img: "/media/banner/b_1.png"
    },
    {
        title: "Manage your asset quickly",
        btnText: "Asset Requisition & Tracking",
        link: "/stock-reg",
        img: "/media/banner/b_2.png"
    },
    {
        title: "Manage your Documents Easily",
        btnText: "Document Management",
        link: "/documents",
        img: "/media/banner/b_3.png"
    },
    {
        title: "Find your Locations",
        btnText: "Location Finder",
        link: "/location",
        img: "/media/banner/b_4.png"
    },
];