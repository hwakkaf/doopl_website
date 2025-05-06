import serverCreate from './server-create.js';
import serverRegisterMiddlewares from './server-register-middleware.js';
import serverRegisterLocations from './server-register-locations.js';
let server;

async function stopServer(server) {
	if (server) {
		await server.close();
		console.log('Website Server stopped.');
	}
}

const startNewServer = async () => {
	await stopServer(server);
	server = await serverRegisterLocations(await serverRegisterMiddlewares(await serverCreate()));
	try {
		await server.listen({
			port: Number(process.env.PORT),
			host: process.env.ADDRESS, // e.g., '127.0.0.1'
		});
		
		console.log("Website server started", process.env.PORT, process.env.ADDRESS);
	} catch (err) {
		console.error('Error starting website server:', err);
		process.exit(1);
	}

	return server;
}

await startNewServer();
export default startNewServer
