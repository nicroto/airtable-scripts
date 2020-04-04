output.markdown ("# Updating stock prices");

let table = base.getTable ("Monitored Stocks"),
    records = await table.selectRecordsAsync ();

await Promise.all (

    records.records.map (async record => {

        let stock = record.getCellValue ("Stock");

        if (! stock) {

            output.text ("Can't update the price of stock with no name");

            return;
        }

        output.text (`Updating price of ${stock}...`);

        // make request
        var requestResult = await fetch (
            `https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock}`
        ).then (r => r.json ());

        // print fetched data
        output.markdown (`${stock}'s price right now is: **$${requestResult.price}**`)

        // update record in table
        return await table.updateRecordAsync (record, {
            "Price": requestResult.price,
            "Price Date": new Date ()
        });
    })
);

output.markdown ("# Done!");