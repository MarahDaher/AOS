import { useAbility } from "@contexts/AbilityProvider";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  action: any;
  subject: string;
  children: React.ReactNode;
}

const RequirePermission = ({ action, subject, children }: Props) => {
  const ability = useAbility();
  const location = useLocation();

  if (!ability.can(action, subject)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default RequirePermission;
