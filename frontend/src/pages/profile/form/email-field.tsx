import { Input } from 'components/input';
import { InputField } from 'components/input-field';

export const ProfileEmailField = () => {
  return (
    <InputField
      titleSize='h6'
      name='email'
      rules={{ required: true }}
      render={({ field }) => (
        <Input
          type='email'
          label='Email'
          value={field.value}
          onChange={field.onChange}
          variant='outlined'
        />
      )}
    />
  );
};
