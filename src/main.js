const pug = require('pug');
const fs = require('node:fs');
const puppeteer = require('puppeteer');

const pages = [
	{
		name: 'Page 1',
		sections: [
			{
				name: 'Page 1 Section 1'
			},
			{
				name: 'Page 1 Section 2'
			}
		]
	},
	{
		name: 'Page 2',
		sections: [
			{
				name: 'Page 2 Section 1'
			},
			{
				name: 'Page 2 Section 2'
			}
		]
	}
]

const compiledFunction = pug.compileFile('./src/template.pug');

const html = compiledFunction({
	pages: pages
});

async function generatePDF(html) {
	const browser = await puppeteer.launch({
		headless: true,
		userDataDir: false
	});
	const page = await browser.newPage();
	await page.setContent(html);
	const pdf = await page.pdf({
		printBackground: true
	});
	await browser.close();
	fs.writeFileSync('./out/index.pdf', pdf);
}

(async () => {
	await fs.writeFile('./out/index.html', html, _=>_);
	await generatePDF(html);
})();
