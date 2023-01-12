const fetch = require('cross-fetch');
const route = "test-get";

function testGet(url) {
    return fetch(url, {
        method: 'GET'
    }).then((response => response.json()))
    .then((data) => {
        expect(data.brand).toEqual('Ford');
        expect(data.model).toEqual('Mustang');
        expect(data.year).toEqual(1969);
    });
}
test("Status : Request fullfiled", () => {
    return testGet(`https://api-test-jest.up.railway.app/${route}`);
});