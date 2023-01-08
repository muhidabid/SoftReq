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
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import sklearn.model_selection
import sklearn.preprocessing as preproc
from sklearn.feature_extraction import text as sk_text
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
from nltk.tokenize import word_tokenize

classnames = ["ef", "pe", "po", "re", "se", "us"]

ef = ["efficient", "efficiency"]
pe = ["performance", "performs", "loads", "loading", "load"]
po = ["compatible", "portable"]
re = []
se = ["secure", "security", "firewall",
      "firewalls", "authorizaton", "authentication"]


stopwords_custom = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourselves',
                    'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'they',
                    'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these',
                    'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
                    'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by',
                    'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
                    'to', 'from', 'up', 'down', 'in', 'on', 'off', 'over', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
                    'where', 'why', 'how', 'both', 'each', 'more', 'most', 'other', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
                    'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll',
                    'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn',
                    "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn',
                    "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]


class BinaryClassifierLG:

    def __init__(self):
        self.models = list()
        self.vectorizers = list()
        self.models_loaded = self.load_models()
        self.vectorizers_loaded = self.load_vectorizers()

    def load_models(self):
        for classname in classnames:
            self.models.append(pickle.load(open(classname+"_lr.pickel", "rb")))
        return True

    def load_vectorizers(self):
        for classname in classnames:
            self.vectorizers.append(pickle.load(
                open(classname+"_tfidf.pickel", "rb")))
        return True

    def keyword_match(self, text):
        tokens = word_tokenize(text)
        labels = list()
        filtered_tokens = list()
        for token in tokens:
            if token not in stopwords_custom:
                filtered_tokens.append(token)

        for i in filtered_tokens:
            filtered_tokens[filtered_tokens.index(i)] = i.lower()
            if i in ef:
                labels.append("EF")
            if i in pe:
                labels.append("PE")
            if i in po:
                labels.append("PO")
            if i in re:
                labels.append("RE")
            if i in se:
                labels.append("SE")
        return labels

    def predict(self, text):

        keyword_labels = self.keyword_match(text)
        le = LabelEncoder()
        le.fit(["EF", "PE", "PO", "SE", "RE", "US", "X"])
        no_labels = False
        labels = list()
        transforms = list()
        if(self.models_loaded and self.vectorizers_loaded):
            for vectorizer in self.vectorizers:
                transforms.append(vectorizer.transform([text]))

            for i in range(len(self.models)):
                labels.append(self.models[i].predict(transforms[i]))

            labels = np.concatenate(labels, axis=0)

            labels = le.inverse_transform(labels)
            no_labels = bool(np.prod((labels == "X")))
            # print(labels)

            if(no_labels):
                return np.array(["X"])
            else:
                # labels.remove('X')
                labels = list(filter(('X').__ne__, labels))
                labels.extend(keyword_labels)
                labels = list(dict.fromkeys(labels))
                return labels


if __name__ == "__main__":

    print("Enter Story")
    z = BinaryClassifierLG()
    ind = input()
    print(z.predict(ind))
