const getParent = (el) => {
    return el.parentNode;
}

const getSelector = (el) => {
    let currSelector = el.tagName.toLowerCase();
    if (el.classList && el.classList.length > 0) {
        el.classList.forEach(x => { currSelector += '.' + x })
    }

    return currSelector;
}

function getPath(el) {
    let selectorList = [];
    while (el.nodeName.toLowerCase() != 'html') {
        if (el.hasAttribute('id')) {
            selectorList.unshift(`#${el.id}`);
            break;
        }
        let currSelector = getSelector(el);
        selectorList.unshift(currSelector);
        el = getParent(el);
    }

    return selectorList.join(' ');
}

module.exports.getParent = getParent;
module.exports.getSelector = getSelector;
module.exports.getPath = getPath;