from rest_framework import serializers
from .models import Usuario, Mensagem

class MensagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensagem
        fields = ['id', 'conteudo', 'data_envio', 'usuario']

class UsuarioSerializer(serializers.ModelSerializer):
    mensagem = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'nome_usuario', 'email_usuario', 'telefone_usuario', 'data_cadastro', 'mensagem']

    def create(self, validated_data):
        mensagem_conteudo = validated_data.pop('mensagem', None)
        usuario = Usuario.objects.create(**validated_data)

        if mensagem_conteudo:
            Mensagem.objects.create(usuario=usuario, conteudo=mensagem_conteudo)

        return usuario
