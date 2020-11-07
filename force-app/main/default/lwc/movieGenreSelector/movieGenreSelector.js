import { LightningElement } from 'lwc';

export default class MovieGenreSelector extends LightningElement {
    handleChange(event) {
        this.dispatchEvent(new CustomEvent('change'), {
            detail: { value: event.target.value }
        });
    }
}