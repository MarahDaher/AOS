import { useAbility } from "@contexts/AbilityProvider";

export const usePermissions = () => {
  const ability = useAbility();

  return {
    canView: (subject: string) => ability.can("view", subject),
    canEdit: (subject: string) => ability.can("update", subject),
    canCreate: (subject: string) => ability.can("create", subject),
    canDelete: (subject: string) => ability.can("delete", subject),
    canExport: (subject: string) => ability.can("export", subject),
    canDuplicate: (subject: string) => ability.can("duplicate", subject),
  };
};
