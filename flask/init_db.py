from config import conn


def init_db():
    cur = conn.cursor()

    # if the nodes exist, do nothing
    cur.execute("""
    SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables
        WHERE  table_name = 'nodes'
        )
    """)
    if cur.fetchone()[0]:
        return


    # Create the tables
    cur.execute("""
    CREATE TABLE nodes (
        _id UUID PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        start BOOLEAN DEFAULT FALSE,
        config_text VARCHAR(255)
    )
    """)

    cur.execute("""
    CREATE TABLE outputs (
        node_id UUID REFERENCES nodes(_id),
        output UUID NOT NULL
    )
    """)

    cur.execute("""
    CREATE TABLE answers (
        node_id UUID REFERENCES nodes(_id),
        id INT NOT NULL,
        text VARCHAR(255) NOT NULL
    )
    """)

    # Prepare the INSERT statements
    cur.execute("PREPARE insert_nodes AS INSERT INTO nodes (_id, type, start, config_text) VALUES ($1, $2, $3, $4)")
    cur.execute("PREPARE insert_outputs AS INSERT INTO outputs (node_id, output) VALUES ($1, $2)")
    cur.execute("PREPARE insert_answers AS INSERT INTO answers (node_id, id, text) VALUES ($1, $2, $3)")

    # Insert data into the 'nodes' table
    cur.execute("EXECUTE insert_nodes('8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5', 'SignatureNode', TRUE, 'Das ist ein Test')")
    cur.execute("EXECUTE insert_nodes('f4db9b1a-dce2-4060-892f-ff0b2892d730', 'PromptNode', FALSE, 'Das ist ein Test 2')")
    cur.execute("EXECUTE insert_nodes('f4db9b1a-dce2-4060-892f-ff0b2892d731', 'SignatureNode', FALSE, 'Das ist ein Test 3 (signature)')")

    cur.execute("EXECUTE insert_outputs('8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5', 'f4db9b1a-dce2-4060-892f-ff0b2892d730')")
    cur.execute("EXECUTE insert_outputs('f4db9b1a-dce2-4060-892f-ff0b2892d730', 'f4db9b1a-dce2-4060-892f-ff0b2892d731')")

    cur.execute("EXECUTE insert_answers('f4db9b1a-dce2-4060-892f-ff0b2892d730', 1, 'Ja')")
    cur.execute("EXECUTE insert_answers('f4db9b1a-dce2-4060-892f-ff0b2892d730', 2, 'Nein')")
    cur.execute("EXECUTE insert_answers('8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5', 3, 'Nein')")
    cur.execute("EXECUTE insert_answers('8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5', 4, 'Ja')")

    conn.commit()

    cur.close()
