// Declare the module
var myfacultyApp = angular.module('myfacultyApp', []);
myfacultyApp.controller("attycontroller",['$scope', '$http', '$timeout',function($scope, $http, $timeout){

    $http.get('http://localhost:5500/atty/api/students').then(function(response) {
        var count = 0;
        $scope.data = response.data;
        console.log($scope.data);
        const tableBody = document.getElementById('tablue');
        $scope.data.forEach(data => {
        // Create a new table row
        const row = document.createElement('tr');
        // Create and append the 'number' cell
        const numberCell = document.createElement('td');
        numberCell.textContent = count+1;
        count+=1;
        row.appendChild(numberCell);

        //STUDENT NUMBER TABLE DATA


    
        // Create and append the 'STUDENT number' cell
        const stdnumberCell = document.createElement('td');
        stdnumberCell.textContent = data.student_no;
        row.appendChild(stdnumberCell);

        // Create and append the 'name' cell
        const nameCell = document.createElement('td');
        nameCell.textContent = data.name;
        row.appendChild(nameCell);
        
        //RADIO_BUTTON
        const radioCell = document.createElement('td');
        const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = data.student_no + "A";
            radioInput.name = data.student_no;
            radioInput.value = 'PRESENT';
            radioInput.classList.add("checkbox");
            radioInput.classList.add("radioButton");
            

            // Create label for the radio button
            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = radioInput.id;
            radioLabel.textContent = 'PRESENT';
            radioCell.appendChild(radioInput);
            radioCell.appendChild(radioLabel);
            

        //RADIO BUTTON 2
        const radioInput2 = document.createElement('input');
        radioInput2.type = 'radio';
        radioInput2.id = data.student_no + "B";
        radioInput2.name = data.student_no;
        radioInput2.value = 'ABSENT';
        radioInput2.classList.add("checkbox");
        radioInput2.classList.add("redLabel");
        

        // Create label for the radio button
        const radioLabel2 = document.createElement('label');
        radioLabel2.htmlFor = radioInput2.id;
        radioLabel2.textContent = 'ABSENT';
        radioCell.appendChild(radioInput2);
        radioCell.appendChild(radioLabel2);
        

           

            row.appendChild(radioCell);
            tableBody.appendChild(row);

    });
    });
     $scope.the_date = new Date();
     const time = $scope.the_date.toDateString();
     console.log(time);
     //SELECTING ALL FUNCTION
     $scope.selectAll = function(){
        const T = document.getElementById("tablue")
    // Get all rows (tr elements) in the table
        const rows = T.getElementsByTagName('tr');
    // Loop through each row
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            // Get all cells (td elements) in the current row
            const cells = row.getElementsByTagName('td');

            // Loop through each cell in the current row
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                const radio = cell.querySelector('input[type="radio"]');
                if (radio) { // Check if the radio button exists in the cell
                    // Assuming you want to check the radio's `value` attribute
                    if (radio.type === 'radio' && radio.value === 'PRESENT') {
                        radio.checked=true
                    }
                // Access or modify the cell data
                
            }
        }
     }
    }
     //SENDING TABLE TO SERVER
     $scope.sendData = function() {
        // Extract the data from the table
        var table = document.getElementById("tablue");
        var rows = table.rows;
        var tableData = [];

        for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
            var cells = rows[i].cells;
            //GET RADIO BUTTON VALUE
            var radios = document.getElementsByName(cells[1].innerText);
            var radioValue = ''; 
            // Iterate through each radio button to find the selected one
            for (var j = 0; j < radios.length; j++) {
                if (radios[j].checked) {
                    radioValue = radios[j].value;
                    break;
                }
            }
            //RADIOBUTTON VALUE END
            var rowData = {
                student_no: cells[1].innerText,
                name: cells[2].innerText,
                status: radioValue,
                date_day: time
            };
            tableData.push(rowData);
    };
       console.log(tableData);
       const jsonData = JSON.stringify(tableData);
       //SEND DATA TO SERVER
       $http.post('http://localhost:5500/api/table', jsonData)
                    .then(function(response) {
                        console.log('Table data sent successfully:', response.data);
                    }, function(error) {
                        console.error('Error sending table data:', error);
                    });

        
};
     
}]);