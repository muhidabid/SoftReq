# importing files
# import os
# os.system("text-cleaner.py")
from text_cleaner import *
# using flask_restful
from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
import copy

# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class Hello(Resource):
 	# corresponds to the GET request.
	# this function is called whenever there is a GET request for this resource
	# GET request sends data Flask -> React
	def get(self):
		#-----Do stuff on story here:
		# cleanedStory = cleaner(self.story)
		# return {'cleanedStory': [cleanedStory]}
		# return {'message': ['hi', 'bye']}
		# return make_response(jsonify(self.story), 200)
		print('Sending:\t', '\nReceived messsage from GET\n')
		return '\nReceived messsage from GET\n'

	# Corresponds to POST request
	# This is a request to accept data
	# POST request receives data React -> Flask
	def post(self):
		data = request.get_json()	 # status code
		print('\nData received by POST: ', data['name'])
		return make_response(jsonify(data), 200)


# # another resource to calculate the square of a number
# class Square(Resource):
# 	def get(self, num):
# 		return jsonify({'square': num**2})


# adding the defined resources along with their corresponding urls
api.add_resource(Hello, '/hello', methods=['GET', 'POST'])
# api.add_resource(Square, '/square/<int:num>')


# driver function
if __name__ == '__main__':

	app.run(debug = True)