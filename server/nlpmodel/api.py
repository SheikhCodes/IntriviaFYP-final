

from flask import Flask, jsonify, request, redirect, render_template, make_response
from flask_cors import CORS
# import mysql.connector as connector
# from mysql.connector import errorcode
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
# from db import db_connect, return_score

app = Flask(__name__)
CORS(app)


def return_score(text1, text2):

    model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
    text_list = [text1, text2]
    sentence_embeddings = model.encode(text_list)
    ans = cosine_similarity(
        [sentence_embeddings[0]],
        sentence_embeddings[1:]
    )
    return ans


@app.route('/')
def index():
    score = request.args.get('score')
    return redirect(f'/?score={score}')
    # return f"<h1> Hello World </h1><p>Score: {score}</p>"


@app.route('/quesans', methods=['POST'])
def quesans():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        return response

    original_ans = request.form['original_ans']
    user_ans = request.form['user_ans']
    score = return_score(original_ans, user_ans)
    score = score[0][0]
    score = float(score)
    score = round(score * 10)
    if score < 0:
         score = 0
    return jsonify({'score': score})

    # return score

    # return redirect(f'/?score={score}')


@app.route('/similarity', methods=['OPTIONS', 'POST'])
def similarity():
    if request.method == 'OPTIONS':
        # Return a response with the allowed methods
        response = make_response()
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        return response
    else:
        sentence1 = request.json['sentence1']
        sentence2 = request.json['sentence2']
        score = return_score(sentence1, sentence2)
        return jsonify({'similarity_score': score[0][0]})


if __name__ == '__main__':
    app.run(port=4000)
