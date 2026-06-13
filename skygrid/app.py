from flask import Flask, render_template, request, jsonify
import os

template_dir = os.path.abspath('templates')
static_dir = os.path.abspath('static')

app = Flask(
    __name__,
    template_folder=template_dir,
    static_folder=static_dir
)

# Store inquiries (use a database in production)
inquiries = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit-inquiry', methods=['POST'])
def submit_inquiry():
    data = request.get_json()
    inquiries.append(data)
    print(f"New Inquiry from: {data.get('name')} — {data.get('projectType')}")
    return jsonify({'success': True, 'message': 'Inquiry received!'})

if __name__ == '__main__':
    app.run(debug=True)
