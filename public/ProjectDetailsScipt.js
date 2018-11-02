 
            var rIndex,
                table = document.getElementById("table");
            
            // check the empty input
            function checkEmptyInput()
            {
                var isEmpty = false,
                    Deptname = document.getElementById("Deptname").value,
                    Project = document.getElementById("Project").value,
                    No = document.getElementById("No").value;
            
                if(Deptname === ""){
                    alert("Enter Depthname");
                    isEmpty = true;
                }
                else if(Project === ""){
                    alert("Enter projectname");
                    isEmpty = true;
                }
                else if(No === ""){
                    alert("Enter projectno");
                    isEmpty = true;
                }
                return isEmpty;
            }
            
            // add Row
            function addHtmlTableRow()
            {
                // get the table by id
                // create a new row and cells
                // get value from input text
                // set the values into row cell's
                if(!checkEmptyInput()){
                var newRow = table.insertRow(table.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1),
                    cell3 = newRow.insertCell(2),
                    Deptname = document.getElementById("Deptname").value,
                    Project = document.getElementById("Project").value,
                    No = document.getElementById("No").value;
                    
                cell1.innerHTML = No;
                cell2.innerHTML = Deptname;
                cell3.innerHTML = Project;
                
                // call the function to set the event to the new row
                selectedRowToInput();
            }
            }
            
            // display selected row data into input text
            function selectedRowToInput()
            {
                
                for(var i = 1; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function()
                    {
                      // get the seected row index
                      rIndex = this.rowIndex;
                      document.getElementById("No").value = this.cells[0].innerHTML;
                      document.getElementById("Deptname").value = this.cells[1].innerHTML;
                      document.getElementById("Project").value = this.cells[2].innerHTML;
                      
                    };
                }
            }
            
            