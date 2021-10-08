from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/', methods=['GET'])
def index():
    #replace with any landing page
    return render_template('FR_landingPage.html'),200

@socketio.on('connect')
def test_connect():
    print("SOCKET CONNECTED")

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: '+ str(json))

#DTR Views
@app.route('/DTR/Facial-Recognition')
def dtr_face():
    return render_template('DTR_Face_Recognition.html'),200

@app.route('/DTR/QRCode-Scanner')
def dtr_qr():
    return render_template('DTR_QRCode_Scanner.html',
    fullname = "Employee's Name",
    link_name = "QRCode Scanner",
    dtr = "active",
    qr = "active"
    ),200

#DTR API's

if __name__ == "__main__":
	#app.run(debug=True, port=5000)
    #app.run()#for deployment
    socketio.run(app)
