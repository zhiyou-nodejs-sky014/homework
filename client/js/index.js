$('form').submit(function(event){
    event.preventDefault();
    var psw1=$('input:password:eq(0)').val();
    var psw2=$('input:password:eq(1)').val();
    if(psw1!=psw2){
        alert('两次密码输入不一致，请重新输入')
        $('input:password').val('');
        return
    }
    var value=$(this).serialize();
    $.post('/registe',value,function(res){
        if(res.success==0){
            alert(res.message);
        }else{
            location.href='second.html'
        }
    })
})