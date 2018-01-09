$('form').submit(function(event){
    event.preventDefault();
    const value=$(this).serialize();
    $.post('/login',value,function(res){
        if(res.success==0){
            alert(res.message);
            $('input[type!=submit]').val('');
        }else{
            location.href='third.html'
        }
    })
})