
exports.sendResponse = function(data, response) {
    console.log(data);
    response.send(200, { success: true, result: data });
};

exports.sendError = function(code, message, response) {
    console.log(message);
    if(response) response.send(code, { success: false, error: message });
};