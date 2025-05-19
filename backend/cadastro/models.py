from django.db import models

class Usuario(models.Model):
    nome_usuario = models.CharField(max_length=100)
    email_usuario = models.EmailField(unique=True)
    telefone_usuario = models.CharField(max_length=15)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.nome_usuario

class Mensagem(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="mensagens") ##chave estrangeira,que conecta mensagem a usuario
    conteudo = models.TextField()
    data_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mensagem de {self.usuario.nome_usuario}"
