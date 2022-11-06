import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher<TEventData>
  implements EventDispatcherInterface<TEventData>
{
  private eventHandlers: Record<string, EventHandlerInterface<TEventData>[]> =
    {};

  get getEventHandlers(): Record<string, EventHandlerInterface<TEventData>[]> {
    return this.eventHandlers;
  }

  notify(event: EventInterface<TEventData>): void {}

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<TEventData, EventInterface<TEventData>>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<TEventData, EventInterface<TEventData>>
  ): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
