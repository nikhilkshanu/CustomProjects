public with sharing class CurrencyConversionController {
    @AuraEnabled
    public static map<string,Object> retrieveCurrencyConversionrates(String strEndPointURL){
        map<string,Object> mapjsondata=new map<string,Object>();
        String strresponse=null;
        if(string.isNotBlank(strEndPointURL))
        {
            system.debug(strEndPointURL);
            HttpRequest httpRequest =new httpRequest();
            httpRequest.setEndpoint(strEndPointURL);
            httpRequest.setMethod('GET');
            httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionID());
            httpRequest.setHeader('Content-Type', 'application/json');
            
            try {
                Http http =new Http();
                HttpResponse httpResponse=http.send(httpRequest);
                if(httpResponse.getStatusCode()==200)
                {
                    strresponse=httpResponse.getBody();
                }else {
                    throw new CalloutException(httpResponse.getBody());
                }
               
            } catch (Exception e) {
                throw e;
            }
        }
        if(String.isNotBlank(strresponse))
        {
            mapjsondata=(map<string,Object>)JSON.deserializeUntyped(strresponse);
            System.debug('mapjsondata=> '+mapjsondata);
        }
        return mapjsondata;
        
        
        
    }
   
}
