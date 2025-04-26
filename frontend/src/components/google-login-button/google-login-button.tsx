import { FC } from 'react';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

type Props = {
  onSuccess: (props: CredentialResponse) => void;
  onError: VoidFunction;
};

export const GoogleLoginButton: FC<Props> = ({ onSuccess, onError }) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      size='large'
      shape='pill'
      theme='filled_black'
      type='icon'
    />
  );
};
