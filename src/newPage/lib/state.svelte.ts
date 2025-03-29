import { writable, type Writable } from 'svelte/store';
import type { UserState } from './sigaa/types';

export const userState: Writable<UserState | null> = writable(null);

export const sessaoExpirada = writable(false);
