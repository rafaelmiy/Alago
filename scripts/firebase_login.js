$(document).ready(function(){

    $("div#login").click(function(){
      var name = $("#name").val();
      var pass = $("#pass").val();
      
      firebase.auth().signInWithEmailAndPassword(name, pass)
        .then(function(user){
    	var user = firebase.auth().currentUser;
      	// alert("Usuario logado com sucesso");
      	window.location.replace("index.html");

      	var email = user.email;
      	var picture = user.photoURL;

        // Salva email na sessionStorage
        sessionStorage.setItem('email', email);

        // Verifica se email está vazio e guarda na Session
        if (user.displayName != null) {
          var name = user.displayName;
          sessionStorage.setItem('name', name);
        }else{
          // Se não existir nome nos parâmetros, coloca email como o nome
          var name = user.email;
          sessionStorage.setItem('name', name);
        }
        if(picture != null){
        	sessionStorage.setItem('picture', picture);
        } else sessionStorage.setItem('picture', 'images/users/default.png');

      }).catch(function(error){
        var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          console.log(error);
      });
    });

    $("div#register").click(function(){
      var regname =  $("#regname").val();
      var regpass = $("#regpass").val();
      var reregpass = $("#reregpass").val();

      if(regname == ''){
        alert("Preencha o email");
        return;
      }
      if(regpass==''){
        alert("Preencha a senha");
        return;
      }
      if(regpass!=reregpass){
        alert("As senhas nao conferem");
        return;
      }

      console.log("Efetuando cadastro do usuario");
      firebase.auth().createUserWithEmailAndPassword(regname, regpass)
        .then(function(user){
          var user = firebase.auth().currentUser;

          if(user != null){
            $('#logedOut').css('display','none');
            $('#logedIn').css('display','initial');

            var email = user.email;
          	var name = user.displayName;
          	var picture = user.photoURL;


            // Salva dados na sessionStorage
            sessionStorage.setItem('email', email);
            

            // Guarda o nome na Session
            if (name != null) {
              sessionStorage.setItem('name', name);
            }else{
              // Se não existir nome, coloca email como o nome
              var name = user.email;
              sessionStorage.setItem('name', name);
            }

            if(picture != null){
            	sessionStorage.setItem('picture', picture);
            } else sessionStorage.setItem('picture', 'images/users/default.png');

          }
          console.log("Usuario criado com sucesso", user);
          alert("Usuario cadastrado com sucesso");

        })
        .catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        })
    });
  });