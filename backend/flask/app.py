from flask import Flask, jsonify
import cv2
import mediapipe as mp

app = Flask(__name__)

# Real-time sign language recognition using MediaPipe + TensorFlow
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2)

@app.route('/sign-recognize', methods=['POST'])
def recognize_sign():
    # Placeholder for live hand tracking and LSTM classification
    return jsonify({
        "detected_gestures": ["HELLO", "THANK YOU"],
        "latency_ms": 15,
        "is_confident": True
    })

if __name__ == '__main__':
    app.run(port=5001)
