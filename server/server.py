from flask import Flask, render_template, redirect
from flask_cors import CORS, cross_origin
import cv2
from ultralytics import YOLO

app = Flask(__name__,template_folder='../template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

items = {0: 'CloseUp', 1: 'Cocoa Powder', 2: 'Colgate', 3: 'Hershey-s', 4: 'KeraGlo', 5: 'Lays', 6: 'Loreal', 7: 'Maggi', 8: 'MarieLight', 9: 'Perk'}

id_dict = {'CloseUp': 'hdsbi78dfY', 'Cocoa Powder': 'kahv238923', 'Maggi': 'jhdvsDjh3f', 'Hershey-s': 'kjbw23jhvh', 'KeraGlo': 'JHVgcYVj67', 'Lays': 'Ftuc88cUTI', 'Loreal': 'hvIViV89yv', 'Maggi': 'UC8u8cY8vi', 'MarieLight': 'iyv9779v97', 'Perk': 'iyvI9v9V76'}

model=YOLO("C:\\Users\\Harsha\\retail-billing-system\\runs\\detect\\train\\weights\\best.pt")

def gen_frames():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if success:
            results = model(frame, show=False, conf=0.85, hide_labels=True)
            product = results[0].boxes.cls.tolist()
            if product:
                return items[product[0]]
        else:
            cap.release()
            cv2.destroyAllWindows()        

@app.route("/", methods=['GET'])
@cross_origin()
def index():
    return render_template('home.html')

@app.route("/video-feed", methods=['GET'])
@cross_origin()
def video_feed():
    result = gen_frames()
    id = id_dict[result]
    if result:
        return redirect('http://localhost:3000/'+id)

if __name__ == "__main__":
    app.run(debug=True)
