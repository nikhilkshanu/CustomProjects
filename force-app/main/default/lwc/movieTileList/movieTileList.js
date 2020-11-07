import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import loadMovies from '@salesforce/apex/MovieController.getMovies';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
const PAGE_SIZE = 9;
export default class MovieTileList extends LightningElement {
    error;
    page = 1;

    _filter = {
        searchKey: '',
        genre: '',
        yearStart: 2005,
        yearEnd: 2025,
        minRevenue: 0,
        maxRevenue: 999999999        
    };

    @wire(CurrentPageReference) pageRef;

    @wire(loadMovies, {
        filter: '$_filter',
        pageSize: PAGE_SIZE,
        pageNumber: '$page'
    })
    wiredMovies;
    
    connectedCallback() {
        registerListener(
            'imdb__moviefilterchange',
            this.handleMovieFilterChange,
            this
        );
        registerListener(
            'imdb__returnrangechange',
            this.handleReturnRangeChange,
            this
        );
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    
    handlePagePrevious() {
        this.page = this.page - 1;
    }

    handlePageNext() {
        this.page = this.page + 1;
    }

    handleMovieFilterChange(event) {
        if (event.searchKey !== undefined) {
            this._filter.searchKey = event.searchKey;
        }
        if (event.genre !== undefined) {
            this._filter.genre = event.genre;
        }
        this._filter = Object.assign({}, this._filter);
        this.page = 1;
    }

    
    handleReturnRangeChange(event) {
        const filterName = event.filterName;
        const minValue = event.minValue;
        const maxValue = event.maxValue;
        if (filterName === 'year') {
            this._filter.yearStart = minValue;
            this._filter.yearEnd = maxValue;
        } else if (filterName === 'revenue') {
            this._filter.minRevenue = minValue;
            this._filter.maxRevenue = maxValue;
        }
        this._filter = Object.assign({}, this._filter);
        this.page = 1;
    }


    handlePeekEnter(event) {
        const popup = this.template.querySelector('c-movie-info-popup');
        popup.show(event.target, event.target.movie);
    }

    handlePeekLeave() {
        const popup = this.template.querySelector('c-movie-info-popup');
        popup.hide();
    }
}