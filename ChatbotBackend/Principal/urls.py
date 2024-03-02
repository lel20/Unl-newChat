from django.contrib import admin
from django.urls import path
from Agente.views import recibirMensaje, index

urlpatterns = [
     path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('pregunta/', recibirMensaje, name='recibirMensaje')
]

