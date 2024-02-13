from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NODES = [
    {
        "_id": "8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5",
        "type": "PromptNode",
        "start": True,
        "config": {
            "text": "Das ist ein Test"
        },
        "outputs": ["f4db9b1a-dce2-4060-892f-ff0b2892d730"],
        "answers": [
            {
                "id": 4,
                "text": "Ja"
            },
            {
                "id": 3,
                "text": "Nein"
            }
        ]
    },
    {
        "_id": "f4db9b1a-dce2-4060-892f-ff0b2892d730",
        "type": "PromptNode",
        "config": {
            "text": "Das ist ein Test 2"
        },
        "outputs": [],
        "answers": [
            {
                "id": 1,
                "text": "Ja"
            },
            {
                "id": 2,
                "text": "Nein"
            }
        ],
    }
]


@app.route('/process', methods=['GET'])
def api():
    return jsonify(NODES)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
