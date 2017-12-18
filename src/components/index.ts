import { History } from "history";
import { match } from "react-router";

export interface RoutedComponentProperties<T = any> {
  history: History;
  match: match<T>;
}
