function edu() {
    $("#educationFieldsWrapper .educationFields").append('<div class="blockDetails"><label for="level"><span>Level of Education:</span></label><select class="form-control form-control-sm educationSpacing" name="levelOfEd" id="edProgramLevel"><option value="">Select an option...</option><option value="bachelors">Bachelors</option><option value="masters">Masters</option><option value="phd">Phd</option></select><span class="error"></span> <label for="field"><span>Program Name:</span></label><select class="form-control form-control-sm educationSpacing" id="edProgram"><option value="">Select an option...</option></select><span class="error"></span><div class="clear"></div><label for="name">Institution Name:</label><input type="text" class="form-control educationSpacing" id="edInstitution" ><hr></div>');

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

    // $(".help_block_error").text(" ").attr("title", '');
    // var postUrl;

    // var addressLine1= $("#addressLine1").val();
    // var addressLine2 = $("#addressLine2").val();
    // var addressLine3 = $("#addressLine3").val();
    // var city = $("#city").val();
    // var province = $("#province").val();
    // var country = $("#country").val();
    // var postalCode = $("#postalCode").val();

    //var edProgramLevel = $("#edProgramLevel").val();
    // var edProgram = $("#edProgram").val();
    // var edInstitution = $("#edInstitution").val();
    // var edCountry = $("#edCountry").val();
    // var edProvince = $("#edProvince").val();
    // var edStart = $("#edStart").val();
    // var edEnd = $("#edEnd").val();

    // var education = education_level + '.' + field_of_study + '.' +
    //     institution_name+'.'+edCountry+'.'+edProvince+'.'+edStart+'.'+edEnd;
    //testing
    // var taskArray = new Array();
    // $("select[name=levelOfEd]").each(function() {
    //     taskArray.push($(this).val());
    // });
    // alert(taskArray);
    //
    // var education_level_array = [];
    // $(".edProgramLevel").each(function(){
    //     education_level_array.push($(this).val());
    // });
    // var field_of_study_array = [];
    // $(".edProgram").each(function(){
    //     field_of_study_array.push($(this).val());
    // });
    // var institution_name_array = [];
    // $(".edInstitution").each(function(){
    //     institution_name_array.push($(this).val());
    // });

    // var weCompany = $("#weCompany").val();
    // var weTitle = $("#weTitle").val();
    // // var weCountry = $("#weCountry").val();
    // var weStartDate = $("#weStartDate").val();
    // var weEndDate = $("#weEndDate").val();
    // // var work_experience = company + '.' + position + '.' +weCountry+'.'+
    // //     start_date + '.' + end_date;
    //
    // var weCompanyArray = [];
    // $(".weCompany").each(function(){
    //     weCompanyArray.push($(this).val());
    // });
    // var weTitleArray = [];
    // $(".weTitle").each(function(){
    //     weTitleArray.push($(this).val());
    // });
    // var weStartDateArray = [];
    // $(".weStartDate").each(function(){
    //     weStartDate.push($(this).val());
    // });
    // var weEndDateArray = [];
    // $(".weEndDate").each(function(){
    //     weCompanyArray.push($(this).val());
    // });


    // var skills = [];
    // $(".skills").each(function(){
    //     skills.push($(this).val());
    // });

    var psArea = $("#psArea").val();
    var psLevel = $("#psLevel").val();
    // var psSpeLevel = $("#psSpeLevel").val();
    // var psProgram = $("#psProgram").val();
    // var psAdTerm = $("#psAdTerm").val();
    var projDate = $("#projDate").val();


    var postData = {
        owner:$(".hidden_userid").val(),
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        country:country,
        province:province,
        city:city,
        postalCode:postalCode,
        education_level_array:edLevelArray,
        field_of_study_array:edProgramArray,
        institution_name_array:edInstitutionArray,

        skills:skillsArray,
        research_interest:researchArray,

        weCompanyArray:compnNameArray,
        weTitleArray:weTitleArray,
        weStartDateArray:weStartDateArray,
        weEndDateArray:weEndDateArray,

        psArea:psArea,
        psLevel:psLevel,
        projDate:projDate,
        need_financial_support:$("input[name='gridRadios']:checked").val()
    };
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
                window.location.href = "/user/profileview";
            }
        }else {
            alert('post failed');
        }
    });
};