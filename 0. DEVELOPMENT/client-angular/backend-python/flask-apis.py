from flask import Flask, jsonify, request
from scikitOneVRest import *
import json

app = Flask(__name__)

from flask_cors import CORS, cross_origin

# cors = CORS(app, resources={r"/*": {"origins":"*"}})
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/extract_quality", methods=['POST'])
def extract_quality():
  print("request:")
  print(request.form.get('req'))

  json_data = request.get_json()
  reqArr = json_data['req']
  print(json_data['req'])
  # req = request.form.get('req')
  # print("Req param: ")
  # print(req)
  # req = "The look and feel of the page should be nice."
  x = OneVR_LG()
  result = dict()
  for req in reqArr:
    result[req] = list(x.predict(req))

  print(result)

  return json.dumps(result)
  # return list(result)
  # return "<p>Hello, extractor!</p>"

app.run()
