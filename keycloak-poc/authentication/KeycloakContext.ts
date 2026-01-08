import { createContext } from 'react';
import { KC_INITIAL_VALUE } from './KeycloakConstants';

export const KeycloakContext = createContext(KC_INITIAL_VALUE);