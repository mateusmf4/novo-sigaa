import { writable, type Writable } from 'svelte/store';
import type { UserState } from './sigaa/types';

export let userState: Writable<UserState | null> = writable(null);
