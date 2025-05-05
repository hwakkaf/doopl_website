export const configMain = {
	listener: {
		server_name: 'https://cms.e-lcom.sy',
		address: '0.0.0.0',
		port: 443,
		ssl: {
			folder: 'ssl',
			key: 'asterix.sgb.sy.key',
			cert: 'asterix.sgb.sy.crt'
		},
		settings: {
			logger: true,
			http2: true,
			https: {
				allowHTTP1: true,
			},
			trustProxy: false,
			ignoreTrailingSlash: true,
			bodyLimit: 10485760
		}
	},
  defaultLanguage: 'ar', // any data without language proprty is considered as arabic
	debug: true,
	log: true,
  mode: 'dev',
	security: {
		apis: [
			{
				name: 'cmsAPI',
				disabled: false,
				server: 'http://localhost:3008',
				authorization: {
					type: 'hyazs-api-key',
					value: 'p8Kdw0GCU8_2cdGNmAwCjAE2g8l48jEmIct2_EU0Pd2Ux8II0CAAwC8e'
				},
				cookieToHeader: [
					{
						cookie: 'client-cms-app',
						header: 'hyazs-session-key',
					}
				],
				isCSRF: false,
				credentials: 'hyazs-session-key',
				cascadeErrors: true
			}
		]
	},
}