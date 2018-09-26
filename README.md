# Shopee ID - Front End Web Test

This is a foreign exchange currency app in which calculates a converted foreign exchange currency using the Foreign Exchange Rates API https://exchangeratesapi.io/.

The app will consist of:
1. A text input specifying the currency input amount of base currency, USD.
    Initial default value is 1.00.
    Base currency may be hardcoded to USD
2. A list with the following values:
    > Target currency -- together with the details
    > Calculated converted amount. Note that the calculated amount should change whenever the input amount changes.
    > Current exchange rate
    > A (-) button to remove the target currency (I made a remove button instead)
3. An option to add more currency to the list
    Upon click, user can input their own currency code via dropdown menu and submit

List of currencies that have to be supported are as follows:
USD
CAD
IDR
GBP
CHF
SGD
INR
MYR
JPY
KRW 

To enable this app, via terminal:
1. Go to the file stored "shirley-currency"
2. Inside the file, type $ npm install
3. After installed, type $ npm start
4. It should direct you to see the app in the browser

To see the code, I uploaded the file to codeanywhere Cloud IDE via this link: https://codeanywhere.com/s/l/ol0YA7XvH7fki4XJkcWe5723gNsB0p9YbsyQ6wP3IrfWOnCTB1GarrapwJkpeSjm
