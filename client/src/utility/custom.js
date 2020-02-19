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

export const getFileExtension = (filename) => {
    let ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
};
