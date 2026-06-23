
var teclaDerecha;
var teclaIzquierda;
var teclaSalto;
var persona;
var fondoJuego;
var suelo;
var plataformas;
var juego = new Phaser.Game(1280, 480, Phaser.CANVAS, 'bloque_juego');
var bloque;
var piedras;
var puntaje = 0;
var textoPuntaje;
var textoVictoria;
var fondoVictoria;
var botonSiguiente;
var reconocimiento;
var moverDerecha = false;

var moverIzquierda = false;
var impulsoSalto = 0;
var musicaMenu;
var musicaHistoria;
var musicaJuego;
var musicaVictoriaNivel1;
var sonidoImpacto;
var sonidoVictoria;
var sonidoGameOver;
var juegoTerminado = false;
//PIXEL 
juego.antialias = false;

var estadoPrincipal = {

    preload: function () {
        // Carga todos los recursos
        juego.load.image('fondo', 'img/portadaSinTitulo.png');
        //
        juego.load.spritesheet('personas', 'img/personajeInca.png', 24, 48);

        juego.load.spritesheet('tiles', 'img/tileset.png', 16, 16);

        juego.load.audio('musicaJuegos', 'audio/nivelesAudio.mp3'
        );

        juego.load.audio(
            'musicaVictoriaNivel1',
            'audio/completarNivelSonido.mp3'
        );


    },

    create: function () {

        if (musicaHistoria) {

            musicaHistoria.stop();
        }


        if (musicaJuego) {

            musicaJuego.stop();
        }


        musicaJuego = juego.add.audio(

            'musicaJuegos'
        );

        musicaVictoriaNivel1 = juego.add.audio(
            'musicaVictoriaNivel1'
        );

        musicaVictoriaNivel1.volume = 0.5;

        musicaJuego.loop = true;


        musicaJuego.volume = 0.10;


        musicaJuego.play();

        puntaje = 0;


        //pixeles
        juego.stage.smoothed = false;


        juego.physics.startSystem(Phaser.Physics.ARCADE);
        // Mostrar fondo
        fondoJuego = juego.add.tileSprite(0, 0, 1280, 480, 'fondo');

        fondoJuego.scale.setTo(4);

        //grupo plataforma
        plataformas = juego.add.group();
        plataformas.enableBody = true;

        piedras = juego.add.group();
        piedras.enableBody = true;



        // personaje
        persona = juego.add.sprite(50, 350, 'personas');
        //gravedad colisiones etc
        juego.physics.arcade.enable(persona);
        //
        persona.anchor.setTo(0.5);


        //suelo
        for (var i = 0; i < 80; i++) {

            var suelo = plataformas.create(
                i * 16,
                400,
                'tiles',
                0
            );
            suelo.body.immovable = true;

        }

        //debajo del suelo


        for (var y = 416; y < 480; y += 16) {

            for (var x = 0; x < 1280; x += 16) {

                juego.add.sprite(
                    x,
                    y,
                    'tiles',
                    12
                );

            }
        }


        //////////*
        persona.scale.setTo(2);

        //texto puntaje

        // texto puntaje

        textoPuntaje = juego.add.text(

            20,
            20,

            'Puntaje: 0',

            {
                font: '24px Arial',
                fill: '#f4d35e',

                stroke: '#3b2200',

                strokeThickness: 4
            }
        );


        // mensaje victoria

        textoVictoria = juego.add.text(

            juego.width / 2,
            juego.height / 2,

            '¡NIVEL COMPLETADO!',

            {
                font: '48px Arial',
                fill: '#ffff00',
                fontWeight: 'bold'
            }
        );

        textoVictoria.anchor.setTo(0.5);

        textoVictoria.visible = false;


        // fondo oscuro transparente

        fondoVictoria = juego.add.graphics(0, 0);

        fondoVictoria.beginFill(0x000000, 0.7);

        fondoVictoria.drawRect(
            0,
            0,
            juego.width,
            juego.height
        );

        fondoVictoria.endFill();

        fondoVictoria.visible = false;

        // boton siguiente nivel

        botonSiguiente = juego.add.text(

            juego.width / 2,
            juego.height / 2 + 80,

            'SIGUIENTE NIVEL',

            {
                font: '32px Arial',
                fill: '#ffffff',
                backgroundColor: '#444444'
            }
        );

        botonSiguiente.anchor.setTo(0.5);

        botonSiguiente.visible = false;

        botonSiguiente.inputEnabled = true;


        //

        botonSiguiente.events.onInputDown.add(

            siguienteNivel,

            this
        );
        textoVictoria.bringToTop();

        botonSiguiente.bringToTop();

        textoPuntaje.bringToTop();


        //bloque 1
        for (var i = 0; i < 5; i++) {

            var bloque = plataformas.create(
                175 + (i * 16),
                280,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }


        // crear 10 piedras
        /* 
                for(var i = 0; i < 10; i++){
        
                     var x = juego.rnd.integerInRange(
                        100,
                        1100
                    );
        
                    var piedra = piedras.create(
        
                        x,
        
                        0,
        
                        'tiles',
        
                        9
                    );
        
                    piedra.body.gravity.y = 500;
                }
         */


        // PIEDRAS FIJAS


        // piedra 1

        var piedra = piedras.create(

            130,
            150,

            'tiles',

            9
        );
        //piedra.body.immovable = true;
        piedra.body.gravity.y = 500;

        piedra = piedras.create(430, 250, 'tiles', 9);
        piedra.body.gravity.y = 500;
        piedra = piedras.create(700, 200, 'tiles', 9);
        piedra.body.gravity.y = 500;
        piedra = piedras.create(980, 140, 'tiles', 9);

        piedra.body.gravity.y = 500;


        piedra = piedras.create(1180, 360, 'tiles', 9);

        piedra.body.gravity.y = 500;

        piedra = piedras.create(300, 220, 'tiles', 9);
        piedra.body.gravity.y = 500;


        piedra = piedras.create(560, 180, 'tiles', 9);

        piedra.body.gravity.y = 500;

        piedra = piedras.create(760, 180, 'tiles', 9);

        piedra.body.gravity.y = 500;
        piedra = piedras.create(880, 120, 'tiles',

            9
        );

        piedra.body.gravity.y = 500;


        // piedra 10

        piedra = piedras.create(1080, 300, 'tiles', 9
        );

        piedra.body.gravity.y = 500;



        // bloque 2

        for (var i = 0; i < 5; i++) {

            var bloque = plataformas.create(
                270 + (i * 16),
                220,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }


        // bloque inicial
        for (var y = 0; y < 3; y++) {

            for (var x = 0; x < 3; x++) {

                // tile superior
                var frame;

                if (y == 0) {

                    frame = 6;

                } else {

                    frame = 14;
                }

                var bloque = plataformas.create(

                    100 + (x * 16),
                    352 + (y * 16),
                    'tiles',
                    frame
                );

                bloque.body.immovable = true;
            }
        }




        // MURO 1


        for (var y = 0; y < 2; y++) {

            for (var x = 0; x < 5; x++) {

                var bloque = plataformas.create(

                    400 + (x * 16),
                    368 + (y * 16),

                    'tiles',

                    11
                );

                bloque.body.immovable = true;
            }
        }



        //
        // MURO 2 (un poco más alto)


        for (var y = 0; y < 2; y++) {

            for (var x = 0; x < 7; x++) {

                var bloque = plataformas.create(

                    480 + (x * 16),
                    295 + (y * 16),

                    'tiles',

                    11
                );

                bloque.body.immovable = true;
            }
        }


        ///

        // bloque largo

        for (var i = 0; i < 12; i++) {

            var bloque = plataformas.create(
                590 + (i * 16),
                220,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }

        //bloque largo 2

        for (var i = 0; i < 12; i++) {

            var bloque = plataformas.create(
                800 + (i * 16),
                170,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }



        //bloque largo 3

        for (var i = 0; i < 4; i++) {

            var bloque = plataformas.create(
                1000 + (i * 16),
                240,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }





        ////ultimo bloque


        for (var i = 0; i < 5; i++) {

            var bloque = plataformas.create(
                1200 + (i * 16),
                310,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }


        // MURO 1
        // ======================================

        for (var y = 0; y < 2; y++) {

            for (var x = 0; x < 10; x++) {

                var bloque = plataformas.create(

                    650 + (x * 16),
                    368 + (y * 16),

                    'tiles',

                    11
                );

                bloque.body.immovable = true;
            }
        }




        // bloque inicial
        for (var y = 0; y < 3; y++) {

            for (var x = 0; x < 3; x++) {

                // tile superior
                var frame;

                if (y == 0) {

                    frame = 6;

                } else {

                    frame = 14;
                }

                var bloque = plataformas.create(

                    1000 + (x * 16),
                    352 + (y * 16),
                    'tiles',
                    frame
                );

                bloque.body.immovable = true;
            }
        }


        // Configurar teclas
        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaSalto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        // Física

        //juego.physics.arcade.enable(persona);

        //hitbox personaje
        persona.body.setSize(20, 36, 2, 12);
        // persona.body.setSize(20,40,2,8);


        //AGRE
        persona.body.gravity.y = 700;
        //no salga de pantalla

        persona.body.collideWorldBounds = true;

        // Animaciones

        persona.animations.add('derecha', [0, 1, 2], 6, true);
        // persona.animations.add('izquierda', [3,4,5], 10, true);
        persona.animations.add('saltar', [6, 7, 8], 10, true);


        // =================================
        // CONTROL POR VOZ

        reconocimiento =
            new webkitSpeechRecognition();

        reconocimiento.lang = 'es-PE';


        //micro escucha continuamente
        reconocimiento.continuous = true;



        // revita resultados incompletos
        reconocimiento.interimResults = false;



        setTimeout(function () {

            reconocimiento.start();

        }, 80);

        reconocimiento.onend = function () {

            /*  setTimeout(function () {
 
                 reconocimiento.start();
 
 
 
 
             }, 80); */
            setTimeout(function () {

                try {

                    reconocimiento.start();

                } catch (error) {

                    console.log(
                        "Micro ya iniciado"
                    );
                }

            }, 300);


        };


        reconocimiento.onresult = function (event) {

            var comando = event.results[
                event.results.length - 1
            ][0].transcript;

            comando = comando.toLowerCase().trim();

            console.log(comando);

            if (comando.length > 20) {
                return;
            }
            // derecha

            if (comando.includes('derecha') || comando.includes('avanza')) {

                moverDerecha = true;

                moverIzquierda = false;

                /*   tiempoMovimiento =
                      juego.time.now + 400; */

            }


            // izquierda

            if (comando.includes('izquierda') || comando.includes('isquierda')
                || comando.includes('atras') || comando.includes('atrás')) {

                moverIzquierda = true;

                moverDerecha = false;
                /*   tiempoMovimiento =
                      juego.time.now + 400; */
            }

            // detener

            if (comando.includes('alto')) {

                moverDerecha = false;

                moverIzquierda = false;
            }




            if (comando.includes('salta')
                || comando.includes('falta')
             || comando.includes('arriba') 
            
            ) {

                if (persona.body.touching.down
                    ||
                    persona.body.blocked.down) {

                    // salto

                    persona.body.velocity.y = -450;

                    // detener movimiento continuo

                    moverDerecha = false;

                    moverIzquierda = false;



                    if (persona.scale.x > 0) {

                        impulsoSalto = 80;

                    } else {

                        impulsoSalto = -80;
                    }



                }
            }


            // disparar

            if (comando.includes('dispara')) {

                dispararPiedra();
            }

        };




    },

    update: function () {


        fondoJuego.tilePosition.x -= 0.15;
        juego.physics.arcade.collide(
            persona,
            plataformas
        );

        juego.physics.arcade.collide(
            piedras,
            plataformas
        );

        juego.physics.arcade.overlap(

            persona,

            piedras,

            recogerPiedra,

            null,

            this
        );






        //detiene horizontal
        persona.body.velocity.x = 0;


        // impulso del salto

        persona.body.velocity.x += impulsoSalto;


        // reducir impulso poco a poco

        impulsoSalto *= 0.85;


        //


        if (moverDerecha) {

            persona.body.velocity.x = 120;

            persona.scale.x = 2;

            persona.animations.play('derecha');
        }


        if (moverIzquierda) {

            persona.body.velocity.x = -120;

            persona.scale.x = -2;

            persona.animations.play('derecha');
        }




        // Movimiento y animaciones
        if (teclaDerecha.isDown) {
            persona.body.velocity.x = 200;
            //  persona.position.x += 2;
            persona.animations.play('derecha');
            persona.scale.x = 2;
        }
        else if (teclaIzquierda.isDown) {
            persona.body.velocity.x = -200;
            // persona.position.x -= 2;
            persona.animations.play('derecha');
            persona.scale.x = -2;
        }
        /*   else {
              persona.animations.stop();
          } */

        else if (
            !moverDerecha &&
            !moverIzquierda
        ) {

            persona.animations.stop();
        }
        // if (teclaSalto.isDown && persona.body.touching.down) {
        if (teclaSalto.isDown && (persona.body.touching.down
            ||
            persona.body.blocked.down)) {
            persona.body.velocity.y = -450;
            persona.animations.play('saltar');
        }
    }
};










function recogerPiedra(persona, piedra) {

    piedra.kill();

    puntaje += 10;

    textoPuntaje.text =
        'Puntaje: ' + puntaje;


    // ganar nivel

    if (puntaje >= 100) {
        // textoVictoria.visible = true;
        musicaVictoriaNivel1.play();
        fondoVictoria.visible = true;

        textoVictoria.visible = true;

        botonSiguiente.visible = true;



        persona.body.velocity.x = 0;

    }
}
//siguiente nivel aún en proceso
function siguienteNivel() {
    if (reconocimiento) {
        reconocimiento.stop();
    }

    juego.state.start('nivel2');
}


//nivel 2
var textoGameOver;

var botonReintentar;

var botonMenu;
var enemigo;

var enemigo1;
var enemigo2;
var enemigo3;
var teclaDisparo;

var disparos;
var textoEnemigos;

var direccionEnemigo1 = 1;

var direccionEnemigo2 = 1;

var direccionEnemigo3 = 1;

var enemigosEliminados = 0;

var destinoX = 0;

var estadoNivel2 = {


    preload: function () {
        // Carga todos los recursos
        juego.load.image('fondo', 'img/fondoNubes.png');
        //
        juego.load.spritesheet('personas', 'img/personajeInca.png', 24, 48);

        juego.load.spritesheet('tiles', 'img/tileset.png', 16, 16);
        juego.load.image('enemigo', 'img/enemigo.png');
        juego.load.image(
            'impacto',
            'img/impacto.png'
        );
        juego.load.audio(

            'impactoSonido',

            'audio/sonidoRoca.mp3'
        );

        juego.load.audio(
            'victoria',
            'audio/ganasteSonido.mp3'
        );

        juego.load.audio(
            'gameover',
            'audio/perdisteSonido.mp3'
        );




    },




    create: function () {
        juegoTerminado = false;
        enemigosEliminados = 0;
        textoEnemigos =
            null;

        juego.stage.backgroundColor = '#222222';

        sonidoImpacto = juego.add.audio(

            'impactoSonido'
        );
        sonidoVictoria = juego.add.audio(
            'victoria'
        );

        sonidoGameOver = juego.add.audio(
            'gameover'
        );



        if (musicaJuego) {

            musicaJuego.stop();
        }

        musicaJuego = juego.add.audio(
            'musicaJuegos'
        );

        musicaJuego.loop = true;

        musicaJuego.volume = 0.10;

        musicaJuego.play();
        // Mostrar fondo
        fondoJuego = juego.add.tileSprite(0, 0, 1280, 480, 'fondo');
        fondoJuego.scale.setTo(4);

        //grupo plataforma
        plataformas = juego.add.group();
        plataformas.enableBody = true;

        piedras = juego.add.group();
        piedras.enableBody = true;

        //disparos

        disparos = juego.add.group();
        disparos.enableBody = true;


        // personaje
        persona = juego.add.sprite(50, 350, 'personas');


        //
        persona.anchor.setTo(0.5);

        persona.scale.setTo(2);





        // TEXTO VICTORIA

        textoVictoria = juego.add.text(

            juego.width / 2,
            juego.height / 2 - 60,

            '¡JUEGO COMPLETADO!',

            {
                font: '48px Arial',
                fill: '#ffff00',
                fontWeight: 'bold'
            }
        );

        textoVictoria.anchor.setTo(0.5);

        textoVictoria.visible = false;



        // =================================
        // ENEMIGO 1


        enemigo1 = juego.add.sprite(

            980,
            300,

            'enemigo'
        );

        enemigo1.scale.setTo(1.2);



        // ENEMIGO 2


        enemigo2 = juego.add.sprite(

            650,
            170,

            'enemigo'
        );

        enemigo2.scale.setTo(1.2);




        enemigo3 = juego.add.sprite(

            700,
            300,

            'enemigo'
        );

        enemigo3.scale.setTo(1.2);








        //suelo
        // suelo con huecos

        for (var i = 0; i < 80; i++) {

            // HUECO 1
            /* if(i >= 15 && i <= 20){

                continue;
            }
 */
            /*     // HUECO 2
                if(i >= 35 && i <= 40){
    
                    continue;
                } */

            // HUECO 3
            /*  if(i >= 55 && i <= 60){
 
                 continue;
             } */

            var suelo = plataformas.create(

                i * 16,

                400,

                'tiles',

                0
            );

            suelo.body.immovable = true;
        }

        //debajo del suelo
        // debajo del suelo con huecos

        for (var y = 416; y < 480; y += 16) {

            for (var x = 0; x < 1280; x += 16) {

                var tile = x / 16;


                // hueco 1
                if (tile >= 15 && tile <= 20) {

                    continue;
                }

                // hueco 3
                if (tile >= 55 && tile <= 60) {

                    continue;
                }


                juego.add.sprite(

                    x,

                    y,

                    'tiles',

                    12
                );
            }
        }






        //// bloque largo

        for (var i = 0; i < 16; i++) {

            var bloque = plataformas.create(
                300 + (i * 16),
                285,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }


        // MURO


        for (var y = 0; y < 3; y++) {

            for (var x = 0; x < 4; x++) {

                var bloque = plataformas.create(

                    220 + (x * 16),
                    385 - (y * 16),

                    'tiles',

                    11
                );

                bloque.body.immovable = true;
            }
        }



        for (var y = 0; y < 3; y++) {

            for (var x = 0; x < 4; x++) {

                var bloque = plataformas.create(

                    840 + (x * 16),
                    385 - (y * 16),

                    'tiles',

                    11
                );

                bloque.body.immovable = true;
            }
        }





        //
        //// bloque largo

        for (var i = 0; i < 14; i++) {

            var bloque = plataformas.create(
                524 + (i * 16),
                230,
                'tiles',
                6
            );

            bloque.body.immovable = true;
        }



        // Configurar teclas
        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaSalto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        teclaDisparo = juego.input.keyboard.addKey(

            Phaser.Keyboard.X
        );

        // Física
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(persona);
        juego.physics.arcade.enable(enemigo1);

        juego.physics.arcade.enable(enemigo2);
        juego.physics.arcade.enable(enemigo3);

        //enemigo.body.gravity.y = 700;
        enemigo1.body.gravity.y = 700;

        enemigo2.body.gravity.y = 700;

        enemigo3.body.gravity.y = 700;





        persona.body.setSize(20, 36, 2, 12);
        // persona.body.setSize(20,40,2,8);


        //AGRE
        persona.body.gravity.y = 700;

        persona.body.collideWorldBounds = true;

        // Animaciones

        persona.animations.add('derecha', [0, 1, 2], 6, true);
        // persona.animations.add('izquierda', [3,4,5], 10, true);
        persona.animations.add('saltar', [6, 7, 8], 10, true);



        // =================================
        // CONTROL POR VOZ
        // =================================

        reconocimiento =
            new webkitSpeechRecognition();

        reconocimiento.lang = 'es-PE';

        reconocimiento.continuous = true;

        reconocimiento.interimResults = false;


        // iniciar

        setTimeout(function () {

            reconocimiento.start();

        }, 80);


        // reiniciar micro

        reconocimiento.onend = function () {
            setTimeout(function () {

                try {

                    reconocimiento.start();

                } catch (error) {

                    console.log(
                        "Micro ya iniciado"
                    );
                }

            }, 300);










        };


        // comandos

        reconocimiento.onresult = function (event) {

            var comando = event.results[
                event.results.length - 1
            ][0].transcript;

            comando = comando.toLowerCase().trim();

            console.log(comando);


            // derecha

            if (comando.includes('derecha') ||
                comando.includes('avanza')


            ) {

                /*  moverDerecha = true;
 
                 moverIzquierda = false; */
                moverDerecha = true;

                moverIzquierda = false;
/* console.log("activa derecha")
    juego.time.events.add(
        700,
        function(){
console.log("desactiva derecha")
            moverDerecha = false;

        },
        this
    ); */    destinoX = persona.x + 75;
            }


            // izquierda

            if (
                comando.includes('izquierda')
                ||
                comando.includes('isquierda')
                ||
                comando.includes('atras')
                ||
                comando.includes('atrás')
            ) {

                moverIzquierda = true;

                moverDerecha = false;

                destinoX = persona.x - 70;
            }


            // detener

            if (comando.includes('alto')) {

                moverDerecha = false;

                moverIzquierda = false;
            }


            // salto

            if (comando.includes('salta')
                ||
                comando.includes('falta')
            ||
                comando.includes('arriba')
            ) {

                if (
                    persona.body.touching.down
                    ||
                    persona.body.blocked.down
                ) {

                    persona.body.velocity.y = -450;


                    // detener caminar

                    moverDerecha = false;

                    moverIzquierda = false;


                    // pequeño impulso

                    if (persona.scale.x > 0) {

                        impulsoSalto = 80;

                    } else {

                        impulsoSalto = -80;
                    }
                }
            }


            // disparar

            if (comando.includes('dispara')) {

                dispararPiedra();
            }
        };



        // GAME OVER

        textoGameOver = juego.add.text(

            juego.width / 2,
            juego.height / 2 - 60,

            'GAME OVER',

            {
                font: '48px Arial',
                fill: '#ff0000',
                fontWeight: 'bold'
            }
        );

        textoGameOver.anchor.setTo(0.5);

        textoGameOver.visible = false;

        // contador enemigos

        textoEnemigos = juego.add.text(

            20,
            60,

            'Españoles derrotados: 0/3',

            {
                font: '24px Arial',
                fill: '#f4d35e',

                stroke: '#3b2200',

                strokeThickness: 4
            }
        );

        // boton reintentar

        botonReintentar = juego.add.text(

            juego.width / 2,
            juego.height / 2 + 20,

            'REINTENTAR NIVEL 2',

            {
                font: '28px Arial',
                fill: '#ffffff',
                backgroundColor: '#444444'
            }
        );

        botonReintentar.anchor.setTo(0.5);

        botonReintentar.visible = false;

        botonReintentar.inputEnabled = true;
        // boton volver nivel 1

        botonMenu = juego.add.text(

            juego.width / 2,
            juego.height / 2 + 80,

            'VOLVER AL NIVEL 1',

            {
                font: '28px Arial',
                fill: '#ffffff',
                backgroundColor: '#444444'
            }
        );

        botonMenu.anchor.setTo(0.5);

        botonMenu.visible = false;

        botonMenu.inputEnabled = true;

        botonReintentar.events.onInputDown.add(

            reiniciarNivel2,

            this
        );

        botonMenu.events.onInputDown.add(

            volverNivel1,

            this
        );

    },



    update: function () {

        fondoJuego.tilePosition.x -= 0.15;
        juego.physics.arcade.collide(
            persona,
            plataformas
        );


        juego.physics.arcade.collide(
            enemigo1,
            plataformas
        );

        juego.physics.arcade.collide(
            enemigo2,
            plataformas
        );

        juego.physics.arcade.collide(
            enemigo3,
            plataformas
        );


        // perder contra enemigos

        juego.physics.arcade.overlap(

            persona,

            enemigo1,

            perderJuego,

            null,

            this
        );

        juego.physics.arcade.overlap(

            persona,

            enemigo2,

            perderJuego,

            null,

            this
        );

        juego.physics.arcade.overlap(

            persona,

            enemigo3,

            perderJuego,

            null,

            this
        );

        juego.physics.arcade.collide(
            piedras,
            plataformas
        );


        // disparos chocan con muros

        juego.physics.arcade.collide(

            disparos,

            plataformas,

            destruirDisparo,

            null,

            this
        );


        juego.physics.arcade.overlap(

            persona,

            piedras,

            recogerPiedra,

            null,

            this
        );

        juego.physics.arcade.collide(
            persona,
            plataformas
        );

        juego.physics.arcade.collide(
            piedras,
            plataformas
        );

        juego.physics.arcade.overlap(

            persona,

            piedras,

            recogerPiedra,

            null,

            this
        );


        // disparos enemigos

        juego.physics.arcade.overlap(

            disparos,

            enemigo1,

            destruirEnemigo,

            null,

            this
        );

        juego.physics.arcade.overlap(

            disparos,

            enemigo2,

            destruirEnemigo,

            null,

            this
        );

        juego.physics.arcade.overlap(

            disparos,

            enemigo3,

            destruirEnemigo,

            null,

            this
        );



        //detiene horizontal
        persona.body.velocity.x = 0;
        // impulso salto

        persona.body.velocity.x += impulsoSalto;

        impulsoSalto *= 0.85;


        // movimiento voz

        if (moverDerecha) {

            persona.body.velocity.x = 120;

            persona.scale.x = 2;

            persona.animations.play('derecha');
            if (persona.x >= destinoX) {

                moverDerecha = false;

                persona.body.velocity.x = 0;
            }

        }


        if (moverIzquierda) {

            persona.body.velocity.x = -120;

            persona.scale.x = -2;

            persona.animations.play('derecha');


            if (persona.x <= destinoX) {

                moverIzquierda = false;

                persona.body.velocity.x = 0;
            }

        }

        // =================================
        // ENEMIGO 1
        // =================================

        enemigo1.body.velocity.x =
            40 * direccionEnemigo1;

        if (enemigo1.x > 1200) {

            direccionEnemigo1 = -1;

            enemigo1.scale.x = -1.2;
        }

        if (enemigo1.x < 1000) {

            direccionEnemigo1 = 1;

            enemigo1.scale.x = 1.2;
        }


        // =================================
        // ENEMIGO 2
        // =================================

        enemigo2.body.velocity.x =
            40 * direccionEnemigo2;

        if (enemigo2.x > 720) {

            direccionEnemigo2 = -1;

            enemigo2.scale.x = -1.2;
        }

        if (enemigo2.x < 560) {

            direccionEnemigo2 = 1;

            enemigo2.scale.x = 1.2;
        }


        // =================================
        // ENEMIGO 3
        // =================================

        enemigo3.body.velocity.x =
            40 * direccionEnemigo3;


        // limite derecha

        if (enemigo3.x > 620) {

            direccionEnemigo3 = -1;

            enemigo3.scale.x = -1.2;
        }

        if (enemigo3.x < 400) {

            direccionEnemigo3 = 1;

            enemigo3.scale.x = 1.2;
        }

        // Movimiento y animaciones
        if (teclaDerecha.isDown) {
            persona.body.velocity.x = 200;
            //  persona.position.x += 2;
            persona.animations.play('derecha');
            persona.scale.x = 2;
        }
        else if (teclaIzquierda.isDown) {
            persona.body.velocity.x = -200;
            // persona.position.x -= 2;
            persona.animations.play('derecha');
            persona.scale.x = -2;
        }
        /*  else {
             persona.animations.stop();
         } */

        else if (
            !moverDerecha &&
            !moverIzquierda
        ) {

            persona.animations.stop();
        }

        // if (teclaSalto.isDown && persona.body.touching.down) {
        if (teclaSalto.isDown && (persona.body.touching.down || persona.body.blocked.down)) {
            persona.body.velocity.y = -450;
            persona.animations.play('saltar');
        }

        // disparar

        if (teclaDisparo.justDown) {

            dispararPiedra();
        }





        if (persona.y > 500) {

            persona.kill();

            fondoVictoria.visible = true;

            textoGameOver.visible = true;

            botonReintentar.visible = true;

            botonMenu.visible = true;
        }




    }



};


function reiniciarNivel2() {
    if (reconocimiento) {
        reconocimiento.stop();
    }


    detenerMusicas();

    juego.state.start('nivel2');
}


function volverNivel1() {

    if (reconocimiento) {
        reconocimiento.stop();
    }
    detenerMusicas();

    juego.state.start('principal');
}
function perderJuego() {

    if (juegoTerminado) {
        return;
    }

    juegoTerminado = true;

    persona.body.enable = false;

    persona.kill();

    if (musicaJuego) {

        musicaJuego.stop();
    }


    sonidoGameOver.play();
    textoGameOver.visible = true;

    botonReintentar.visible = true;

    botonMenu.visible = true;
}

function dispararPiedra() {
    if (juegoTerminado) {
        return;
    }
    var piedra = disparos.create(

        persona.x,

        persona.y,

        'tiles',

        9
    );

    piedra.scale.setTo(1.5);

    piedra.body.allowGravity = false;


    // direccion

    if (persona.scale.x > 0) {

        piedra.body.velocity.x = 300;

    } else {

        piedra.body.velocity.x = -300;
    }
}

function destruirEnemigo(enemigo, piedra) {

    /*     piedra.kill();
    
        enemigo.kill(); */
    if (juegoTerminado) {
        return;
    }

    sonidoImpacto.play();
    crearImpacto(
        enemigo.x + enemigo.width / 2,

        enemigo.y + enemigo.height / 2
    );

    piedra.kill();

    enemigo.tint = 0xff0000;

    juego.time.events.add(
        100,
        function () {
            enemigo.kill();
        },
        this
    );




    enemigosEliminados++;
    textoEnemigos.text =

        'Españoles derrotados: ' +

        enemigosEliminados +

        '/3';

    // ganar juego

    if (enemigosEliminados >= 3) {

        if (musicaJuego) {

            musicaJuego.stop();
        }

        sonidoVictoria.play();
        juegoTerminado = true;
        fondoVictoria.visible = true;

        textoVictoria.text =
            '¡JUEGO COMPLETADO!';

        textoVictoria.visible = true;

        botonMenu.visible = true;
    }
}


function destruirDisparo(disparo, plataforma) {

    disparo.kill();
}

function crearImpacto(x, y) {

    var impacto = juego.add.sprite(

        x,

        y,

        'impacto'
    );

    impacto.anchor.setTo(0.5);

    impacto.scale.setTo(1.5);

    juego.add.tween(

        impacto.scale

    ).to(

        { x: 1, y: 1 },

        100,

        Phaser.Easing.Linear.None,

        true

    );

    juego.time.events.add(

        200,

        function () {

            impacto.destroy();

        },

        this
    );
}





var estadoMenu = {

    preload: function () {
        juego.load.image(

            'menu',

            'img/portadaSinTitulo.png'
        );
        juego.load.image(

            'logoInkarri',

            'img/inkarriTitulo.png'
        );




        juego.load.image(
            'botonJugar',
            'img/botonJugar.png'
        );


        juego.load.image(

            'botonInstruccion',

            'img/botonInstruccion.png'
        );




        juego.load.spritesheet(

            'personas',

            'img/personajeInca.png',

            24,

            48
        );

        juego.load.spritesheet(

            'tiles',

            'img/tileset.png',

            16,

            16
        );
        juego.load.audio(

            'musicaMenu',

            'audio/audioPortada.mp3'
        );




    },

    create: function () {
        fondoMenu = juego.add.sprite(

            0,
            0,

            'menu'
        );
        fondoMenu.scale.setTo(4);

        var logo = juego.add.sprite(

            640,

            143,

            'logoInkarri'
        );
        logo.anchor.setTo(0.5);
        logo.scale.setTo(4);

        /* juego.add.tween(logo.scale)
        .to(
              {
                x:4.04,
                y:4.04
            },
            3000,
            Phaser.Easing.Sinusoidal.InOut,
            true,
            0,
            -1,
            true
        ); */




        musicaMenu = juego.add.audio(

            'musicaMenu'
        );


        musicaMenu.loop = true;


        musicaMenu.volume = 0.2;


        musicaMenu.play();

        var inca = juego.add.sprite(

            160,
            225,

            'personas'
        );

        inca.scale.setTo(4);

        inca.animations.add(

            'caminar',

            [0, 1, 2],

            5,

            true
        );
        inca.animations.play(

            'caminar'
        );

        // Escalera izquierda

        for (var y = 0; y < 4; y++) {

            for (var x = 0; x < (y + 1) * 4; x++) {

                juego.add.sprite(

                    x * 32,

                    385 + (y * 32),

                    'tiles', 11



                ).scale.setTo(2);
            }
        }


        // Escalera derecha

        for (var y = 0; y < 4; y++) {

            for (var x = 0; x < (y + 1) * 4; x++) {

                juego.add.sprite(

                    1280 - ((y + 1) * 4 * 32) + (x * 32),

                    385 + (y * 32),

                    'tiles', 11



                ).scale.setTo(2);
            }
        }

        // Plataforma central

        // Plataforma central

        for (var x = 14; x < 26; x++) {

            juego.add.sprite(

                x * 32,

                448,

                'tiles', 2



            ).scale.setTo(2);

        }


        for (var x = 0; x < 3; x++) {

            juego.add.sprite(

                40 + (x * 16),

                290
                ,

                'tiles',

                6

            ).scale.setTo(1);
        }


        for (var x = 0; x < 4; x++) {

            juego.add.sprite(

                1155 + (x * 16),

                330
                ,

                'tiles',

                6

            ).scale.setTo(1);
        }




        juego.add.sprite(
            55,
            275,
            'tiles',
            9
        ).scale.setTo(0.8);

        juego.add.sprite(
            60,
            270,
            'tiles',
            9
        ).scale.setTo(0.8);

        juego.add.sprite(
            65,
            275,
            'tiles',
            9
        ).scale.setTo(0.8);

        //piedras menu derecha
        juego.add.sprite(
            1175,
            315,
            'tiles',
            9
        ).scale.setTo(0.8);

        juego.add.sprite(
            1183,
            315,
            'tiles',
            9
        ).scale.setTo(0.8);

        juego.add.sprite(
            1190,
            315,
            'tiles',
            9
        ).scale.setTo(0.8);

        juego.add.sprite(
            1179,
            307,
            'tiles',
            9
        ).scale.setTo(0.8);

        juego.add.sprite(
            1187,
            307,
            'tiles',
            9
        ).scale.setTo(0.8);

        /* juego.add.sprite(
            1184,
            300,
            'tiles',
            9
        ).scale.setTo(0.8); */



        /* 
                var jugar = juego.add.text(
        
                    560,
                    290,
        
                    'JUGAR',
        
                    {
        
                        font: '40px Arial',
        
                        fill: '#f4d35e',
                        stroke: '#3b2200',
        
                        strokeThickness: 6
                    }
                ); */
        /* var fondoBoton = juego.add.graphics(0,0);
        
        fondoBoton.beginFill(0x5a2d0c);
        fondoBoton.drawRoundedRect(
            500,
            270,
            220,
            70,
            20
        );
        fondoBoton.endFill(); */
        /* 
        var jugar = juego.add.text(
        
            610,
            305,
        
            'JUGAR',
        
            {
                font:'40px Arial',
                fill:'#f4d35e'
            }
        );
         */
        var botonJugar = juego.add.sprite(

            640,

            300,

            'botonJugar'
        );

        botonJugar.anchor.setTo(0.5);
        botonJugar.scale.setTo(1.5);
        juego.add.tween(botonJugar.scale)
            .to(
                {
                    x: 1.6,
                    y: 1.6
                },
                2000,
                Phaser.Easing.Sinusoidal.InOut,
                true,
                0,
                -1,
                true
            );





        botonJugar.inputEnabled = true;

        botonJugar.events.onInputDown.add(

            iniciarJuego,

            this
        );


        var botonInstrucciones = juego.add.sprite(

            640,

            384,

            'botonInstruccion'
        );
        botonInstrucciones.scale.setTo(1.5);


        botonInstrucciones.anchor.setTo(0.5);

        juego.add.tween(botonInstrucciones.scale)
            .to(
                {
                    x: 1.55,
                    y: 1.55
                },
                2000,
                Phaser.Easing.Sinusoidal.InOut,
                true,
                0,
                -1,
                true
            );

        botonInstrucciones.inputEnabled = true;

        botonInstrucciones.events.onInputDown.add(

            abrirInstrucciones,

            this
        );















        /* 
        jugar.anchor.setTo(0.5);
        
        
        
        
        
                jugar.inputEnabled = true;
        
                jugar.events.onInputDown.add(
        
                    iniciarJuego,
        
                    this
                ); */




        // =================================
        // SUELO SUPERIOR
        // =================================

        /*       for (var i = 0; i < 80; i++) {
      
                  juego.add.sprite(
      
                      i * 16,
      
                      432,
      
                      'tiles',
      
                      6
                  );
              } */




        // RELLENO TIERRA
        // =================================

        /*  for (var y = 448; y < 480; y += 16) {
 
             for (var x = 0; x < 1280; x += 16) {
 
                 juego.add.sprite(
 
                     x,
 
                     y,
 
                     'tiles',
 
                     12
                 );
             }
         } */



        //acá termina el create
    },


    update: function () {



    }
};





var textoCompleto;

var textoActual = '';

var indiceTexto = 0;

var textoHistoria;

var botonComenzar;




var estadoHistoria = {


    preload: function () {

        juego.load.audio(

            'musicaHistoria',

            'audio/introAudio.mp3'
        );
    },








    create: function () {

        detenerMusicas();

        juego.stage.backgroundColor = '#000000';


        musicaHistoria = juego.add.audio(

            'musicaHistoria'
        );


        musicaHistoria.loop = true;


        musicaHistoria.volume = 0.2;


        musicaHistoria.play();


        textoCompleto =

            'Tras la llegada de los españoles...\n\n' +

            'El Tahuantinsuyo cayó.\n' +

            'Los templos fueron destruidos.\n' +
            'Y el pueblo inca perdió su libertad.\n\n' +
            'Pero una antigua profecía aún vive....\n' +

            'Cuando el imperio necesite un defensor....\n\n' +

            'INKARRI despertará.';

        textoHistoria = juego.add.text(

            630,

            50,

            '',

            {

                font: '30px Arial',

                fill: '#ffffff',

                align: 'center',
                boundsAlignH: 'center',


                wordWrap: true,

                wordWrapWidth: 700
            }
        );



        textoHistoria.anchor.setTo(0.5, 0);

        botonComenzar = juego.add.text(

            1000,

            450,

            'EMPEZAR',

            {
                font: '40px Arial',

                fill: '#ffffff'
            }
        );


        botonComenzar.anchor.setTo(0.5);


        botonComenzar.alpha = 0;


        botonComenzar.inputEnabled = true;


        botonComenzar.events.onInputDown.add(

            comenzarJuego,

            this
        );

    },

    update: function () {

        if (indiceTexto < textoCompleto.length) {

            textoActual +=

                textoCompleto.charAt(indiceTexto);


            textoHistoria.text = textoActual;


            indiceTexto++;
        }


        else {

            botonComenzar.alpha = 1;
        }



    }
};

var estadoInstrucciones = {

    create: function () {

        juego.stage.backgroundColor = '#000000';



        var titulo = juego.add.text(

            640,

            65,

            'INSTRUCCIONES',

            {

                font: '40px Arial',

                fill: '#ffff00'
            }
        );

        titulo.anchor.setTo(0.5);



        var texto = juego.add.text(

            640,

            230,

            'Comandos de voz:\n\n' +

            'Hacia la derecha: "Derecha" o "Avanza"\n' +

            'Hacia la izquierda: "Izquierda" o "Atrás"\n' +

            'Saltar:  "Salta"\n' +

            'Lanzar piedra: "Dispara"\n' +

            'Detenerse: "Alto"',

            {

                font: '28px Arial',

                fill: '#ffffff',

                align: 'center'
            }
        );

        texto.anchor.setTo(0.5);



        var volver = juego.add.text(

            640,

            415,

            'VOLVER',

            {

                font: '32px Arial',

                fill: '#ffffff'
            }
        );

        volver.anchor.setTo(0.5);

        volver.inputEnabled = true;

        volver.events.onInputDown.add(

            volverMenu,

            this
        );

    }

};







// Iniciar el estado
juego.state.add('menu', estadoMenu
);
juego.state.add(

    'historia',

    estadoHistoria
);

juego.state.add(

    'instrucciones',

    estadoInstrucciones
);

juego.state.add('principal', estadoPrincipal);
juego.state.add('nivel2', estadoNivel2);



//juego.state.start('principal');
juego.state.start('menu');

function detenerMusicas() {

    if (musicaMenu) {
        musicaMenu.stop();
    }

    if (musicaHistoria) {
        musicaHistoria.stop();
    }

    if (musicaJuego) {
        musicaJuego.stop();
    }
}




function iniciarJuego() {
    detenerMusicas();
    if (reconocimiento) {
        reconocimiento.stop();
    }

    juego.state.start('historia');

    //juego.state.start('historia');
}


function comenzarJuego() {
    detenerMusicas();
    // juego.state.start('principal');
    if (reconocimiento) {
        reconocimiento.stop();
    }

    juego.state.start('principal');


}

function abrirInstrucciones() {
    if (reconocimiento) {
        reconocimiento.stop();
    }



    juego.state.start(

        'instrucciones'
    );
}

function volverMenu() {
    if (reconocimiento) {
        reconocimiento.stop();
    }

    detenerMusicas();
    juego.state.start(

        'menu'
    );
}