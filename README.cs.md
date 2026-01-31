# Halir

## CLI

### Vytvoření vlastního (HSTON) CSV transakcí (en) z Degiro transakcí (en)

```sh
npm run csvToHstonFile ./Degiro/Transactions-en.csv ./_Hston.json\
 && OUTPUT_LOCALES=en OUTPUT_SEPARATOR=";" OUTPUT_COLUMNS="id,date,time,product,isin,referenceExchange,venue,quantity,price,priceCurrency,localValue,localValueCurrency,value,valueCurrency,exchangeRate,fees,feesCurrency,totalTotal,totalTotalCurrency,orderId" npm run hstonToCsvFile ./_Hston.json ./Degiro/Transactions.csv\
 && rm ./_Hston.json
```
