export interface MacActions {
  setLogin: (value: boolean) => void;
  shutMac: (e: React.MouseEvent) => void;
  sleepMac: (e: React.MouseEvent) => void;
  restartMac: (e: React.MouseEvent) => void;
} 