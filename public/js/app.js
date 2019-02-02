// Allows DOM to be manipulated after document is ready
$(document).ready(() => {

    // GLOBAL VARIABLES
    // Variable to hold filter type selected (sex, subject, grade, etc.)
    let searchCriteria = [];
    // Variable to hold where object values to search db
    let whereObj = {}
    
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
                $("#sex").show();
                $("#state").hide();
                break;

            case "State":
                $("#state").show();
                $("#sex").hide();
                break;             
        }
    }

    // Function that saves info collected when Add Filter is selected
    addFilter = () => {
        // Grab value from the initial filter push to corresponding array
        let filterChoice = $("#initial-choice").val()
        searchCriteria.push(filterChoice);

        // Grab value from the search options and push to corresponding array
        let searchTerm = $(".criteria:visible").val()
        searchCriteria.push(searchTerm);

        console.log(searchCriteria);
    }

    // Function that creates whereObj to use in db query
    createWhere = (array) => {
        // Use for loop over searchCriteria array to create object
        for (let i = 0; i < array.length; i += 2) {
            whereObj[array[i]] = array[i + 1];
        }
    }
    
    // CLICK FUNCTIONS ==========================================================
    // Called when an initial choice is made in the select box
    $("#initial-choice").change( () => {
        // Run searchOptions function on click
        searchOptions();
    })

    // Called when the Add Filter button is clicked
    $("#filter").click( () => {
        addFilter();
    })

    // Called when the Search button is clicked
    $("#search").click( () => {
        createWhere(searchCriteria);

        // Send an ajax post request, including the whereObj
        $.post("api/students", whereObj)
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
    })

// ON PAGE LOAD
retrieveAll();










});