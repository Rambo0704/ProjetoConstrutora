

from rest_framework import viewsets

from rest_framework.permissions import IsAdminUser, AllowAny 
from .models import Produto

from cadastro.serializers import ProdutoSerializer 

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    
    def get_permissions(self):

        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny] 
        else:
            permission_classes = [IsAdminUser]
        
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(dono_produto=self.request.user)