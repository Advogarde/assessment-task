from flask import Blueprint, jsonify, request
from database import mycol
import base64
import os

routes = Blueprint('routes', __name__)

@routes.route('/process', methods=['GET'])
def process():
    y = mycol.find()
    result = [x for x in y]
    return jsonify(result)

@routes.route('/submit', methods=['POST'])
def submit():
    received_nodes = request.json
    print("Received answers:", received_nodes)
    
    for node in received_nodes:
        node_id = node.get('_id')
        if node_id:
            mycol.update_one({'_id': node_id}, {'$set': node}, upsert=True)
    
    return jsonify({"message": "Answers received and stored successfully"}), 200

@routes.route('/update-node/<node_id>', methods=['POST'])
def update_node(node_id):
    updated_node = request.json  
    myquery = { "_id": node_id }
    newvalues = {'$set': updated_node}
    x = mycol.update_one(myquery, newvalues,  upsert=True)
    if x.modified_count == 1:
        return jsonify({"message": f"Node {node_id} updated successfully"}), 200
    else:
        return jsonify({"message": f"Node {node_id} not found"}), 404

@routes.route('/delete-answers/<node_id>', methods=['POST'])
def delete_answers(node_id):
    myquery = { "_id": node_id }
    newvalues = { "$set": { "answers": "" } }
    x = mycol.update_one(myquery, newvalues)
    return jsonify({"message": f"Answers for node {node_id} deleted successfully"}), 200

@routes.route('/savesignature', methods=['POST'])
def file_upload():
    try:
        data_uri = request.json.get('data_uri')
        decoded_image = base64.b64decode(data_uri)
        image_folder = "image2"
        if not os.path.exists(image_folder):
            os.makedirs(image_folder)

        with open(os.path.join(image_folder, "signature.png"), "wb") as f:
            f.write(decoded_image)

        return "Image uploaded successfully"
    except Exception as e:
        return str(e)
