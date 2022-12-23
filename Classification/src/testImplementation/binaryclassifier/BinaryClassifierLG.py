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

classnames = ["ef", "pe", "po", "re", "se", "us"]
models = list()
vectorizers = list()
has_loaded_models = False
has_loaded_vectorizers = False


def product(arg):
    total = 1
    for val in arg:
        total = total*val

    return total


def load_models():
    for classname in classnames:
        models.append(pickle.load(open(classname+"_lr.pickel", "rb")))
    return True


def load_vectorizers():
    for classname in classnames:
        vectorizers.append(pickle.load(open(classname+"_tfidf.pickel", "rb")))
    return True


def predict(text):
    labels = list()
    transforms = list()
    if(has_loaded_models and has_loaded_vectorizers):
        for vectorizer in vectorizers:
            transforms.append(vectorizer.transform([text]))

        for i in range(len(models)):
            labels.append(models[i].predict(transforms[i]))

        labels = np.concatenate(labels, axis=0)
        print(labels)


if __name__ == "__main__":
    has_loaded_models = load_models()
    has_loaded_vectorizers = load_vectorizers()
    print(len(models))
    print(len(vectorizers))
    predict(input())
