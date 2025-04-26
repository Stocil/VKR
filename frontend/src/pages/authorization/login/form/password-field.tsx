import { InputField } from 'components/input-field';
import { PasswordInput } from 'components/input/password-input';

import { passwordRules } from 'utils/field-rules';

export const AuthorizationPasswordField = () => {
  return (
    <InputField
      title='Пароль'
      name='password'
      rules={passwordRules}
      render={({ field, fieldState }) => (
        <PasswordInput
          placeholder='Пароль'
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
