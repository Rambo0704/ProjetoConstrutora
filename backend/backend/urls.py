from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from produtos.views import ProdutoViewSet
from cadastro.views import UsuarioViewSet, MensagemViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'mensagens', MensagemViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)