// Allows DOM to be manipulated after document is ready
$(document).ready(() => {

    // GLOBAL VARIABLES
    // Variable to hold parameters to pass for database query
    let paramsObj = {
        nameWhere: [],
        addressWhere: [],
        courseWhere: []
    };

    // GLOBAL FUNCTIONS
    // Function that shows more search options based on initial filter choice
    searchOptions = () => {
        let choice = $("#initial-choice").val();

        // Switch statement to determine what option to show and hide the others
        switch (choice) {
            case "Sex":
                $("#filter-text").show();
                $("#filter-number").hide();
                $(".criteria").hide();
                $("#sex").show();
                break;
            case "State":
                $("#filter-text").show();
                $("#filter-number").hide();
                $(".criteria").hide();
                $("#state").show();
                break;
            case "Zip":
                $("#filter-text").show();
                $("#filter-number").hide();
                $(".criteria").hide();
                $("#zip").show();
                break;
            case "Subject":
                $("#filter-text").show();
                $("#filter-number").hide();
                $(".criteria").hide();
                $("#subject").show();
                break;
            case "Grade":
            case "GPA":
                $("#filter-number").show();
                $("#filter-text").hide();
                $(".criteria").hide();
                $("#number").show();
                break;
        }
    }

    // Function that saves info into paramsObj when Add Filter button is clicked
    getFilterInfo = () => {
        // Grab value from the initial filter
        let filterChoice = $("#initial-choice").val()
        console.log("FilterChoice: " + filterChoice)

        // Grab value from the type of filter
        let filterType = $(".operator:visible").val()
        console.log("FilterType: " + filterType)

        // Grab id from the type of filter
        let filterId = $(".operator:visible").attr("id");
        console.log("FilterId: " + filterId)

        // Grab value from the search options
        let searchTerm = $(".criteria:visible").val()

        // Variable to store what table the where statement will be used in
        let table = "";
        // Switch statement to store variable
        switch (filterChoice) {
            case ("Sex"):
            case ("Age"):
                table = "nameWhere";
                break;
            
            case ("Address"):
            case ("City"):
            case ("County"):
            case ("State"):
            case ("Zip"):
                table = "addressWhere";
                break;
            
            case ("Subject"):
            case ("Grade"):
                table = "courseWhere";
                break;
        }
        // Run switch statement to push into paramsObj
        switch (filterType) {
            case ("Equals"):
                paramsObj[table].push({ [filterChoice]: { "$eq": searchTerm } });
                filterType = "="
                break;

            case ("Does Not Equal"):
                paramsObj[table].push({ [filterChoice]: { "$ne": searchTerm } });
                filterType = "!="
                break;

            case ("Greater Than"):
                paramsObj[table].push({ [filterChoice]: { "$gt": searchTerm } });
                filterType = ">"
                break;

            case ("Greater Than or Equals"):
                paramsObj[table].push({ [filterChoice]: { "$gte": searchTerm } });
                filterType = ">="
                break;

            case ("Less Than"):
                paramsObj[table].push({ [filterChoice]: { "$lt": searchTerm } });
                filterType = "<"
                break;

            case ("Less Than or Equals"):
                paramsObj[table].push({ [filterChoice]: { "$lte": searchTerm } });
                filterType = "<="
                break;
        }

        // Display search term and add to search term area
        $("#current").append("<span class='small d-inline'>" + filterChoice + filterType + searchTerm + "&nbsp&nbsp</span>")

        // Once filter data is set, run db query
        requestData();
    }
    // Function to send an ajax post request to retrieve data
    requestData = () => {
        $.post("api/students", paramsObj)
            .then((data) => {
                console.log(data);
                // Empty previous data displayed
                $("tbody").empty();
                // Display new data
                displayData(data);
            }).catch((err) => {
                console.log(err);
            })
    }
    // Function to display data in the table once retrieved from a Names table search
    displayData = data => {
        // Run a for loop to append data to the table
        for (let i = 0; i < data.length; i++) {
            // Create a new tr element
            let newRow = $("<tr>");
            // Append data to the new tr
            newRow.append("<td>" + data[i].first_name + "</td>");
            newRow.append("<td>" + data[i].last_name + "</td>");
            newRow.append("<td>" + data[i].sex + "</td>");
            newRow.append("<td>" + data[i].age + "</td>");
            newRow.append("<td>" + data[i].Address.address + "</td>");
            newRow.append("<td>" + data[i].Address.city + "</td>");
            newRow.append("<td>" + data[i].Address.county + "</td>");
            newRow.append("<td>" + data[i].Address.state + "</td>");
            newRow.append("<td>" + data[i].Address.zip + "</td>");
            newRow.append("<td>" + data[i].Course.subject + "</td>");
            newRow.append("<td>" + data[i].Course.grade + "</td>");
            // Append the completed tr element to tbody
            $("tbody").append(newRow);
        }
    }
    // CLICK FUNCTIONS ==========================================================
    // Called when an initial choice is made in the select box
    $("#initial-choice").change(() => {
        // Run searchOptions function on click
        searchOptions();
    })

    // When the Search button is clicked, previous search values are erased, the new values are grabbed from the filter and a db query is run
    $("#search").click(() => {
        // Erase previous search params
        paramsObj = {
            nameWhere: [],
            addressWhere: [],
            courseWhere: []
        };
        // Clear display of previous search terms
        $("#current").empty();
        // Create filter and run db query
        getFilterInfo();
    })

    // When the Add Filter button is clicked, the new search terms are added to the paramsObj and a db query is run
    $("#filter").click(() => {
        // Create filter and run db query
        getFilterInfo();
    })

    // When the Clear Filters button is clicked, the paramsObj will be reset and the full db will be displayed
    $("#clear").click(() => {
        paramsObj = {
            nameWhere: [],
            addressWhere: [],
            courseWhere: []
        };
        // Clear display of previous search terms
        $("#current").empty();
        requestData();
    })

    // ===========================================================================
    // ON PAGE LOAD
    requestData();
});