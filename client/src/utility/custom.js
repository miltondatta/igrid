export const validateInput = (e) => {
    let value = e.target.value;
    let numDataset = e.target.dataset.number;
    if (numDataset === 'integer_only') {
        if (!isNaN(value)) {
            return value.replace('.', '');
        } else {
            return;
        }
    } else if (e.target.dataset.number === 'float_only') {
        if (!isNaN(value)) {
            return value
        } else {
            return;
        }
    } else {
        return value;
    }
};
