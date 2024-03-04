from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .logicalChat import get_response
import json

def index(request):
    return JsonResponse({"message": "¡Bienvenido a la página de inicio!"})
@csrf_exempt 
def recibirMensaje(request):
  if request.method=='POST':
    datos= json.loads(request.body)
    mensaje=datos.get('mensaje')
    respuesta=get_response(mensaje['texto'])
    print(respuesta)
    return JsonResponse({"mensaje":respuesta})
  else:
    return JsonResponse({"error":"error al obtener el emsaje"})