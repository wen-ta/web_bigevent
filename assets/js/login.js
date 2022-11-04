$(function(){
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
  //预检表单内容
  var form=layui.form
  form.verify({
    password:[/^[\S]{6,12}$/,'密码必须是6~12位'],
    repassword:function(value){
      var pwd=$('.reg-box [name=password]').val()
      if(pwd!==value) return '两次密码不一致'
    }
  })
  var layer=layui.layer
  //注册请求
  $('#reg-form').on('submit',function(e){
    e.preventDefault()
    var username=$('#reg-form [name=username]').val()
    var password=$('#reg-form [name=repassword]').val()
    $.post('/api/reguser',{username:username,password:password},function(res){
      if(res.status!==0) return layer.msg(res.message)
      layer.msg('注册成功')
      $('#link_login').click()
    })
  })
  //登录请求
  $('#log-form').on('submit',function(e){
    e.preventDefault()
    var username=$('#log-form [name=username]').val()
    var password=$('#log-form [name=password]').val()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0) return layer.msg(res.message)
        layer.msg('登陆成功')
        //将得到的token字符串保存到localStorage中
        localStorage.setItem('token',res.token)
        //跳转页面
        location.href='/index.html'
      }
    })
  })
})