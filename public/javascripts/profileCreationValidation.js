

$document.ready(function () {
    $('#profileSubmit').on('click',function () {
        alert("click");
         var add1=$document.trim($(#addressLine1).val());
         var isValid=true;

         if(add1=='') {
             isValid = false;
             $('#errormsg1').html('<div class="alert alert-danger">Please enter your address</div>');
             alert("click");
         }

         else
         {
             $('#errormsg1').html('');
         }

         if(isValid==true)
         {
            var studentData={

              address1:add1
            };
            $.ajax(
                {
                       url:'/create_profile',
                       type:'POST',
                       data: studentData,
                       success:function (data) {
                           $(#addressLine1).val();
                           
                       }


                }
            )
         }
         else
         {
             return false;
         }


    });
})
