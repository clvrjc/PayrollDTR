from flask import Flask, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    #replace with any landing page
    return render_template('FR_landingPage.html', 
    fullname = "Employee's Name",
    link_name = "Facial Recognition",
    dtr = "active",
    face = "active"
    ),200

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
    app.run()#for deployment
