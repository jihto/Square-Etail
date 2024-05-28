from PIL import Image 
from pathlib import Path
import numpy as np

from feature_extrator import FeatureExtractor


if __name__ == "__main__":
    fe = FeatureExtractor()

    for img_path in sorted(Path("./static/img").glob("*.jpg")):
        print(img_path)
        #Extrac a deep feature here 

        feature = fe.extract(img = Image.open(img_path))
        print(type(feature), feature.shape )

        feature_path = Path("./static/feature") / (img_path.stem + ".npy")
        print(feature_path)

        np.save(feature_path, feature)