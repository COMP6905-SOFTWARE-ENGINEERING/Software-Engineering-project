function toRegApprove(username){
	$.post('/admin/approve_register', {
		username:username,
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				document.location.reload();
			}else {
				alert(JSON.stringify(data.status));
			}
		}else{
			alert('post failed');
		}
	});
};

function toRegDelete(username){
	$.post('/admin/delete_register', {
		username:username,
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				document.location.reload();
			}else {
				alert(JSON.stringify(data.status));
			}
		}else{
			alert('post failed');
		}
	});
};