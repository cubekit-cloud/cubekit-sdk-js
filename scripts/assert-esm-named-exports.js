/**
 * Guard against a one-line minified ESM barrel.
 * Next.js Turbopack cannot resolve `export{O as ApiClientError}` (CUBV2-625).
 */
const fs = require('node:fs');
const path = require('node:path');

const esmPath = path.join(__dirname, '../dist/esm/index.js');
const esm = fs.readFileSync(esmPath, 'utf8');

if (/\bexport\{/.test(esm)) {
	console.error('dist/esm/index.js uses minified `export{…}` — Turbopack will miss named exports.');
	process.exit(1);
}

const required = [
	'ApiClientError',
	'createFormatClient',
	'passthroughItemSchema',
	'parseApiEnvelope',
	'fetchAxiosAdapter',
];
for (const name of required) {
	if (!esm.includes(name)) {
		console.error(`dist/esm/index.js is missing export name ${name}`);
		process.exit(1);
	}
}

if (!/export\s*\{[\s\S]*\bApiClientError\b/.test(esm)) {
	console.error('dist/esm/index.js does not contain a readable named export of ApiClientError.');
	process.exit(1);
}

console.log('ESM named exports are readable (Turbopack-safe).');
