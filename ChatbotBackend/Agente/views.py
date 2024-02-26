from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
@csrf_exempt
def enviarMensaje(request):
  if request.method=='POST':
    datos= json.loads(request.body)
    mensaje=datos.get('mensaje')
    print(mensaje['mensaje'])
    return JsonResponse({"mensaje":mensaje})
  else:
    return JsonResponse({"error":"error al obtener el emsaje"})

