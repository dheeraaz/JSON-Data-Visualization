
const inputFile = document.getElementById("input-file");

//for reading input file
inputFile.addEventListener("change", (e) => {
    const fl_file = e.target.files[0];

    let reader = new FileReader(); // built in API

    // Read the file as text.
    reader.readAsText(fl_file);

    reader.onload = function () {
        try {
            // reader.result is actually a string that looks similar to json, JSON.parse coverts json like strings to js objects
            let jsonData = JSON.parse(reader.result);
            // console.log(jsonData);
            //a new event for handling json data is created and dispatched too.
            let event = new CustomEvent("JSONDataLoaded", {
                bubbles: true,
                detail: jsonData,
            })
            document.dispatchEvent(event);
        } catch (e) {
            console.error("JSON Parsing Error: Error is ", e)
        }

    };

    reader.onerror = function () {
        console.log(reader.error);
    };


}, false) // run a callback function when status of inputFile changes, but dont submit the form

document.addEventListener("JSONDataLoaded", (e) => {
    let finalData = [...e.detail];

    const tableBody = document.getElementById("table-body");
    const wholeTable = document.querySelector(".table");
    
    wholeTable.classList.remove("d-none");

    finalData.forEach((data) => {
        // console.log(data);
        const tableData = `<th scope="row">${data.id}</th>` + 
        `<td>${data.fname} ${data.lname}</td>` + 
        `<td>${data.company}</td>` + 
        `<td><button type="button" class="btn btn-primary" id="${data.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></td>`;

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = tableData;
        tableBody.appendChild(tableRow);
    })

    modelDescription(finalData);

})


function modelDescription(fD){
    let finalData = fD;
    const btns = document.querySelectorAll(".btn-primary");

    const fullName = document.getElementById("full-name");
    const userAge = document.getElementById("user-age");
    const userBalance = document.getElementById("user-balance");
    const userGender = document.getElementById("user-gender");
    const userCompany = document.getElementById("user-company");
    const userPhone = document.getElementById("user-phone");
    const userAddress = document.getElementById("user-address");

    btns.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            finalData.forEach((data)=>{
                if(btn.id==data.id){ //here, btn.id is string and data.id is number
                    fullName.innerText = data.fname + " " + data.lname + ", ";
                    userAge.innerText = data.age + " ";
                    userBalance.innerText = data.balance;
                    userGender.innerText = data.gender;
                    userCompany.innerText = data.company;
                    userPhone.innerText = data.phone;
                    userAddress.innerText = data.address;
                }
            })
        })
    })
}




