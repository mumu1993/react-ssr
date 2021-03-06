// initialize data & configuration

import initState from 'store/initalState'
import configureStore from 'redux-mock-store'
import { JSDOM } from 'jsdom'

const middlewares = []
const mockStore = configureStore(middlewares)
export const store = mockStore(initState)

//js dom
const { window } = new JSDOM(`'<!doctype html><html><body></body></html>`);

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);
