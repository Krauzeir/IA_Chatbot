from robo import *
from flask import Flask

VERSAO = "0.1"

robo = ChatBot("Robô de Atendimento da MySalesHub",
    read_only=True,
    statement_comparison_fuction= comparar_mensagens,
    response_selection_method= selecionar_resposta,      
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
        }      
    ])


servico_robo = Flask(__name__)

@servico_robo.route("/versao", methods=["GET"])
def get_verso():
    return VERSAO

@servico_robo.route("/resposta/<mensagem>", methods=["GET"])
def get_resposta(mensagem):
    resposta = robo.get_response(mensagem)
    
    return resposta.text

if __name__ == '__main__':
    servico_robo.run()
    