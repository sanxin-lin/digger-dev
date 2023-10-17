import { Command } from 'commander';
import { getCliVersion } from './shared/fs';

const program = new Command();

program.version(`digger-cli ${getCliVersion()}`).usage('<command> [options]');

program
  .command('dev')
  .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
  .option('-d --draft', 'Start the service in draft mode')
  .description('Run varlet development environment')
  .action(async options => {
    const { dev } = await import('./commands/dev.js');

    return dev(options);
  });
