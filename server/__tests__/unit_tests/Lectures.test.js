/* eslint-disable max-len */
// Le dipendenze vanno importate sennò non funziona
const to = require('await-to-js').default;
const moment = require('moment');

const Controller = require('../../controllers/Lectures');

const Lectures = require('../../service/LecturesService');

// wrappo il modulo service cosi da poter sostituire le sue funzioni con funzioni mockup
jest.mock('../../service/LecturesService');

const httpMocks = require('node-mocks-http');
const req = httpMocks.createRequest();
const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

const lectures = [
  {
    lectureId: 'a',
    courseId: 'a',
    teacherId: 'a',
    date: 'a',
    time: 'a',
    mode: 'a',
    room: 'a',
    maxSeats: 'a',
  },
];


test('richiedi tutte le lezioni', () => {
  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation(() => Promise.resolve(lectures));

  return Controller.apiLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect(data).toEqual(
        [
          {
            lectureId: 'a',
            courseId: 'a',
            teacherId: 'a',
            date: 'a',
            time: 'a',
            mode: 'a',
            room: 'a',
            maxSeats: 'a',
          },
        ],
    );
  });
});

