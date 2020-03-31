import moment from "moment";

export const disabledRanges = [{
    disabled: true,
    start: moment().add(1, 'day'),
    end: moment().add(50, 'year')
}];

export const validateInput = (e) => {
    let value = e.target.value;
    let numDataset = e.target.dataset.number;
    if (numDataset === 'integer_only') {
        if (!isNaN(value)) {
            return value.replace('.', '');
        } else {
            return;
        }
    } else if (numDataset === 'float_only') {
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


