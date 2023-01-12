const fetch = require('cross-fetch');

function testHealtcheck(url) {
	return fetch(url).then((response) => {
		expect(response.status).not.toBeGreaterThanOrEqual(400);
	});
}
test("Status : Request fullfiled", () => {
	return testHealtcheck("https://api-test-jest.up.railway.app/healthcheck");
});