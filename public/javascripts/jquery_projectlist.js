$(document).ready(function(){
	$(".remove_project_btn").click(function(){
		var _id = $(this).parent().siblings(".hidden_projectId").val();
		if(confirm("职位删除后将无法恢复，请确认")){
			$.post('/project/remove_project', {
				_id: _id,
			}, function(data, status){
				if (status == 'success'){
					if (data.flag == 0){
						alert(JSON.stringify(data.status));
					}else{
						document.location.reload();
					}
				}
			});
		}
	});
	$(".refresh_project_btn").click(function(){
		var _id = $(this).parent().siblings(".hidden_projectId").val();
		$.post('/project/refresh_project', {
			_id: _id,
		}, function(data, status){
			if (status == 'success'){
				if (data.flag == 0){
					alert(JSON.stringify(data.status));
				}else{
					document.location.reload();
				}
			}
		});
	});
	$(".modify_project_btn").click(function(){
		window.location.href = "/project/modify_project?_id="+$(this).parent().siblings(".hidden_projectId").val();
	});
	$(".list_btn").click(function(){
		window.location.href = "/project/create_project";
	});
});