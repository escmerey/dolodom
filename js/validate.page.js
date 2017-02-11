$(document).ready(function() {
    $("form.form-order").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                usr_name: {
                    required: false,
                },
                usr_phone: {
                    required: true,
                },
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "../send.php",
                    data: it.serialize()
                }).done(function() {
                    $('.popup').removeClass('visible');
                    $('.successfully, #overlay').addClass('visible');
                    it.find('input').val("");
                    setTimeout(function() {
                        if ($('.successfully').hasClass('visible')) {
                            $('.popup, #overlay').removeClass('visible');
                        }
                    }, 2400);
                });
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