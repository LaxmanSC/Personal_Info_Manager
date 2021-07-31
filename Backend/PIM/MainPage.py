from flask import (request, Blueprint, jsonify, g)

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from PIM.db import get_db

bp = Blueprint('main', __name__, url_prefix='/main')

@bp.route('/',methods=('GET', 'POST'))
@jwt_required()
def mainPage():
  num=0;
  data =[];
  if request.method == 'GET':
    db = get_db()
    user = get_jwt_identity()
    if user is not None:
      userdata = db.execute("""SELECT UserNotes.Info, UserNotes.Title,UserNotes.NoteId, TagList.tags from UserNotes 
                            INNER JOIN Users ON Users.Id = UserNotes.user 
                            INNER JOIN TagList ON UserNotes.NoteId = TagList.note
                            WHERE Users.username = ?""",[user]).fetchall()
      for row in userdata:
        data.append(dict(row));
        print(dict(row))
    return jsonify({'data': data}), 200

@bp.route('/delete', methods=['POST'])
@jwt_required()
def deletePage():
  if request.method == 'POST':
    db = get_db()
    obj = request.json
    note_id = obj.get('Id')
    print(note_id);
    success = "";
    db.execute('DELETE FROM TagList WHERE note = ?;' , (str(note_id),));
    db.execute('DELETE FROM UserNotes WHERE NoteId = ?;', (str(note_id),));
    db.commit();
    print("success")
    return jsonify({'success': success}), 200

@bp.route('/addNote', methods=['POST'])
@jwt_required()
def addNote():
  if request.method == 'POST':
    user = get_jwt_identity()
    db = get_db()
    obj = request.json;
    Title = obj.get('Title')
    Notetext = obj.get('Notetext')
    Tags = obj.get('Tags')
    print(Title, Notetext, Tags)
    print(user);
    user_id = db.execute('SELECT * FROM Users WHERE Username = ?', (user,)).fetchall();
    for row in user_id:
      u_id = row['Id'];
    print(u_id);
    db.execute('INSERT INTO UserNotes (Title, Info, user) VALUES(?,?,?)', (Title,Notetext, u_id));
    NoteId = db.execute('SELECT NoteId from UserNotes WHERE Title = ?', (Title,)).fetchall()
    for row in NoteId:
      n_id = row['NoteId'];
    print("n_id", n_id);
    db.execute('INSERT INTO TagList (note, tags) VALUES (?,?)', (n_id, Tags));
    db.commit();
    success = "success";
    print(success);
    return jsonify({'success': success}), 200

@bp.route('/search', methods=['POST'])
@jwt_required()
def searchNote():
  retData = [];
  if request.method == 'POST':
    obj = request.json;
    searchText = obj.get('searchText');
    print("searchText", searchText);
    str ="";
    retInd = []
    db = get_db()
    user = get_jwt_identity();
    if user is not None:
      data = db.execute('SELECT * FROM Users WHERE Username = ?', (user,)).fetchall();
      for row in data:
        user_id = row['Id'];

      data = db.execute("""SELECT UserNotes.NoteId, UserNotes.Title, TagList.tags FROM UserNotes INNER JOIN TagList
                        ON UserNotes.NoteId = TagList.note 
                        WHERE UserNotes.user = ?""", (user_id,)).fetchall();

      for row in data:
        Title = row['Title'];
        tags = row['tags'];
        if(Title.find(searchText) != -1 or tags.find(searchText) != -1):
          retInd.append(row['NoteId']);
        
      for element in retInd:
        userdata = db.execute("""SELECT UserNotes.Info, UserNotes.Title,UserNotes.NoteId, TagList.tags from UserNotes 
                              INNER JOIN Users ON Users.Id = UserNotes.user 
                              INNER JOIN TagList ON UserNotes.NoteId = TagList.note
                              WHERE Users.username = ? AND UserNotes.NoteId = ?""",(user, element)).fetchall()
        for row in userdata:
          retData.append(dict(row));
          print(dict(row))
  return jsonify({'retData': retData}), 200

@bp.route('/edit', methods=['POST'])
@jwt_required()
def EditPage():
  success = "Failure"
  if request.method == 'POST':
    obj = request.json
    Title = obj.get('Title')
    Info = obj.get('Info')
    Tags = obj.get('Tags')
    Id = obj.get('Id')
    print(Title, Info, Tags)

    db = get_db();
    user = get_jwt_identity();
    if user is not None:
      data = db.execute('SELECT * FROM Users WHERE Username = ?', (user,)).fetchall();
      for row in data:
        user_id = row['Id'];
      db.execute("""UPDATE UserNotes
                SET Title = ?,
                Info = ?
                WHERE user = ? AND NoteId = ?""", (Title, Info, user_id, Id))
      db.execute("""UPDATE TagList
                    SET tags = ?
                    WHERE note = ?""", (Tags,Id))
      db.commit()
      success = "success";
      print(success);
    return jsonify({'success': success}), 200
