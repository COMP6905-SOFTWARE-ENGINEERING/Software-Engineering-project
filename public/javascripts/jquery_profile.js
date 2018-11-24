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
    //testing code


    //alert("hello");
    var addressLine1=$("#addressLine1").val();
    var isValid=true;

    if(addressLine1=='') {
        isValid = false;
        $('#errormsg1').html('<div class="alert alert-danger">Please enter your address</div>');
    }

    else
    {
        $('#errormsg1').html('');
    }

    if(isValid==true)
    {
        var studentData={

            address1:addressLine1
        };

    }
    else
    {
        return false;
    }


    //end of testing

    $(".help_block_error").text(" ").attr("title", '');
    var postUrl;

   // var addressLine1= $("#addressLine1").val();
    var addressLine2 = $("#addressLine2").val();
    var addressLine3 = $("#addressLine3").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var country = $("#country").val();
    var postalCode = $("#postalCode").val();

    var edProgramLevel = $("#edProgramLevel").val();
    var edProgram = $("#edProgram").val();
    var edInstitution = $("#edInstitution").val();
    // var edCountry = $("#edCountry").val();
    // var edProvince = $("#edProvince").val();
    // var edStart = $("#edStart").val();
    // var edEnd = $("#edEnd").val();

    // var education = education_level + '.' + field_of_study + '.' +
    //     institution_name+'.'+edCountry+'.'+edProvince+'.'+edStart+'.'+edEnd;
    var education_level_array = [];
    $(".edProgramLevel").each(function(){
        education_level_array.push($(this).val());
    });
    var field_of_study_array = [];
    $(".edProgram").each(function(){
        field_of_study_array.push($(this).val());
    });
    var institution_name_array = [];
    $(".edInstitution").each(function(){
        institution_name_array.push($(this).val());
    });

    var weCompany = $("#weCompany").val();
    var weTitle = $("#weTitle").val();
    // var weCountry = $("#weCountry").val();
    var weStartDate = $("#weStartDate").val();
    var weEndDate = $("#weEndDate").val();
    // var work_experience = company + '.' + position + '.' +weCountry+'.'+
    //     start_date + '.' + end_date;

    var weCompanyArray = [];
    $(".weCompany").each(function(){
        weCompanyArray.push($(this).val());
    });
    var weTitleArray = [];
    $(".weTitle").each(function(){
        weTitleArray.push($(this).val());
    });
    var weStartDateArray = [];
    $(".weStartDate").each(function(){
        weStartDate.push($(this).val());
    });
    var weEndDateArray = [];
    $(".weEndDate").each(function(){
        weCompanyArray.push($(this).val());
    });


    var skills = [];
    $(".skills").each(function(){
        skills.push($(this).val());
    });

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
        education_level_array:education_level_array.join(","),
        field_of_study_array:field_of_study_array.join(","),
        institution_name_array:education_level_array.join(","),

        weCompanyArray:weCompanyArray.join(","),
        weTitleArray:weTitleArray.join(","),
        weStartDateArray:weStartDateArray.join(","),
        weEndDateArray:weEndDateArray.join(","),

        psArea:psArea,
        psLevel:psLevel,
        // psSpeLevel:psSpeLevel,
        // psProgram:psProgram,
        // psAdTerm:psAdTerm,
        projDate:projDate,
        research_interest:$("#researchId").val(),
        skills:skills.join(","),
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