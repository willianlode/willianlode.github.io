
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
        pergunta.insertAdjacentHTML("beforeend","<span><p>Quantos XP você já tem?</p><input type='text' name='input' id='xpInput'><button id='submitXP'>Confirmar</button><div id='nivelHeroi'></div></span>");
        xpButton=document.getElementById("submitXP");
        xpButton.addEventListener("click", concatXP);
    }
    function concatXP(){
        var xpInput=parseInt(document.getElementById("xpInput").value);
        xpButton.remove();
        dadosHeroi.xp=xpInput;
        switch (true) {
            case xpInput <= 1000:
                nivel = "Ferro";
                break;
            case xpInput >= 1001 && xpInput <= 2000:
                nivel = "Bronze";
                break;
            case xpInput >= 2001 && xpInput <= 5000:
                nivel = "Prata";
                break;
            case xpInput >= 5001 && xpInput <= 7000:
                nivel = "Ouro";
                break;
            case xpInput >= 7001 && xpInput <= 8000:
                nivel = "Platina";
                break;
            case xpInput >= 8001 && xpInput <= 9000:
                nivel = "Ascendente";
                break;
            case xpInput >= 9001 && xpInput <= 10000:
                nivel = "Imortal";
                break;
            default:
                nivel = "Radiante";
        }
        pergunta.insertAdjacentHTML("beforeend","<span><p>Parabéns, você já tem: " + dadosHeroi.xp + " XP points! Você está no nível " + nivel + "</p></span>");
        
    }
    submeter();