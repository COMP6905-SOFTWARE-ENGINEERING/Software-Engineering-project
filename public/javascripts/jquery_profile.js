function education() {
    var education_input = $(".educationFields").clone().first();
    education_input.appendTo($("#educationFieldsWrapper "));
}

function skills() {
    var skill_input = $(".skillFields").clone().first();
    skill_input.appendTo($("#skillsFieldsWrapper "));
}

function research() {
    var research_input = $(".researchFields").clone().first();
    research_input.appendTo($("#researchFieldsWrapper "));
}

function experience() {
    var experience_input = $(".expFields").clone().first();
    experience_input.appendTo($("#expFieldsWrapper "));
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
				window.location.href = "/person/profileview";
			}
		}else {
			alert('post failed');
		}
	});
};