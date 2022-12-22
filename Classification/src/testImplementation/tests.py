import unittest

from binaryclassifier import *


class TestSum(unittest.TestCase):
    def test_list_int_sum(self):
        """
        Test that it can sum a list of integers
        """
        data = [1, 2, 3]
        result = sum(data)
        self.assertEqual(result, 6)

    def test_list_int_product(self):
        """
        Test that it can multiply a list of integers
        """
        data = [1, 2, 3]
        result = product(data)
        load_models()
        self.assertEqual(result, 6)

    def test_list_model_length(self):
        """
        Test that six models loaded successfully
        """
        models.clear()
        load_models()
        length = len(models)
        models.clear()
        self.assertEqual(length, 6)

    def test_list_model_type(self):
        """
        Test that Logistic Regression Model were loaded 
        """
        models.clear()
        load_models()
        model_type = LogisticRegression()
        self.assertIsInstance(models[0], type(model_type))

    def test_list_model_load(self):
        """
        Test that six Logistic Regression Models were loaded
        """

        models.clear()
        load_models()
        length = len(models)
        model_type = type(LogisticRegression())
        self.assertIsInstance(models[0], model_type)
        self.assertEqual(length, 6)

    def test_list_vectorizers_length(self):
        """
        Test that six vectorizers loaded successfully
        """
        vectorizers.clear()
        load_vectorizers()
        length = len(vectorizers)
        vectorizers.clear()
        self.assertEqual(length, 6)

    def test_list_vectorizers_type(self):
        """
        Test that Tfidf vectorizers were loaded 
        """
        vectorizers.clear()
        load_vectorizers()
        model_type = TfidfVectorizer()
        self.assertIsInstance(vectorizers[0], type(model_type))

    def test_list_vectorizers_load(self):
        """
        Test that six Tfidf vectorizers were loaded
        """

        vectorizers.clear()
        load_vectorizers()
        length = len(vectorizers)
        model_type = type(TfidfVectorizer())
        self.assertIsInstance(vectorizers[0], model_type)
        self.assertEqual(length, 6)


if __name__ == '__main__':
    unittest.main()
