from flask import Flask, render_template

# create new object
app = Flask(__name__)

# how does flask handle requests
# specifying a route using declarator (here, route is "/")
@app.route("/") 
# making a ftn
# def hello():
#     return "Hello Person"

def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
