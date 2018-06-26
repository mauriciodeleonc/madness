// carrito de compras
var carritocompras= [];
$(document).ready( function() {

  $("#datetimepicker2").datetimepicker();

  $('[data-toggle="popover"]').popover();


  $("#carritoCompra").on("click", function() {

    crearSC(carritocompras)


  })

  $("#addSC2").on("click",function() {
    $("#addQty").modal('hide')
     var prod = $("#prodSel").val().split("-");
     var total = prod[2] * $("#cantidad").val();
     var exist = search(prod[0], carritocompras)

      if(exist) {
          var oldVal =  parseInt(exist.cantidad)
          exist.cantidad = parseInt($("#cantidad").val()) + oldVal
          exist.total = prod[2] * parseInt(exist.cantidad);

      } else {
            carritocompras.push({
              id : prod[0],
              nombre: prod[1],
              costo : prod[2],
              cantidad : $("#cantidad").val() ,
              total : total
            })
      }


      var carrito = ""

        $.each(carritocompras, function(x,y) {

            carrito = carrito +  y.nombre + " (" + y.cantidad + ") $" + y.total+ "\n";

        })


      $("#carritoCompra").attr('data-content',carrito) ;
      $("#cantidad").val("");


  })



$(".menuSel").on('click', function() {
  var obj = $(this);
  var seleccion = $(this).html();
   $("#principal").html(" ");
  $.ajax({
        url: "cotizacion_db.php",
        data: "tipo=catalogo&cat="+ seleccion,
        dataType: "json",
        success: function(valor,textStatus) {
          var counter = 0;
          var detalle = "";

          $("#principal").html('<h3 class="product-title">'+seleccion+'</h3>')
          $.each(valor, function(x,y) {



                        detalle = detalle
                          + ' <div class="w3-third w3-container w3-margin-bottom"> '
                          + '     <div class="w3-display-container" style="transition:0.5s;width:95%">'
                          + '         <img src="'+y.imagen+'" class="w3-round-large" alt="" style="width:100%">'
                          + '         <div class="w3-display-middle w3-display-hover w3-large w3-text-white w3-black w3-round">'
                          + '          <div class="w3-padding w3-animate-opacity">'+ y.nombre+' $'+y.precio +'</div>'
                          + '          </div>'
                          + '         <div class="w3-display-bottommiddle w3-display-hover w3-large">'
                          + '           <button data-content="'+y.id+'-'+y.nombre+'-'+y.precio+'-'+y.descripcion+'" id="'+y.id+'" type="button" class="w3-black w3-animate-opacity w3-btn w3-round addSC">Cotizar</button>'
                          + '         </div>'
                          + '     </div>'
                          + ' </div>'




                    $("#principal").append(detalle);
                    counter++;
                    detalle = "";

          })

          var demo ="";
          var opcion = obj.attr('id');

          switch (opcion)  {

            case 'btcomida' :
              demo = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main comida-bg" ;
            break;
            case 'btbebida' :
              demo = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main bebida-bg" ;
            break;
            case 'btmusica' :
              demo = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main  musica-bg";
            break;
            case 'btpersonal' :
              demo = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main  personal-bg";
            break;
            case 'btmobiliario' :
              demo = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main  mobiliario-bg";
            break;
            case 'btentretenimiento' :
            demo = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main entretenimiento-bg";
            break;

          }

            $("#principal").attr('class', demo);

          $(".addSC").on("click",function() {


              var prod = $(this).attr("data-content").split("-");
              $("#prodSel").val($(this).attr("data-content"));
              $("#addQty .modal-title").html(prod[1]+" "+prod[2])
              $("#prodDesc").html(prod[3])
              $("#addQty").modal('show');

          })

        },
        error: function(msg){
          alert( "fallas: " + msg.responseText );
        }
    });

  })

  $("#btnCot").on('click', function() {
      if(carritocompras.length > 0 )
      {
        $("#ShopCart").modal('hide');
        $("#cotizar").modal('show')
      } else {
        alert("no tiene articulos en el Carrito");
        $("#cotizar").modal('hide');
      }
  })

  $("#btnEnvCot").on('click',function() {

       $.ajax({
        url: "cotizacion_db.php",
        data: {tipo: 'sendMail',cotizacion: carritocompras, nombre: $("#cnombre").val(), email: $("#cemail").val(), tel: $("#ctel").val(), fecha: $("#cfecha").val(), lugar: $("#clugar").val()},
        dataType: "json",
        success: function(msg) {
          alert(msg.responseText );
        },
        error: function(msg){
          alert( "fallas: " + msg.responseText );
        }
    });

  })


})

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return myArray[i];
        }
    }
}

function remove(array, element) {

    for (var i=0; i < array.length; i++) {
        if (array[i].id === element) {
             if (i !== -1) {
                  array.splice(i, 1);
            }
        }
    }


}

function crearSC(array) {

  var cotizacion = "";
  var total = 0;
  cotizacion = cotizacion + "<table class='table'><thead><td>Producto</td><td>Cantidad</td><td>Costo</td><td>Eliminar</td></thead>";

   $.each(array, function(x,y) {
     total = total +  parseFloat(y.total);
     cotizacion = cotizacion + "<tr><td>" + y.nombre + "</td><td>" + y.cantidad + "</td><td> $" + y.total+ "</td><td><a href='#' class='btDelSC' data-content='"+ y.id +"'><i class='fa fa-times'></i></a></td></tr>";

   })

  cotizacion = cotizacion + "<tr><td></td><td></td><td>Total: </td><td>$"+ total +"</td></tr>";
  cotizacion = cotizacion + "</table>";

  $("#ShopCart").modal('show');
  $("#ShopCart .modal-body").html(cotizacion);

        $(".btDelSC").on('click', function() {
          indexProd = $(this).attr('data-content');

          remove(carritocompras, indexProd)

          $("#ShopCart .modal-body").html(crearSC(carritocompras));


        })



}
