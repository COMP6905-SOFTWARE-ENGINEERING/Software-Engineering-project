

function backToProjectList() {
    window.location.href = "/project/projectlist";
}
function skill() {

    $("#skillsFieldsWrapper .skillFields").append('<div><label for="skill">Skill Name :</label><input type="text" class="form-control skill" id="skills"></div>');


}
function projectCreateSubmit() {
    $(".help_block_error").text(" ").attr("title", '');
    var postUrl;
    var skillsArray = new Array();
    $("input[id=skills]").each(function() {

        skillsArray.push($(this).val());
    });
    var postData = {
        user_id: $(".hidden_userid").val(),
        project_name: $("#project_name").val(),
        level_of_study: $("#level_of_study").val(),
        required_program: $("#Req_field_study").val(),
        project_description: $("#project_description").val(),
        available_funding: $("#available_funding").val(),
        required_skills: skillsArray,
        start_date: $("#start_date").val(),
        matching_preference:$("#Match_Preference").val(),

    };
    postUrl = '/project/create_project';
    // if ($(".hidden_offerid").val()){
    // 	postUrl = '/company/modify_offer';
    // 	postData["_id"] = $(".hidden_offerid").val();
    // }else {
    // 	postUrl = '/company/create_offer';
    // }
    // alert(JSON.stringify(postData));
    $.post(postUrl, postData, function (data, status) {
        if (status == 'success') {
            if (data.flag == 0) {
                for (var errPath in data.status.errors) {
                    $(".error_" + errPath).text('×').attr("title", data.status.errors[errPath].message);
                }
                // alert(JSON.stringify(data.status));
            } else {
                alert('create successful');
                window.location.href = "/project/offerlist";
            }
        } else {
            alert('post failed');
        }
    });
};
