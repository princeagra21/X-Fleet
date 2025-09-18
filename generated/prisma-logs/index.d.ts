
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SystemLog
 * 
 */
export type SystemLog = $Result.DefaultSelection<Prisma.$SystemLogPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model ErrorLog
 * 
 */
export type ErrorLog = $Result.DefaultSelection<Prisma.$ErrorLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LogLevel: {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]


export const ErrorSeverity: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type ErrorSeverity = (typeof ErrorSeverity)[keyof typeof ErrorSeverity]

}

export type LogLevel = $Enums.LogLevel

export const LogLevel: typeof $Enums.LogLevel

export type ErrorSeverity = $Enums.ErrorSeverity

export const ErrorSeverity: typeof $Enums.ErrorSeverity

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SystemLogs
 * const systemLogs = await prisma.systemLog.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SystemLogs
   * const systemLogs = await prisma.systemLog.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.systemLog`: Exposes CRUD operations for the **SystemLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemLogs
    * const systemLogs = await prisma.systemLog.findMany()
    * ```
    */
  get systemLog(): Prisma.SystemLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.errorLog`: Exposes CRUD operations for the **ErrorLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ErrorLogs
    * const errorLogs = await prisma.errorLog.findMany()
    * ```
    */
  get errorLog(): Prisma.ErrorLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SystemLog: 'SystemLog',
    AuditLog: 'AuditLog',
    ErrorLog: 'ErrorLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "systemLog" | "auditLog" | "errorLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SystemLog: {
        payload: Prisma.$SystemLogPayload<ExtArgs>
        fields: Prisma.SystemLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findFirst: {
            args: Prisma.SystemLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findMany: {
            args: Prisma.SystemLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          create: {
            args: Prisma.SystemLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          createMany: {
            args: Prisma.SystemLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          delete: {
            args: Prisma.SystemLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          update: {
            args: Prisma.SystemLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          deleteMany: {
            args: Prisma.SystemLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          upsert: {
            args: Prisma.SystemLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          aggregate: {
            args: Prisma.SystemLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemLog>
          }
          groupBy: {
            args: Prisma.SystemLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemLogCountArgs<ExtArgs>
            result: $Utils.Optional<SystemLogCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      ErrorLog: {
        payload: Prisma.$ErrorLogPayload<ExtArgs>
        fields: Prisma.ErrorLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ErrorLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ErrorLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          findFirst: {
            args: Prisma.ErrorLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ErrorLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          findMany: {
            args: Prisma.ErrorLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>[]
          }
          create: {
            args: Prisma.ErrorLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          createMany: {
            args: Prisma.ErrorLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ErrorLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>[]
          }
          delete: {
            args: Prisma.ErrorLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          update: {
            args: Prisma.ErrorLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          deleteMany: {
            args: Prisma.ErrorLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ErrorLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ErrorLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>[]
          }
          upsert: {
            args: Prisma.ErrorLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          aggregate: {
            args: Prisma.ErrorLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateErrorLog>
          }
          groupBy: {
            args: Prisma.ErrorLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ErrorLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ErrorLogCountArgs<ExtArgs>
            result: $Utils.Optional<ErrorLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    systemLog?: SystemLogOmit
    auditLog?: AuditLogOmit
    errorLog?: ErrorLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SystemLog
   */

  export type AggregateSystemLog = {
    _count: SystemLogCountAggregateOutputType | null
    _avg: SystemLogAvgAggregateOutputType | null
    _sum: SystemLogSumAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  export type SystemLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SystemLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SystemLogMinAggregateOutputType = {
    id: number | null
    level: $Enums.LogLevel | null
    message: string | null
    module: string | null
    userId: number | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SystemLogMaxAggregateOutputType = {
    id: number | null
    level: $Enums.LogLevel | null
    message: string | null
    module: string | null
    userId: number | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SystemLogCountAggregateOutputType = {
    id: number
    level: number
    message: number
    module: number
    userId: number
    ipAddress: number
    userAgent: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type SystemLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SystemLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SystemLogMinAggregateInputType = {
    id?: true
    level?: true
    message?: true
    module?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SystemLogMaxAggregateInputType = {
    id?: true
    level?: true
    message?: true
    module?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SystemLogCountAggregateInputType = {
    id?: true
    level?: true
    message?: true
    module?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type SystemLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLog to aggregate.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemLogs
    **/
    _count?: true | SystemLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemLogMaxAggregateInputType
  }

  export type GetSystemLogAggregateType<T extends SystemLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemLog[P]>
      : GetScalarType<T[P], AggregateSystemLog[P]>
  }




  export type SystemLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemLogWhereInput
    orderBy?: SystemLogOrderByWithAggregationInput | SystemLogOrderByWithAggregationInput[]
    by: SystemLogScalarFieldEnum[] | SystemLogScalarFieldEnum
    having?: SystemLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemLogCountAggregateInputType | true
    _avg?: SystemLogAvgAggregateInputType
    _sum?: SystemLogSumAggregateInputType
    _min?: SystemLogMinAggregateInputType
    _max?: SystemLogMaxAggregateInputType
  }

  export type SystemLogGroupByOutputType = {
    id: number
    level: $Enums.LogLevel
    message: string
    module: string | null
    userId: number | null
    ipAddress: string | null
    userAgent: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: SystemLogCountAggregateOutputType | null
    _avg: SystemLogAvgAggregateOutputType | null
    _sum: SystemLogSumAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  type GetSystemLogGroupByPayload<T extends SystemLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
            : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
        }
      >
    >


  export type SystemLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    message?: boolean
    module?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    message?: boolean
    module?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    message?: boolean
    module?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectScalar = {
    id?: boolean
    level?: boolean
    message?: boolean
    module?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type SystemLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "level" | "message" | "module" | "userId" | "ipAddress" | "userAgent" | "metadata" | "createdAt", ExtArgs["result"]["systemLog"]>

  export type $SystemLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      level: $Enums.LogLevel
      message: string
      module: string | null
      userId: number | null
      ipAddress: string | null
      userAgent: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["systemLog"]>
    composites: {}
  }

  type SystemLogGetPayload<S extends boolean | null | undefined | SystemLogDefaultArgs> = $Result.GetResult<Prisma.$SystemLogPayload, S>

  type SystemLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemLogCountAggregateInputType | true
    }

  export interface SystemLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemLog'], meta: { name: 'SystemLog' } }
    /**
     * Find zero or one SystemLog that matches the filter.
     * @param {SystemLogFindUniqueArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemLogFindUniqueArgs>(args: SelectSubset<T, SystemLogFindUniqueArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemLogFindUniqueOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemLogFindFirstArgs>(args?: SelectSubset<T, SystemLogFindFirstArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemLogs
     * const systemLogs = await prisma.systemLog.findMany()
     * 
     * // Get first 10 SystemLogs
     * const systemLogs = await prisma.systemLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemLogFindManyArgs>(args?: SelectSubset<T, SystemLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemLog.
     * @param {SystemLogCreateArgs} args - Arguments to create a SystemLog.
     * @example
     * // Create one SystemLog
     * const SystemLog = await prisma.systemLog.create({
     *   data: {
     *     // ... data to create a SystemLog
     *   }
     * })
     * 
     */
    create<T extends SystemLogCreateArgs>(args: SelectSubset<T, SystemLogCreateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemLogs.
     * @param {SystemLogCreateManyArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemLogCreateManyArgs>(args?: SelectSubset<T, SystemLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemLogs and returns the data saved in the database.
     * @param {SystemLogCreateManyAndReturnArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemLogs and only return the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemLog.
     * @param {SystemLogDeleteArgs} args - Arguments to delete one SystemLog.
     * @example
     * // Delete one SystemLog
     * const SystemLog = await prisma.systemLog.delete({
     *   where: {
     *     // ... filter to delete one SystemLog
     *   }
     * })
     * 
     */
    delete<T extends SystemLogDeleteArgs>(args: SelectSubset<T, SystemLogDeleteArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemLog.
     * @param {SystemLogUpdateArgs} args - Arguments to update one SystemLog.
     * @example
     * // Update one SystemLog
     * const systemLog = await prisma.systemLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemLogUpdateArgs>(args: SelectSubset<T, SystemLogUpdateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemLogs.
     * @param {SystemLogDeleteManyArgs} args - Arguments to filter SystemLogs to delete.
     * @example
     * // Delete a few SystemLogs
     * const { count } = await prisma.systemLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemLogDeleteManyArgs>(args?: SelectSubset<T, SystemLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemLogs
     * const systemLog = await prisma.systemLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemLogUpdateManyArgs>(args: SelectSubset<T, SystemLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemLogs and returns the data updated in the database.
     * @param {SystemLogUpdateManyAndReturnArgs} args - Arguments to update many SystemLogs.
     * @example
     * // Update many SystemLogs
     * const systemLog = await prisma.systemLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemLogs and only return the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemLog.
     * @param {SystemLogUpsertArgs} args - Arguments to update or create a SystemLog.
     * @example
     * // Update or create a SystemLog
     * const systemLog = await prisma.systemLog.upsert({
     *   create: {
     *     // ... data to create a SystemLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemLog we want to update
     *   }
     * })
     */
    upsert<T extends SystemLogUpsertArgs>(args: SelectSubset<T, SystemLogUpsertArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogCountArgs} args - Arguments to filter SystemLogs to count.
     * @example
     * // Count the number of SystemLogs
     * const count = await prisma.systemLog.count({
     *   where: {
     *     // ... the filter for the SystemLogs we want to count
     *   }
     * })
    **/
    count<T extends SystemLogCountArgs>(
      args?: Subset<T, SystemLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemLogAggregateArgs>(args: Subset<T, SystemLogAggregateArgs>): Prisma.PrismaPromise<GetSystemLogAggregateType<T>>

    /**
     * Group by SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemLogGroupByArgs['orderBy'] }
        : { orderBy?: SystemLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemLog model
   */
  readonly fields: SystemLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemLog model
   */
  interface SystemLogFieldRefs {
    readonly id: FieldRef<"SystemLog", 'Int'>
    readonly level: FieldRef<"SystemLog", 'LogLevel'>
    readonly message: FieldRef<"SystemLog", 'String'>
    readonly module: FieldRef<"SystemLog", 'String'>
    readonly userId: FieldRef<"SystemLog", 'Int'>
    readonly ipAddress: FieldRef<"SystemLog", 'String'>
    readonly userAgent: FieldRef<"SystemLog", 'String'>
    readonly metadata: FieldRef<"SystemLog", 'Json'>
    readonly createdAt: FieldRef<"SystemLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemLog findUnique
   */
  export type SystemLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findUniqueOrThrow
   */
  export type SystemLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findFirst
   */
  export type SystemLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findFirstOrThrow
   */
  export type SystemLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findMany
   */
  export type SystemLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLogs to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog create
   */
  export type SystemLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemLog.
     */
    data: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
  }

  /**
   * SystemLog createMany
   */
  export type SystemLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemLog createManyAndReturn
   */
  export type SystemLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemLog update
   */
  export type SystemLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemLog.
     */
    data: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
    /**
     * Choose, which SystemLog to update.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog updateMany
   */
  export type SystemLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemLogs.
     */
    data: XOR<SystemLogUpdateManyMutationInput, SystemLogUncheckedUpdateManyInput>
    /**
     * Filter which SystemLogs to update
     */
    where?: SystemLogWhereInput
    /**
     * Limit how many SystemLogs to update.
     */
    limit?: number
  }

  /**
   * SystemLog updateManyAndReturn
   */
  export type SystemLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The data used to update SystemLogs.
     */
    data: XOR<SystemLogUpdateManyMutationInput, SystemLogUncheckedUpdateManyInput>
    /**
     * Filter which SystemLogs to update
     */
    where?: SystemLogWhereInput
    /**
     * Limit how many SystemLogs to update.
     */
    limit?: number
  }

  /**
   * SystemLog upsert
   */
  export type SystemLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemLog to update in case it exists.
     */
    where: SystemLogWhereUniqueInput
    /**
     * In case the SystemLog found by the `where` argument doesn't exist, create a new SystemLog with this data.
     */
    create: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
    /**
     * In case the SystemLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
  }

  /**
   * SystemLog delete
   */
  export type SystemLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter which SystemLog to delete.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog deleteMany
   */
  export type SystemLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLogs to delete
     */
    where?: SystemLogWhereInput
    /**
     * Limit how many SystemLogs to delete.
     */
    limit?: number
  }

  /**
   * SystemLog without action
   */
  export type SystemLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    action: string | null
    tableName: string | null
    recordId: string | null
    userId: number | null
    userName: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    action: string | null
    tableName: string | null
    recordId: string | null
    userId: number | null
    userName: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    tableName: number
    recordId: number
    oldValues: number
    newValues: number
    userId: number
    userName: number
    timestamp: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    tableName?: true
    recordId?: true
    userId?: true
    userName?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    tableName?: true
    recordId?: true
    userId?: true
    userName?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    tableName?: true
    recordId?: true
    oldValues?: true
    newValues?: true
    userId?: true
    userName?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    action: string
    tableName: string
    recordId: string
    oldValues: JsonValue | null
    newValues: JsonValue | null
    userId: number | null
    userName: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    userId?: boolean
    userName?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    userId?: boolean
    userName?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    userId?: boolean
    userName?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    userId?: boolean
    userName?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "tableName" | "recordId" | "oldValues" | "newValues" | "userId" | "userName" | "timestamp", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      action: string
      tableName: string
      recordId: string
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      userId: number | null
      userName: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly tableName: FieldRef<"AuditLog", 'String'>
    readonly recordId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly userId: FieldRef<"AuditLog", 'Int'>
    readonly userName: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model ErrorLog
   */

  export type AggregateErrorLog = {
    _count: ErrorLogCountAggregateOutputType | null
    _avg: ErrorLogAvgAggregateOutputType | null
    _sum: ErrorLogSumAggregateOutputType | null
    _min: ErrorLogMinAggregateOutputType | null
    _max: ErrorLogMaxAggregateOutputType | null
  }

  export type ErrorLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ErrorLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ErrorLogMinAggregateOutputType = {
    id: number | null
    errorCode: string | null
    message: string | null
    stack: string | null
    url: string | null
    method: string | null
    userId: number | null
    severity: $Enums.ErrorSeverity | null
    resolved: boolean | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type ErrorLogMaxAggregateOutputType = {
    id: number | null
    errorCode: string | null
    message: string | null
    stack: string | null
    url: string | null
    method: string | null
    userId: number | null
    severity: $Enums.ErrorSeverity | null
    resolved: boolean | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type ErrorLogCountAggregateOutputType = {
    id: number
    errorCode: number
    message: number
    stack: number
    url: number
    method: number
    userId: number
    severity: number
    resolved: number
    createdAt: number
    resolvedAt: number
    _all: number
  }


  export type ErrorLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ErrorLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ErrorLogMinAggregateInputType = {
    id?: true
    errorCode?: true
    message?: true
    stack?: true
    url?: true
    method?: true
    userId?: true
    severity?: true
    resolved?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type ErrorLogMaxAggregateInputType = {
    id?: true
    errorCode?: true
    message?: true
    stack?: true
    url?: true
    method?: true
    userId?: true
    severity?: true
    resolved?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type ErrorLogCountAggregateInputType = {
    id?: true
    errorCode?: true
    message?: true
    stack?: true
    url?: true
    method?: true
    userId?: true
    severity?: true
    resolved?: true
    createdAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type ErrorLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ErrorLog to aggregate.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ErrorLogs
    **/
    _count?: true | ErrorLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ErrorLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ErrorLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ErrorLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ErrorLogMaxAggregateInputType
  }

  export type GetErrorLogAggregateType<T extends ErrorLogAggregateArgs> = {
        [P in keyof T & keyof AggregateErrorLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateErrorLog[P]>
      : GetScalarType<T[P], AggregateErrorLog[P]>
  }




  export type ErrorLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ErrorLogWhereInput
    orderBy?: ErrorLogOrderByWithAggregationInput | ErrorLogOrderByWithAggregationInput[]
    by: ErrorLogScalarFieldEnum[] | ErrorLogScalarFieldEnum
    having?: ErrorLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ErrorLogCountAggregateInputType | true
    _avg?: ErrorLogAvgAggregateInputType
    _sum?: ErrorLogSumAggregateInputType
    _min?: ErrorLogMinAggregateInputType
    _max?: ErrorLogMaxAggregateInputType
  }

  export type ErrorLogGroupByOutputType = {
    id: number
    errorCode: string | null
    message: string
    stack: string | null
    url: string | null
    method: string | null
    userId: number | null
    severity: $Enums.ErrorSeverity
    resolved: boolean
    createdAt: Date
    resolvedAt: Date | null
    _count: ErrorLogCountAggregateOutputType | null
    _avg: ErrorLogAvgAggregateOutputType | null
    _sum: ErrorLogSumAggregateOutputType | null
    _min: ErrorLogMinAggregateOutputType | null
    _max: ErrorLogMaxAggregateOutputType | null
  }

  type GetErrorLogGroupByPayload<T extends ErrorLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ErrorLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ErrorLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ErrorLogGroupByOutputType[P]>
            : GetScalarType<T[P], ErrorLogGroupByOutputType[P]>
        }
      >
    >


  export type ErrorLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    errorCode?: boolean
    message?: boolean
    stack?: boolean
    url?: boolean
    method?: boolean
    userId?: boolean
    severity?: boolean
    resolved?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["errorLog"]>

  export type ErrorLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    errorCode?: boolean
    message?: boolean
    stack?: boolean
    url?: boolean
    method?: boolean
    userId?: boolean
    severity?: boolean
    resolved?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["errorLog"]>

  export type ErrorLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    errorCode?: boolean
    message?: boolean
    stack?: boolean
    url?: boolean
    method?: boolean
    userId?: boolean
    severity?: boolean
    resolved?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["errorLog"]>

  export type ErrorLogSelectScalar = {
    id?: boolean
    errorCode?: boolean
    message?: boolean
    stack?: boolean
    url?: boolean
    method?: boolean
    userId?: boolean
    severity?: boolean
    resolved?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }

  export type ErrorLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "errorCode" | "message" | "stack" | "url" | "method" | "userId" | "severity" | "resolved" | "createdAt" | "resolvedAt", ExtArgs["result"]["errorLog"]>

  export type $ErrorLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ErrorLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      errorCode: string | null
      message: string
      stack: string | null
      url: string | null
      method: string | null
      userId: number | null
      severity: $Enums.ErrorSeverity
      resolved: boolean
      createdAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["errorLog"]>
    composites: {}
  }

  type ErrorLogGetPayload<S extends boolean | null | undefined | ErrorLogDefaultArgs> = $Result.GetResult<Prisma.$ErrorLogPayload, S>

  type ErrorLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ErrorLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ErrorLogCountAggregateInputType | true
    }

  export interface ErrorLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ErrorLog'], meta: { name: 'ErrorLog' } }
    /**
     * Find zero or one ErrorLog that matches the filter.
     * @param {ErrorLogFindUniqueArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ErrorLogFindUniqueArgs>(args: SelectSubset<T, ErrorLogFindUniqueArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ErrorLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ErrorLogFindUniqueOrThrowArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ErrorLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ErrorLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ErrorLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogFindFirstArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ErrorLogFindFirstArgs>(args?: SelectSubset<T, ErrorLogFindFirstArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ErrorLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogFindFirstOrThrowArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ErrorLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ErrorLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ErrorLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ErrorLogs
     * const errorLogs = await prisma.errorLog.findMany()
     * 
     * // Get first 10 ErrorLogs
     * const errorLogs = await prisma.errorLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const errorLogWithIdOnly = await prisma.errorLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ErrorLogFindManyArgs>(args?: SelectSubset<T, ErrorLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ErrorLog.
     * @param {ErrorLogCreateArgs} args - Arguments to create a ErrorLog.
     * @example
     * // Create one ErrorLog
     * const ErrorLog = await prisma.errorLog.create({
     *   data: {
     *     // ... data to create a ErrorLog
     *   }
     * })
     * 
     */
    create<T extends ErrorLogCreateArgs>(args: SelectSubset<T, ErrorLogCreateArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ErrorLogs.
     * @param {ErrorLogCreateManyArgs} args - Arguments to create many ErrorLogs.
     * @example
     * // Create many ErrorLogs
     * const errorLog = await prisma.errorLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ErrorLogCreateManyArgs>(args?: SelectSubset<T, ErrorLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ErrorLogs and returns the data saved in the database.
     * @param {ErrorLogCreateManyAndReturnArgs} args - Arguments to create many ErrorLogs.
     * @example
     * // Create many ErrorLogs
     * const errorLog = await prisma.errorLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ErrorLogs and only return the `id`
     * const errorLogWithIdOnly = await prisma.errorLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ErrorLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ErrorLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ErrorLog.
     * @param {ErrorLogDeleteArgs} args - Arguments to delete one ErrorLog.
     * @example
     * // Delete one ErrorLog
     * const ErrorLog = await prisma.errorLog.delete({
     *   where: {
     *     // ... filter to delete one ErrorLog
     *   }
     * })
     * 
     */
    delete<T extends ErrorLogDeleteArgs>(args: SelectSubset<T, ErrorLogDeleteArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ErrorLog.
     * @param {ErrorLogUpdateArgs} args - Arguments to update one ErrorLog.
     * @example
     * // Update one ErrorLog
     * const errorLog = await prisma.errorLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ErrorLogUpdateArgs>(args: SelectSubset<T, ErrorLogUpdateArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ErrorLogs.
     * @param {ErrorLogDeleteManyArgs} args - Arguments to filter ErrorLogs to delete.
     * @example
     * // Delete a few ErrorLogs
     * const { count } = await prisma.errorLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ErrorLogDeleteManyArgs>(args?: SelectSubset<T, ErrorLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ErrorLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ErrorLogs
     * const errorLog = await prisma.errorLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ErrorLogUpdateManyArgs>(args: SelectSubset<T, ErrorLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ErrorLogs and returns the data updated in the database.
     * @param {ErrorLogUpdateManyAndReturnArgs} args - Arguments to update many ErrorLogs.
     * @example
     * // Update many ErrorLogs
     * const errorLog = await prisma.errorLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ErrorLogs and only return the `id`
     * const errorLogWithIdOnly = await prisma.errorLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ErrorLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ErrorLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ErrorLog.
     * @param {ErrorLogUpsertArgs} args - Arguments to update or create a ErrorLog.
     * @example
     * // Update or create a ErrorLog
     * const errorLog = await prisma.errorLog.upsert({
     *   create: {
     *     // ... data to create a ErrorLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ErrorLog we want to update
     *   }
     * })
     */
    upsert<T extends ErrorLogUpsertArgs>(args: SelectSubset<T, ErrorLogUpsertArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ErrorLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogCountArgs} args - Arguments to filter ErrorLogs to count.
     * @example
     * // Count the number of ErrorLogs
     * const count = await prisma.errorLog.count({
     *   where: {
     *     // ... the filter for the ErrorLogs we want to count
     *   }
     * })
    **/
    count<T extends ErrorLogCountArgs>(
      args?: Subset<T, ErrorLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ErrorLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ErrorLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ErrorLogAggregateArgs>(args: Subset<T, ErrorLogAggregateArgs>): Prisma.PrismaPromise<GetErrorLogAggregateType<T>>

    /**
     * Group by ErrorLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ErrorLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ErrorLogGroupByArgs['orderBy'] }
        : { orderBy?: ErrorLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ErrorLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetErrorLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ErrorLog model
   */
  readonly fields: ErrorLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ErrorLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ErrorLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ErrorLog model
   */
  interface ErrorLogFieldRefs {
    readonly id: FieldRef<"ErrorLog", 'Int'>
    readonly errorCode: FieldRef<"ErrorLog", 'String'>
    readonly message: FieldRef<"ErrorLog", 'String'>
    readonly stack: FieldRef<"ErrorLog", 'String'>
    readonly url: FieldRef<"ErrorLog", 'String'>
    readonly method: FieldRef<"ErrorLog", 'String'>
    readonly userId: FieldRef<"ErrorLog", 'Int'>
    readonly severity: FieldRef<"ErrorLog", 'ErrorSeverity'>
    readonly resolved: FieldRef<"ErrorLog", 'Boolean'>
    readonly createdAt: FieldRef<"ErrorLog", 'DateTime'>
    readonly resolvedAt: FieldRef<"ErrorLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ErrorLog findUnique
   */
  export type ErrorLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog findUniqueOrThrow
   */
  export type ErrorLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog findFirst
   */
  export type ErrorLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ErrorLogs.
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ErrorLogs.
     */
    distinct?: ErrorLogScalarFieldEnum | ErrorLogScalarFieldEnum[]
  }

  /**
   * ErrorLog findFirstOrThrow
   */
  export type ErrorLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ErrorLogs.
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ErrorLogs.
     */
    distinct?: ErrorLogScalarFieldEnum | ErrorLogScalarFieldEnum[]
  }

  /**
   * ErrorLog findMany
   */
  export type ErrorLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLogs to fetch.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ErrorLogs.
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    distinct?: ErrorLogScalarFieldEnum | ErrorLogScalarFieldEnum[]
  }

  /**
   * ErrorLog create
   */
  export type ErrorLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ErrorLog.
     */
    data: XOR<ErrorLogCreateInput, ErrorLogUncheckedCreateInput>
  }

  /**
   * ErrorLog createMany
   */
  export type ErrorLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ErrorLogs.
     */
    data: ErrorLogCreateManyInput | ErrorLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ErrorLog createManyAndReturn
   */
  export type ErrorLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The data used to create many ErrorLogs.
     */
    data: ErrorLogCreateManyInput | ErrorLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ErrorLog update
   */
  export type ErrorLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ErrorLog.
     */
    data: XOR<ErrorLogUpdateInput, ErrorLogUncheckedUpdateInput>
    /**
     * Choose, which ErrorLog to update.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog updateMany
   */
  export type ErrorLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ErrorLogs.
     */
    data: XOR<ErrorLogUpdateManyMutationInput, ErrorLogUncheckedUpdateManyInput>
    /**
     * Filter which ErrorLogs to update
     */
    where?: ErrorLogWhereInput
    /**
     * Limit how many ErrorLogs to update.
     */
    limit?: number
  }

  /**
   * ErrorLog updateManyAndReturn
   */
  export type ErrorLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The data used to update ErrorLogs.
     */
    data: XOR<ErrorLogUpdateManyMutationInput, ErrorLogUncheckedUpdateManyInput>
    /**
     * Filter which ErrorLogs to update
     */
    where?: ErrorLogWhereInput
    /**
     * Limit how many ErrorLogs to update.
     */
    limit?: number
  }

  /**
   * ErrorLog upsert
   */
  export type ErrorLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ErrorLog to update in case it exists.
     */
    where: ErrorLogWhereUniqueInput
    /**
     * In case the ErrorLog found by the `where` argument doesn't exist, create a new ErrorLog with this data.
     */
    create: XOR<ErrorLogCreateInput, ErrorLogUncheckedCreateInput>
    /**
     * In case the ErrorLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ErrorLogUpdateInput, ErrorLogUncheckedUpdateInput>
  }

  /**
   * ErrorLog delete
   */
  export type ErrorLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter which ErrorLog to delete.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog deleteMany
   */
  export type ErrorLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ErrorLogs to delete
     */
    where?: ErrorLogWhereInput
    /**
     * Limit how many ErrorLogs to delete.
     */
    limit?: number
  }

  /**
   * ErrorLog without action
   */
  export type ErrorLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SystemLogScalarFieldEnum: {
    id: 'id',
    level: 'level',
    message: 'message',
    module: 'module',
    userId: 'userId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type SystemLogScalarFieldEnum = (typeof SystemLogScalarFieldEnum)[keyof typeof SystemLogScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    tableName: 'tableName',
    recordId: 'recordId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    userId: 'userId',
    userName: 'userName',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ErrorLogScalarFieldEnum: {
    id: 'id',
    errorCode: 'errorCode',
    message: 'message',
    stack: 'stack',
    url: 'url',
    method: 'method',
    userId: 'userId',
    severity: 'severity',
    resolved: 'resolved',
    createdAt: 'createdAt',
    resolvedAt: 'resolvedAt'
  };

  export type ErrorLogScalarFieldEnum = (typeof ErrorLogScalarFieldEnum)[keyof typeof ErrorLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'LogLevel'
   */
  export type EnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel'>
    


  /**
   * Reference to a field of type 'LogLevel[]'
   */
  export type ListEnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ErrorSeverity'
   */
  export type EnumErrorSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ErrorSeverity'>
    


  /**
   * Reference to a field of type 'ErrorSeverity[]'
   */
  export type ListEnumErrorSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ErrorSeverity[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SystemLogWhereInput = {
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    id?: IntFilter<"SystemLog"> | number
    level?: EnumLogLevelFilter<"SystemLog"> | $Enums.LogLevel
    message?: StringFilter<"SystemLog"> | string
    module?: StringNullableFilter<"SystemLog"> | string | null
    userId?: IntNullableFilter<"SystemLog"> | number | null
    ipAddress?: StringNullableFilter<"SystemLog"> | string | null
    userAgent?: StringNullableFilter<"SystemLog"> | string | null
    metadata?: JsonNullableFilter<"SystemLog">
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
  }

  export type SystemLogOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    module?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    level?: EnumLogLevelFilter<"SystemLog"> | $Enums.LogLevel
    message?: StringFilter<"SystemLog"> | string
    module?: StringNullableFilter<"SystemLog"> | string | null
    userId?: IntNullableFilter<"SystemLog"> | number | null
    ipAddress?: StringNullableFilter<"SystemLog"> | string | null
    userAgent?: StringNullableFilter<"SystemLog"> | string | null
    metadata?: JsonNullableFilter<"SystemLog">
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
  }, "id">

  export type SystemLogOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    module?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SystemLogCountOrderByAggregateInput
    _avg?: SystemLogAvgOrderByAggregateInput
    _max?: SystemLogMaxOrderByAggregateInput
    _min?: SystemLogMinOrderByAggregateInput
    _sum?: SystemLogSumOrderByAggregateInput
  }

  export type SystemLogScalarWhereWithAggregatesInput = {
    AND?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    OR?: SystemLogScalarWhereWithAggregatesInput[]
    NOT?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SystemLog"> | number
    level?: EnumLogLevelWithAggregatesFilter<"SystemLog"> | $Enums.LogLevel
    message?: StringWithAggregatesFilter<"SystemLog"> | string
    module?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    userId?: IntNullableWithAggregatesFilter<"SystemLog"> | number | null
    ipAddress?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"SystemLog">
    createdAt?: DateTimeWithAggregatesFilter<"SystemLog"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    userId?: IntNullableFilter<"AuditLog"> | number | null
    userName?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    userId?: IntNullableFilter<"AuditLog"> | number | null
    userName?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    tableName?: StringWithAggregatesFilter<"AuditLog"> | string
    recordId?: StringWithAggregatesFilter<"AuditLog"> | string
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    userId?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    userName?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ErrorLogWhereInput = {
    AND?: ErrorLogWhereInput | ErrorLogWhereInput[]
    OR?: ErrorLogWhereInput[]
    NOT?: ErrorLogWhereInput | ErrorLogWhereInput[]
    id?: IntFilter<"ErrorLog"> | number
    errorCode?: StringNullableFilter<"ErrorLog"> | string | null
    message?: StringFilter<"ErrorLog"> | string
    stack?: StringNullableFilter<"ErrorLog"> | string | null
    url?: StringNullableFilter<"ErrorLog"> | string | null
    method?: StringNullableFilter<"ErrorLog"> | string | null
    userId?: IntNullableFilter<"ErrorLog"> | number | null
    severity?: EnumErrorSeverityFilter<"ErrorLog"> | $Enums.ErrorSeverity
    resolved?: BoolFilter<"ErrorLog"> | boolean
    createdAt?: DateTimeFilter<"ErrorLog"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"ErrorLog"> | Date | string | null
  }

  export type ErrorLogOrderByWithRelationInput = {
    id?: SortOrder
    errorCode?: SortOrderInput | SortOrder
    message?: SortOrder
    stack?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    method?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    severity?: SortOrder
    resolved?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
  }

  export type ErrorLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ErrorLogWhereInput | ErrorLogWhereInput[]
    OR?: ErrorLogWhereInput[]
    NOT?: ErrorLogWhereInput | ErrorLogWhereInput[]
    errorCode?: StringNullableFilter<"ErrorLog"> | string | null
    message?: StringFilter<"ErrorLog"> | string
    stack?: StringNullableFilter<"ErrorLog"> | string | null
    url?: StringNullableFilter<"ErrorLog"> | string | null
    method?: StringNullableFilter<"ErrorLog"> | string | null
    userId?: IntNullableFilter<"ErrorLog"> | number | null
    severity?: EnumErrorSeverityFilter<"ErrorLog"> | $Enums.ErrorSeverity
    resolved?: BoolFilter<"ErrorLog"> | boolean
    createdAt?: DateTimeFilter<"ErrorLog"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"ErrorLog"> | Date | string | null
  }, "id">

  export type ErrorLogOrderByWithAggregationInput = {
    id?: SortOrder
    errorCode?: SortOrderInput | SortOrder
    message?: SortOrder
    stack?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    method?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    severity?: SortOrder
    resolved?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: ErrorLogCountOrderByAggregateInput
    _avg?: ErrorLogAvgOrderByAggregateInput
    _max?: ErrorLogMaxOrderByAggregateInput
    _min?: ErrorLogMinOrderByAggregateInput
    _sum?: ErrorLogSumOrderByAggregateInput
  }

  export type ErrorLogScalarWhereWithAggregatesInput = {
    AND?: ErrorLogScalarWhereWithAggregatesInput | ErrorLogScalarWhereWithAggregatesInput[]
    OR?: ErrorLogScalarWhereWithAggregatesInput[]
    NOT?: ErrorLogScalarWhereWithAggregatesInput | ErrorLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ErrorLog"> | number
    errorCode?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    message?: StringWithAggregatesFilter<"ErrorLog"> | string
    stack?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    url?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    method?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    userId?: IntNullableWithAggregatesFilter<"ErrorLog"> | number | null
    severity?: EnumErrorSeverityWithAggregatesFilter<"ErrorLog"> | $Enums.ErrorSeverity
    resolved?: BoolWithAggregatesFilter<"ErrorLog"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ErrorLog"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"ErrorLog"> | Date | string | null
  }

  export type SystemLogCreateInput = {
    level: $Enums.LogLevel
    message: string
    module?: string | null
    userId?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemLogUncheckedCreateInput = {
    id?: number
    level: $Enums.LogLevel
    message: string
    module?: string | null
    userId?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemLogUpdateInput = {
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogCreateManyInput = {
    id?: number
    level: $Enums.LogLevel
    message: string
    module?: string | null
    userId?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemLogUpdateManyMutationInput = {
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    module?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: number | null
    userName?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: number | null
    userName?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: number | null
    userName?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ErrorLogCreateInput = {
    errorCode?: string | null
    message: string
    stack?: string | null
    url?: string | null
    method?: string | null
    userId?: number | null
    severity?: $Enums.ErrorSeverity
    resolved?: boolean
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type ErrorLogUncheckedCreateInput = {
    id?: number
    errorCode?: string | null
    message: string
    stack?: string | null
    url?: string | null
    method?: string | null
    userId?: number | null
    severity?: $Enums.ErrorSeverity
    resolved?: boolean
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type ErrorLogUpdateInput = {
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    severity?: EnumErrorSeverityFieldUpdateOperationsInput | $Enums.ErrorSeverity
    resolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ErrorLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    severity?: EnumErrorSeverityFieldUpdateOperationsInput | $Enums.ErrorSeverity
    resolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ErrorLogCreateManyInput = {
    id?: number
    errorCode?: string | null
    message: string
    stack?: string | null
    url?: string | null
    method?: string | null
    userId?: number | null
    severity?: $Enums.ErrorSeverity
    resolved?: boolean
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type ErrorLogUpdateManyMutationInput = {
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    severity?: EnumErrorSeverityFieldUpdateOperationsInput | $Enums.ErrorSeverity
    resolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ErrorLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    severity?: EnumErrorSeverityFieldUpdateOperationsInput | $Enums.ErrorSeverity
    resolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SystemLogCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    module?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type SystemLogMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    module?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    module?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumErrorSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.ErrorSeverity | EnumErrorSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumErrorSeverityFilter<$PrismaModel> | $Enums.ErrorSeverity
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ErrorLogCountOrderByAggregateInput = {
    id?: SortOrder
    errorCode?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    url?: SortOrder
    method?: SortOrder
    userId?: SortOrder
    severity?: SortOrder
    resolved?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type ErrorLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ErrorLogMaxOrderByAggregateInput = {
    id?: SortOrder
    errorCode?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    url?: SortOrder
    method?: SortOrder
    userId?: SortOrder
    severity?: SortOrder
    resolved?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type ErrorLogMinOrderByAggregateInput = {
    id?: SortOrder
    errorCode?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    url?: SortOrder
    method?: SortOrder
    userId?: SortOrder
    severity?: SortOrder
    resolved?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type ErrorLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumErrorSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ErrorSeverity | EnumErrorSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumErrorSeverityWithAggregatesFilter<$PrismaModel> | $Enums.ErrorSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumErrorSeverityFilter<$PrismaModel>
    _max?: NestedEnumErrorSeverityFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumLogLevelFieldUpdateOperationsInput = {
    set?: $Enums.LogLevel
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumErrorSeverityFieldUpdateOperationsInput = {
    set?: $Enums.ErrorSeverity
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumErrorSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.ErrorSeverity | EnumErrorSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumErrorSeverityFilter<$PrismaModel> | $Enums.ErrorSeverity
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumErrorSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ErrorSeverity | EnumErrorSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ErrorSeverity[] | ListEnumErrorSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumErrorSeverityWithAggregatesFilter<$PrismaModel> | $Enums.ErrorSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumErrorSeverityFilter<$PrismaModel>
    _max?: NestedEnumErrorSeverityFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}