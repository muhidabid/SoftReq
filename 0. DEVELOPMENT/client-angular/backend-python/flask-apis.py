from flask import Flask, jsonify, request
# from scikitOneVRest import *
from BinaryClassifierLG import *
from ambiguityKeywordMatching import *
import json

app = Flask(__name__)

from flask_cors import CORS, cross_origin

# cors = CORS(app, resources={r"/*": {"origins":"*"}})
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/extract_ambiguity", methods=['POST'])
def extract_ambiguity():
  # Debug prints

  print("request:")
  print(request)

  print("request.form.get('req'):")
  print(request.form.get('req'))

  json_data = request.get_json()
  reqArr = json_data['req']

  print("Req arr:")
  print(reqArr)

  x = AmbguityDetector()

  result = dict()

  result[reqArr[0]] = list(x.sentence_ambiguity(reqArr[0]))

  print("result: ")
  print(result)

  return json.dumps(result)

@app.route("/extract_quality", methods=['POST'])
def extract_quality():
  # Debug prints

  print("request:")
  print(request)

  print("request.form.get('req'):")
  print(request.form.get('req'))

  json_data = request.get_json()
  reqArr = json_data['req']

  print("Req arr:")
  print(reqArr)
  # req = request.form.get('req')
  # print("Req param: ")
  # print(req)
  # req = "The look and feel of the page should be nice."
  x = BinaryClassifierLG()
  # x = OneVR_LG()
  result = dict()

  result[reqArr[0]] = list(x.predict(reqArr[0]))
  # for req in reqArr:
  #   result[req] = list(x.predict(req))

  print("result: ")
  print(result)

  return json.dumps(result)
  # return list(result)
  # return "<p>Hello, extractor!</p>"

app.run()
