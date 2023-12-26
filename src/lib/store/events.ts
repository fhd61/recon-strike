import { type IEvent, Event } from '$lib/types/event';
import { writable } from 'svelte/store';

/**
 * Implementation of an event store using the {@link Event} class.
 *
 * @template T - The type of data to be passed with the event.
 */
class EventStore<T> implements IEvent<T> {
  /**
   * The underlying event instance.
   *
   * @private
   */
  private event: Event<T>;

  /**
   * Creates an instance of the {@link EventStore} class.
   */
  constructor() {
    this.event = new Event<T>();
  }

  /**
   * Subscribe to the event and provide a callback function to handle the event.
   *
   * @param {(...args: T[]) => void} handler - The callback function to handle the event.
   */
  public on(handler: { (...args: T[]): void }): void {
    this.event.on(handler);
  }

  /**
   * Unsubscribe from the event by providing the callback function used in the `on` method.
   *
   * @param {(...args: T[]) => void} handler - The callback function to be unsubscribed.
   */
  public off(handler: { (...args: T[]): void }): void {
    this.event.off(handler);
  }

  /**
   * Trigger the event with optional data.
   *
   * @param {...T[]} args - Optional data to be passed with the event.
   */
  public trigger(...args: T[]): void {
    this.event.trigger(...args);
  }

  /**
   * Expose the event for external use.
   *
   * @returns {IEvent<T>} - The exposed event interface.
   */
  public expose(): IEvent<T> {
    return this.event.expose();
  }
}

/**
 * Creates an instance of the {@link EventStore} class.
 *
 * @template T - The type of data to be passed with the event.
 * @returns {Object} - An object with methods to subscribe, unsubscribe, and trigger events.
 */
export function createEventStore<T>() {
  const eventStore = new EventStore<T>();

  const { subscribe, set } = writable<T[] | null>(null, () => {});

  /**
   * Subscribe to the event and provide a callback function to handle the event.
   *
   * @param {(...args: T[]) => void} handler - The callback function to handle the event.
   * @returns {Function} - A function to unsubscribe when the component is destroyed.
   */
  function onEvent(handler: { (...args: T[]): void }): () => void {
    eventStore.on(handler);

    // Return a function to unsubscribe when the component is destroyed
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

export const onTurnStart = createEventStore<void>();
export const onTurnEnd = createEventStore<void>();
export const onCombatStart = createEventStore<void>();
export const onCombatEnd = createEventStore<void>();