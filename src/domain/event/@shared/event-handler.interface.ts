import EventInterface from "./event.interface";

export default interface EventHandlerInterface<
  TEventData,
  TEventInterface extends EventInterface<TEventData> = EventInterface<TEventData>
> {
  handle(event: TEventInterface): void;
}
