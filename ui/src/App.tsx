import React, { useEffect, useState } from 'react';
import logo from '../src/assets/logo.png'; // Import the logo
import connectIcon from '../src/assets/icon.png'; // Import the connect icon image
import './App.css';
import {
  makeAgoricChainStorageWatcher,
  AgoricChainStoragePathKind as Kind,
} from '@agoric/rpc';
import { create } from 'zustand';
import {
  makeAgoricWalletConnection,
  suggestChain,
} from '@agoric/web-components';
import { subscribeLatest } from '@agoric/notifier';
import { makeCopyBag } from '@agoric/store';
import { Inventory } from './components/Inventory';
import { Trade } from './components/Trade';

const { entries, fromEntries } = Object;

type Wallet = Awaited<ReturnType<typeof makeAgoricWalletConnection>>;

const ENDPOINTS = {
  RPC: 'http://localhost:26657',
  API: 'http://localhost:1317',
};

const codeSpaceHostName = import.meta.env.VITE_HOSTNAME;
const codeSpaceDomain = import.meta.env.VITE_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

if (codeSpaceHostName && codeSpaceDomain) {
  ENDPOINTS.API = `https://${codeSpaceHostName}-1317.${codeSpaceDomain}`;
  ENDPOINTS.RPC = `https://${codeSpaceHostName}-26657.${codeSpaceDomain}`;
} else if (!codeSpaceHostName || !codeSpaceDomain) {
  console.error(
    'Missing environment variables: VITE_HOSTNAME or VITE_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN',
  );
}

const watcher = makeAgoricChainStorageWatcher(ENDPOINTS.API, 'agoriclocal');

interface AppState {
  wallet?: Wallet;
  offerUpInstance?: unknown;
  brands?: Record<string, unknown>;
  purses?: Array<Purse>;
}

const useAppStore = create<AppState>(() => ({}));

const setup = async () => {
  watcher.watchLatest<Array<[string, unknown]>>(
    [Kind.Data, 'published.agoricNames.instance'],
    instances => {
      console.log('Got instances:', instances);
      useAppStore.setState({
        offerUpInstance: instances.find(([name]) => name === 'offerUp')?.[1],
      });
    },
  );

  watcher.watchLatest<Array<[string, unknown]>>(
    [Kind.Data, 'published.agoricNames.brand'],
    brands => {
      console.log('Got brands:', brands);
      useAppStore.setState({ brands: fromEntries(brands) });
    },
  );
};

const connectWallet = async () => {
  await suggestChain('https://local.agoric.net/network-config');
  const wallet = await makeAgoricWalletConnection(watcher, ENDPOINTS.RPC);
  useAppStore.setState({ wallet });

  const { pursesNotifier } = wallet;
  for await (const purses of subscribeLatest<Purse[]>(pursesNotifier)) {
    console.log('Got purses:', purses);
    useAppStore.setState({ purses });
  }
};

const makeOffer = (giveValue: bigint, wantChoices: Record<string, bigint>) => {
  const { wallet, offerUpInstance, brands } = useAppStore.getState();
  if (!offerUpInstance) throw new Error('No contract instance found');
  if (!(brands && brands.IST && brands.Item))
    throw new Error('Brands not available');

  const value = makeCopyBag(entries(wantChoices));
  const want = { Items: { brand: brands.Item, value } };
  const give = { Price: { brand: brands.IST, value: giveValue } };

  wallet?.makeOffer(
    {
      source: 'contract',
      instance: offerUpInstance,
      publicInvitationMaker: 'makeTradeInvitation',
    },
    { give, want },
    undefined,
    (update: { status: string; data?: unknown }) => {
      if (update.status === 'error') {
        alert(`Offer error: ${update.data}`);
      } else if (update.status === 'accepted') {
        alert('Offer accepted');
      } else if (update.status === 'refunded') {
        alert('Offer rejected');
      }
    },
  );
};

function App() {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // State to manage connect button visibility

  useEffect(() => {
    setup();
  }, []);

  const { wallet, purses } = useAppStore(({ wallet, purses }) => ({
    wallet,
    purses,
  }));

  const istPurse = purses?.find(p => p.brandPetname === 'IST');
  const itemsPurse = purses?.find(p => p.brandPetname === 'Item');

  const tryConnectWallet = async () => {
    try {
      await connectWallet();
      setIsConnected(true); // Hide connect button after successful connection
    } catch (err) {
      switch (err.message) {
        case 'KEPLR_CONNECTION_ERROR_NO_SMART_WALLET':
          alert('No smart wallet at that address');
          break;
        default:
          alert(err.message);
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {/* Only show the button if the wallet is not connected */}
        {!wallet && (
          <button className="connect-button" onClick={tryConnectWallet}>
            <img src={connectIcon} alt="Connect Wallet" className="connect-icon" />
            Connect Wallet
          </button>
        )}
      </nav>

      {/* Inventory and Trade */}
      {wallet && istPurse ? (
        <>
          {inventoryVisible && (
            <div className="inventory-dropdown">
              <button
                className="close-btn"
                onClick={() => setInventoryVisible(false)}
              >
                X
              </button>
              <Inventory
                address={wallet.address}
                istPurse={istPurse}
                itemsPurse={itemsPurse as Purse}
              />
            </div>
          )}
        </>
      ) : (
        console.log()
      )}
      
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <button
          className='trigger' 
          onClick={() => setInventoryVisible(!inventoryVisible)}
          style={{ width: '100%' }}
        >
          {inventoryVisible ? 'Hide Inventory' : 'Show Inventory'}
        </button>
      </div>

      <div className="card">
        <Trade
          makeOffer={makeOffer}
          istPurse={istPurse as Purse}
          walletConnected={!!wallet}
        />
      </div>
    </>
  );
}

export default App;
