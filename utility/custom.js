const capitalize = (input) => {
    if (typeof input !== 'string') return '';

    const len = input.split(" ");
    let result = '';

    for (let i = 0; i < len.length; i++) {
        const text = len[i].charAt(0).toUpperCase() + len[i].slice(1).toLowerCase();
        const seperator = (i + 1 === len.length) ? '' : ' ';
        result += text + seperator;
    }
    return result;
};

const depreciationCalculation = (item) => {
    let value_after_dep = "";
    console.log(item.depreciation_method, 17);
    switch (item.depreciation_method) {
        case 1:
            value_after_dep = parseInt(item.book_value - ((item.book_value - item.salvage_value)/(item.useful_life/12)));
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            value_after_dep = "n/a";
    }
    return value_after_dep;
};


module.exports = {
    capitalize, depreciationCalculation
};
