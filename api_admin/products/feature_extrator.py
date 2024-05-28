from tensorflow.keras.preprocessing import image 
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.layers import Dense, Input
import numpy as np
from PIL import Image

class FeatureExtractor:
    def __init__(self, reduced_dim = 128):
        # base_model = VGG16(weights="imagenet")
        # self.model = Model(inputs=base_model.input, outputs = base_model.get_layer("fc1").output)


        base_model = VGG16(weights="imagenet")
        fc1_output = base_model.get_layer("fc1").output
        reduced_dim_layer = Dense(reduced_dim, activation='relu')(fc1_output)
        self.model = Model(inputs=base_model.input, outputs=reduced_dim_layer)


    def  extract(self, img):
        img = img.resize((224,224)).convert('RGB') # Resize and convert to
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)            
        feature = self.model.predict(x)[0]
        return feature/ np.linalg.norm(feature) 
