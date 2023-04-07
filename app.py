import cv2
from ultralytics import YOLO
model=YOLO("C:\\Users\\Harsha\\retail-billing-system\\train\\train\\weights\\best.pt")
#model.predict(source=,show=True,save=True, conf=0.7)
cap = cv2.VideoCapture(0)
items = {0: 'CloseUp', 1: 'Cocoa Powder', 2: 'Colgate', 3: 'Hershey-s', 4: 'KeraGlo', 5: 'Lays', 6: 'Loreal', 7: 'Maggi', 8: 'MarieLight', 9: 'Perk'}
products = []
while cap.isOpened():
    success, frame = cap.read()
    if success:
        results = model(frame, show=True, max_det=4, conf=0.85, hide_labels=True)
        annotated_frame = results[0].plot(show_conf=False)
        product = results[0].boxes.cls.tolist()
        if len(product) != 0 and items[product[0]] not in products:
            products.append(items[product[0]])
        print(products)
        cv2.imshow("YOLOv8 Inference", annotated_frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        break
cap.release()
cv2.destroyAllWindows()