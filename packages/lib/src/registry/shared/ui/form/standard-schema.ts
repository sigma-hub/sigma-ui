import type { TypedSchema, TypedSchemaError } from 'vee-validate';

/**
 * The Standard Schema interface (https://standardschema.dev). zod 4, valibot, arktype, and other libraries
 * implement it, so any of their schemas can validate a form.
 */
export interface StandardSchemaV1<Input = unknown, Output = Input> {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (value: unknown) => StandardSchemaResult<Output> | Promise<StandardSchemaResult<Output>>;
    readonly types?: { readonly input: Input; readonly output: Output };
  };
}

type StandardSchemaResult<Output>
  = | { readonly value: Output; readonly issues?: undefined }
    | { readonly issues: ReadonlyArray<StandardSchemaIssue> };

interface StandardSchemaIssue {
  readonly message: string;
  readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>;
}

export type InferSchemaInput<Schema extends StandardSchemaV1> = NonNullable<Schema['~standard']['types']>['input'];
export type InferSchemaOutput<Schema extends StandardSchemaV1> = NonNullable<Schema['~standard']['types']>['output'];

/** Form values start out incomplete, so every field of the input type is optional, like in `@vee-validate/zod`. */
export type PartialDeep<T> = T extends Date | ReadonlyArray<unknown> | ((...args: never[]) => unknown)
  ? T
  : T extends object ? { [Key in keyof T]?: PartialDeep<T[Key]> } : T;

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

function isStandardSchema(value: unknown): value is StandardSchemaV1 {
  return typeof value === 'object' && value !== null && '~standard' in value;
}

/** vee-validate writes array indexes in brackets: `urls[0].value`. */
function toFormPath(path: StandardSchemaIssue['path']) {
  return (path ?? []).reduce<string>((formPath, segment) => {
    const key = typeof segment === 'object' ? segment.key : segment;
    const part = String(key);

    if (typeof key === 'number' || /^\d+$/.test(part)) {
      return `${formPath}[${part}]`;
    }

    return formPath ? `${formPath}.${part}` : part;
  }, '');
}

/** The property schemas of an object schema: zod's `shape` or valibot's `entries`. */
function objectProperties(schema: unknown): Record<string, unknown> | undefined {
  if (!isPlainObject(schema) && typeof schema !== 'object') {
    return undefined;
  }

  const candidate = schema as { shape?: unknown; entries?: unknown };
  const properties = candidate.shape ?? candidate.entries;

  return isPlainObject(properties) ? properties : undefined;
}

/**
 * Default values of an object schema. Each property schema is validated with `undefined`: a property with
 * `.default(value)` (zod) or `optional(schema, value)` (valibot) returns its default.
 */
function schemaDefaults(schema: unknown): PlainObject | undefined {
  const properties = objectProperties(schema);

  if (!properties) {
    return undefined;
  }

  const defaults: PlainObject = {};

  for (const [key, property] of Object.entries(properties)) {
    const nested = schemaDefaults(property);

    if (nested && Object.keys(nested).length) {
      defaults[key] = nested;
      continue;
    }

    if (!isStandardSchema(property)) {
      continue;
    }

    const result = property['~standard'].validate(undefined);

    if (!(result instanceof Promise) && !result.issues && result.value !== undefined) {
      defaults[key] = result.value;
    }
  }

  return defaults;
}

function mergeDefaults(defaults: PlainObject, values: PlainObject): PlainObject {
  const merged: PlainObject = { ...defaults };

  for (const [key, value] of Object.entries(values)) {
    merged[key] = isPlainObject(value) && isPlainObject(defaults[key])
      ? mergeDefaults(defaults[key], value)
      : value === undefined ? defaults[key] : value;
  }

  return merged;
}

/**
 * Turns a Standard Schema (zod 4, valibot, arktype, ...) into a vee-validate typed schema.
 *
 * ```ts
 * const { handleSubmit } = useForm({ validationSchema: toTypedSchema(z.object({ email: z.email() })) })
 * ```
 *
 * Defaults (`.default()` in zod) fill the initial values and the submitted values.
 */
export function toTypedSchema<Schema extends StandardSchemaV1>(
  schema: Schema,
): TypedSchema<PartialDeep<InferSchemaInput<Schema>>, InferSchemaOutput<Schema>> {
  return {
    __type: 'VVTypedSchema',
    async parse(values) {
      const result = await schema['~standard'].validate(values);

      if (!result.issues) {
        return { value: result.value as InferSchemaOutput<Schema>, errors: [] };
      }

      const errors = new Map<string, TypedSchemaError>();

      for (const issue of result.issues) {
        const path = toFormPath(issue.path);
        const entry = errors.get(path) ?? { path, errors: [] };
        entry.errors.push(issue.message);
        errors.set(path, entry);
      }

      return { errors: [...errors.values()] };
    },
    cast(values) {
      const result = schema['~standard'].validate(values);

      if (!(result instanceof Promise) && !result.issues) {
        return result.value as PartialDeep<InferSchemaInput<Schema>>;
      }

      const defaults = schemaDefaults(schema);

      if (defaults && isPlainObject(values)) {
        return mergeDefaults(defaults, values) as PartialDeep<InferSchemaInput<Schema>>;
      }

      return values as PartialDeep<InferSchemaInput<Schema>>;
    },
  };
}
