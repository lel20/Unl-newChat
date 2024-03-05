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
    contexto='''Los aspirantes que desean inscribirse en un programa de posgrado deberán presentar la siguiente información. Solicitud de admisión al programa de posgrado dirigida al Decano/a de la Facultad que corresponda o al Director/a de la Unidad de Educación a Distancia, Copia simple del título de tercer nivel o de grado debidamente registrado por el SENESCYT; en caso de que el título de grado sea obtenido en el exterior presentarlo debidamente apostillado o legalizado por vía consular, Documentos personales: cédula de ciudadanía y certificado de votación actualizados, Nivel de dominio de lengua diferente a la materna al menos a nivel B2 tomando como referencia el Marco Común Europeo para lenguas si el proyecto curricular del programa de posgrado lo establece, Hoja de vida donde conste: formación y experiencia profesional, Récord académico del nivel de grado, Carta donde argumente las razones por las que quiere estudiar y/o investigar en el programa de posgrado, Ensayo en temas relacionados con el posgrado para la maestría académica con trayectoria de investigación.'''
    prediction = get_prediction(contexto,pregunta)   
    return prediction
  