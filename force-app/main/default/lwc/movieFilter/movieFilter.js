import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class MovieFilter extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    handleSearchKeyChange(event) {
        if (event.detail !== undefined) {
            fireEvent(this.pageRef, 'imdb__moviefilterchange', {
                searchKey: event.detail
            });
        }
    }

    handleMovieGenreChange(event) {
        if (event.detail) {
            fireEvent(this.pageRef, 'imdb__moviefilterchange', {
                genre: event.detail.value
            });
        }
    }
    
}