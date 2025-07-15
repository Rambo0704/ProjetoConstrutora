from django.db import models
from django.contrib.auth.models import User

class Alocacao(models.Model):
    nome_cliente = models.CharField(max_length=100)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    local = models.CharField(max_length=200)
    observacoes = models.TextField(blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alocacoes')
    imagem_alocacao = models.ImageField(upload_to='alocacao_imagens/', blank=True, null=True)
    def __str__(self):
        return f"{self.nome_cliente} ({self.local})"
