$(document).ready(function(){
    var counter = 2;
    $("#addskill").click(function () {
  if(counter>10){
            alert("Only 10 textboxes allow");
            return false;
  }
  var newTextBoxDiv = $(document.createElement('div'))
       .attr("id", 'Addskilldiv' + counter);
newTextBoxDiv.after().html('<div class="col-sm-7">'+" "+'<label>skill ' + counter + ' : </label>' +
        '<input type="text" class="form-control name="skill' + counter +
        '" id="skilltb' + counter + '" value="" >' );
newTextBoxDiv.appendTo("#skillgroup");
counter++;
     });
 });

 function toggleTextbox(opt)
 {
     if (opt == 'F')
         document.getElementById('Funding').disabled = false;
     else
         document.getElementById('Funding').disabled = true;
 }
