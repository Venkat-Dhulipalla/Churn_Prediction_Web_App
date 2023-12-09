from flask import Flask, request, render_template, jsonify, send_from_directory
import utils

app = Flask(__name__)

@app.route('/',methods=['GET'])
def home():
    return render_template('main.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = {
            "creditscore": float(request.form['creditscore']),
            "age": float(request.form['age']),
            "tenure": float(request.form['tenure']),
            "balance": float(request.form['balance']),
            "estimatedsalary": float(request.form['estimatedsalary']),
            "numofproducts": float(request.form['numofproducts']),
            "hascrcard": int(request.form['hascrcard']),
            "isactivemember": int(request.form['isactivemember']),
            "geography": request.form['geography'],
            "gender": request.form['gender']
        }
        print(data)
        result = utils.predict_churn(data)
        return jsonify(result)

# Add a route for serving static files (e.g., script.js)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


if __name__ == "__main__":
    app.run()
