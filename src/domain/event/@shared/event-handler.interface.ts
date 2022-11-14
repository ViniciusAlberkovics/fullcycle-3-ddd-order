import EventInterface from "./event.interface";

export default interface EventHandlerInterface<
  TEventInterface extends EventInterface = EventInterface
> {
  handle(event: TEventInterface): void;
}
