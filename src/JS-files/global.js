export { dom, focusUp, focusDown };

import '../CSS-files/global.css';

const dom = (() => {
    const createDiv = (parent, attribute, attributeName) => {
        const div = document.createElement('div');
        div.setAttribute(attribute, attributeName);
        parent.appendChild(div);
        return div;
    };

    const createH = (parent, text, number, attribute, attributeName) => {
        const h = document.createElement(`h${number}`);
        h.textContent = text;
        parent.appendChild(h);
        h.setAttribute(attribute, attributeName);
        return h;
    };

    const createP = (parent, text, attribute, attributeName) => {
        const p = document.createElement('p');
        p.textContent = text;
        parent.appendChild(p);
        p.setAttribute(attribute, attributeName);
        return p;
    };

    const createBtn = (parent, type, attribute, attributeName, text) => {
        const btn = document.createElement('button');
        parent.appendChild(btn);
        btn.type = type;
        btn.setAttribute(attribute, attributeName);
        btn.textContent = text;
        return btn;
    };

    const createImg = (parent, src, attribute, attributeName) => {
        const img = document.createElement('img');
        img.src = src;
        img.setAttribute(attribute, attributeName);
        parent.appendChild(img);
        return img;
    };

    const createLabel = (parent, text, attribute, attributeName) => {
        const label = document.createElement('label');
        label.textContent = text;
        label.setAttribute(attribute, attributeName);
        parent.appendChild(label);
        return label;
    };
    return { createDiv, createH, createP, createBtn, createImg, createLabel };
})();

const focusUp = (parent, child) => {
    const focusDiv = document.createElement('div');
    focusDiv.id = 'focus-div';
    parent.appendChild(focusDiv);
    focusDiv.appendChild(child);
    focusDiv.classList.add('focus-up');
};

const focusDown = () => {
    const focusDiv = document.querySelector('#focus-div');
    focusDiv.remove();
};
