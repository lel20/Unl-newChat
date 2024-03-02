from transformers import BertForQuestionAnswering, BertTokenizerFast 
import torch
import requests
import json
import re
# Importar el modelo
modelo= '/home/leo/Documentos/Linux/Proyecto/ChatbotBackend/Agente/BERT-Preguntas-Respuestas-Posgrados'
#se carga el modelo entrenado para la predicción
model_preentrenado = BertForQuestionAnswering.from_pretrained(modelo)
#transforma las entradas en tokens numéricos
tokenizador = BertTokenizerFast.from_pretrained(modelo)
#establece si se tRabaja con CPU o GPU
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model_preentrenado = model_preentrenado.to(device)
def get_prediction(contexto, pregunta):
  #se toqueniza las preguntas y el contexto
  entradas = tokenizador.encode_plus(pregunta, contexto, return_tensors='pt').to(device)
  salida = model_preentrenado(**entradas)
  #se calcula el inicio y final de la respuesta  que el modelo predice
  inicio_respuesta = torch.argmax(salida[0])  
  final_respuesta = torch.argmax(salida[1]) + 1 
  #almacena el inicio-final de la respueta que el modelo predice 
  respuesta = tokenizador.convert_tokens_to_string(tokenizador.convert_ids_to_tokens(entradas['input_ids'][0][inicio_respuesta:final_respuesta]))
  return respuesta
def normalize_text(s):
  import string
  def white_space_fix(text):
    return " ".join(text.split())
  def remove_punc(text):
    exclude = set(string.punctuation)
    return "".join(ch for ch in text if ch not in exclude)
  def lower(text):
    return text.lower()

  return white_space_fix(remove_punc(lower(s)))

def exact_match(prediction, truth):
    return bool(normalize_text(prediction) == normalize_text(truth))

def compute_f1(prediction, truth):
  pred_tokens = normalize_text(prediction).split()
  truth_tokens = normalize_text(truth).split()
  
  
  if len(pred_tokens) == 0 or len(truth_tokens) == 0:
    return int(pred_tokens == truth_tokens)
  
  common_tokens = set(pred_tokens) & set(truth_tokens)
  
  if len(common_tokens) == 0:
    return 0

  prec = len(common_tokens) / len(pred_tokens)
  rec = len(common_tokens) / len(truth_tokens)
  
  return round(2 * (prec * rec) / (prec + rec), 2)
def get_response(pregunta):
    contexto='''Su interés para llegar a la fama surgió de tener un papel secundario en la película My Little Girl. En 1991, obtuvo su primer trabajo como bailarina y en 1993 decidió dedicarse a la actuación. Obtuvo su primer papel como protagonista en la película Selena, con el que ganó más de un millón de dólares y además fue nominada al Globo de Oro como mejor actriz. También protagonizó la primera entrega de la serie cinematográfica Anaconda (1997). Al año siguiente, con la película Out of Sight (1998), logró cobrar dos millones de dólares3​ y además realizó una de las mejores actuaciones de su carrera. En 1999, debutó como cantante con su sencillo If You Had My Love que fue número uno en Billboard Hot 100 y con su álbum On the 6 (1999), gozando de gran éxito en el mercado internacional.4​

Con el lanzamiento simultáneo de su segundo álbum de estudio, J.Lo, y su película The Wedding Planner en 2001, Lopez se convirtió en la primera persona en tener el puesto número uno en la música y en el cine, en la misma semana, Récord Guinness que nadie le ha quitado. Su álbum de remezclas de 2002, J to tha L-O!: The Remixes, se convirtió en el primero en la historia en debutar en el número uno en el Billboard 200, e incluye el sencillo número uno Ain't It Funny (Murder Remix). Más tarde ese año, lanzó su tercer álbum de estudio, This Is Me... Then, que contiene los sencillos Jenny from the Block y All I Have, y lanzó su película Sucedió en Manhattan (2002) que gozó un gran éxito en taquilla.'''
    prediction = get_prediction(contexto,pregunta)   
    return prediction
  