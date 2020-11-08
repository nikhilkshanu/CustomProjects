import { LightningElement,track } from 'lwc';
import getCurrencyData from '@salesforce/apex/CurrencyConversionController.retrieveCurrencyConversionrates';
const options=
[
    {label:'USD',value:'USD'},
    {label:'EUR',value:'EUR'},
    {label:'CAD',value:'CAD'},
    {label:'GBP',value:'GBP'},
    {label:'INR',value:'INR'}
];
export default class currencyConverterLWC extends LightningElement {
    @track fromCurrencyValue;
    @track toCurrencyValue;
    @track options=options;
    @track toCurrencyOptions=options;
    @track conversionData;

    handleFromCurrencyChange(event)
    {
        this.fromCurrencyValue=event.detail.value;
        console.log('this.fromCurrencyValue=> '+this.fromCurrencyValue);
    }

    handleToCurrencyChange(event)
    {
        this.toCurrencyValue=event.detail.value;
        console.log('this.toCurrencyValue=> '+this.toCurrencyValue);
    }
    //4RL2Q8LPJI30162A
    //0KMY1V3TUKOMZ4PA
    //0MM30YS09GBFAVDX
     handleCurrencyConversion()
    {
        //rest api call
        //check the response
        //display the response
        let endpoint='https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+this.fromCurrencyValue+'&to_currency='+this.toCurrencyValue
        +'&apikey=0KMY1V3TUKOMZ4PA';
        getCurrencyData({strEndPointURL : endpoint})
        .then(data =>{
            let objData={
                From_Currency_Name:'',
                From_Currency_Code:'',
                To_Currency_Name:'',
                To_Currency_Code:'',
                Last_Refreshed:'',
                Exchange_rate: '',
                Note: ''
            };
    
      
        window.console.log('jsonresponse ===>'+JSON.stringify(data));
        let exchangeData=data['Realtime Currency Exchange Rate'];
        window.console.log('exchangeData==>'+JSON.stringify(exchangeData));

        objData.From_Currency_Code=exchangeData['1. From_Currency Code'];
        objData.From_Currency_Name=exchangeData['2. From_Currency Name'];
        objData.To_Currency_Name=exchangeData['4. To_Currency Name'];
        objData.To_Currency_Code=exchangeData['3. To_Currency Code'];
        objData.Last_Refreshed=exchangeData['6. Last Refreshed'];
        objData.Exchange_rate = exchangeData['5. Exchange Rate'];
        objData.Note = exchangeData['Note'];
        this.conversionData=objData;
        window.console.log('objData => '+JSON.stringify(objData));
    }).catch(error=>{
        window.console.log('callout error '+JSON.stringify(error));
    })
    }
}