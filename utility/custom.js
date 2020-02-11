const capitalize = (input) => {
    if (typeof input !== 'string') return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
};

const upperToCapitalize = (input) => {
    if (typeof input !== 'string') return '';
    const s = input.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
};

module.exports = {
    capitalize,
    upperToCapitalize
};