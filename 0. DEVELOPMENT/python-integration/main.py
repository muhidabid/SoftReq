from bottle import route, run, template,static_file,error,request

import json

@route("/")
def index_page():
	return static_file("editor.component.html", root = "../client-angular/src/app/project/editor")



def splitdata(data):
	seprated = data.split()
	finaldata = {}
	for i in seprated:
		if finaldata.get(i):
			finaldata[i] = finaldata.get(i)+1
		else:
			finaldata[i] = 1	
	return finaldata

def setreturn(splitreturn):
	k = []
	a = splitreturn.keys()
	for i in a:
		k.append({"tag":i,"value":splitreturn[i]})
	return k 

@route("/countword",method="POST")
def posted_words():
	if request.method ==  "POST":
		textdata =  json.loads(request.body.read())
		splitreturn = splitdata(textdata["data"])
		finalresponse = setreturn(splitreturn)
		return  json.dumps(finalresponse)

# @route("/getUserStories", method="GET")
# def readData():
#     text_data = this.userstories = this._userstoriesservice.getUserStories();

@route('<filename:path>')
def static_content(filename):
	return static_file(filename,root="staticfiles")



@error(404)
def mistake404(code):
    return 'Sorry, this page does not exist!'



run(host='localhost', port=8000,debug=True)