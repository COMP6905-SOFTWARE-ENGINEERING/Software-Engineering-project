function edu() {
    $("#educationFieldsWrapper .educationFields").append('<div class="blockDetails"><label for="level"><span>Level of Education:</span></label><select class="form-control form-control-sm educationSpacing" id="edProgramLevel"><option value="">Select an option...</option></select><span class="error"></span><label for="field"><span>Program Name:</span></label><select class="form-control form-control-sm educationSpacing" id="edProgram"><option value="">Select an option...</option></select><span class="error"></span><div class="clear"></div><label for="name">Institution Name:</label><input type="text" class="form-control educationSpacing" id="edInstitution" ><div class="form-group"><div class="col-sm-4"><label for="eduCountry">Country :</label><input type="text" id="edCountry" class="form-control educationSpacing"></div><div class="col-sm-4"><label for="eduProvince">Province:</label><input type="text" id="edProvince"  class="form-control educationSpacing"></div></div><div class="form-group"><div class="col-sm-4"><label for="startDate">Start Date :</label><input type="date" class="form-control educationSpacing" id="edStart"></div><div class="col-sm-4"><label for="endDate">End Date :</label><input type="date" class="form-control educationSpacing" id="edEnd"></div></div><hr></div>');

}
function skil() {
    $("#skillsFieldsWrapper .skillFields").append('<div><label for="skill">Skill Name :</label><input type="text" class="form-control skill" id="skills"></div>');


}
function research() {
    $("#researchFieldsWrapper .researchFields").append('<div><label for="research">Interest Name :</label><input type="text" class="form-control resrch" id="researchId"></div> ');


}
function exp() {
    $("#expFieldsWrapper .expFields").append('<div class="blockDetails"><label for="comp">Company Name :</label><input type="text" class="form-control exp company" ><label for="pos">Position :</label><input type="text" class="form-control exp" id="pos"><label for="startDate">Start Date :</label><input type="date" class="form-control exp" id="sdate"><label for="endDate">End Date :</label><input type="date" class="form-control exp" id="enddate"> <hr></div>');


}
function backToProfileList(){
	window.location.href = "/user/profileview";
};

function profileCreateSubmit(){
	$(".help_block_error").text(" ").attr("title", '');
	var postUrl;
	var addressLine1= $("#address_line1").val();
    var addressLine2 = $("#address_line2").val();
    var addressLine3 = $("#address_line3").val();
    var country = $("#country").val();
    var province = $("#province").val();
    var city = $("#city").val();
    var postalCode = $("#postalCode").val();
    var company = $("#company").val();
    var position = $("#position").val();
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();
    var work_experience = company + ' ' + position + ' ' +
		start_date + ' ' + end_date;
    var education_level = $("#select_education_level").val();
    var field_of_study = $("#select_field_of_study").val();
    var institution_name = $("#institution_name").val();
    var education = education_level + ' ' + field_of_study + ' ' +
		institution_name;
    var skills = [];
    $(".select_skill").each(function(){
        skills.push($(this).val());
    });
	var postData = {
		owner:$(".hidden_userid").val(),
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        country:country,
        province:province,
        city:city,
        postalCode:postalCode,
        work_experience:work_experience,
        research_interest:$("#research_interest").val(),
        intended_start_date:$("#intended_start_date").val(),
        education:education,
		skill:skills.join(","),
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