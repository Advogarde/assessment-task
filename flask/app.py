from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

answerId = 5

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


@app.route('/api/answers/<node_id>', methods=['POST'])
def add_answer(node_id):
    global answerId

    new_answer = request.json
    for node in NODES:
        if node['_id'] == node_id:
            new_answer['id'] = answerId
            node['answers'].append(new_answer)
            answerId += 1
            return jsonify(new_answer), 201
    return jsonify({'error': 'Node not found'}), 404


@app.route('/api/answers/<node_id>/<answer_id>', methods=['DELETE'])
def delete_answer(node_id, answer_id):
    for node in NODES:
        if node['_id'] == node_id:
            for answer in node['answers']:
                if answer['id'] == int(answer_id):
                    node['answers'].remove(answer)
                    return jsonify({'message': 'Answer deleted'}), 200

    return jsonify({'error': node_id}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
