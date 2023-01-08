from sentence_transformers import SentenceTransformer, util
import torch
import numpy


class SentenceSimilarityDetector:

    def __init__(self):
        self.model = SentenceTransformer(
            'sentence-transformers/all-MiniLM-L6-v2')

    def detect_similarity(self, new_text, source_stories, story_ids=1):

        model = self.model
        source_scores = list()
        new_embedding = model.encode(new_text, convert_to_tensor=True)

        res = dict()

        for i in source_stories:
            temp = model.encode(i, convert_to_tensor=True)
            temp = util.pytorch_cos_sim(
                new_embedding, temp).numpy().reshape([1, ])
            source_scores.append(temp[0])

        for i in range(len(story_ids)):
            res[story_ids[i]] = source_scores[i]

        print(res)
        return res


a = SentenceSimilarityDetector()
a.detect_similarity(
    "timely", ["quickly", "instantaneously", "excited"], [0, 1, 2])
