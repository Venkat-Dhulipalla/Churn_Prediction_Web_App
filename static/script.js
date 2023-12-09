function setGenderValue(gender) {
    document.getElementById("genderInput").value = gender;

    // Remove the black border from all buttons
    var femaleButton = document.getElementById("femaleButton");
    var maleButton = document.getElementById("maleButton");

    if (femaleButton && maleButton) {
        femaleButton.style.border = "none";
        maleButton.style.border = "none";

        // Add a black border to the selected button
        if (gender === 1) {
            femaleButton.style.border = "2px solid black";
        } else if (gender === 0) {
            maleButton.style.border = "2px solid black";
        }
    } else {
        console.error("Buttons not found!");
    }
}

function setHasCreditCard(value) {
    console.log("Setting hascrcard value:", value);

    document.getElementById("hascrcard").value = value;

    // Remove border from all buttons
    document.querySelectorAll(".has-credit-card-button").forEach((button) => {
        button.style.border = "none";
    });

    // Add border to the selected button
    const selectedButton = document.querySelector(
        `.has-credit-card-button[data-value="${value}"]`,
    );
    if (selectedButton) {
        selectedButton.style.border = "2px solid black";
    } else {
        console.error("Selected button not found!");
    }
}

function setIsActiveMember(value) {
    console.log("Setting isactivemember value:", value);

    // Update input value
    document.getElementById("isactivemember").value = value;

    // Remove border from all buttons
    document.querySelectorAll(".isactivemember-button").forEach((button) => {
        button.style.border = "none";
    });

    // Add border to the selected button
    const selectedButton = document.querySelector(
        `.isactivemember-button[data-value="${value}"]`,
    );
    if (selectedButton) {
        selectedButton.style.border = "2px solid black";
    } else {
        console.error("Selected button not found!");
    }
}

// Function to submit the form
function submitForm() {
    // Submit the form
    const form = document.getElementById("predictionForm");

    // Check if the form is valid
    if (form && form.checkValidity) {
        // ...

        // Fetch prediction asynchronously
        fetch(form.action, {
                method: "POST",
                body: new FormData(form),
            })
            .then((response) => response.json())
            .then((data) => {
                // Handle the prediction result
                displayPredictionResult(data.prediction);
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error if needed
            });
    } else {
        console.error("Form is not valid");
    }

    // Return false to prevent traditional form submission
    return false;
}

// Attach the submitForm function to the form's submit event
document
    .getElementById("predictionForm")
    .addEventListener("submit", submitForm);

// Function to display prediction result
function displayPredictionResult(prediction) {
    const predictionResultDiv = document.getElementById("predictionResult");

    // Update the result message based on the prediction
    let resultMessage, alertClass;

    if (prediction === 1) {
        resultMessage =
            "Uh-oh! Our prediction indicates that the customer might consider leaving the bank. Let's take proactive steps to enhance their experience and retain their loyalty.";
        alertClass = "alert-danger";
    } else {
        resultMessage =
            "Great News! Our prediction suggests that the customer is likely to stay with the bank. Congratulations on providing excellent service! Let's continue delivering exceptional experiences.";
        alertClass = "alert-success";
    }

    // Create a Bootstrap alert for visual appeal
    const alertHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            <strong>Prediction Result:</strong> ${resultMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Display the result message
    predictionResultDiv.innerHTML = alertHTML;
}
