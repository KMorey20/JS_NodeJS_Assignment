// Replaced window.onload with window.addEventListener

// Waits until the DOM content is fully loaded before running
window.addEventListener("DOMContentLoaded", () => {

    // Get button elements from the DOM
    const btnCars = document.getElementById('btnCars');
    const btnListings = document.getElementById('btnListings');
    const btnMakes = document.getElementById('btnMakes');
    const btnSellers = document.getElementById('btnSellers');

    // Add click event listeners to the buttons, binding them to their respective functions
    btnCars.addEventListener('click', fetchCars);
    btnListings.addEventListener('click', fetchListings);
    btnMakes.addEventListener('click', fetchMakes); 
    btnSellers.addEventListener('click', fetchSellers);
})

// Define an asynchronous function to fetch car data and display it in the DOM
async function fetchCars() {
    // Clear existing content when new data is fetched
    preCars.innerText = '';
    document.getElementById('carMakes').style.display = 'none';
    document.getElementById('sellers').innerHTML = '';

    //start of function
    try {
         // Await the response from the server after fetching car data
        var response = await fetch('/cars')
         //Await the conversion of the response to JSON format
        var data = await response.json()
        //Display the car data in JSON format in the 'preCars' element
        preCars.innerText = JSON.stringify(data, null, 4)
    } catch (error) {
        //Log any errors that occur during the fetch operation
        console.error('Error fetching cars:', error);
    }
}

//Async function that fetches listing data and displays it
async function fetchListings() {
    // Clears existing content
    preCars.innerText = '';
    document.getElementById('carMakes').style.display = 'none';
    document.getElementById('sellers').innerHTML = '';

    //start of function
    try {
         // Similar fetch operation as in fetchCars
        var response = await fetch('/listing');
        var data = await response.json();
        preCars.innerText = JSON.stringify(data, null, 4);
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

//An asynchronous function that will fetch car makes and fill a dropdown
async function fetchMakes() {
        //Hide the dropdown and clear other content when new data is found
    const selectElement = document.getElementById('carMakes');
    selectElement.style.display = 'none'; 
    document.getElementById('preCars').innerText = '';
    document.getElementById('sellers').innerHTML = '';

    //start of function
    try {
        const response = await fetch('/cars/makes');
        const makes = await response.json();            
        const selectElement = document.getElementById('carMakes');
        selectElement.style.display = 'none'; //Hide the dropdown initially

        //Remove existing options from the dropdown
        while (selectElement.options.length > 0) {
            selectElement.remove(0);
        }

        //Add a default option as the first one
        const defaultOption = document.createElement('option');
        defaultOption.textContent = "Select a make";
        selectElement.appendChild(defaultOption);

         //Populate the dropdown with options based on fetched car makes
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            selectElement.appendChild(option);
        });

        //Display the dropdown now that it has content
        selectElement.style.display = 'block'; // Show the dropdown
    } catch (error) {
        console.error('Error fetching car makes:', error);
    }        
}

// An asynchronous function that will fetch seller data and display it in a table
async function fetchSellers() {
        //Get the sellers div and clear other content when new data is fetched
    const sellersDiv = document.getElementById('sellers');
    document.getElementById('preCars').innerText = '';
    document.getElementById('carMakes').style.display = 'none';
    sellersDiv.innerHTML = '';

    //start of function
    try {
        // Fetch seller data from the server
        const response = await fetch("/cars/sellers");
        const sellers = await response.json();

        // Create a new table and set its class name
        const table = document.createElement('table');
        table.className = 'sellers-table';

        // Create and populate the header row of the table
        const headerRow = table.insertRow();
        const nameHeader = headerRow.insertCell();
        const contactHeader = headerRow.insertCell();
        nameHeader.textContent = 'Name';
        contactHeader.textContent = 'Contact';

        //Filling the table with rows based on the seller data
        sellers.forEach(seller => { 
            const row = table.insertRow();
            const nameCell = row.insertCell();
            const contactCell = row.insertCell();
            nameCell.textContent = seller.name; 
            contactCell.textContent = seller.contact; 
        });

        sellersDiv.appendChild(table);
    } catch (error) {
        console.error('Error fetching sellers:', error);
    }
}