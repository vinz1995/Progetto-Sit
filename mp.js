var Dati_raccolti=new Array();
function c_f(){
$.post(
       'visAdmintutte.php',
       { Nome: "Italo" }, // Eventuali dati da passare via post
       function( data )
       {
           Dati_raccolti = JSON.parse(data);
		});
}

console.log(Dati_raccolti);