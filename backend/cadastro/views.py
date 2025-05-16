from rest_framework import generics
from .models import Usuario
from .serializers import UsuarioSerializer
from .emails import enviar_email_automatico

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        novo_usuario = serializer.save()  
        enviar_email_automatico(novo_usuario.email_usuario)
