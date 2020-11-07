import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class MovieTile extends NavigationMixin(LightningElement) {

    @api movie;

    handleMovieSelected() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                recordId: this.movie.Id
            }
        });
    }

    handleMouseOver() {
        this.dispatchEvent(new CustomEvent('peekenter'));
    }
    handleMouseOut() {
        this.dispatchEvent(new CustomEvent('peekleave'));
    }

    get avatarClass() {
        return (
            'slds-app-launcher__tile-figure symbol ' + this.movie.Rating__c
        );
    }

}