import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'projet',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true

  }
};

export default config;
