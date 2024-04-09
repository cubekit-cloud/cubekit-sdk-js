import CubekitStorageClient from './CubekitStorageClient';

const client = new CubekitStorageClient({
	baseUrl:
		'http://cubekit-console-proxy-service-develop.cluster.it-aces.com/v1/service/storage/api/cd787c1b-ecab-4d7c-bb59-df0d7c921ed2teststorage',
	serviceKey: '2d7ba22bb31a40a49b51f4d600b53c5f',
});

test('test', () => {
	return client.createDirectory('/test').then((data) => {
		console.log('data', data);
		expect(data).toBe('peanut butter');
	});
});
