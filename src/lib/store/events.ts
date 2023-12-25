// liteEventStore.ts
import { type IEvent, Event } from '$lib/types/event';
import { writable } from 'svelte/store';


class EventStore<T> implements IEvent<T> {
  private event: Event<T>;

  constructor() {
    this.event = new Event<T>();
  }

  public on(handler: { (...args: T[]): void }): void {
    this.event.on(handler);
  }

  public off(handler: { (...args: T[]): void }): void {
    this.event.off(handler);
  }

  public trigger(...args: T[]): void {
    this.event.trigger(...args);
  }

  public expose(): IEvent<T> {
    return this.event.expose();
  }
}

export function createEventStore<T>() {
  const eventStore = new EventStore<T>();

  const { subscribe, set } = writable<T[] | null>(null, () => {
  });

  function onEvent(handler: { (...args: T[]): void }): () => void {
    eventStore.on(handler);

    return () => {
      eventStore.off(handler);
    };
  }

  return {
    subscribe,
    on: onEvent,
    trigger: (...args: T[]) => {
      eventStore.trigger(...args);
      set(args);
    },
  };
}

export const onTurnEnd = createEventStore<void>();
export const onTurnStart = createEventStore<void>();
export const onCombatStart = createEventStore<void>();
export const onCombatEnd = createEventStore<void>();