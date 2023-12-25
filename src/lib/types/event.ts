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
