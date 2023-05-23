
from gensim.models.ldamodel import LdaModel
import re
import pandas as pd
import nltk
from flask_cors import CORS
from flask import Flask, redirect, render_template, request, jsonify
import gensim

from nltk.stem import WordNetLemmatizer
from nltk.stem.porter import *
import numpy as np

import gensim.corpora as corpora
from gensim.parsing.preprocessing import preprocess_string, strip_punctuation, strip_numeric
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('wordnet')


# Load data and pre-process
data = pd.read_csv('myDataset.csv')
data_text = data[['Answers']]
data_text['index'] = data_text.index
documents = data_text


def lemmatize(text):
    lemmatizer = WordNetLemmatizer()
    return lemmatizer.lemmatize(text, pos='v')


def preprocess(text):
    result = []
    for token in gensim.utils.simple_preprocess(text):
        if token not in gensim.parsing.preprocessing.STOPWORDS and len(token) > 3:
            result.append(lemmatize(token))
    return result


processed_docs = documents['Answers'].map(preprocess)
dictionary = gensim.corpora.Dictionary(processed_docs)
dictionary.filter_extremes(no_below=15, no_above=0.5, keep_n=100000)
lda_model = LdaModel.load('lda_model.model')

# Set up Flask app
app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    matched_strings = request.args.get('matched_strings')
    return redirect(f'/?matched_strings={matched_strings}')
    # return f"<h1> LDA </h1><p>Topics: {matched_strings}</p>"


def home():
    return 'Hello, World!'


@app.route('/predict', methods=['POST'])
def predict():
    data = request.form['ans']

    # Remove punctuation and convert to lowercase
    data = re.sub('[,\.!?]', '', data)
    data = data.lower()

    # Tokenize the text and remove stopwords
    data_token = word_tokenize(data)
    data_without_sw = [
        word for word in data_token if not word in stopwords.words()]
    data_without_sw = set(data_without_sw)

    # Create dictionary and corpus for LDA
    data_without_sw = [d.split() for d in data_without_sw]
    id2word = corpora.Dictionary(data_without_sw)
    texts = data_without_sw
    corpus = [id2word.doc2bow(text) for text in texts]

    # Train LDA model
    num_topics = 5
    lda_model = gensim.models.LdaMulticore(
        corpus=corpus, id2word=id2word, num_topics=num_topics)
    lda_topics = lda_model.show_topics(num_words=8)

    # Preprocess the topics and match with a predefined list
    topics = []
    filters = [lambda x: x.lower(), strip_punctuation, strip_numeric]
    for topic in lda_topics:
        topics.append(preprocess_string(topic[1], filters))

    final_topics = []
    for i in range(3):
        final_topics.append(topics[i])

    final_topics = [item for sublist in final_topics for item in sublist]
    final_topics = list(set(final_topics))
    list2 = ["array", "dynamic memory allocation", "pointer", "sorting", "STL", "multidimensional array", "typecasting", "call by reference", "call by value", "deallocation", "loop", "nested loop", "recursion", "while loop", "iteration", "null pointer", "dereference", "operator overloading", "virtual functions", "abstract class", "polymorphism", "multiple inheritance", "templates", "pure virtual function", "access modifier", "constructor", "destructor", "encapsulation", "dynamic binding", "function overloading", "function overriding", "string", "new operator", "OOP", "friend functions", "class", "object", "inheritence", "copy constructor", "friend class", "pointer to an array", "dynamic programming", "void pointers", "container class", "list", "vector", "queue", "stack", "string concatenation", "memory leak", "heap stack", "static binding", "static polymorphism", "dynamic polymorphism", "arrow operator", "reference", "heap memory", "smart pointer", "scope resolution operator", "debugging", "key-value pairs", "iterators", "garbage collection"]
    matched_strings = []

    for string in final_topics:
        for s in list2:
            if string in s:
                matched_strings.append(s)
                break

    return jsonify({'matched_strings':matched_strings})
    # return redirect(f'/?matched_strings={matched_strings}')




if __name__ == '__main__':
    app.run(port=4001)












#------------------------------------------------------------------------------
# from gensim.models.ldamodel import LdaModel
# import re
# import pandas as pd
# import nltk
# from flask_cors import CORS
# from flask import Flask, redirect, render_template, request, jsonify
# import gensim
# from gensim.utils import simple_preprocess
# from gensim.parsing.preprocessing import STOPWORDS
# from nltk.stem import WordNetLemmatizer
# from nltk.stem.porter import *
# import numpy as np
# np.random.seed(2018)
# nltk.download('wordnet')


# # Load data and pre-process
# data = pd.read_csv('myDataset.csv')
# data_text = data[['Answers']]
# data_text['index'] = data_text.index
# documents = data_text


# def lemmatize(text):
#     lemmatizer = WordNetLemmatizer()
#     return lemmatizer.lemmatize(text, pos='v')


# def preprocess(text):
#     result = []
#     for token in gensim.utils.simple_preprocess(text):
#         if token not in gensim.parsing.preprocessing.STOPWORDS and len(token) > 3:
#             result.append(lemmatize(token))
#     return result


# processed_docs = documents['Answers'].map(preprocess)
# dictionary = gensim.corpora.Dictionary(processed_docs)
# dictionary.filter_extremes(no_below=15, no_above=0.5, keep_n=100000)
# lda_model = LdaModel.load('lda_model.model')

# # Set up Flask app
# app = Flask(__name__)
# CORS(app)


# @app.route('/', methods=['GET'])
# def index():
#     matched_strings = request.args.get('matched_strings')
#     return redirect(f'/?matched_strings={matched_strings}')
#     # return f"<h1> LDA </h1><p>Topics: {matched_strings}</p>"


# def home():
#     return 'Hello, World!'


# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get the input text from the request
#     input_text = request.form['ans']

#     # Pre-process the input text and get topic distribution using LDA model
#     bow_vector = dictionary.doc2bow(preprocess(input_text))
#     topic_distribution = lda_model.get_document_topics(bow_vector)

#     # Get the top topic with highest score
#     topic_list = []
#     top_topic = ''
#     top_score = 0.0
#     for index, score in sorted(lda_model[bow_vector], key=lambda tup: -1*tup[1]):
#         if score > top_score:
#             top_topic = lda_model.print_topic(index, 15)
#             top_score = score
#     topic_list.append(top_topic)

#     # Extract topics from the top topic using regular expressions
#     extracted_topics = [re.findall(r'"([^"]*)"', topic)
#                         for topic in topic_list]
#     flat_list = []
#     for sublist in extracted_topics:
#         flat_list.extend(sublist)
#     list1 = list(set(flat_list))

#     # Define a list of possible topics to match against
#     list2 = ["array", "dynamic memory allocation", "pointer", "sorting", "STL", "multidimensional array", "typecasting", "call by reference", "call by value", "deallocation", "loop", "nested loop", "recursion", "while loop", "iteration", "null pointer", "dereference", "operator overloading", "virtual functions", "abstract class", "polymorphism", "multiple inheritance", "templates", "pure virtual function", "access modifier", "constructor", "destructor", "encapsulation", "dynamic binding", "function overloading", "function overriding", "string", "new operator", "OOP", "friend functions", "class", "object", "inheritence", "copy constructor", "friend class", "pointer to an array", "dynamic programming", "void pointers", "container class", "list", "vector", "queue", "stack", "string concatenation", "memory leak", "heap stack", "static binding", "static polymorphism", "dynamic polymorphism", "arrow operator", "reference", "heap memory", "smart pointer", "scope resolution operator", "debugging", "key-value pairs", "iterators", "garbage collection"]


#     # Match the extracted topics with the list of possible topics
#     matched_strings = []
#     for string in list1:
#         for s in list2:
#             if string in s:
#                 matched_strings.append(s)
#                 break
#     matched_strings = list(set(matched_strings))
#     return jsonify({'matched_strings':matched_strings})




# if __name__ == '__main__':
#     app.run(port=4001)
