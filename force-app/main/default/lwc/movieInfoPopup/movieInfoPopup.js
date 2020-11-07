import { LightningElement,api } from 'lwc';

const OFFSET_TOP = 234;
const OFFSET_RIGHT = 70;

export default class MovieInfoPopup extends LightningElement {
    isVisible;
    _movie;    
    _argx;
    _argy;

    @api
    show(element, movie) {
        this._movie = movie;
        const rect = element.getBoundingClientRect();
        this._argx = rect.right - OFFSET_RIGHT;
        this._argy = rect.top - OFFSET_TOP;
        this.isVisible = true;
    }

    @api
    hide() {
        this.isVisible = false;
    }

    get movie() {
        return this._movie;
    }

    get style() {
        return 'left:' + this._argx + 'px;top:' + this._argy + 'px';
    }

}