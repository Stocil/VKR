import { Input } from 'components/input';
import { InputField } from 'components/input-field';

export const AuthorizationEmailField = () => {
  return (
    <InputField
      title='Почта'
      name='email'
      rules={{ required: true }}
      render={({ field }) => (
        <Input
          type='email'
          value={field.value}
          onChange={field.onChange}
          placeholder='Почта'
        />
      )}
    />
  );
};
