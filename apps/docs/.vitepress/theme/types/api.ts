export interface ApiProp {
  name: string;
  type: string;
  default?: string;
  required: boolean;
  description: string;
}

export interface ApiEvent {
  name: string;
  payload: string;
  description: string;
}

export interface ApiSlot {
  name: string;
  scope: string;
  description: string;
}

export interface ApiMethod {
  name: string;
  type: string;
  description: string;
}

export interface ApiTableItems {
  props: ApiProp[];
  events: ApiEvent[];
  slots: ApiSlot[];
  methods: ApiMethod[];
}

export type ApiTableKind = keyof ApiTableItems;

export interface ComponentPartApi extends ApiTableItems {
  name: string;
}

export interface ComponentApi {
  component: string;
  parts: ComponentPartApi[];
}
