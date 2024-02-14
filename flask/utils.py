import base64
from datetime import datetime
from config import conn


def saveTextAnswer(new_answer, node, cur):
    cur.execute("""
    INSERT INTO answers (node_id, id, text)
    VALUES (%s, %s, %s)
    """, (node['_id'], new_answer['id'], new_answer['text']))

    conn.commit()


def saveImgAnswer(new_answer, node):
    filename = f"signature_{node['_id']}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
    img_data = new_answer['text'].split(',')[1]
    filePath = f"static/images/{filename}"
    with open(filePath, "wb") as fh:
        fh.write(base64.b64decode(img_data))
    new_answer['text'] = filename

    with conn.cursor() as cur:
        cur.execute("""
        INSERT INTO answers (node_id, id, text)
        VALUES (%s, %s, %s)
        """, (node['_id'], new_answer['id'], new_answer['text']))

        conn.commit()
