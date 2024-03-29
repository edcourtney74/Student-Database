// Allows DOM to be manipulated after document is ready
$(document).ready(() => {

    // GLOBAL VARIABLES
    // Variable to hold parameters to pass for database query
    let paramsObj = {
        nameWhere: [],
        addressWhere: [],
        courseWhere: [],
        order: ["", "last_name", "asc"]
    };

    // GLOBAL FUNCTIONS
    // Function that shows more search options based on initial filter choice
    searchOptions = () => {
        let choice = $("#initial-choice").val();

        // Switch statement to determine what option to show and hide the others
        switch (choice) {
            case "First Name":
            case "Last Name":
            case "Address":
            case "City":
            case "County":
            case "State":
            case "Zip":
            case "Subject":
                $("#filter-text").show();
                $("#filter-number").hide();
                $(".criteria").hide();
                $("#text-blank").show();
                $("#sex-menu").hide();
                break;
            case "Sex":
                $("#filter-text").show();
                $("#filter-number").hide();
                $(".criteria").hide();
                $("#sex").show();
                break;
            case "DOB":
            case "Grade":
            case "GPA":
                $("#filter-number").show();
                $("#filter-text").hide();
                $(".criteria").hide();
                $("#number-blank").show();
                break;
        }
    }
    // Function that saves info into paramsObj when Add Filter button is clicked
    getFilterInfo = () => {
        // Grab value from the initial filter
        let filterChoice = $("#initial-choice").val()
        // Change first name or last name to match database columns
        if (filterChoice === "First Name") {
            filterChoice = "first_name"
        } else if (filterChoice === "Last Name") {
            filterChoice = "last_name"
        }

        // Grab value from the type of filter
        let filterType = $(".operator:visible").val()

        // Grab value from the search options
        let searchTerm = $(".criteria:visible").val()

        // Variable to store what table the where statement will be used in
        let table = "";
        // Switch statement to store variable
        switch (filterChoice) {
            case "first_name":
            case "last_name":
            case "Sex":
            case "DOB":
                table = "nameWhere";
                break;
            
            case "Address":
            case "City":
            case "County":
            case "State":
            case "Zip":
                table = "addressWhere";
                break;
            
            case "Subject":
            case "Grade":
                table = "courseWhere";
                break;
        }
        // Run switch statement to push where parameter into paramsObj
        switch (filterType) {
            case ("Equals"):
                // Where parameters
                paramsObj[table].push({ [filterChoice]: { "$eq": searchTerm } });
                // Symbol for search term display
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
        $("#current").append("<span>" + filterChoice + filterType + searchTerm + "&nbsp&nbsp</span>")

        // Clear previous search terms
        $("#text-blank").val("");
        $("#number-blank").val("");

        // Once filter data is set, run db query
        requestData();
    }
    // Function to send an ajax post request to retrieve data
    requestData = () => {
        $.post("api/students", paramsObj)
            .then((data) => {
                // Empty previous data displayed
                $("tbody").empty();
                // Display new data
                displayData(data);
            }).catch((err) => {
                console.log(err);
            })
    }

    // Function to display data in the table once retrieved from the db search
    displayData = data => {
        // Run a for loop to append data to the table
        for (let i = 0; i < data.length; i++) {
            // Create a new tr element
            let newRow = $("<tr>");
            // Append data to the new tr
            newRow.append("<td>" + data[i].first_name + "</td>");
            newRow.append("<td>" + data[i].last_name + "</td>");
            newRow.append("<td>" + data[i].sex + "</td>");
            newRow.append("<td>" + data[i].DOB + "</td>");
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
    $("#initial-choice").change((event) => {
        event.preventDefault();
        // Run searchOptions function on click
        searchOptions();
    })

    // When the Search button is clicked, previous search values are erased, the new values are grabbed from the filter and a db query is run
    $("#search").click((event) => {
        event.preventDefault();
        
        // Create filter and run db query
        getFilterInfo();
        
        // Erase previous search params
        paramsObj = {
            nameWhere: [],
            addressWhere: [],
            courseWhere: [],
            order: ["", "last_name", "asc"]
        };
        // Clear display of previous search terms
        $("#current").empty();
        // Clear previous form data
        $("#text-blank").val("");
        $("#number-blank").val("");        
    })

    // When the Add Filter button is clicked, the new search terms are added to the paramsObj and a db query is run
    $("#filter").click((event) => {
        event.preventDefault();

        // Create filter and run db query
        getFilterInfo();

        // Clear previous search term fields
        $("#text-blank").val("");
        $("#number-blank").val("");
    })

    // When the Clear Filters button is clicked, the paramsObj will be reset and the full db will be displayed
    $("#clear").click((event) => {
        event.preventDefault();
        
        paramsObj = {
            nameWhere: [],
            addressWhere: [],
            courseWhere: [],
            order: ["", "last_name", "asc"]
        };
        // Clear display of previous stored search terms
        $("#current").empty();

        // Clear previous search term fields
        $("#text-blank").val("");
        $("#number-blank").val("");

        // Request full database
        requestData();
    })

    // When the sort button is clicked at the top of a column row
    $(".sort").click( function(event) {
        event.preventDefault();

        // Set table and column variables to add to order parameters 
        let table = $(this).attr("id")
        let column = $(this).text();

        // Convert column header if first name or last name
        if (column === "First Name") {
            column = "first_name"
        } else if (column === "Last Name") {
            column = "last_name"
        }

        // Reset the paramsObj.order array
        paramsObj.order = [];
        // Push values grabbed into new order array
        switch (table) {
            case "name":
                table = ""
                break;
            case "address":
                table = "db.Addresses"
                break;
            case "course": 
                table = "db.Courses"
                break;
        }
        // Set all order as ascending by default, except for grade
        let sort = "asc";
        if (column === "Grade") {
            sort = "desc"
        }

        paramsObj.order.push(table);
        paramsObj.order.push(column);
        paramsObj.order.push(sort);

        // Make database request
        requestData();
    })

    // ===========================================================================
    // ON PAGE LOAD
    requestData();
});