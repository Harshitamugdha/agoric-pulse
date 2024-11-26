import { FormEvent, useEffect, useState } from 'react';
import { TradePurchaser } from './TradePurchaser';  // Import the TradePurchaser component
import { stringifyAmountValue } from '@agoric/ui-components';
import Burger from '../assets/2.png';
import Coke from '../assets/3.png';
import Pizza from '../assets/4.png';
import Fries from '../assets/5.png';
import Softie from '../assets/6.png';
import hotdog from '../assets/9.png';
import taco from '../assets/10.png';
import pasta from '../assets/11.png';
import ice from '../assets/12.png';

const { entries, values } = Object;
const sum = (xs: bigint[]) => xs.reduce((acc, next) => acc + next, 0n);

const terms = {
  price: 250000n,
  maxItems: 10,
};

const nameToIcon = {
  coke: Coke,
  burger: Burger,
  fries: Fries,
  softie: Softie,
  pizza: Pizza,
  hotdog: hotdog,
  taco: taco,
  pasta: pasta,
  iceCream: ice,
} as const;

type ItemName = keyof typeof nameToIcon;
type ItemChoices = Partial<Record<ItemName, bigint>>;

const parseValue = (numeral: string, purse: Purse): bigint => {
  const { decimalPlaces } = purse.displayInfo;
  const num = Number(numeral) * 10 ** decimalPlaces;
  return BigInt(num);
};

export const Item = ({
  icon,
  label,
  value,
  offeredPrice,
  onChange,
  inputClassName,
  inputStep,
}: {
  icon?: string;
  label: string;
  value: number | string;
  offeredPrice: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputClassName: string;
  inputStep?: string;
}) => (
  <div className="item-col">
    <label htmlFor={label}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </label>
    {icon && <img className="piece" src={icon} title={label} />}
    
    {/* Conditionally render "General Offer" text only if the label is not "IST" */}
    {label !== 'Offer a minimum price:' && <label className="of">IST {offeredPrice}</label>}
    
    <input
      title={label}
      type="number"
      min="0"
      max="10"
      value={value}
      step={inputStep || '1'}
      onChange={onChange}
      className={`trade-input ${inputClassName}`}
    />
  </div>
);


type TradeProps = {
  makeOffer: (giveValue: bigint, wantChoices: Record<string, bigint>) => void;
  istPurse: Purse;
  walletConnected: boolean;
};

const Trade = ({ makeOffer, istPurse, walletConnected }: TradeProps) => {
  const [giveValue, setGiveValue] = useState(terms.price);
  const [choices, setChoices] = useState<ItemChoices>({});  // Start with empty choices

  const [prices, setPrices] = useState<Record<ItemName, string>>({} as Record<ItemName, string>);
  const [averagePrice, setAveragePrice] = useState<number>(0);

  const [showTradePurchaser, setShowTradePurchaser] = useState(false);  // State to control visibility of TradePurchaser

  useEffect(() => {
    const generatedPrices = Object.keys(nameToIcon).reduce((acc, item) => {
      acc[item as ItemName] = (Math.random() * 9 + 1).toFixed(2);
      return acc;
    }, {} as Record<ItemName, string>);
    setPrices(generatedPrices);

    const priceValues = Object.values(generatedPrices).map(Number);
    const avg = priceValues.reduce((acc, val) => acc + val, 0) / priceValues.length;
    setAveragePrice(avg);
  }, []);

  useEffect(() => {
    const priceValues = Object.values(prices).map(Number);
    const avg = priceValues.reduce((acc, val) => acc + val, 0) / priceValues.length;
    setAveragePrice(avg);

    if (istPurse) {
      const defaultAmount = parseValue(avg.toFixed(2), istPurse);
      setGiveValue(defaultAmount);
    }
  }, [prices, istPurse]);

  const changeChoice = (ev: FormEvent) => {
    if (!ev.target) return;
    const elt = ev.target as HTMLInputElement;
    const title = elt.title as ItemName;
    if (!title) return;
    const qty = BigInt(elt.value);
    const { [title]: _old, ...rest }: ItemChoices = choices;
    const newChoices = qty > 0 ? { ...rest, [title]: qty } : rest;
    setChoices(newChoices);
  };

  return (
    <>
      <div className="trade">
        {/* Fast Food Section */}
        <div className="row-center section">
          <h3>Fast Food</h3>
          {entries(nameToIcon).map(([title, icon]) => {
            if (['burger', 'hotdog', 'fries', 'pizza', 'iceCream', 'pasta'].includes(title)) {
              return (
                <Item
                  key={title}
                  icon={icon}
                  value={Number(choices[title as ItemName] || 0n)}
                  label={title}
                  offeredPrice={prices[title as ItemName] || '0.00'}
                  onChange={changeChoice}
                  inputClassName={sum(values(choices)) <= terms.maxItems ? 'ok' : 'error'}
                />
              );
            }
            return null;
          })}
        </div>

        {/* Snacks Section */}
        <div className="row-center section">
          <h3>Snacks</h3>
          {entries(nameToIcon).map(([title, icon]) => {
            if (['softie', 'taco', 'iceCream'].includes(title)) {
              return (
                <Item
                  key={title}
                  icon={icon}
                  value={Number(choices[title as ItemName] || 0n)}
                  label={title}
                  offeredPrice={prices[title as ItemName] || '0.00'}
                  onChange={changeChoice}
                  inputClassName={sum(values(choices)) <= terms.maxItems ? 'ok' : 'error'}
                />
              );
            }
            return null;
          })}
        </div>

        {/* Meals & Dishes Section */}
        <div className="row-center section">
          <h3>Meals & Dishes</h3>
          {entries(nameToIcon).map(([title, icon]) => {
            if (['pasta', 'coke'].includes(title)) {
              return (
                <Item
                  key={title}
                  icon={icon}
                  value={Number(choices[title as ItemName] || 0n)}
                  label={title}
                  offeredPrice={prices[title as ItemName] || '0.00'}
                  onChange={changeChoice}
                  inputClassName={sum(values(choices)) <= terms.maxItems ? 'ok' : 'error'}
                />
              );
            }
            return null;
          })}
        </div>

        {/* Button to toggle visibility of TradePurchaser */}
        <button className='shower' onClick={() => setShowTradePurchaser(!showTradePurchaser)}>
          {showTradePurchaser ? 'Close' : 'Checkout'}
        </button>

        {/* Conditionally render TradePurchaser component */}
        {showTradePurchaser && (
          <TradePurchaser
            makeOffer={makeOffer}
            istPurse={istPurse}
            walletConnected={walletConnected}
            giveValue={giveValue}
            choices={choices}
            prices={prices}
          />
        )}
      </div>
    </>
  );
};

export { Trade };
