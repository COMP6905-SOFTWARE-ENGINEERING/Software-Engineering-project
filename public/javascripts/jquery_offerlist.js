$(document).ready(function(){
	$(".remove_offer_btn").click(function(){
		var _id = $(this).parent().siblings(".hidden_offerId").val();
		if(confirm("职位删除后将无法恢复，请确认")){
			$.post('/company/remove_offer', {
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
	$(".refresh_offer_btn").click(function(){
		var _id = $(this).parent().siblings(".hidden_offerId").val();
		$.post('/company/refresh_offer', {
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
	$(".modify_offer_btn").click(function(){
		window.location.href = "/company/modify_offer?_id="+$(this).parent().siblings(".hidden_offerId").val();
	});
	$(".list_btn").click(function(){
		window.location.href = "/company/create_offer";
	});
});