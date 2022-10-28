import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')

# from nltk import punkt
# from nltk import averaged_perceptron_tagger
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))

import string
import matplotlib.pyplot as plt

def preprocess(us_input):
    # input
    # us_input = input("Enter UserStory: ")
    print("User Story: ", us_input)

    # lowercase
    us_input = us_input.lower()

    us_input = us_input.translate(str.maketrans('','', string.punctuation))
    print('\nUser Story: ', us_input)

    # tokenize
    us_tokens = nltk.word_tokenize(us_input)
    print('\nTokens: ', us_tokens)

    # removing stopwords
    us_filtered = []

    for word in us_tokens:
        if word not in stop_words:
            us_filtered.append(word)

    print('\nFiltered Tokens')
    print(us_filtered)
    return us_filtered

def amb_type_comp(us_filtered):
    lexical_AMB = ['bound', 'break', 'content', 'call', 'continue', 'contract', 'count', 'direct', 'even', 'express', 'form', 'forward', 'function', 'job', 'level', 'name', 'notice', 'number', 'out', 'position', 'record', 'reference', 'subject', 'string', 'switch', 'throw', 'translate', 'try', 'under', 'schedule']
    referential_AMB = ['everyone', 'everything', 'someone', 'something', 'anything', 'anyone', 'itself', 'yourself']
    coordination_AMB = ['also', 'if then', 'unless', 'if and only if']
    scope_AMB = ['all', 'any', 'few', 'little', 'many', 'much', 'several', 'some']
    vague_AMB = ['good', 'better', 'worse', 'available', 'common', 'capability', 'easy', 'full', 'maximum', 'minimum', 'quickly', 'random', 'recently', 'sufficient', 'sufficiently', 'simple', 'useful', 'various']

    lex_count = 0
    ref_count = 0
    coord_count = 0
    scope_count = 0
    vague_count = 0
    unamb_count = 0

    for word in us_filtered:

        if(word in lexical_AMB):
            print("Lexical Ambiguity: ", word)
            lex_count = lex_count+1

        elif (word in referential_AMB):
            print("Referential Ambiguity: ", word)
            ref_count = ref_count + 1

        elif (word in coordination_AMB):
            print("Coordination Ambiguity: ", word)
            coord_count = coord_count + 1

        elif (word in scope_AMB):
            print("Scope Ambiguity: ", word)
            scope_count = scope_count + 1

        elif (word in vague_AMB):
            print("Vague Ambiguity: ", word)
            vague_count = vague_count + 1

        else:
            unamb_count = unamb_count + 1
            print("Unambigous")

    # Create bar chart of results
    x = ["Lexical", "Referential", "Coordination", "Scope", "Vagueness", "None"]
    y = [lex_count, ref_count, coord_count, scope_count, vague_count, unamb_count]

    plt.figure(figsize=(10,5))
    plt.bar(x, y)
    plt.title("Ambiguities Detected")

    plt.xlabel("Type")
    plt.ylabel("Number of Ambiguities")

    plt.show()

    return

def main():
    # Read US here from application
    us_new = "As a team member, I want to have a schedule of many coworking slots, so that I can work in tandem with the rest of the team and everyone on a more regular basis."

    # processing amb
    us_clean = preprocess(us_new)

    # detect amb and make bar chart
    amb_type_comp(us_clean)

main()
