    let nome = document.getElementById("vitInput");
    let pergunta=document.getElementById("interacao");
    let calcButton=document.getElementById("submitData");
    let xpButton;
    let nivel;
    function submeter(){
        calcButton.addEventListener("click", imprimeResultado);

    }
    /*.getElementById("heroInput").addEventListener("keyup", concatNome);*/
   
    function imprimeResultado(){
        let vitorias=parseInt(document.getElementById("vitInput").value);
        let derrotas=parseInt(document.getElementById("derInput").value);
        let saldo=calcularSaldo(vitorias,derrotas);
        
        console.log(saldo);
        
        let nivel=classificarSaldo();
        console.log(nivel);
        if(nivel == "Inválido"){
            document.getElementById("calcResult").innerHTML="<p>O número de vitórias e derrotas deve ser maior ou igual a zero!</p>";
        }else{
            document.getElementById("calcResult").innerHTML=`<p>O herói tem saldo de ${saldo} está no nível ${nivel}</p>`;
        }
        
    }
    function calcularSaldo(vitorias, derrotas){
        
        let saldo
        
            if(vitorias<0 || isNaN(vitorias)){
                saldo="invalido";
            }else if(derrotas<0 || isNaN(derrotas)){
                saldo="invalido";
            }
            else{
                saldo=vitorias-derrotas;
            }   
        
        return saldo
    }
    function classificarSaldo(){
        let vitorias=parseInt(document.getElementById("vitInput").value);
        let derrotas=parseInt(document.getElementById("derInput").value);
        let saldo=calcularSaldo(vitorias, derrotas)
        let nivel;
        switch (true) {
            case saldo ==="invalido":
                nivel="Inválido";
                break;
            case saldo <= 10:
                nivel = "Ferro";
                break;
            case saldo >= 11 && saldo <= 20:
                nivel = "Bronze";
                break;
            case saldo >= 21 && saldo <= 50:
                nivel = "Prata";
                break;
            case saldo >= 51 && saldo <= 80:
                nivel = "Ouro";
                break;
            case saldo >= 81 && saldo <= 90:
                nivel = "Diamante";
                break;
            case saldo >= 91 && saldo <= 100:
                nivel = "Lendário";
                break;
            case saldo >= 101:
                nivel = "Imortal";
                break;
            }
        return nivel
        
        
    }
    submeter();