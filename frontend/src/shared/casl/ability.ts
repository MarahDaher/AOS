// utils/ability.ts
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";

type Actions = "manage" | "create" | "view" | "update" | "delete";
type Subjects = string;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(permissions: string[]): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  permissions.forEach((permission) => {
    const [action, subject] = permission.split("_");
    if (action && subject) can(action as Actions, subject);
  });

  return build({
    detectSubjectType: (object: any) => object.type,
  });
}
