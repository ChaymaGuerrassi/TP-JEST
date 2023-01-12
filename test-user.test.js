const fetch = require('cross-fetch');
const route = "test-user";

function testGetId(url) {
    return fetch(url, {
        method: 'GET'
    }).then((response => response.json()))
    .then((data) => {
        expect(data.id).toBeGreaterThan(100);
        expect(data.firstName).not.toBe('');
        expect(data.lastName).not.toBe('');
    });
}
function testEmailFormat(url, regex) {
    return fetch(url, {
        method: 'GET'
    }).then((response => response.json()))
    .then((data) => {
        if (!data.email.match(regex))
            console.log(data.email);
        expect(data.email).toMatch(regex);
    });
}
function testRegistrationFormat(url, regex) {
    const date = new Date('2020-01-01');
    return fetch(url, {
        method: 'GET'
    }).then((response => response.json()))
    .then((data) => {
        expect(data.registeredAt.split('T')[0]).toMatch(regex);
        expect(new Date(data.registeredAt.split('T')[0]) > date).toBeTruthy();
    });
}


const sample = 20;

test("Not reserved ID's and valid username", () => {
    for (let i = 0; i < sample; i++) {
        return testGetId(`https://api-test-jest.up.railway.app/${route}`);
    }
});
test("Correct email format 1", () => {
    for (let i = 0; i < sample; i++) {
        return testEmailFormat(`https://api-test-jest.up.railway.app/${route}`, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/);
    }
});
test("Correct email format 2", () => {
    for (let i = 0; i < sample; i++) {
        return testEmailFormat(`https://api-test-jest.up.railway.app/${route}`, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
});
test("Correct registration date", () => {
    for (let i = 0; i < sample; i++) {
        return testRegistrationFormat(`https://api-test-jest.up.railway.app/${route}`, /\d{4}-\d{2}-\d{2}/);
    }
});
