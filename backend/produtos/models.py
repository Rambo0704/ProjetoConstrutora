from django.db import models
from django.contrib.auth.models import User
class Produto(models.Model):
    dono_produto = models.ForeignKey(User, on_delete=models.CASCADE, related_name="produtos")
    nome_produto = models.CharField(max_length=100)
    descricao_produto = models.TextField()
    preco_produto = models.DecimalField(max_digits=10,decimal_places=2)
    quantidade_estoque = models.IntegerField()
    imagem_produto_url = models.ImageField(upload_to='produtos_imagens/', blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.nome    
