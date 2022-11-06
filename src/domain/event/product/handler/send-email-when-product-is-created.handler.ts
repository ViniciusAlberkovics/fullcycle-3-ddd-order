import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: EventInterface<ProductCreatedEvent>): void {
    console.log(`Sending email to ........`, event.dateTimeOccurred);
  }
}
