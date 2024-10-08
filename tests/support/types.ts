import type * as kysely from "kysely";

export interface Database {
  person: PersonTable;
  pet: PetTable;
}

export interface PersonTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: kysely.Generated<number>;

  first_name: string;
  gender: "man" | "woman" | "other";

  // If the column is nullable in the database, make its type nullable.
  // Don't use optional properties. Optionality is always determined
  // automatically by Kysely.
  last_name: string | null;

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `created_at` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  created_at: kysely.ColumnType<Date, string | undefined, never>;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type Person = kysely.Selectable<PersonTable>;
export type NewPerson = kysely.Insertable<PersonTable>;
export type PersonUpdate = kysely.Updateable<PersonTable>;

export interface PetTable {
  id: kysely.Generated<number>;
  name: string;
  owner_id: number;
  species: "dog" | "cat";
}

export type Pet = kysely.Selectable<PetTable>;
export type NewPet = kysely.Insertable<PetTable>;
export type PetUpdate = kysely.Updateable<PetTable>;
