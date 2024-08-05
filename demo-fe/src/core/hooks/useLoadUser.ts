import { useKeycloak } from '@react-keycloak/web';
import { useAppDispatch } from '../../store/store';
import { UserInfo, setUser } from '../../store/user.slice';

type UserInfoKeycloak = {
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
};

const userInfoNormalizer = (userInfo: UserInfoKeycloak): UserInfo => {
  return {
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    email: userInfo.email,
    id: userInfo.sub,
  };
};

export const useLoadUser = () => {
  const { keycloak } = useKeycloak();
  const dispatch = useAppDispatch();
  keycloak.onAuthSuccess = () => {
    keycloak
      .loadUserInfo()
      .then((userInfo) =>
        dispatch(setUser(userInfoNormalizer(userInfo as UserInfoKeycloak)))
      );
  };
};
