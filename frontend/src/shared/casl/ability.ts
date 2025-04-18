// utils/ability.ts
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";

type Actions =
  | "manage"
  | "create"
  | "view"
  | "update"
  | "delete"
  | "export"
  | "duplicate";
type Subjects = string;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(permissions: string[]): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  permissions.forEach((permission) => {
    const underscoreIndex = permission.indexOf("_");
    if (underscoreIndex > -1) {
      const action = permission.slice(0, underscoreIndex) as Actions;
      const subject = permission.slice(underscoreIndex + 1);
      can(action, subject);
    }
  });

  return build({
    detectSubjectType: (object: any) => object.type,
  });
}
