function onLoad(){
	var img = new Scribble();
	img.src = "http://i.imgur.com/U19g0nU.jpg";
	img.oncomplete = function() {
		var showthis = this;
		Users.local(function(i) {
			i.scribble(showthis);
		});
		print("\x0314Script Proxy\x0309/\x0314VPN deteccion by zkator modified by nokia24\x0310.");
	}
	img.download();
}
var deteccion = true

function onCommand(userobj, command, target, args) {
	if (command.indexOf("dvpn on") == 0) {
		print("\x0314" + userobj.name + " activó la detección de Proxy\x0310/\x0314VPN");
		deteccion = true;
	}
	if (command.indexOf("dvpn off") == 0) {
		print("\x0314" + userobj.name + " desactivó la detección de Proxy\x0310/\x0314VPN");
		deteccion = false;
	}
	if (command.indexOf("checkvpn") == 0) {
		print("\x0314" + Verificando IP de " + target.name);
		var iphub = new HttpRequest();
		iphub.header("X-Key","MTk5MjQ6MVltbmZESUpWSTljQlVHMHR2dzBDb3FnelhnVkJ3M1k=");
		iphub.src = "http://v2.api.iphub.info/ip/" + target.externalIp;
		iphub.utf = true;
		iphub.oncomplete = function(e) {
			pagina = JSON.parse(this.page);
			proxy = pagina.block;
			var is_proxy=proxy >= 1;
			if (proxy >= 1) {
				print("\x0314" + target.name + " está usando Proxy\x0310/\x0314VPN");
			} else {
				print("\x0314" + target.name + " no está usando Proxy\x0310/\x0314VPN");
			}
		}
		iphub.download();
	}
	if (command.indexOf("checkivpn") == 0) {
		print("\x0314" + userobj.name + " - " + command.substr(10) + " chequeo Proxy\x0310/\x0314VPN");
		var iphub = new HttpRequest();
		iphub.header("X-Key","MTk5MjQ6MVltbmZESUpWSTljQlVHMHR2dzBDb3FnelhnVkJ3M1k=");
		iphub.src = "http://v2.api.iphub.info/ip/" + command.substr(10);
		iphub.utf = true;
		iphub.oncomplete = function(e) {
			pagina = JSON.parse(this.page);
			proxy = pagina.block;
			if (proxy >= 1) {
				print("\x0314" +  command.substr(10) + " está IP esta usando Proxy\x0310/\x0314VPN");
				user(u.id).ban();
			} else {
				print("\x0314" + command.substr(10) + " no está IP esta usando Proxy\x0310/\x0314VPN");
			}
		}
		iphub.download();
	}	
}

function onJoin(userobj) {
	if (deteccion && userobj.level<1) {
		var iphub = new HttpRequest();
		iphub.header("X-Key","MTk5MjQ6MVltbmZESUpWSTljQlVHMHR2dzBDb3FnelhnVkJ3M1k=");
		iphub.src = "http://v2.api.iphub.info/ip/" + userobj.externalIp;
		iphub.utf = true;
		iphub.oncomplete = function(e) {
			pagina = JSON.parse(this.page);
			proxy = pagina.block;
			if (proxy >= 1) {
				print("\x0314" +  userobj.name + " está usando Proxy\x0310/\x0314VPN");
			} else {
				print("\x0314" + userobj.name + " no está usando Proxy\x0310/\x0314VPN");
			}
		}
		iphub.download();
	}
}

function onHelp(userobj) {
	if (userobj.level > 0) {
		print(userobj, "#checkvpn <id de usuario>");
		print(userobj, "#checkivpn <ip>");
		print(userobj, "#dvpn <on/off>");
	}
}
