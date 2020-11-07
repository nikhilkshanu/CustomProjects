global class MovieController {
   public class PagedResult {
      @AuraEnabled
      public Integer pageSize { get; set; }

      @AuraEnabled
      public Integer page { get; set; }

      @AuraEnabled
      public Integer pages { get; set; }

      @AuraEnabled
      public Integer total { get; set; }

      @AuraEnabled
      public List<Movies__c> movies { get; set; }
  }
  
  public class Filter {
   @AuraEnabled
   public String searchKey { get; set; }

   @AuraEnabled
   public Decimal yearStart { get; set; }

   @AuraEnabled
   public Decimal yearEnd { get; set; }

   @AuraEnabled
   public Decimal minRevenue { get; set; }

   @AuraEnabled
   public Decimal maxRevenue { get; set; }

   @AuraEnabled
   public String genre { get; set; }

}
   @AuraEnabled(cacheable = true)
   public static PagedResult getMovies(
      Filter filter,
      Decimal pageSize,
      Decimal pageNumber){
         Integer pSize = (Integer) pageSize;
         String key = '%' + filter.searchKey + '%';
         Integer offset = ((Integer) pageNumber - 1) * pSize;
         PagedResult r = new PagedResult();
         r.pageSize = pSize;
         r.page = (Integer) pageNumber;
         Decimal yearStart = filter.yearStart;
         Decimal yearEnd = filter.yearEnd;
         Decimal minRevenue = filter.minRevenue;
         Decimal maxRevenue = filter.maxRevenue;
         String genre = filter.genre;
         system.debug(genre);
         String countSQL = 'SELECT count() FROM movies__c where name LIKE :key '+
         ' AND Year__c >= :yearStart AND Year__c <= :yearEnd ' +
         ' AND Revenue__c >= :minRevenue AND Revenue__c <= :maxRevenue ';
         
         if (!String.isBlank(filter.genre)) {
            countSQL = countSQL + 'AND Genre__c INCLUDES : genre ';
         }

         r.total = Database.countQuery(countSQL);
         r.pages = (Math.ceil(r.total / r.pageSize)).intValue();
         if (r.pages == 0) {
            r.pages = 1;
         }

         String sql = 'select id,name,Actor__c,Director__c,Genre__c,Rating__c,Revenue__c,Year__c from movies__c WHERE '+
         'name LIKE :key '+
         ' AND Year__c >= :yearStart AND Year__c <= :yearEnd ' +
         ' AND Revenue__c >= :minRevenue AND Revenue__c <= :maxRevenue ';
         if (!String.isBlank(filter.genre)) {
            sql = sql + 'AND Genre__c INCLUDES :genre ';
         }
         sql = sql + 'LIMIT :pSize OFFSET :offset';
         r.movies = Database.query(sql);
         system.debug(sql);
         system.debug(r.movies);
         return r;
         
   }
}
