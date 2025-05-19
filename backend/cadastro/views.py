from rest_framework import viewsets
from .models import Usuario, Mensagem
from .serializers import UsuarioSerializer, MensagemSerializer
from .emails import enviar_email_automatico

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        novo_usuario = serializer.save()
        enviar_email_automatico(novo_usuario.email_usuario)

class MensagemViewSet(viewsets.ModelViewSet):
    queryset = Mensagem.objects.all()
    serializer_class = MensagemSerializer

    def perform_create(self, serializer):
        serializer.save()
