function edu() {
    $("#educationFieldsWrapper .educationFields").append('<div class="blockDetails"><label for="level"><span>Level of Education:</span></label><select class="form-control form-control-sm educationSpacing" id="edProgramLevel"><option value="">Select an option...</option></select><span class="error"></span><label for="field"><span>Program Name:</span></label><select class="form-control form-control-sm educationSpacing" id="edProgram"><option value="">Select an option...</option></select><span class="error"></span><div class="clear"></div><label for="name">Institution Name:</label><input type="text" class="form-control educationSpacing" id="edInstitution" ><div class="form-group"><div class="col-sm-4"><label for="startDate">Start Date :</label><input type="date" class="form-control educationSpacing" id="edStart"></div><div class="col-sm-4"><label for="endDate">End Date :</label><input type="date" class="form-control educationSpacing" id="edEnd"></div></div><hr></div>');

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

    var addressLine1= $("#addressLine1").val();
    var addressLine2 = $("#addressLine2").val();
    var addressLine3 = $("#addressLine3").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var country = $("#country").val();
    var postalCode = $("#postalCode").val();

    var education_level = $("#edProgramLevel").val();
    var field_of_study = $("#edProgram").val();
    var institution_name = $("#edInstitution").val();
    var edCountry = $("#edCountry").val();
    var edProvince = $("#edProvince").val();
    var edStart = $("#edStart").val();
    var edEnd = $("#edEnd").val();

    // var education = education_level + '.' + field_of_study + '.' +
    //     institution_name+'.'+edCountry+'.'+edProvince+'.'+edStart+'.'+edEnd;

    var education_level_array = [];
    $(".education_level").each(function(){
        education_level_array.push($(this).val());
    });
    var field_of_study_array = [];
    $(".field_of_study").each(function(){
        educationArray.push($(this).val());
    });
    var education_level_array = [];
    $(".education_level").each(function(){
        educationArray.push($(this).val());
    });
    var education_level_array = [];
    $(".education_level").each(function(){
        educationArray.push($(this).val());
    });
    var education_level_array = [];
    $(".education_level").each(function(){
        educationArray.push($(this).val());
    });

    var company = $("#weCompany").val();
    var position = $("#weTitle").val();
    var weCountry = $("#weCountry").val();
    var start_date = $("#weStartDate").val();
    var end_date = $("#weEndDate").val();
    var work_experience = company + '.' + position + '.' +weCountry+'.'+
        start_date + '.' + end_date;

    var expArray = [];
    $(".company").each(function(){
        expArray.push($(this).val());
    });
    var skills = [];
    $(".select_skill").each(function(){
        skills.push($(this).val());
    });

    var psArea = $("#psArea").val();
    var psLevel = $("#psLevel").val();
    var psSpeLevel = $("#psSpeLevel").val();
    var psProgram = $("#psProgram").val();
    var psAdTerm = $("#psAdTerm").val();
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
        educationArray:educationArray.join(","),
        expArray:expArray.join(","),
        psArea:psArea,
        psLevel:psLevel,
        psSpeLevel:psSpeLevel,
        psProgram:psProgram,
        psAdTerm:psAdTerm,
        projDate:projDate,
        research_interest:$("#researchId").val(),
        skills:skills.join(","),
        need_financial_support:$("input[name='require_financial_aid']:checked").val()
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