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

classnames = ["ef", "pe", "po", "re", "se", "us"]


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

    def predict(self, text):
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
                return labels


if __name__ == "__main__":

    print("Enter Story")
    z = BinaryClassifierLG()
    ind = input()
    print(z.predict(ind))
