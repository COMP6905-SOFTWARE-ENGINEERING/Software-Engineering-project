function edu() {
    $("#educationFieldsWrapper .educationFields").append('<div class="blockDetails"><label for="level"><span>Level of Education:</span></label><select class="form-control form-control-sm educationSpacing"><option value="">Select an option...</option> <option value="bachelors">Bachelors</option> <option value="masters"  >Masters</option> <option value="phd"  >Phd</option> </select> <span class="error"></span><label for="field"><span>Field of Study :</span></label> <select class="form-control form-control-sm educationSpacing" ><option value="">Select an option...</option><option value="ece"  >Electronics and Communications</option><option value="EEE"  >Electrical</option> <option value="cse"  >Computer Science</option><option value="me"  >Mechanical</option> <option value="ce"  >Chemical</option><option value="cv"  >Civil</option></select><span class="error"></span><div class="clear"></div><label for="name">Institution Name:</label><input type="text" class="form-control educationSpacing" id="name" >  <hr></div>');

}
function skil() {
    $("#skillsFieldsWrapper .skillFields").append('<div><label for="skill">Skill Name :</label><input type="text" class="form-control skill" ></div>');


}
function research() {
    $("#researchFieldsWrapper .researchFields").append('<div><label for="research">Interest Name :</label><input type="text" class="form-control resrch" ></div> ');


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
	var address_line1 = $("#address_line1").val();
    var address_line2 = $("#address_line2").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var post_code = $("#post_code").val();
    var address = address_line1 + ' ' + address_line2 + ' ' +
		city + ' ' + state + ' ' + post_code;
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
        address:address,
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