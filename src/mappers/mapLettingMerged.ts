import { NewLettingMerged } from "type/database.interface";

export function mapLettingMerged(document: any): NewLettingMerged {
  const { coordinates } = document.property.geocode;
  const returnable = {
    id: document._id,
    members: document.members,
    transaction_date: document.transactionDate,
    on_market_date: document.onMarketDate,
    time_to_disposal: document.timeToDisposal,
    display_address: document.displayAddress,
    lease: document.lease,
    unit: document.unit,
    meta: document.meta,
    geocode: `POINT(${coordinates[0]} ${coordinates[1]})`,
  };

  return returnable;
}
