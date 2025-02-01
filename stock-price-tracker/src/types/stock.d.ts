type DateString = `${number}-${number}-${number}`;

interface IStock {
    symbol: Uppercase<string>;
    name: string;
    exchange: string;
    assetType: string;
    ipoDate: DateString;
    delistingDate: null | DateString;
    status: string
}