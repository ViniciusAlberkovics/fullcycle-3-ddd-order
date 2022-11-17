export default interface EventInterface<T = any> {
  dateTimeOccurred: Date;
  eventData: T;
}
