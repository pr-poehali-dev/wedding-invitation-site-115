import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет анкету гостя в базу данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    attending = body.get('attending', '').strip()
    drink = body.get('drink', '').strip()
    wish = body.get('wish', '').strip()

    if not name or not attending:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'name and attending are required'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO rsvp_responses (name, attending, drink, wish) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, attending, drink or None, wish or None)
    )
    row_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'id': row_id})
    }
