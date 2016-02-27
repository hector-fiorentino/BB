$(document).ready(function(){
	var txt = "";
	var imagen = "";
	var enlace = "";
	var dpi = window.devicePixelRatio;
	var folder = "mdpi";
	switch(dpi){
		case 1:
			//if(window.width()>320){
				//folder = "xxhdpi";
				//$('body').css('zoom','3');
			//}else{
				folder = "mdpi";
			//}
		break;
		case 1.5:
		 	folder = "hdpi";
		break;
		case 2:
			folder = "xhdpi";
		break;
		case 3:
			folder = "xxhdpi";
		break;
	}
	var els = $("img.dpi-var").get();
		for(var i = 0; i < els.length; i++) {
			var src = els[i].src
			src = src.replace("/mdpi/", "/" + folder + "/");
			els[i].src = src;
		}
		//alert(els);
	
	//Buscar imagenes con dpi variable y reemplaza el folder por el adecuado.
	$.post("http://banderablanca.org.ar/GetNews",{},function(exito){
		if(exito){
			$("#loader").hide();
			if(exito.newsType=="found"){
				$("#foto").css("background-color","transparent");
				$("#foto").attr("src","assets/imagenes/"+folder+"/banderaverde.png");
				$("#desc").hide();
				txt = exito.newsTitle;
				enlace ='http://www.banderablanca.org.ar/facebook.php?id='+exito.id; 
			}else{
				$("#foto").attr("src",exito.newsPictureURI);
				$("#desc").html(exito.newsDescription);
				txt = exito.newsTitle + ". " +exito.newsDescription;
				enlace ='http://www.banderablanca.org.ar/facebook.php?id='+exito.id; 
				//txt = 'http://www.banderablanca.org.ar/facebook.php?id='.exito.id;
			}
			imagen = exito.newsPictureURI;
			$("#titular").html(exito.newsTitle);
			$("#busqueda").show();
		}
	},"json").fail(function(er){
		alert(JSON.stringify(er));
	})

	$(".share").click(function(){
		//alert(txt + " " + imagen);
		//window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(txt, imagen, 'http://banderablanca.org.ar' /* url */, 'Paste it dude!', function() {alert('share ok')}, function(errormsg){alert(errormsg)})
		window.plugins.socialsharing.share(txt, null, null, enlace);
	})
})
