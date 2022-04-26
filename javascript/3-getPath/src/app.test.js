const elementPath = require('./app');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

test('getParent() return parent node', () => {

    document.documentElement.innerHTML = html.toString();

    const $parent = document.getElementById('liHome').parentNode;
    const result = elementPath.getParent(document.getElementById('liHome'));
    expect(result).toBe($parent);

});

test('getSelector() return element selector', () => {

    document.documentElement.innerHTML = html.toString();

    const result = elementPath.getSelector(document.getElementById('liHome'));
    expect(result).toBe('li.active');

});

test('getPath() return full element selector', () => {

    document.documentElement.innerHTML = html.toString();

    const result = elementPath.getPath(document.getElementById('liHome'));
    expect(result).toBe('body div div.navbar.navbar-inverse.navbar-static-top div.container ul.nav.navbar-nav li.active');

});