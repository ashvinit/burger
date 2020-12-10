// Import MySQL connecion.
var connection = require("./connection.js");

//Helper function for SQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i=0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};

//Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    //loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            //if string with spaces, add quotations
            if (typeof value === "string") {
                value = "'" + value + "'";
            };
            arr.push(key + "=" + value);
        };
    };
}