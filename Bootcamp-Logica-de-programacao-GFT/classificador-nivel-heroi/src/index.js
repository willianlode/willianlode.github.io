
    let boaVinda=document.getElementById("hdr");
    var nome = document.getElementById("heroInput").name;
    var pergunta=document.getElementById("interacao");
    var isSubmitted=false;
    var dadosHeroi={nome:"herói", xp:0};
    var heroButton=document.getElementById("submitNome");
    var xpButton;
    var nivel;
    function submeter(){
        heroButton.addEventListener("click", concatNome);

    }
    /*.getElementById("heroInput").addEventListener("keyup", concatNome);*/
    function concatNome(){
        var nome=document.getElementById("heroInput").value;
        boaVinda.innerHTML="Bem-vindo, " + nome;
        dadosHeroi.nome=nome;
        heroButton.remove();
        pergunta.insertAdjacentHTML("beforeend","<p>Quantos XP você já tem?</p><input type='text' name='input' id='xpInput'><button id='submitXP'>Confirmar</button><div id='nivelHeroi'></div>");
        xpButton=document.getElementById("submitXP");
        xpButton.addEventListener("click", concatXP);
    }
    function concatXP(){
        var xp=parseInt(document.getElementById("xpInput").value);
        xpButton.remove();
        dadosHeroi.xp=xp;
        switch (true) {
            case xp <= 1000:
                nivel = "Ferro";
                break;
            case xp >= 1001 && xp <= 2000:
                nivel = "Bronze";
                break;
            case xp >= 2001 && xp <= 5000:
                nivel = "Prata";
                break;
            case xp >= 5001 && xp <= 7000:
                nivel = "Ouro";
                break;
            case xp >= 7001 && xp <= 8000:
                nivel = "Platina";
                break;
            case xp >= 8001 && xp <= 9000:
                nivel = "Ascendente";
                break;
            case xp >= 9001 && xp <= 10000:
                nivel = "Imortal";
                break;
            default:
                nivel = "Radiante";
        }
        document.getElementById("nivelHeroi").insertAdjacentHTML("beforeend","<p>Parabéns, você já tem: " + dadosHeroi.xp + " XP points! Você está no nível " + nivel);
        
    }
    submeter();