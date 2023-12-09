function setInputValue(inputName, value) {
    document.querySelector(`[name="${inputName}"]`).value = value;
}
document.addEventListener("DOMContentLoaded", function () {
    function setInputValue(inputName, value) {
        var inputElement = document.querySelector(`[name="${inputName}"]`);
        if (inputElement) {
            inputElement.value = value;
        }
    }
});

function setGenderValue(value) {
    document.querySelector('#genderInput').value = value;
}

document.getElementById("predictButton").addEventListener("click", function () {
    $.post("/predict", {
        creditscore: $("#creditscore").val(),
        age: $("#age").val(),
        tenure: $("#tenure").val(),
        balance: $("#balance").val(),
        numofproducts: $("#numofproducts").val(),
        hascrcard: $('input[name="hascrcard"]').val(),
        isactivemember: $('input[name="isactivemember"]').val(),
        estimatedsalary: $("#estimatedsalary").val(),
        geography_france: $('input[name="geography_france"]').val(),
        geography_germany: $('input[name="geography_germany"]').val(),
        geography_spain: $('input[name="geography_spain"]').val(),
        gender_female: $('input[name="gender_female"]').val(),
        gender_male: $('input[name="gender_male"]').val(),
    }, function (data) {
        var predictionResult = document.getElementById("predictionResult");
        if (data.prediction === 1) {
            predictionResult.textContent = "The customer will leave the bank.";
        } else if (data.prediction === 0) {
            predictionResult.textContent = "The customer will stay at the bank.";
        } else {
            predictionResult.textContent = "Error: Invalid prediction result.";
        }
    });
});