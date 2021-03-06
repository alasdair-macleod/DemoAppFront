// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// Here animations have been disabled to allow e2e tests to run sucessfully.
import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  name: 'dev',
  serverLoggingUrl: 'http://127.0.0.1:5000/api/clientsidelog',
  calculateUrl: 'http://127.0.0.1:5000/api/calculate',
  loglevel: NgxLoggerLevel.DEBUG,
  serverLoglevel: NgxLoggerLevel.WARN,
  disableAnimations: true
};
