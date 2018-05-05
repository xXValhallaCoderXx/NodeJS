const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const Todo = require('./model');
const { app } = require('../index');

const todos = [
  {_id: new ObjectID() ,text: "First todo"},
  {_id: new ObjectID() ,text: "Second todo", completed: true, completedAt: 333}
]

beforeEach(done => {
  Todo.remove({}).then(() => {
    // Wipes the DB
    return Todo.insertMany(todos)
  }).then(() => done());
});

describe('POST /todo/add', () => {
  it('Should create a new todo', done => {
    const text = "This is testing";

    request(app)
      .post('/api/todo/add')
      .send({
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.text).toBe(text);
      })
      .end((err, res) => {
        if(err){
          // Test will fail on error
          // Return so we stop the execution of test
          return done(err);
        }
        Todo.find({text}).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => {
          // Catches any of the above errors
          done(err);
        })
      })
  });
});