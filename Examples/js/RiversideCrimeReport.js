(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Place",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Address",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "rivCrimeReport",
            alias: "Riverside_Crime_Report",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://riversideca.gov/transparency/data/dataset/jsonfull/27/Crime_Reports", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Place": feat[i].properties.Place,
                    "Address": feat[i].properties.Address,
                    
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Riverside_Crime"; //// This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
