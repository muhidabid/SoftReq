import re

def cleaner(story):

    story = re.sub(r"#\w+\s*","",story)     # Removing hashtags
    story = re.sub(r"\\n","",story)         # Removing \n
    story = re.sub(r"\\u....","",story)     # Removing unicode
    return story
