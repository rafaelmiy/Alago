var name = sessionStorage.getItem('name');
var email = sessionStorage.getItem('email');
var picture = sessionStorage.getItem('picture');

if(name == email){
	$('#box-name').css('display','none');
}else $('#name').html(name);

$('#email').val(email);
$('#profile .image img').attr('src',picture);


if(email != null){
	$('#logedOut').css('display','none');
	$('#logedIn').css('display', 'initial');

	$('#logedIn img').attr('src', picture);
	$('#logedIn b').html(name);
}
$('#logOff').click(function(){
	sessionStorage.clear();
	window.location.replace("index.html");
});