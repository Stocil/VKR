export type HandleChangeTab<T> = (
  event: React.SyntheticEvent<Element, Event>,
  tab: T,
) => void;
