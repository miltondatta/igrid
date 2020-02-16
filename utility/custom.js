const capitalize = (input) => {
    if (typeof input !== 'string') return '';

    const len = input.split(" ");
    let result = '';

    for (let i = 0; i < len.length; i++) {
        const text = len[i].charAt(0).toUpperCase() + len[i].slice(1).toLowerCase();
        const seperator = (i+1 === len.length) ? '': ' ';
        result += text + seperator;
    }
    return result;
};

const stripHtmlFromText = (input) => {
    return input.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "") ;
};

module.exports = {
    capitalize,
    stripHtmlFromText
};