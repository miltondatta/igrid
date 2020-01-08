const devBaseUrl = 'http://localhost:5000/api/v1/'
const prodBaseUrl = 'http://localhost:5000/api/v1/'

export const apiUrl = () => {
    if(process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return devBaseUrl
    } else {
        return prodBaseUrl
    }
}

export const sidenav = [
    {
        id: 1,
        name: 'Material Requisition',
        icon: 'fas fa-sitemap',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Hardware',
                link: '/asset/1',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Accessories',
                link: '/asset/2',
                icon: "far fa-keyboard"
            },
            {
                id: 3,
                name: 'Stationary',
                link: '/asset/3',
                icon: "fab fa-500px"
            },
            {
                id: 4,
                name: 'Others',
                link: '/asset/4',
                icon: "fab fa-ethereum"
            },
        ]
    },
    {
        id: 2,
        name: 'Requisition History',
        icon: 'fas fa-history',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Requisition Form',
                link: '/request-history',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Branch Requisition',
                link: '/branch-requesition',
                icon: "far fa-keyboard"
            },
            {
                id: 3,
                name: 'Delivery Request',
                link: '/delivery-request',
                icon: "fab fa-500px"
            },
            {
                id: 4,
                name: 'Upazila Requisition',
                link: '',
                icon: "fab fa-ethereum"
            },
            {
                id: 5,
                name: 'Approval Log',
                link: '',
                icon: "fab fa-slack"
            },
            {
                id: 6,
                name: 'Region Request',
                link: '',
                icon: "far fa-snowflake"
            },
            {
                id: 7,
                name: 'Region Requisitions',
                link: '',
                icon: "fas fa-water"
            },
        ]
    },
    {
        id: 1,
        name: 'Material Requisition',
        icon: 'fas fa-sitemap',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Hardware',
                link: '',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Accessories',
                link: '',
                icon: "far fa-keyboard"
            },
            {
                id: 3,
                name: 'Stationary',
                link: '',
                icon: "fab fa-500px"
            },
            {
                id: 4,
                name: 'Others',
                link: '',
                icon: "fab fa-ethereum"
            },
        ]
    },
]

export const requestOn = {
    1:'Hardware',
    2:'Accessories',
    3:'Stationary',
    4:'Others'
}

export const hardwareOptions = {
    1: 'Android Tab',
    2: 'Wireless Router',
    3: 'Modem (GP)',
    4: 'SIM (GP)',
    5: 'System Unit  (PC)',
    6: 'Monitor',
    7: 'UPS',
    8: 'Printer',
    9: 'Laptop',
    10: 'Smart Phone',
    11: 'Generator',
    12: 'Projector',
    13: 'Scanner',
    14: 'Printer Laser',
    15: 'IPS',
    16: 'AVR',
    17: 'Bag for Tab',
    18: 'Voltage Stabilizer',
}

export const stationaryOptions = {
    1: 'Ribbon',
    2: 'DVD RW',
    3: 'Key Board',
    4: 'Mouse',
    5: 'Power Cable',
    6: 'Printer Cable - Parallel',
    7: 'Power Strip',
    8: 'White Paper',
    9: 'Roll Paper',
    10:' Printer Cable - USB',
    11: 'TAB Cover',
}

export const accessoriesOptions = {
    1: 'Dust Blower',
    2: 'USB Cable',
    3: 'VGA Cable',
    4: 'Ink Bottle'
}

export const otherOptions = {
    1: 'Others',
}