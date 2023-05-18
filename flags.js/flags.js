function onLoad(){
	print("\x0314Flags-Country Blocker by nokia24.");
}
var whitelist=["Ecuador","Chile","Argentina","Mexico","Bolivia","Peru","Colombia","Brazil","Paraguay","El Salvador","Guatemala","Venezuela","España"];
var deteccionpaises = true;
function onCommand(userobj, command, target, args){
	if(command.indexOf("blockcountrys on") == 0){
		print("\x0314" + userobj.name + " activó bloqueo de paises");
		deteccionpaises = true;
	}else if(command.indexOf("blockcountrys off") == 0){
		print("\x0314" + userobj.name + " desactivó bloqueo de paises");
		deteccionpaises = false;
	}
}
function onJoin(u){
	
	trace = new HttpRequest();
	
	trace.src = "http://extreme-ip-lookup.com/json/"+u.externalIp
        trace.utf = true
	
	trace.oncomplete = function(){ 
		prueba = JSON.parse(this.page);
		if(deteccionpaises && whitelist.indexOf(prueba.country)===-1 && userobj.level<1){
			print("\x0314País de " +  userobj.name + " en la lista negra");
			user(u.id).ban();
		}else{
			mostrar(prueba.countryCode.toLowerCase(),prueba.country,prueba.region);
		}
		
	}
	
	
	trace.download();
	
}



function mostrar(code,pais,ciudad) {
    x = new Scribble();
	var url= "http://sorrow-sb0t.webs.com/" + code + ".gif";
    x.src =url;
    x.oncomplete = function () {
        p = this;
        Users.local(function(i){
	    print(i, "\x0301"+pais+" - "+ciudad);
		if (i.canHTML){
			i.sendHTML("<img src="+url+" width='auto' height='auto' />")
		}else{
			i.scribble(p);
		}
            
        });
    };
    x.download();
}
function onHelp(userobj) {
	if (userobj.level > 0) {
		print(userobj, "#blockcountrys <on/off>");
	}
}