from flask import Flask, render_template, Response, request,send_from_directory,jsonify,send_file
import cv2
from datetime import datetime as dt
import sys
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from bson.objectid import ObjectId
import numpy as np
import os
import time
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from moviepy.editor import VideoFileClip
app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'fyp'
app.config["JWT_SECRET_KEY"] = "roman"
app.config['MONGO_URI'] = 'mongodb://localhost:27017/fyp'
app.config['UPLOAD_FOLDER']=''
mongo = PyMongo(app)
user=mongo.db.admins
loop = False
CORS(app)
jwt = JWTManager(app)


@app.route("/register", methods=["POST"])
def register():
    email = request.form["email"]
    # test = User.query.filter_by(email=email).first()
    test = user.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exist"), 409
    else:
        username = request.form["username"]
        password = request.form["password"]
        user_info = dict(username=username, email=email, password=password)
        user.insert_one(user_info)
        return jsonify(message="User added sucessfully"), 201


@app.route("/login", methods=["POST"])
def login():
    if request.is_json:
        username = request.json["username"]
        password = request.json["password"]
    else:
        username = request.form["username"]
        password = request.form["password"]

    test = user.find_one({"username": username, "password": password})
    if test:
        access_token = create_access_token(identity=username)
        return jsonify(message="Login Succeeded!", access_token=access_token), 201
    else:
        return jsonify(message="Bad Username or Password"), 401




@app.route('/')
def index():
    return render_template('index.html')


def gen(signal):
    faceCascade = cv2.CascadeClassifier(
        "D:\\python\\haarcascade_frontalface_default.xml")
    camera = cv2.VideoCapture(0)
    pic = cv2.imread("loading.jpg")
    (flag, encodedImage1) = cv2.imencode(".jpg", pic)
    camera.set(3, 640)
    camera.set(4,480)  # Match width
    fourcc = cv2.VideoWriter_fourcc(*'H264')

    condition = 0
    start = 0
    seconds = 0
    create = False
    basename = "video"
    culprits=0
    suffix = dt.now().strftime("%y%m%d_%H%M%S")
    # e.g. 'mylogfile_120508_171442'
    filename = "_".join([basename, suffix])+".mp4"
    out = cv2.VideoWriter(filename, fourcc, 20.0, (640, 480))
    while (camera.isOpened() and signal == '1'):
        ret, frame = camera.read()
        frame = cv2.flip(frame, 1)
        if ret:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = faceCascade.detectMultiScale(
                gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            if(len(faces) > 0 and create):
                suffix = dt.now().strftime("%y%m%d_%H%M%S")
                filename = "_".join([basename, suffix])+".mp4"
                out = cv2.VideoWriter(filename, fourcc, 15.0, (640, 480))
                create = False

            if(len(faces) > 0):
                culprits=len(faces)
                out.write(frame)
                condition = 1

            if(condition == 1 and len(faces) == 0):
                out = None
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage1) + b'\r\n')
                time.sleep(2)
                condition = 0
                with_moviepy(filename,culprits)
                create = True

            if (np.shape(frame) != ()):
                (flag, encodedImage) = cv2.imencode(".jpg", frame)
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
        # if(stop()=='1'):
        #     break


@app.route('/video_feed', methods=['GET', 'POST'])
def video_feed():
    signal = request.args.get('s')
    return Response(gen(signal),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()


@app.route('/shutdown', methods=['GET'])
def shutdown():
    shutdown_server()
    print("done")
    return 'Server shutting down...'

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Endpoint to serve uploaded videos

    Use `conditional=True` in order to support range requests necessary for
    seeking videos.

    """
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename,
                               conditional=True)


def with_moviepy(filename,culprits):
    if os.path.exists(filename):
        clip = VideoFileClip(filename)
        duration = clip.duration
        fps = clip.fps
        width, height = clip.size
        print("duration is", duration)
        if(duration < 10):
            clip.close()
            os.unlink(filename)
            print("file deleted")
        else:
            star = mongo.db.records
            # name = request.json['name']
            # distance = request.json['distance']
            culprits1=str(culprits)
            video = filename
            today=dt.today()
            now = dt.now()
            date = today.strftime("%B %d, %Y")
            time = now.strftime("%H:%M:%S")
            image = ["background.jpg", "upload.jpg"]
            star_id = star.insert({'culprits': culprits1, 'video': video,
                                   'date': date, 'time': time, 'image': image})
    else:
        print("Can not delete the file as it doesn't exists")


@app.route('/retrieve')
@jwt_required
def get_all_stars():
    star = mongo.db.records
    output = []
    for s in star.find():
        sid=str(s['_id'])
        output.append({'culprits': s['culprits'], 'video': s['video'],'date':s['date'],'time':s['time'],'_id':sid,'image':s['image'] })
    return jsonify({'result': output})  

@app.route('/delstar/<pid>', methods=['DELETE'])
@jwt_required
def del_star(pid):
    star = mongo.db.records
    print(pid)
    newid=ObjectId(pid)
    result = star.find_one_and_delete({'_id':newid})
    print(result)
    return jsonify({'result': "done"})  

@app.route('/imagestar/<imgname>',methods=['GET'])

def image_star(imgname):
    return send_file(imgname, mimetype='image/gif')  


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
