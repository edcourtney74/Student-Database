// Allows DOM to be manipulated after document is ready
$(document).ready(() => {

    // GLOBAL VARIABLES
    // Variable to hold where object to pass to database
    let whereObj = {};

    // GLOBAL FUNCTIONS
    // Function to retrieve all students on page load
    retrieveAll = () => {
        $.get("api/students")
            .then(data => {
                console.log(data);
            })
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
    // Function that saves info into whereObj when Add Filter button is clicked
    addFilter = () => {
        // Grab value from the initial filter
        let filterChoice = $("#initial-choice").val()

        // Grab value from the type of filter
        let filterType = $(".operator:visible").val()

        // Grab id from the type of filter
        let filterId = $(".operator:visible").attr("id");
        console.log(filterId);

        // Grab value from the search options
        let searchTerm = $(".criteria:visible").val()

        // Choose switch statement to run based on user input
        if (filterId === "filter-text") {
            // Run this switch when filter-text was used and create whereObj query
            switch (filterType) {
                case ("Equals"):
                    whereObj[filterChoice] = searchTerm;
                    break;

                case ("Does Not Equal"):
                    whereObj[filterChoice] = { "$ne": searchTerm };
                    break;
            }

        } else if (filterId === "filter-number") {
            // Run this switch when filter-text was used and create whereObj query
            switch (filterType) {
                case ("Equals"):
                    whereObj[filterChoice] = { "$eq": searchTerm};
                    break;            
                case ("Greater Than"):
                    whereObj[filterChoice] = { "$gt": searchTerm};
                    break;
                case ("Greater Than or Equals"):
                    whereObj[filterChoice] = { "$gte": searchTerm};
                    break;
                case ("Less Than"):
                    whereObj[filterChoice] = { "$lt": searchTerm};
                    break;
                case ("Less Than or Equals"):
                    whereObj[filterChoice] = { "$lte": searchTerm};
                    break;
            }
        }
    }

        // CLICK FUNCTIONS ==========================================================
        // Called when an initial choice is made in the select box
        $("#initial-choice").change(() => {
            // Run searchOptions function on click
            searchOptions();
        })

        // Called when the Add Filter button is clicked
        $("#filter").click(() => {
            addFilter();
        })

        // Called when the Search button is clicked
        $("#search").click(() => {
            // Send an ajax post request, including the stringified array
            $.post("api/students", whereObj)
                .then((data) => {
                    console.log(data);
                }).catch((err) => {
                    console.log(err);
                })
        })

// ===========================================================================
    // ON PAGE LOAD
    retrieveAll();

});