const fetch = require('cross-fetch');
const route = "test-post";
const correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function testBadTokenRequest(url, token) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then((response => {
        expect(response.status).toEqual(403);
    }));
}
function testCorrectTokenRequest(url, token) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then((response => {
        expect(response.status).toEqual(200);
    }));
}

async function testResponseLength(url, token, numberOfElements) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        if(response.ok) {
            const data = await response.json();
            expect(data.length).toBeLessThanOrEqual(numberOfElements);
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        console.log(err);
    }
}

async function testLastElem(url, token, numberOfElements) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        if(response.ok) {
            const data = await response.json();
            expect(data[numberOfElements-1]).toEqual(2008);
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        console.log(err);
    }
}



test("Wrong token access", () => {
    return testBadTokenRequest(`https://api-test-jest.up.railway.app/${route}`, 'wrongtoken');
});
test("Correct token access", () => {
    return testCorrectTokenRequest(`https://api-test-jest.up.railway.app/${route}`, correctToken);
});
test("Test response data length", () => {
    return testResponseLength(`https://api-test-jest.up.railway.app/test-post`, correctToken, 4);
});
test("Test last element", () => {
    return testLastElem(`https://api-test-jest.up.railway.app/test-post`, correctToken, 4);
});
