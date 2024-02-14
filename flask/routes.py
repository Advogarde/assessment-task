import psycopg2
import psycopg2.extras

from flask import jsonify, request
from models import NodeTypes
from utils import saveTextAnswer, saveImgAnswer
from config import conn


def set_up_routes(app):
    @app.route('/process', methods=['GET'])
    def api():
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("""
                SELECT nodes.*, json_agg(DISTINCT outputs.output) as outputs, json_agg(DISTINCT answers) as answers
                FROM nodes
                LEFT JOIN outputs ON nodes._id = outputs.node_id
                LEFT JOIN answers ON nodes._id = answers.node_id
                GROUP BY nodes._id
                """)
            nodes = cur.fetchall()

        for node in nodes:
            node['config'] = {'text': node.pop('config_text')}
            if node['answers'] is not None:
                node['answers'] = list(filter(None, node['answers']))

        return jsonify(nodes)

    @app.route('/api/answers/<node_id>', methods=['POST'])
    def add_answer(node_id):
        new_answer = request.json

        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("SELECT * FROM nodes WHERE _id = %s", (node_id,))
            node = cur.fetchone()

            if node is not None:
                cur.execute("SELECT MAX(id) FROM answers WHERE node_id = %s", (node_id,))
                result = cur.fetchone()
                answer_id = result['max'] if result['max'] is not None else 0
                new_answer['id'] = answer_id + 1
                if node['type'] == NodeTypes.SignatureNode.value:
                    saveImgAnswer(new_answer, node)
                else:
                    saveTextAnswer(new_answer, node, cur)
                return jsonify(new_answer), 201

        return jsonify({'error': 'Node not found'}), 404

    @app.route('/api/answers/<node_id>/<answer_id>', methods=['DELETE'])
    def delete_answer(node_id, answer_id):
        with conn.cursor() as cur:
            cur.execute("""
            DELETE FROM answers
            WHERE node_id = %s AND id = %s
            """, (node_id, int(answer_id)))

            if cur.rowcount > 0:
                conn.commit()
                return jsonify({'message': 'Answer deleted'}), 200
            else:
                return jsonify({'error': 'Answer not found'}), 404
