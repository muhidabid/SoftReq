# Importing modules
from ast import keyword
from pprint import pprint
import gensim.corpora as corpora
from nltk.corpus import stopwords
import pandas as pd
import os
# Load the regular expression library
import re
import gensim
from gensim.utils import simple_preprocess
import nltk
# nltk.download('stopwords')

print("Helloo")


def load_data(filename):
    papers = pd.read_table(filename)
    return papers


def data_clean(papers):
    # Remove punctuation
    papers['paper_text_processed'] = \
        papers[papers.columns[0]].map(lambda x: re.sub('[,\.!?]', '', x))
    # Convert the titles to lowercase
    papers['paper_text_processed'] = \
        papers['paper_text_processed'].map(lambda x: x.lower())
    # return papers


def sent_to_words(sentences):
    for sentence in sentences:
        # deacc=True removes punctuations
        yield(gensim.utils.simple_preprocess(str(sentence), deacc=True))


def remove_stopwords(texts):
    # Basic Stopwords
    stop_words = stopwords.words('english')
    # Add Stopwords here
    stop_words.extend(['from', 'subject', 're', 'edu',
                      'user', 'product', 'interface'])
    return [[word for word in simple_preprocess(str(doc))
             if word not in stop_words] for doc in texts]


def pre_process(papers):
    data = papers.paper_text_processed.values.tolist()
    data_words = list(sent_to_words(data))
    # remove stop words
    data_words = remove_stopwords(data_words)
    print(data_words[:1][0][:30])
    return data_words


def build_args(data_words):
    # Create Dictionary
    id2word = corpora.Dictionary(data_words)
    # Create Corpus
    texts = data_words
    # Term Document Frequency
    corpus = [id2word.doc2bow(text) for text in texts]
    # View
    print(corpus[:1][0][:30])
    return corpus, id2word


def LDA_Train(corpus, id2word):
    # number of topics
    num_topics = 1
    # Build LDA model
    lda_model = gensim.models.LdaMulticore(corpus=corpus,
                                           id2word=id2word,
                                           num_topics=num_topics).show_topics(0, 25)  # Change 2nd Arguement to get more keywords per topic

    return lda_model


def train_model(filename):
    data = load_data(filename)
    data_clean(data)
    processed_data = pre_process(data)
    d_corpus, d_id2word = build_args(processed_data)
    keywords = list()
    # print("hi")
    temp = LDA_Train(d_corpus, d_id2word)
    keywords.append(temp)
    # print(len(keywords))
