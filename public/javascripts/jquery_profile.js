function edu() {
    $("#educationFieldsWrapper .educationFields").append('<div class="blockDetails"><label for="level"><span>Level of Education:</span></label><select class="form-control form-control-sm educationSpacing" name="levelOfEd" id="edProgramLevel"><option value="">Select an option...</option><option value="bachelors">Bachelors</option><option value="masters">Masters</option><option value="phd">Phd</option></select><span class="error"></span> <label for="field"><span>Program Name:</span></label><select class="form-control form-control-sm educationSpacing" id="edProgram"><option value="">Select an option...</option><option value="ece">Electronics and Communications</option><option value="EEE">Electrical</option><option value="cse">Computer Science</option><option value="me">Mechanical</option><option value="ce">Chemical</option><option value="cv">Civil</option></select><span class="error"></span><div class="clear"></div><label for="name">Institution Name:</label><input type="text" class="form-control educationSpacing" id="edInstitution" ><hr></div>');

}
function skil() {
    $("#skillsFieldsWrapper .skillFields").append('<div><label for="skill">Skill Name :</label><input type="text" class="form-control skill" id="skills"></div>');


}
function research() {
    $("#researchFieldsWrapper .researchFields").append('<div><label for="research">Interest Name :</label><input type="text" class="form-control resrch" id="researchId"></div> ');


}
function exp() {
    $("#expFieldsWrapper .expFields").append('<div class="blockDetails"><label for="comp">Company Name :</label><input type="text" class="form-control exp" id="weCompany"><label for="title">Title :</label><input type="text" class="form-control exp" id="weTitle"><label for="startDate">Start Date :</label><input type="date" class="form-control exp" id="weStartDate"> <label for="endDate">End Date :</label><input type="date" class="form-control exp" id="weEndDate"><hr></div>');


}
function backToProfileList(){
    window.location.href = "/user/profileview";
};

function profileCreateSubmit(){
    $(".help_block_error").text(" ").attr("title", '');
    var postUrl;
    var addressLine1=$("#addressLine1").val();
    var addressLine2 = $("#addressLine2").val();
    var addressLine3 = $("#addressLine3").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var country = $("#country").val();
    var postalCode = $("#postalCode").val();
    var needNfs = $("#needFS").val();


    //Education details
    var edProgramLevel = $("#edProgramLevel").val();
    var edLevelArray = new Array();
    $("select[id=edProgramLevel]").each(function() {

        edLevelArray.push($(this).val());
    });


    var edProgram = $("#edProgram").val();
    var edProgramArray = new Array();
    $("select[id=edProgram]").each(function() {

        edProgramArray.push($(this).val());
    });



    var edInstitution = $("#edInstitution").val();
    var edInstitutionArray = new Array();
    $("input[id=edInstitution]").each(function() {

        edInstitutionArray.push($(this).val());
    });

    var edlevelFull = edLevelArray.join();
    var edProgramFull = edProgramArray.join();
    var edInstitutionFull = edInstitutionArray.join();
    var education=[edlevelFull,edProgramFull,edInstitutionFull];
    //alert(education);

  //End of education details

    var nfs=false;

    if (needNfs=="Y")
    {
        nfs=true;
    }
    else
    {
        nfs=false;
    }


    //Skills
    var skillsArray = new Array();
    $("input[id=skills]").each(function() {

        skillsArray.push($(this).val());
    });
   // alert(skillsArray);

    //End of skills

    //research
    var researchArray = new Array();
    $("input[id=researchId]").each(function() {

        researchArray.push($(this).val());
    });
  //    alert(researchArray);
    //End of research


    //Exp details:
    var compnNameArray = new Array();
    $("input[id=weCompany]").each(function() {

        compnNameArray.push($(this).val());
    });
    var weTitleArray = new Array();
    $("input[id=weTitle]").each(function() {

        weTitleArray.push($(this).val());
    });
    var weStartDateArray = new Array();
    $("input[id=weStartDate]").each(function() {

        weStartDateArray.push($(this).val());
    });
    var weEndDateArray = new Array();
    $("input[id=weEndDate]").each(function() {

        weEndDateArray.push($(this).val());
    });
    var cmpNameFull = compnNameArray.join();
    var cmpTitleFull = weTitleArray.join();
    var cmpstrtDateFull = weStartDateArray.join();
    var cmpEndDateFull = weEndDateArray.join();
    var expFull=[cmpNameFull,cmpTitleFull,cmpstrtDateFull,cmpEndDateFull];
    // alert(expFull);
//End of Exp




//testing

   //  var isValid=true;
   //
   //
   //  if(addressLine1=='') {
   //      isValid = false;
   //      $('#errormsg1').html('<div class="alert alert-danger">Please enter your address</div>');
   //  }
   //
   //  else
   //  {
   //      $('#errormsg1').html('');
   //  }
   //
   //  if(isValid==true)
   //  {
   //      var studentData={
   //
   //          address1:addressLine1,
   //          edProgramLevel:edProgramLevel
   //      };
   // $.ajax({
   //     url:'/user/create_profile',
   //      type:'POST',
   //     data:studentData,
   //      success: function (data) {
   //         $('#addressLine1').val('');
   //         $('#edProgramLevel').val('');
   //
   //      }
   //
   // });
   //  }
   //  else
   //  {
   //      return false;
   //  }


    //end of testing


    var psArea = $("#psArea").val();
    var psLevel = $("#psLevel").val();
    // var psSpeLevel = $("#psSpeLevel").val();
    // var psProgram = $("#psProgram").val();
    // var psAdTerm = $("#psAdTerm").val();
    var projDate = $("#projDate").val();

    var postData =
        {
            user_id:$(".hidden_userid").val(),
            address: addressLine1+','+addressLine2+','+addressLine3,
            country:country,
            province:province,
            city:city,
            postal_code:postalCode,
            educationLevel:edlevelFull,
            educationProgram:edProgramFull,
            educationInstitution:edInstitutionFull,
            weCompany:cmpNameFull,
            weTitle:cmpTitleFull,
            weStartDate:cmpstrtDateFull,
            weEndDate:cmpEndDateFull,
            skills:skillsArray.join(),
            area_of_study:psArea,
            level_of_study:psLevel,
            need_financial_aid:nfs,
            research_interest:researchArray.join(),
            intended_start_date:projDate

        }
    postUrl = '/user/create_profile';
    // alert(JSON.stringify(postData));
    $.post(postUrl, postData, function(data, status){
        if(status == 'success'){
            if (data.flag == 0){
                //for (var errPath in data.status.errors){
                //    $(".error_"+errPath).text('×').attr("title", data.status.errors[errPath].message);
                //}
                alert(JSON.stringify(data.status));
            }else {
                alert('create successful');
                window.location.href = "/index";
            }
        }else {
            alert('post failed');
        }
    });
};