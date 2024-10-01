import { SubCommand } from 'nest-commander';
import { log, logerror, Wallet, AddressType } from 'src/common';
import { BaseCommand, BaseCommandOptions } from '../base.command';
import { ConfigService, WalletService } from 'src/providers';
import { Inject } from '@nestjs/common';

interface AddressCommandOptions extends BaseCommandOptions {
}

@SubCommand({
  name: 'address',
  description: 'Show address',
})
export class AddressCommand extends BaseCommand {
  constructor(
    @Inject() protected readonly walletService: WalletService,
    @Inject() protected readonly configService: ConfigService,
  ) {
    super(walletService, configService);
  }

  async cat_cli_run(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputs: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: AddressCommandOptions,
  ): Promise<void> {
    try {
      const address = this.walletService.getAddress();

      const wallet: Wallet = this.walletService.queryWallet(options.name);

      const wif = this.walletService.getWif()

      wallet['addressType'] = AddressType.P2TR
      wallet['address'] = `${address}`
      wallet['wif'] = `${wif}`
  
      this.walletService.createWallet(options.name, wallet);
      
      log(`Your address is ${address}`);
    } catch (error) {
      logerror('Get address failed!', error);
    }
  }

}
