exports.previewdata = function(data) {
    if (data != null) {
        for (let [key, value] of Object.entries(object1)) {
            // console.log(`${key}: ${value}`);
            if ([key] == "name" && [value] != null) {
                $('fname').prop('value', [value]);
            }
            else if ([key] == "lastname" && [value] != null) {
                $('lname').prop('value', [value]);
            }
            else if ([key] == "number" && [value] != null) {
                $('num').prop('value', [value]);
            }
            else if ([key] == "address" && [value] != null) {
                $('add').prop('value', [value]);
            }
            else if ([key] == "mail" && [value] != null) {
                $('mail').prop('value', [value]);
            }
            else if ([key] == "other" && [value] != null) {
                $('oth').prop('value', [value]);
            }
        }
    }
}