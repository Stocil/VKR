import { InputField } from 'components/input-field';
import { PasswordInput } from 'components/input/password-input';

export const AuthorizationRepeatPasswordField = () => {
  return (
    <InputField
      title='Повторите пароль'
      name='repeatPassword'
      rules={{
        required: true,
        minLength: {
          value: 6,
          message: 'Минимальная длина пароля должна быть 6 символов',
        },
      }}
      render={({ field, fieldState }) => (
        <PasswordInput
          placeholder='Повторите пароль'
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
