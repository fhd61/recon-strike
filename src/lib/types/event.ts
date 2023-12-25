// liteEventStore.d.ts
/**
 * Represents an event with optional data.
 *
 * @template T - The type of data to be passed with the event.
 */
export interface IEvent<T> {
  /**
   * Subscribe to the event and provide a callback function to handle the event.
   *
   * @param {(...args: T[]) => void} handler - The callback function to handle the event.
   */
  on(handler: { (...args: T[]): void }): void;

  /**
   * Unsubscribe from the event by providing the callback function used in the `on` method.
   *
   * @param {(...args: T[]) => void} handler - The callback function to be unsubscribed.
   */
  off(handler: { (...args: T[]): void }): void;

  /**
   * Trigger the event with optional data.
   *
   * @param {...T[]} args - Optional data to be passed with the event.
   */
  trigger(...args: T[]): void;

  /**
   * Expose the event for external use.
   *
   * @returns {IEvent<T>} - The exposed event interface.
   */
  expose(): IEvent<T>;
}

/**
 * Implementation of the {@link IEvent} interface.
 *
 * @template T - The type of data to be passed with the event.
 */
export class Event<T> implements IEvent<T> {
  /**
   * @private
   */
  private handlers: { (...args: T[]): void }[] = [];

  /**
   * Subscribe to the event and provide a callback function to handle the event.
   *
   * @param {(...args: T[]) => void} handler - The callback function to handle the event.
   */
  public on(handler: { (...args: T[]): void }): void {
    this.handlers.push(handler);
  }

  /**
   * Unsubscribe from the event by providing the callback function used in the `on` method.
   *
   * @param {(...args: T[]) => void} handler - The callback function to be unsubscribed.
   */
  public off(handler: { (...args: T[]): void }): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  /**
   * Trigger the event with optional data.
   *
   * @param {...T[]} args - Optional data to be passed with the event.
   */
  public trigger(...args: T[]): void {
    this.handlers.slice(0).forEach(h => h(...args));
  }

  /**
   * Expose the event for external use.
   *
   * @returns {IEvent<T>} - The exposed event interface.
   */
  public expose(): IEvent<T> {
    return this;
  }
}