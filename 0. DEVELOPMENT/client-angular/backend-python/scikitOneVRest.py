import numpy as np
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
import re
import sys
import warnings
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
from sklearn.multiclass import OneVsRestClassifier
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

stop_words = set(stopwords.words('english'))
stop_words.update(['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
                  'nine', 'ten', 'may', 'also', 'across', 'among', 'beside', 'however', 'yet', 'within'])
re_stop_words = re.compile(r"\b(" + "|".join(stop_words) + ")\\W", re.I)
stemmer = SnowballStemmer("english")


if not sys.warnoptions:
    warnings.simplefilter("ignore")


def cleanHtml(sentence):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, ' ', str(sentence))
    return cleantext


def cleanPunc(sentence):  # function to clean the word of any punctuation or special characters
    cleaned = re.sub(r'[?|!|\'|"|#]', r'', sentence)
    cleaned = re.sub(r'[.|,|)|(|\|/]', r' ', cleaned)
    cleaned = cleaned.strip()
    cleaned = cleaned.replace("\n", " ")
    return cleaned


def keepAlpha(sentence):
    alpha_sent = ""
    for word in sentence.split():
        alpha_word = re.sub('[^a-z A-Z]+', ' ', word)
        alpha_sent += alpha_word
        alpha_sent += " "
    alpha_sent = alpha_sent.strip()
    return alpha_sent


def removeStopWords(sentence):
    global re_stop_words
    return re_stop_words.sub(" ", sentence)


def stemming(sentence):
    stemSentence = ""
    for word in sentence.split():
        stem = stemmer.stem(word)
        stemSentence += stem
        stemSentence += " "
    stemSentence = stemSentence.strip()
    return stemSentence


class OneVR_LG:

    def __init__(self):
        self.data = pd.read_excel("ohe_final_ml_reqs.xlsx")
        self.data['requirement_txt'] = self.data['requirement_txt'].str.lower()
        self.data['requirement_txt'] = self.data['requirement_txt'].apply(
            cleanHtml)
        self.data['requirement_txt'] = self.data['requirement_txt'].apply(
            cleanPunc)
        self.data['requirement_txt'] = self.data['requirement_txt'].apply(
            keepAlpha)
        self.data['requirement_txt'] = self.data['requirement_txt'].apply(
            removeStopWords)
        self.categories = list(self.data.columns.values)
        self.categories = self.categories[2:]

        self.train, self.test = train_test_split(
            self.data, random_state=42, test_size=0.30, shuffle=True)
        self.vectorizer = TfidfVectorizer(
            strip_accents='unicode', analyzer='word', ngram_range=(1, 3), norm='l2')
        self.train_text = self.train['requirement_txt']
        self.test_text = self.test['requirement_txt']
        self.vectorizer.fit(self.train_text)
        self.vectorizer.fit(self.test_text)
        self.x_train = self.vectorizer.transform(self.train_text)
        self.y_train = self.train.drop(
            labels=['Unnamed: 0', 'requirement_txt'], axis=1)
        self.x_test = self.vectorizer.transform(self.test_text)
        self.y_test = self.test.drop(
            labels=['Unnamed: 0', 'requirement_txt'], axis=1)

    # def balance(self):

    def predict(self, new_entry):
        # Using pipeline for applying logistic regression and one vs rest classifier
        self.LogReg_pipeline = Pipeline([
            ('clf', OneVsRestClassifier(LogisticRegression(solver='sag'), n_jobs=-1)),
        ])
        # new_entry="The system must display statistics"
        new_entry = self.vectorizer.transform([new_entry])
        mask = list()
        for category in self.categories:
            # print('**Processing {} comments...**'.format(category))

            # Training logistic regression model on train data
            self.LogReg_pipeline.fit(self.x_train, self.train[category])

            # calculating test accuracy
            # prediction = LogReg_pipeline.predict(x_test)
            new_pred = self.LogReg_pipeline.predict(new_entry)
            # print('Test accuracy is {}'.format(accuracy_score(test[category], prediction)))
            # print('Pred accuracy is {}'.format(accuracy_score(test[category], new_pred)))
            for i in new_pred:
                mask.append(i)
        mask = np.array(mask)
        masking = np.ma.masked_where(mask < 1, self.categories)
        labels = np.ma.compressed(masking)
        return labels


# classifier = OneVR_LG()

# l = classifier.predict("The system must display statistics")
# print(l)
