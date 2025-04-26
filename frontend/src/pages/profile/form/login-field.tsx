import { Input } from 'components/input';
import { InputField } from 'components/input-field';

import { loginRules } from 'utils/field-rules';

export const ProfileLoginField = () => {
  return (
    <InputField
      titleSize='h6'
      name='login'
      rules={loginRules}
      render={({ field, fieldState }) => (
        <Input
          label='Логин'
          value={field.value}
          onChange={field.onChange}
          variant='outlined'
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
