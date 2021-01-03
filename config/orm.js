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
    //translate array to strings to a single comma-separated string
    return arr.toString();
};

//Object for all our SQL statement function
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    //An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

//Export the orm object for the model (burger.js)
module.exports = orm;