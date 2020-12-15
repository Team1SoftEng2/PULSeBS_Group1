/* eslint-disable max-len */
const Controller = require('../../controllers/Bookings');
const BookingsService = require('../../service/BookingsService');
const LecturesService = require('../../service/LecturesService');
const Email = require('../../controllers/Email');
const moment = require('moment');
const httpMocks = require('node-mocks-http');

jest.mock('../../service/BookingsService');
jest.mock('../../service/LecturesService');
jest.mock('../../controllers/Email');

const bookings = [
  {studentId: 's27002', lectureId: 'CA3003'},
  {studentId: 's27001', lectureId: 'CA3002'},
  {studentId: 's27001', lectureId: 'CA3008'},
  {studentId: 's27001', lectureId: 'CA3001'},
];

const lectures = [
  {
    lectureId: 'CA3003',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2021 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
  {
    lectureId: 'CA3004',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
  {
    lectureId: 'IS1005',
    courseId: 'IS002',
    teacherId: 't37002',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
];
/* ============================================================================
                        TEST apiBookingsGET
============================================================================*/

test('get all bookings given a lectureId', () => {
  const req = httpMocks.createRequest({query: {lectureId: 'CA3003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  return Controller.apiBookingsGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual([
          {studentId: 's27002', lectureId: 'CA3003'},
        ]);
      });
});

test('get all bookings given a lectureId but an error occours in db', () => {
  const req = httpMocks.createRequest({query: {lectureId: 'CA3003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.reject('some type of error');
  });

  return Controller.apiBookingsGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'param': 'Server', 'msg': 'some type of error'}]},
        );
      });
});

test('get all bookings given a lectureId without bookings', () => {
  const req = httpMocks.createRequest({query: {lectureId: 'CA3004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  return Controller.apiBookingsGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'param': 'Server', 'msg': 'bookings not found'}]},
        );
      });
});

/* ============================================================================
                        TEST apiBookingsPOST
============================================================================*/

test('add a booking to a lecture', () => {
  const req = httpMocks.createRequest({body: {lectureId: 'CA3003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  BookingsService.apiBookingsPOST.mockImplementation(() => Promise.resolve());
  Email.sendEmailByUserId.mockImplementation((userId, message) => Promise.resolve());

  LecturesService.getLectureById.mockImplementation((lectureId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.lectureId === lectureId);
    return Promise.resolve(filteredLectures);
  });

  return Controller.apiBookingsPOST(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {'msg': 'Created'},
        );
      });
});

test('add a booking to a lecture that does not exist', () => {
  const req = httpMocks.createRequest({body: {lectureId: 'CA3009'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  BookingsService.apiBookingsPOST.mockImplementation(() => Promise.resolve());
  Email.sendEmailByUserId.mockImplementation((userId, message) => Promise.resolve());

  LecturesService.getLectureById.mockImplementation((lectureId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.lectureId === lectureId);
    return Promise.resolve(filteredLectures[0]);
  });

  return Controller.apiBookingsPOST(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'msg': 'lecture not found'}]},
        );
      });
});

test('add a booking to a lecture that is after the deadline', () => {
  const req = httpMocks.createRequest({body: {lectureId: 'CA3004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  BookingsService.apiBookingsPOST.mockImplementation(() => Promise.resolve());
  Email.sendEmailByUserId.mockImplementation((userId, message) => Promise.resolve());

  LecturesService.getLectureById.mockImplementation((lectureId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.lectureId === lectureId);
    return Promise.resolve(filteredLectures[0]);
  });

  return Controller.apiBookingsPOST(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {'msg': 'Unprocessable Entity'},
        );
      });
});

test('add a booking to a lecture but an error in db occours when finding it', () => {
  const req = httpMocks.createRequest({body: {lectureId: 'CA3004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  BookingsService.apiBookingsPOST.mockImplementation(() => Promise.resolve());
  Email.sendEmailByUserId.mockImplementation((userId, message) => Promise.resolve());

  LecturesService.getLectureById.mockImplementation((lectureId) => {
    return Promise.reject('some type of error');
  });

  return Controller.apiBookingsPOST(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'msg': 'some type of error'}]},
        );
      });
});

test('add a booking to a lecture but an error in db occours when I try to save the booking in db', () => {
  const req = httpMocks.createRequest({body: {lectureId: 'CA3003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  BookingsService.apiBookingsPOST.mockImplementation(() => Promise.reject('some type of error'));
  Email.sendEmailByUserId.mockImplementation((userId, message) => Promise.resolve());

  LecturesService.getLectureById.mockImplementation((lectureId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.lectureId === lectureId);
    return Promise.resolve(filteredLectures[0]);
  });

  return Controller.apiBookingsPOST(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'msg': 'some type of error'}]},
        );
      });
});

/* ============================================================================
                        TEST apiBookingsDELETE
============================================================================*/
test('delete a booking given studentId and LectureId', () => {
  const req = httpMocks.createRequest({body: {studentId: 's27002', lectureId: 'CA3003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.apiBookingsDelete.mockImplementation((body) => Promise.resolve());

  return Controller.apiBookingsDelete(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {'msg': 'Delete'},
        );
      });
});

test('delete a booking given studentId and LectureId', () => {
  const req = httpMocks.createRequest({body: {studentId: 's27002', lectureId: 'CA3003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  BookingsService.apiBookingsDelete.mockImplementation((body) => Promise.reject('some type of error'));

  return Controller.apiBookingsDelete(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'msg': 'some type of error'}]},
        );
      });
});
