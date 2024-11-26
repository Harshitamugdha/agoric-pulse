// TradePurchaser.tsx
import { stringifyAmountValue } from '@agoric/ui-components';
import { Item } from './Trade';  // Import Item from Trade.tsx to reuse the Item component

type TradePurchaserProps = {
  makeOffer: (giveValue: bigint, wantChoices: Record<string, bigint>) => void;
  istPurse: Purse;
  walletConnected: boolean;
  giveValue: bigint;
  choices: Record<string, bigint>;
  prices: Record<string, string>;
};

const TradePurchaser = ({
  makeOffer,
  istPurse,
  walletConnected,
  giveValue,
  choices,
  prices,
}: TradePurchaserProps) => {
  return (
    <div className="trade-purchaser">
      <div className="row-center ist-card">
        <Item
          key="IST"
          value={
            istPurse
              ? stringifyAmountValue(
                  { ...istPurse.currentAmount, value: giveValue },
                  istPurse.displayInfo.assetKind,
                  istPurse.displayInfo.decimalPlaces,
                )
              : '0.00'
          }
          label="Offer a minimum price:"
          offeredPrice="0.00"
          isIST={true}
          onChange={(ev) => {
            if (istPurse) {
              setGiveValue(parseValue(ev?.target?.value, istPurse));
            }
          }}
          inputClassName={giveValue >= 250000n ? 'ok' : 'error'}
          inputStep="0.01"
        />
        {walletConnected && (
          <button
            onClick={() => makeOffer(giveValue, choices)}
            className="make-offer-button"
          >
            Make an Offer
          </button>
        )}
      </div>
    </div>
  );
};

export { TradePurchaser };
