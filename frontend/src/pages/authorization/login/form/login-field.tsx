import { Input } from 'components/input';
import { InputField } from 'components/input-field';

import { loginRules } from 'utils/field-rules';

export const AuthorizationLoginField = () => {
  return (
    <InputField
      title='Логин'
      name='login'
      rules={loginRules}
      render={({ field, fieldState }) => (
        <Input
          value={field.value}
          placeholder='Логин'
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
