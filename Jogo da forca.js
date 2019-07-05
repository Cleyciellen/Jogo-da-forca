window.onload = function () {

  var alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categoria;         
  var escolherCategoria;     
  var getDica ;          
  var palavra ;              
  var guess ;             
  var geusses = [ ];      
  var vidas ;             
  var contador ;           
  var espaco;             

  
  var mostrarVidass = document.getElementById("minhasvidas");
  var showCategoria = document.getElementById("scatagory");
  var getDica = document.getElementById("dica");
  var showPista = document.getElementById("pista");



  
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letras = document.createElement('ul');

    for (var i = 0; i < alfabeto.length; i++) {
      letras.id = 'alfabeto';
      list = document.createElement('li');
      list.id = 'letra';
      list.innerHTML = alfabeto[i];
      check();
      myButtons.appendChild(letras);
      letras.appendChild(list);
    }
  }
  
  
  /*Referencia- https://codepen.io/cathydutton/pen/ldazc*/
    
  
  
  var selectCat = function () {
    if (escolherCategoria === categoria[0]) {
      categoriaNome.innerHTML = "Escolher a categoria salgados";
    } else if (escolherCategoria === categoria[1]) {
      categoriaNome.innerHTML = "Escolher a categoria frutas";
    } else if (escolherCategoria === categoria[2]) {
      categoriaNome.innerHTML = "Escolher a categoria Anime";
    }
  }

  
   result = function () {
    palavraHolder = document.getElementById('hold');
    correto = document.createElement('ul');

    for (var i = 0; i < palavra.length; i++) {
      correto.setAttribute('id', 'minha-palavra');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (palavra[i] === "-") {
        guess.innerHTML = "-";
        espaco = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      palavraHolder.appendChild(correto);
      correto.appendChild(guess);
    }
  }
  
  
   comments = function () {
    showVidas.innerHTML = "Voce tem " + vidas + " vidas";
    if (vidas < 1) {
      showVidas.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (contador + espaco === geusses.length) {
        showVidas.innerHTML = "Voce ganhou!";
      }
    }
  }

      
  var animate = function () {
    var meDesenhar = vidas ;
    drawArray[meDesenhar]();
  }

  
  
  canvas =  function(){

    meuBoneco = document.getElementById("boneco");
    context = meuBoneco.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      meuBoneco = document.getElementById("boneco");
      context = meuBoneco.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
   drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];  


  
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < palavra.length; i++) {
        if (palavra[i] === geuss) {
          geusses[i].innerHTML = geuss;
          contador += 1;
        } 
      }
      var j = (palavra.indexOf(geuss));
      if (j === -1) {
        vidas -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  
  play = function () {
    categoria = [
        ["coxinha,salgado"],
        ["maçã.uva.acerola"],
        ["Naruto, Noragami"]
    ];

    escolherCategoria = categoria[Math.floor(Math.random() * categoria.length)];
    palavras = escolherCategoria[Math.floor(Math.random() * escolherCategoria.length)];
    palavras = palavras.replace(/\s/g, "-");
    console.log(palavras);
    buttons();

    geusses = [ ];
    vidas = 10;
    contador = 0;
    espaco = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();
  
  

    dica.onclick = function() {

      dicas = [
        ["bolinho de massa recheado com frango, bolo de massa"],
        ["conhecida por ser usada em tortas nos contos de fada, não é cabelo mas tem cachos, parece um tomate pequeno"],
        ["Datebaio, deus nascido na guerra"]
    ];

    var categoriaIndex = categoria.indexOf(escolherCategoria);
    var dicaIndex = escolherCategoria.indexOf(palavra);
    showPista.innerHTML = "Pista: - " +  dica [categoriaIndex][dicaIndex];
  };



  document.getElementById('reset').onclick = function() {
    correto.parentNode.removeChild(correto);
    letras.parentNode.removeChild(letras);
    showPista.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}
