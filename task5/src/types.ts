import { IncomingMessage } from "http";

export interface IExtendedRequest extends IncomingMessage {
  pathname: URL["pathname"];
  params?: {
    id?: string;
  };
}
