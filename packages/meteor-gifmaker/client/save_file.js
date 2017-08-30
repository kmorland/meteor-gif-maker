Meteor.saveFile = function(blob, name, path, type, callback) {
    var fileReader = new FileReader(),
        method, encoding = 'binary', type = type || 'binary';
    switch (type) {
        case 'image/png':
        case 'image/jpeg':
        case 'binary':
            //Changed the method, as readAsBinaryString is not supported now
            //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
            method = 'readAsDataURL';
            //encoding = 'binary';
            break;
        default:
            //Changed the method, as readAsBinaryString is not supported now
            //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
            method = 'readAsDataURL';
            //encoding = 'binary';
            break;
    }
    fileReader.onload = function(file) {
       console.log(file);
       //Added callback to call the callback from the args
       if( callback ) callback(file);
    }
    fileReader[method](blob);
}