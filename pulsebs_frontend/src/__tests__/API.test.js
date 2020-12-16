import API from '../api/API';
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();

beforeEach( () => fetch.resetMocks() );


const user = {
    'userId': 's00001',
    'name': 'John',
    'surname': 'Smith',
    'email': 'john.smith@email.com'
};

describe('test getUser', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify(user));
        API.getUser('s00001').then((data) => {
            expect.assertions(4);
            expect(data.userId).toEqual('s00001');
            expect(data.name).toEqual('John');
            expect(data.surname).toEqual('Smith');
            expect(data.email).toEqual('john.smith@email.com');
        });
    });
    test('error', () => {
        fetch.mockResponseOnce(JSON.stringify('API error'), { status: 500 });
        API.getUser('s00001').catch((data) => {
            expect.assertions(2);
            expect(data.status).toBe(500);
            expect(data.errObj).toEqual('API error');
        });
    })

});

describe('test login', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify(user));
        API.login('s00001', 'test').then( (data) => {
            expect.assertions(4);
            expect(data.userId).toEqual('s00001');
            expect(data.name).toEqual('John');
            expect(data.surname).toEqual('Smith');
            expect(data.email).toEqual('john.smith@email.com');
        });
    });
    test('response not ok, json ok', () => {
        fetch.mockResponseOnce(JSON.stringify({err: 'API error'}), { status: 500});
        API.login('s00001', 'test').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('response not ok, json null', () => {
        fetch.mockResponseOnce(null, { status: 500});
        API.login('s00001', 'test').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('fetch rejected', () => {
        fetch.mockRejectOnce('error');
        API.login('s00001', 'test').catch( (data) => {
            expect.assertions(2);
            expect(data.errors[0].param).toEqual('Server');
            expect(data.errors[0].msg).toEqual('Cannot communicate');
        });
    });
});

describe('test getStudentCourses', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.getStudentCourses('s00001').then( (data) => {
            expect.assertions(1);
            expect(data.mockData).toEqual('test');
        });
    });
    test('error', () => {
        fetch.mockResponseOnce(JSON.stringify('API error'), { status: 500 });
        API.getStudentCourses('s00001').catch((data) => {
            expect.assertions(2);
            expect(data.status).toBe(500);
            expect(data.errObj).toEqual('API error');
        });
    });
});

describe('test getTeacherLectures', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.getTeacherLectures().then( (data) => {
            expect.assertions(1);
            expect(data.mockData).toEqual('test');
        });
    });
    test('error', () => {
        fetch.mockResponseOnce(JSON.stringify('API error'), { status: 500 });
        API.getTeacherLectures().catch((data) => {
            expect.assertions(2);
            expect(data.status).toBe(500);
            expect(data.errObj).toEqual('API error');
        });
    });
});

describe('test getLectures', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.getLectures().then( (data) => {
            expect.assertions(1);
            expect(data.mockData).toEqual('test');
        });
    });
    test('error', () => {
        fetch.mockResponseOnce(JSON.stringify('API error'), { status: 500 });
        API.getLectures('course').catch((data) => {
            expect.assertions(2);
            expect(data.status).toBe(500);
            expect(data.errObj).toEqual('API error');
        });
    });
});

describe('test getBookings', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.getBookings().then( (data) => {
            expect.assertions(1);
            expect(data.mockData).toEqual('test');
        });
    });
    test('error', () => {
        fetch.mockResponseOnce(JSON.stringify('API error'), { status: 500 });
        API.getBookings('lecture').catch((data) => {
            expect.assertions(2);
            expect(data.status).toBe(500);
            expect(data.errObj).toEqual('API error');
        });
    });
});

describe('test addBooking', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.addBooking('booking').then( (data) => {
            expect.assertions(1);
            expect(data).toBeNull();
        });
    });
    test('response not ok, json ok', () => {
        fetch.mockResponseOnce(JSON.stringify({err: 'API error'}), { status: 500 });
        API.addBooking('booking').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('response not ok, json null', () => {
        fetch.mockResponseOnce(null, { status: 500 });
        API.addBooking('booking').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('fetch rejected', () => {
        fetch.mockRejectOnce('error');
        API.addBooking('booking').catch( (data) => {
            expect.assertions(2);
            expect(data.errors[0].param).toEqual('Server');
            expect(data.errors[0].msg).toEqual('Cannot communicate');
        });
    });
});

describe('test deleteLectureById', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.deleteLectureById('lecture').then( (data) => {
            expect.assertions(1);
            expect(data).toBe('DONE');
        });
    });
    test('response not ok, json ok', () => {
        fetch.mockResponseOnce(JSON.stringify({err: 'API error'}), { status: 500 });
        API.deleteLectureById('lecture').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('response not ok, json null', () => {
        fetch.mockResponseOnce(null, { status: 500 });
        API.deleteLectureById('lecture').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('fetch rejected', () => {
        fetch.mockRejectOnce('error');
        API.deleteLectureById('lecture').catch( (data) => {
            expect.assertions(2);
            expect(data.errors[0].param).toEqual('Server');
            expect(data.errors[0].msg).toEqual('Cannot communicate');
        });
    });
});

describe('test cancelBooking', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.cancelBooking('booking').then( (data) => {
            expect.assertions(1);
            expect(data).toBeNull();
        });
    });
    test('response not ok, json ok', () => {
        fetch.mockResponseOnce(JSON.stringify({err: 'API error'}), { status: 500 });
        API.cancelBooking('booking').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('response not ok, json null', () => {
        fetch.mockResponseOnce(null, { status: 500 });
        API.cancelBooking('booking').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('fetch rejected', () => {
        fetch.mockRejectOnce('error');
        API.cancelBooking('booking').catch( (data) => {
            expect.assertions(2);
            expect(data.errors[0].param).toEqual('Server');
            expect(data.errors[0].msg).toEqual('Cannot communicate');
        });
    });
});

describe('test ChangeLecturemodeById', () => {
    test('no errors', () => {
        fetch.mockResponseOnce(JSON.stringify({ mockData: 'test' }));
        API.ChangeLecturemodeById('lecture').then( (data) => {
            expect.assertions(1);
            expect(data).toBe('DONE');
        });
    });
    test('response not ok, json ok', () => {
        fetch.mockResponseOnce(JSON.stringify({err: 'API error'}), { status: 500 });
        API.deleteLectureById('lecture').catch( (data) => {
            expect.assertions(1);
            expect(data.err).toEqual('API error');
        });
    });
    test('response not ok, json null', () => {
        fetch.mockResponseOnce(null, { status: 500 });
        API.deleteLectureById('lecture').catch( (data) => {
            expect.assertions(2);
            expect(data.errors[0].param).toEqual('Application');
            expect(data.errors[0].msg).toEqual('Cannot parse server response');
        });
    });
});