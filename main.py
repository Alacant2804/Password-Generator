from flask import Flask, render_template, request, jsonify
import random
import string

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_password', methods=['POST'])
def generate_password():
    data = request.get_json()

    # Convert length from string to integer
    length = int(data.get('length'))

    include_uppercase = data.get('include_uppercase')
    include_lowercase = data.get('include_lowercase')
    include_numbers = data.get('include_numbers')
    include_symbols = data.get('include_symbols')

    characters = ''

    if include_uppercase:
        characters += string.ascii_uppercase
    if include_lowercase:
        characters += string.ascii_lowercase
    if include_numbers:
        characters += string.digits
    if include_symbols:
        characters += string.punctuation

    if characters:
        password = ''.join(random.choice(characters) for _ in range(length))
    else:
        password = ''

    return jsonify({'password': password})

if __name__ == '__main__':
    app.run(debug=True)

