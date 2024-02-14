import base64
from datetime import datetime
from enum import Enum

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

answerId = 5


class NodeTypes(Enum):
    PromptNode = "PromptNode"
    SignatureNode = "SignatureNode"


NODES = [
    {
        "_id": "8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5",
        "type": NodeTypes.SignatureNode.value,
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
        "type": NodeTypes.PromptNode.value,
        "config": {
            "text": "Das ist ein Test 2"
        },
        "outputs": ["f4db9b1a-dce2-4060-892f-ff0b2892d731"],
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
    },
    {
        "_id": "f4db9b1a-dce2-4060-892f-ff0b2892d731",
        "type": NodeTypes.SignatureNode.value,
        "config": {
            "text": "Das ist ein Test 3 (signature)"
        },
        "outputs": [],
        "answers": [],
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
        new_answer['id'] = answerId
        answerId += 1

        if node['_id'] == node_id:
            if node['type'] == NodeTypes.SignatureNode.value:
                saveImgAnswer(new_answer, node)
            else:
                saveTextAnswer(new_answer, node)
            return jsonify(new_answer), 201
    return jsonify({'error': 'Node not found'}), 404


def saveTextAnswer(new_answer, node):
    node['answers'].append(new_answer)


def saveImgAnswer(new_answer, node):
    filename = f"signature_{node['_id']}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
    img_data = new_answer['text'].split(',')[1]
    filePath = f"static/images/{filename}"
    with open(filePath, "wb") as fh:
        fh.write(base64.b64decode(img_data))
    new_answer['text'] = filename
    node['answers'].append(new_answer)


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
