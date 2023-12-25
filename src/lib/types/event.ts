export interface IEvent<T> {
  on(handler: { (...args: T[]): void }): void;
  off(handler: { (...args: T[]): void }): void;
  trigger(...args: T[]): void;
}

export class Event<T> implements IEvent<T> {
  private handlers: { (...args: T[]): void }[] = [];

  public on(handler: { (...args: T[]): void }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (...args: T[]): void }): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public trigger(...args: T[]): void {
    this.handlers.slice(0).forEach(h => h(...args));
  }

  public expose(): IEvent<T> {
    return this;
  }
}
