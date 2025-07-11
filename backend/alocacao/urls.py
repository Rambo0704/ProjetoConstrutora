from rest_framework.routers import DefaultRouter
from .views import AlocacaoViewSet

router = DefaultRouter()
router.register(r'alocacoes', AlocacaoViewSet)

urlpatterns = router.urls
