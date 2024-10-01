export enum AddressType {
  P2WPKH = 'p2wpkh',
  P2TR = 'p2tr',
}

export interface Wallet {
  name: string;
  accountPath: string;
  addressType?: AddressType;
  address?: string;
  mnemonic: string;
  wif?: string;
}
