// Allows DOM to be manipulated after document is ready
$(document).ready(() => {

    // GLOBAL VARIABLES
    // Variable to hold parameters to pass for database query
    let paramsObj = { 
        where: []
    };

    // GLOBAL FUNCTIONS
    // Function to display data in the table once retrieved from a Names table search
    displayDataName = data => {
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
            newRow.append("<td>" + data[i].subject + "</td>");
            newRow.append("<td>" + data[i].grade + "</td>");
            newRow.append("<td>" + data[i].GPA + "</td>");
            // Append the completed tr element to tbody
            $("tbody").append(newRow); 
        }
    }
    
    // Function to display data in the table once retrieved from an Address table search
    displayDataAddress = data => {
        // Run a for loop to append data to the table
        for (let i = 0; i < data.length; i++) {
            // Create a new tr element
            let newRow = $("<tr>");
            // Append data to the new tr
            newRow.append("<td>" + data[i].Name.first_name + "</td>");
            newRow.append("<td>" + data[i].Name.last_name + "</td>");
            newRow.append("<td>" + data[i].Name.sex + "</td>");
            newRow.append("<td>" + data[i].Name.age + "</td>");
            newRow.append("<td>" + data[i].address + "</td>");
            newRow.append("<td>" + data[i].city + "</td>");
            newRow.append("<td>" + data[i].county + "</td>");
            newRow.append("<td>" + data[i].state + "</td>");
            newRow.append("<td>" + data[i].zip + "</td>");
            newRow.append("<td>" + data[i].subject + "</td>");
            newRow.append("<td>" + data[i].grade + "</td>");
            newRow.append("<td>" + data[i].GPA + "</td>");
            // Append the completed tr element to tbody
            $("tbody").append(newRow); 
        }
    }

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

        // Grab value from the type of filter
        let filterType = $(".operator:visible").val()

        // Grab id from the type of filter
        let filterId = $(".operator:visible").attr("id");

        // Grab value from the search options
        let searchTerm = $(".criteria:visible").val()

        // Choose switch statement to run based on user input
        if (filterId === "filter-text") {
            // Run this switch when filter-text was used and create params for the where property in paramsObj
            switch (filterType) {
                case ("Equals"):
                    paramsObj["where"].push({ [filterChoice] : searchTerm });
                    filterType = "="
                    break;

                case ("Does Not Equal"):
                    paramsObj["where"].push({ [filterChoice] : { "$ne": searchTerm } });
                    filterType = "!="
                    break;
            }
            console.log(paramsObj);

        } else if (filterId === "filter-number") {
            // Run this switch when filter-number was used and create params for the where property in paramsObj
            switch (filterType) {
                case ("Equals"):
                    paramsObj["where"].push({ [filterChoice] : { "$eq": searchTerm } });
                    filterType = "="
                    break;
                case ("Greater Than"):
                    paramsObj["where"].push({ [filterChoice]: { "$gt": searchTerm } });
                    filterType = ">"
                    break;
                case ("Greater Than or Equals"):
                    paramsObj["where"].push({ [filterChoice]: { "$gte": searchTerm } });   
                    filterType = ">="
                    break;
                case ("Less Than"):
                    paramsObj["where"].push({ [filterChoice]: { "$lt": searchTerm } });
                    filterType = "<"
                    break;
                case ("Less Than or Equals"):
                    paramsObj["where"].push({ [filterChoice]: { "$lte": searchTerm } });   
                    filterType = "<="
                    break;
            }
        }
        // Display search term and add to search term area
        $("#current").append("<span className='small d-inline'>" + filterChoice + filterType + searchTerm + "&nbsp&nbsp</span>")

        // Once filter data is set, run correct db query based on filterChoice
        switch(filterChoice) {
            case("First Name"):
            case("Last Name"):
            case("Sex"):
            case("Age"):
                requestDataName();
                break;
            
            case("City"):
            case("County"):
            case("State"):
            case("Zip"):
                requestDataAddress();
                break;
        }
    }

    // Function to send an ajax post request to retrieve names data
    requestDataName = () => {
        $.post("api/names", paramsObj)
            .then((data) => {
                console.log(data);
                // Empty previous data displayed
                $("tbody").empty();
                // Display new data
                displayDataName(data);
            }).catch((err) => {
                console.log(err);
            })
    }

    // Function to send an ajax post request to retrieve names data
    requestDataAddress = () => {
        $.post("api/address", paramsObj)
            .then((data) => {
                console.log(data);
                // Empty previous data displayed
                $("tbody").empty();
                // Display new data
                displayDataAddress(data);
            }).catch((err) => {
                console.log(err);
            })
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
            where: []
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
            where: []
        };
        // Clear display of previous search terms
        $("#current").empty();
        requestDataName();
    })

    // ===========================================================================
    // ON PAGE LOAD
    requestDataName();
});