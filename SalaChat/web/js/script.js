var salaActual="Sala1";
var salas={
    0:"Sala1"
};
var emoji = {
    ":)":'cf.jpg',
    ":(":'ctriste.png',
    ":":'ojos.png',
    ":o":'tres.png',
    ":|":'cuatro.png',
    "0>":'cinco.png',
    "8>":'corazon.jpg',
    ":9":'seis.png',
    ".":'siete.png'
};
var evtSource  = new EventSource("http://localhost:8084/SalaChat/SalaChat");
$(document).ready(function(){
	$("#txtMensaje").focus();
	$("#modalPersonal").openModal();
	$("#txtMensaje").focus();
    
    evtSource.onmessage  = function(e){
        console.log(e.data);
        var datos = JSON.parse(e.data);
        if(salaActual==datos.sala){
            
            if(emoji[datos.content]!=undefined){
                
                var newMessage = createEmoji(datos.user,"<img src='img/"+emoji[datos.content]+"'>");
                $("#areaMensajes").append(newMessage);
            }else{
                var newMessage = createNewElementMessage(datos.user,datos.content);
                $("#areaMensajes").append(newMessage);
            }
            $("#txtMensaje").focus();
        }
        
        
        
    }
    evtSource.addEventListener('salaNew',function(e){
        console.log(e);
        var data  = JSON.parse(e.data);
      
        //alert('Si Llego el evento ping');
        var nuevoElementoSala = createNewElementSala(data);
        
        $("#salas").append(nuevoElementoSala);
         Materialize.toast('Se Creo Sala '+data, 2000);
    
       
    });
    evtSource.addEventListener('getAllSalas',function(e){
            console.log(e);
             
    });
    
  
    
       
        
        
        
        
     
    
});


var iniciar = function(){
     var request = new XMLHttpRequest();
        request.addEventListener('load',function(e){
           console.log(e);
            
        })
        request.open('POST','http:///localhost:8084/SalaChat/SalaChat',true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
        request.send("getAllSalas=dsadadasd");
}

$(document).on('click','#prob',function(){
    iniciar();
});

$(document).on('click','#btnEntrarUsuario',function(){
	var nombre = $("#nombreUsuarioModal").val();
	if (nombre=='') {
		Materialize.toast('No introdujo nombre de usuario', 2000)
		$("#nombreUsuario").append("unknow");
	}else{

		$("#nombreUsuario").append(nombre);
                $("#nombreUsuarioModal").val('');
	}
});
$(document).on('click','#btncerrarModal',function(){
	$("#nombreUsuario").append("unknow");
	
});
$(document).on('change','#txtMensaje',function(){
	var usuario = $("#nombreUsuario")[0].innerHTML;
	var msj = $("#txtMensaje").val();
        var request = new XMLHttpRequest();
        request.addEventListener('load',function(){
            console.log('Mensaje enviado');
            Materialize.toast('Mensaje enviado', 1000)
        })
        request.open('POST','http:///localhost:8084/SalaChat/SalaChat',true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
        request.send("text="+msj+'&user='+usuario+"&sala="+salaActual);
	
	$("#txtMensaje").val('');
        $("#areaMensajes").focus();
        
	
        
});


$(document).on('click','#btnEnviarMensaje',function(){
	var usuario = $("#nombreUsuario")[0].innerHTML;
	var msj = $("#txtMensaje").val();
	var newMessage = createNewElementMessage(usuario,msj);
	$("#areaMensajes").append(newMessage);
});
var createNewElementMessage = function(usuario,texto){
	var msj = "<p><b>"+usuario+" : </b><span class='chip'>"+texto+"</span></p>";
	return msj;
};
var createEmoji  =function(usuario,img){
    var msj = "<p><b>"+usuario+" : </b> "+img+"</p>";
    return msj;
}
var createNewElementSala = function(nombre){
	var msj = "<a href='#' class='collection-item' style='font-size:19px;'>"+nombre+"</a>";
	return msj;
};
$(document).on('click','.collection-item',function(){
	$(".collection-item").removeClass('active');
	$(this).addClass('active');
	var sala =$(this)[0].innerHTML;
        if(sala!=salaActual){
            Materialize.toast('Se Cambio a Sala : '+sala, 1500);
            $("#areaMensajes").empty();
            salaActual = sala;
        }
	
});
$(document).on('click','#bntNuevaSala',function(){
	$("#modalNewSala").openModal();
	$("#txtNombreNuevaSala").focus();
});
$(document).on('click','#btnAceptarNuevaSala',function(){
	var nombrenuevasala = $("#txtNombreNuevaSala").val();
	if (nombrenuevasala==''){
		Materialize.toast('No se pude crear sala sin nombre: ', 1500);
	}else{
            var request = new XMLHttpRequest();
            request.addEventListener('load',function(){
                
            })
            request.open('POST','http:///localhost:8084/SalaChat/SalaChat',true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
            request.send("salaNew="+nombrenuevasala);
            $("#txtNombreNuevaSala").val('');
   
	}
});

$(document).on('click','#btnEditarNombreUsuario',function(){
	$("#modalActualizarNombreUser").openModal();
	$("#txtNombreActualizadoUsuario").focus();
});


$(document).on('click','#btnChangeNombreUser',function(){
	var nombre = $("#txtNombreActualizadoUsuario").val();
	if (nombre=='') {
		Materialize.toast('No introdujo nombre de usuario', 2000)
		$("#nombreUsuario").append("unknow");
	}else{
		$("#nombreUsuario")[0].innerHTML = nombre;
		Materialize.toast('Se cambio Nombre de usuario', 2000);
	}
});




