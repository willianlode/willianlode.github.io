from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os

app = Flask(__name__)
# O CORS permite que o frontend em outro domínio faça requisições para esta API
CORS(app) 

# Credenciais do projeto no Supabase
SUPABASE_URL = "https://yafihnvptknhhqwnkbof.supabase.co"
SUPABASE_KEY = "sb_publishable_sNzRTAG04eCOxDUlHx4yWg_dF4B9p5I"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def pegar_ip_usuario():
    # Pega o IP real do usuário, em vez do proxy do PythonAnywhere
    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0].split(',')[0]
        return ip
    return request.remote_addr

@app.route('/adicionar', methods=['POST'])
def adicionar_registro():
    dados = request.json
    tipo_cliente = dados.get('tipo_cliente')
    valor = float(dados.get('valor'))
    # opcional adicionar cupom para calcular preço descontado
        #cupom = float(dados.get('cupom'))
        #valor=valor*(1-cupom/100)

    # O cálculo do cashback é feito no backend por práticas comuns de segurança
    cashback_pct=5
    if str.upper(tipo_cliente)=="VIP":
        cashback_pct=cashback_pct*1.1
    cashback_total = valor *cashback_pct/100
    if valor>500.0:
        cashback_total=cashback_total*2 
    ip = pegar_ip_usuario()
    
    # Inserção no Postgres via Supabase
    resposta = supabase.table('historico_consultas').insert({
        'ip_usuario': ip,
        'tipo_cliente': tipo_cliente,
        'valor': valor,
        'cashback': cashback_total
    }).execute()

    return jsonify({"mensagem": "Registrado com sucesso!", "cashback": cashback_total}), 201

@app.route('/historico', methods=['GET'])
def listar_historico():
    ip = pegar_ip_usuario()
    
    # Busca apenas os registros que pertencem ao IP que fez a requisição
    resposta = supabase.table('historico_consultas') \
        .select('*') \
        .eq('ip_usuario', ip) \
        .order('criado_em', desc=True) \
        .execute()
    
    return jsonify(resposta.data), 200

if __name__ == '__main__':
    app.run(debug=True)