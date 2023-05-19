$(document).ready(function () {
    // carga inicial del contenido
    cargarContenido()
});

// código en función para hacer compatible con load()
function cargarContenido() {
    $('#contenido').load('contenido.html', function() {

        // ajusta el volumen y reproduce audio
        $('#bgMusic').prop('volume', 0.2);
        $('#bgMusic').trigger("play")

        // creación de clases para personajes y armas
        class Arma{
            constructor(nombre, nivel, poder){
                this.nombre = nombre
                this.nivel = nivel
                this.poder = poder
            }
        }
        
        class Personaje{
            constructor(nombre, nivel, vida, arma){
                this.nombre = nombre
                this.nivel = nivel
                this.vida = vida
                this.arma = arma
                this.maxVida = vida
                this.crit = false
            }
        
            atacar(objetivo){
                let randomNum = Math.random(); // Genera un número aleatorio entre 0 y 1
                let dano
                if (randomNum < 0.1) {
                    dano = (parseInt(this.arma.poder) + parseInt(this.nivel)) *1.5
                    this.crit = true
                }else{
                    dano = (parseInt(this.arma.poder) + parseInt(this.nivel))
                    this.crit = false
                }
                objetivo.vida = objetivo.vida - dano
                return dano
            }

            critico(){
                return this.crit
            }
        }
        
        // declarado como objeto para poder acceder a las propiedades con .
        const armas = {
            claymore: new Arma("Mandoble", 1, 20),
            polearm: new Arma("Lanza", 1, 12),
            bow: new Arma("Arco", 1, 8),
            sword: new Arma("Espada", 1, 15),
            axe: new Arma("Hacha", 1, 12)
        }

        // Obtener el select y agregar las opciones
        for (const arma in armas) {
            $("#formArma").append(`<option value="${arma}">${armas[arma].nombre}</option>`);
        }
        for (const arma in armas) {
            $("#formArma2").append(`<option value="${arma}">${armas[arma].nombre}</option>`);
        }

        // muestra valor de input range "vida max"
        $("#labelVida1").text("Vida: " + $("#formVida").val());
        $("#formVida").on("input", function() {
            $("#labelVida1").text("Vida: " + $(this).val());
        });

        $("#labelVida2").text("Vida: " + $("#formVida2").val());
        $("#formVida2").on("input", function() {
            $("#labelVida2").text("Vida: " + $(this).val());
        });

        // muestra Velocidad y se actualiza junto con los input y el select de los formularios
        function velocidades() {
            let armas = {
                claymore: new Arma("Mandoble", 1, 20),
                polearm: new Arma("Lanza", 1, 12),
                bow: new Arma("Arco", 1, 8),
                sword: new Arma("Espada", 1, 15),
                axe: new Arma("Hacha", 1, 12)
            }

            let velocidad1 = 300 - parseInt($("#formVida").val()) - parseInt(armas[$("#formArma").val()].poder) + parseInt($("#formNivel").val())
            //console.log(armas[$("#formArma").val()].poder)
            if (isNaN(velocidad1) == true){
            }else{
                $("#velocidadPj1").text("Velocidad: " + velocidad1);
            }

            let velocidad2 = 300 - parseInt($("#formVida2").val()) - parseInt(armas[$("#formArma2").val()].poder) + parseInt($("#formNivel2").val())
            //console.log($("#formArma2").val().poder)
            if (isNaN(velocidad2) == true) {
            } else {
                $("#velocidadPj2").text("Velocidad: " + velocidad2);
            }

            return {vel1: velocidad1, vel2: velocidad2}
        }

        velocidades()
        $("input, select").on("input", function() {
            velocidades()
        });
        
        
        // crear personaje (inicial, para pruebas)
            // const personaje1 = new Personaje("Mono 1", 1, 100, catalyst)
            // const personaje2 = new Personaje("Mono 2", 2, 120, armas.sword)

        let personaje1
        let personaje2

        // crear objeto personaje1:
        function crearPers1(nombre, nivel, vida, arma, color) {
            const armaSeleccionada = armas[arma];
            personaje1 = new Personaje(nombre, nivel, vida, armaSeleccionada)
            $(".pers1").css("background-color", color)
        }

        $("#formCrear").click(function () { 
            let nombre = $("#formNombre").val()
            let nivel = $("#formNivel").val()
            let vida = $("#formVida").val()
            let arma = $("#formArma").val()
            let color = $("#formColor").val()

            if (nombre.replace(/\s/g, "") == ""){
                alert("Debe asignar un nombre al personaje")
            }else if(isNaN(nivel)==true || nivel<1){
                alert("En nivel debe ser mayor a 0")
            }else{
                crearPers1(nombre, nivel, vida, arma, color)
                // asigna arma seleccionada como src de arma para el personaje
                let arma1 = "assets/img/" + arma + ".png"
                $("#arma1img").attr("src", arma1)
                $("#formPj1").hide();
                $(".cont1").fadeIn().animate({
                    top: "-20px",
                    opacity: 1
                    }, 500);
                mostrarNarrador()
            }
        });

        // crear objeto personaje2:
        function crearPers2(nombre, nivel, vida, arma, color) {
            const armaSeleccionada = armas[arma];
            personaje2 = new Personaje(nombre, nivel, vida, armaSeleccionada)
            $(".pers2").css("background-color", color)
        }

        $("#formCrear2").click(function () { 
            let nombre = $("#formNombre2").val()
            let nivel = $("#formNivel2").val()
            let vida = $("#formVida2").val()
            let arma = $("#formArma2").val()
            let color = $("#formColor2").val()

            if (nombre.replace(/\s/g, "") == ""){
                alert("Debe asignar un nombre al personaje")
            }else if(isNaN(nivel)==true || nivel<1){
                alert("En nivel debe ser mayor a 0")
            }else{
                crearPers2(nombre, nivel, vida, arma, color)
                // asigna arma seleccionada como src de arma para el personaje
                let arma2 = "assets/img/" + arma + ".png"
                $("#arma2img").attr("src", arma2)
                $("#formPj2").hide();
                $(".cont2").fadeIn().animate({
                    top: "-20px",
                    opacity: 1
                    }, 500);
                mostrarNarrador()
                }
        });

        // mostrar narrador y botón combate si ambos personajes están visibles
        function mostrarNarrador() {
            if ($(".cont1").is(":visible") && $(".cont2").is(":visible")) {
                setTimeout(function() {
                    $(".narrador").fadeIn(500)
                    $(".narrador").css("display", "flex")
                    $(".contCombate").fadeIn(500)
                    $(".contCombate").css("display", "flex")
                }, 800);
            }
        }

        // acciones botón atacar
        $("#atk1").click(function () { 
            ataquePj1()
        });

        $("#atk2").click(function () { 
            ataquePj2()
        });

        // funciones de ataque
        function ataquePj1() {
            // personaje 1 ataca a personaje 2 si la vida de personaje 1 es mayor a 0
            if (((personaje1.vida / personaje1.maxVida) * 100) > 0) {
                // personaje 1 ataca a personaje 2 si la vida de personaje 2 es mayor a 0
                if (((personaje2.vida / personaje2.maxVida) * 100) > 0) {
                    // ejecuta ataque y guarda el return en una variable para usar valor de daño
                    let dano1 = personaje1.atacar(personaje2)
                    $('#vida2').css('width', ((personaje2.vida / personaje2.maxVida) * 100) + '%');
                    $("#textoNarrador").append(personaje1.nombre + " ha atacado a " + personaje2.nombre + " con su " + personaje1.arma.nombre + "<br>")
                    actScroll()

                    // ejecuta animaciones de ambos personajes y armas
                        // "animationend" ejecuta la función una vez termina la animación
                    $('#pers1').addClass('pjAtaque').one('animationend', function() {
                        $('#pers1').removeClass('pjAtaque');
                    });
                    $('#pers2').addClass('pjDano').one('animationend', function() {
                        $('#pers2').removeClass('pjDano');
                    });

                    $('#arma1').addClass('arAtaque').one('animationend', function() {
                        $('#arma1').removeClass('arAtaque');
                    });
                    $('#arma2').addClass('arDano').one('animationend', function() {
                        $('#arma2').removeClass('arDano');
                    });
                    
                    // mouestra daño hecho a oponente
                    $("#contadorDano2").text("-"+dano1)
                    if (personaje1.critico() == true) {
                        $($("#contadorDano2")).addClass("crit");
                        $("#contadorDano2").show().one("animationend", function () {
                            $("#contadorDano2").hide()
                            $($("#contadorDano2")).removeClass("crit");
                        });
                    }else{
                        $("#contadorDano2").show().one("animationend", function () {
                            $("#contadorDano2").hide()
                        });
                    }
                    
                    // mensaje de victoria si la vida del oponente llega a 0 (y cambio a color gris)
                    if (((personaje2.vida / personaje2.maxVida) * 100) <= 0) {
                        $("#textoNarrador").append(personaje2.nombre + " ha sido derrotado! <br>")
                        actScroll()
                        $('#pers2').css("background-color","#888888")
                        $('#pers2').css("border-color","#666666")
                        
                        // arma del oponente caída al ser derrotado
                        setTimeout(() => {
                            $("#arma2").css("transform", "rotate(-45deg) translate(-20px, 10px)")
                        }, 250);

                        // despliegue botón de Reiniciar
                        setTimeout(() => {
                            $("#reiniciar").css("display", "flex");
                        }, 1000);
                    }
                }else{
                    $("#textoNarrador").append("El oponente " + personaje2.nombre + " se encuentra debilitado. <br>")
                    actScroll()
                }
            }else{
                $("#textoNarrador").append(personaje1.nombre + " está debilitado. No puede atacar. <br>")
                actScroll()
            }
            
            if (((personaje2.vida / personaje2.maxVida) * 100) <= 40) {
                $('#vida2').css('background-color', '#FF595A')
            }else{
                $('#vida2').css('background-color', '#94D223')
            }
        }

        function ataquePj2() {
            // personaje 2 ataca a personaje 1 si la vida de personaje 2 es mayor a 0
            if (((personaje2.vida / personaje2.maxVida) * 100) > 0) {
                // personaje 2 ataca a personaje 1 si la vida de personaje 1 es mayor a 0
                if (((personaje1.vida / personaje1.maxVida) * 100) > 0) {
                    // ejecuta ataque y guarda el return en una variable para usar valor de daño
                    let dano2 = personaje2.atacar(personaje1)
                    $('#vida1').css('width', ((personaje1.vida / personaje1.maxVida) * 100) + '%');
                    $("#textoNarrador").append(personaje2.nombre + " ha atacado a " + personaje1.nombre + " con su " + personaje2.arma.nombre + "<br>")
                    actScroll()

                    // ejecuta animaciones de ambos personajes y armas
                        // "animationend" ejecuta la función una vez termina la animación
                    $('#pers2').addClass('pjAtaque').one('animationend', function() {
                        $('#pers2').removeClass('pjAtaque');
                    });
                    $('#pers1').addClass('pjDano').one('animationend', function() {
                        $('#pers1').removeClass('pjDano');
                    });

                    $('#arma2').addClass('arAtaque').one('animationend', function() {
                        $('#arma2').removeClass('arAtaque');
                    });
                    $('#arma1').addClass('arDano').one('animationend', function() {
                        $('#arma1').removeClass('arDano');
                    });

                    // mouestra daño hecho a oponente
                    $("#contadorDano1").text("-"+dano2)
                    if (personaje2.critico() == true) {
                        $($("#contadorDano1")).addClass("crit");
                        $("#contadorDano1").show().one("animationend", function () {
                            $("#contadorDano1").hide()
                            $($("#contadorDano1")).removeClass("crit");
                        });
                    }else{
                        $("#contadorDano1").show().one("animationend", function () {
                            $("#contadorDano1").hide()
                        });
                    }

                    // mensaje de victoria si la vida del oponente llega a 0
                    if (((personaje1.vida / personaje1.maxVida) * 100) <= 0) {
                        $("#textoNarrador").append(personaje1.nombre + " ha sido derrotado! <br>")
                        actScroll()
                        $('#pers1').css("background-color","#888888")
                        $('#pers1').css("border-color","#666666")

                        // arma del oponente caída al ser derrotado
                        setTimeout(() => {
                            $("#arma1").css("transform", "rotate(45deg) translate(20px, 10px) scaleX(-1)")
                        }, 250);

                        // despliegue botón de Reiniciar
                        setTimeout(() => {
                            $("#reiniciar").css("display", "flex");
                        }, 1000);
                    }
                }else{
                    $("#textoNarrador").append("El oponente " + personaje1.nombre + " se encuentra debilitado. <br>")
                    actScroll()
                }
            }else{
                $("#textoNarrador").append(personaje2.nombre + " está debilitado. No puede atacar. <br>")
                actScroll()
            }
            
            if (((personaje1.vida / personaje1.maxVida) * 100) <= 40) {
                $('#vida1').css('background-color', '#FF595A')
            }else{
                $('#vida1').css('background-color', '#94D223')
            }
        }

        // botón de combate y probabilidad de ataque
        $("#btnCombate").click(function() {
            let randomNum = Math.random() // Genera un número aleatorio entre 0 y 1
            let v1 = velocidades().vel1
            let v2 = velocidades().vel2
            let prob1 = v1/(v1+v2)

            if (randomNum < prob1) {
            ataquePj1()
            } else {
            ataquePj2()
            }
        })

        // mantiene el scroll al final
        function actScroll() {
            $("#textoNarrador").scrollTop($("#textoNarrador").prop("scrollHeight"));
        }

        // despliega formularios
        $("#crearPj1").click(function () {
            // agregar if para no abrir si el objeto ya está en pantalla
            $("#formPj2").hide(); 
            $("#formPj1").toggle(); 
        })

        $("#crearPj2").click(function () {
            $("#formPj1").hide();
            $("#formPj2").toggle(); 
        })

        // función a botón de reiniciar
        $("#reiniciar").click(function () { 
            cargarContenido()
        });
    
        // AÑADIR VERIFICACIONES EN FORMULARIOS ---------------------------------------------------

        // crear función y ejecutar con 2 eventos:
        /*
        function miFuncion() {
            console.log("Evento click o keydown con la tecla Espacio ocurrió");
        }
        
        $(document).on("keydown", function(event) {
            // Verificar si el evento fue desencadenado por la tecla "Espacio"
            if (event.which === 32) {   // 49 y 50 para 1 y 2
            miFuncion();
            }
        });
        
        $("#miElemento").on("click", miFuncion);
        */
      })
}