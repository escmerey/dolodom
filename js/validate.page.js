$(document).ready(function() {
    $("form.form-validate").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                usr_name:{
                    required: true,
                    minlength: 2,
                    maxlength: 80,
                },
                usr_phone:{
                    required: true,
                },
                usr_email:{
                    required: true,
                    email: true,
                    maxlength: 50
                },
                usr_comment:{
                    required: true,
                    minlength: 10,
                    maxlength: 500
                }
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                form.submit();
                return false;
            },
            success: function() {},
            highlight: function(element, errorClass) {
                $(element).addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
            }
        });
    });
});