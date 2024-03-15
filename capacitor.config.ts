import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tchoupe.insistScanner',
  appName: 'insist-scanner',
  webDir: 'www',
  bundledWebRuntime:false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
