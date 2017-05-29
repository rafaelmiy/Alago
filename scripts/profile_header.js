var name = sessionStorage.getItem('name');
var email = sessionStorage.getItem('email');
var picture = sessionStorage.getItem('picture');

if(email != null){
	$('#logedOut').css('display','none');
	$('#logedIn').css('display', 'initial');

	$('#logedIn img').attr('src', picture);
	$('#logedIn b').html(name);
}