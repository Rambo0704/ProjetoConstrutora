from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, MensagemViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'mensagens', MensagemViewSet, basename='mensagem')

urlpatterns = [
    path('api/', include(router.urls)),
]
