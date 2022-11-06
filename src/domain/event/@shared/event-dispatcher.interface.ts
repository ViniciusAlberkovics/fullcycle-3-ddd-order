import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface<TEventData = any> {
  notify(event: EventInterface<TEventData>): void;
  register(
    eventName: string,
    eventHandler: EventHandlerInterface<TEventData>
  ): void;
  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<TEventData>
  ): void;
  unregisterAll(): void;
}
