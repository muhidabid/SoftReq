# from transformers import AutoTokenizer
import nltk
from nltk.tokenize import word_tokenize
from sentence_transformers import SentenceTransformer, util
import numpy
# from nltk.stem import WordNetLemmatizer
import pickle


lexical_AMB = ['bound', 'break', 'content', 'call', 'continue', 'contract', 'count', 'direct', 'even', 'express', 'form', 'forward', 'function', 'job',
               'level', 'name', 'notice', 'number', 'out', 'position', 'record', 'reference', 'subject', 'string', 'switch', 'throw', 'translate', 'try', 'under']
referential_AMB = ['everyone', 'everything', 'someone',
                   'something', 'anything', 'anyone', 'itself', 'yourself']
coordination_AMB = ['also', 'if then', 'unless', 'if and only if']
scope_AMB = ['all', 'any', 'few', 'little', 'many', 'much', 'several', 'some']
vague_AMB = ['good', 'better', 'worse', 'available', 'common', 'capability', 'easy', 'full', 'maximum',
             'minimum', 'quickly', 'random', 'recently', 'sufficient', 'sufficiently', 'simple', 'useful', 'various']
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

punctuation = ['.', ',', ';', '?']

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
# tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

lexical_encoded = pickle.load(open("lexical_encoded.pickel", "rb"))
vague_encoded = pickle.load(open("vague_encoded.pickel", "rb"))
referential_encoded = pickle.load(open("referential_encoded.pickel", "rb"))
coordination_encoded = pickle.load(open("coordination_encoded.pickel", "rb"))
scope_encoded = pickle.load(open("scope_encoded.pickel", "rb"))


class AmbguityDetector:

    def __init__(self):
        self.model = SentenceTransformer(
            'sentence-transformers/all-MiniLM-L6-v2')

    def sentence_ambiguity(self, sentence):

        model = self.model
        tokens = word_tokenize(sentence)
        filtered_tokens = list()
        for token in tokens:
            if token not in stopwords_custom:
                filtered_tokens.append(token)

        for i in filtered_tokens:
            filtered_tokens[filtered_tokens.index(i)] = i.lower()
            if i in punctuation:
                filtered_tokens.remove(i)

        lexical = dict()
        scope = dict()
        referential = dict()
        vague = dict()
        coordination = dict()
        ambiguity = dict()
        ambiguous_words = list()

        for i in filtered_tokens:
            temp = model.encode(i, convert_to_tensor=True)
            for j in lexical_AMB:
                temp2 = lexical_encoded[j]
                cos_sim = util.pytorch_cos_sim(
                    temp, temp2).numpy().reshape([1, ])
                if(cos_sim[0] >= 0.6):
                    ambiguous_words.append(i)
                    lexical[i+"+"+j] = cos_sim[0]

            for j in scope_AMB:
                temp2 = scope_encoded[j]
                cos_sim = util.pytorch_cos_sim(
                    temp, temp2).numpy().reshape([1, ])
                if(cos_sim[0] >= 0.6):
                    ambiguous_words.append(i)
                    scope[i+"+"+j] = cos_sim[0]

            for j in referential_AMB:
                temp2 = referential_encoded[j]
                cos_sim = util.pytorch_cos_sim(
                    temp, temp2).numpy().reshape([1, ])
                if(cos_sim[0] >= 0.6):
                    ambiguous_words.append(i)
                    referential[i+"+"+j] = cos_sim[0]

            for j in vague_AMB:
                temp2 = vague_encoded[j]
                cos_sim = util.pytorch_cos_sim(
                    temp, temp2).numpy().reshape([1, ])
                if(cos_sim[0] >= 0.6):
                    ambiguous_words.append(i)
                    vague[i+"+"+j] = cos_sim[0]

            for j in coordination_AMB:
                temp2 = coordination_encoded[j]
                cos_sim = util.pytorch_cos_sim(
                    temp, temp2).numpy().reshape([1, ])
                if(cos_sim[0] >= 0.6):
                    ambiguous_words.append(i)
                    coordination[i+"+"+j] = cos_sim[0]

            ambiguous_words = list(dict.fromkeys(ambiguous_words))
            ambiguity["lexical"] = lexical
            ambiguity["referential"] = referential
            ambiguity["scope"] = scope
            ambiguity["vague"] = vague
            ambiguity["coordination"] = coordination
            ambiguity["words"] = ambiguous_words

        print(filtered_tokens)
        print(ambiguity)
        return ambiguity["words"]


a = AmbguityDetector()
print(a.sentence_ambiguity("The test can only continue if it receives all inputs from previous page."))
