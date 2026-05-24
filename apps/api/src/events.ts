import { EventEmitter } from 'events';

export const eventEmitter = new EventEmitter();

export const EVENTS = {
  POS_ORDER: 'POS_ORDER',
  WHATSAPP_LOG: 'WHATSAPP_LOG',
  AD_IMPRESSION: 'AD_IMPRESSION',
};
