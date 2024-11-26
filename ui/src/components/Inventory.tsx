import { stringifyAmountValue } from '@agoric/ui-components';

type InventoryProps = {
  address: string;
  istPurse: Purse;
  itemsPurse: Purse;
};

const Inventory = ({ address, istPurse, itemsPurse }: InventoryProps) => (
  <div className="card inventory">
    <h3>My Wallet</h3>
    <div>

      <div style={{ textAlign: 'left' }}>
        <div>
          <b> Available IST: </b>
          {stringifyAmountValue(
            istPurse.currentAmount,
            istPurse.displayInfo.assetKind,
            istPurse.displayInfo.decimalPlaces,
          )}
        </div>
        <div>
          <b>Items in Cart:</b>
          {itemsPurse ? (
            <ul style={{ marginTop: 0, textAlign: 'left' }}>
              {(itemsPurse.currentAmount.value as CopyBag).payload.map(
                ([name, number]) => (
                  <li key={name}>
                    {String(number)} {name}
                  </li>
                ),
              )}
            </ul>
          ) : (
            'None'
          )}
        </div>
      </div>
    </div>
  </div>
);

export { Inventory };
