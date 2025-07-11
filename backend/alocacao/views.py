from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Alocacao
from .serializers import AlocacaoSerializer

class AlocacaoViewSet(viewsets.ModelViewSet):
    queryset = Alocacao.objects.all()
    serializer_class = AlocacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
