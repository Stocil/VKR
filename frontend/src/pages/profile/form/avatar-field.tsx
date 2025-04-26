import CloseIcon from '@mui/icons-material/Close';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { IconButton } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getProfilePreviewAvatar } from 'store/profile/selectors';
import { setProfilePreviewAvatar } from 'store/profile/slice';

import { Input } from 'components/input';
import { InputField } from 'components/input-field';
import { Tooltip } from 'components/tooltip';

export const ProfileAvatarField = () => {
  const dispatch = useDispatch();
  const previewAvatar = useSelector(getProfilePreviewAvatar);

  const onClick = (newUrl: string) => {
    if (newUrl && previewAvatar !== newUrl) {
      dispatch(setProfilePreviewAvatar(newUrl));
    }
  };

  const onClear = (field: ControllerRenderProps<FieldValues, string>) => {
    field.onChange('');
  };

  return (
    <InputField
      name='avatar'
      render={({ field }) => (
        <Input
          type='url'
          label='URL ссылка на аватар'
          value={field.value}
          onChange={field.onChange}
          variant='outlined'
          slotProps={{
            input: {
              endAdornment: (
                <>
                  <IconButton size='small' onClick={() => onClear(field)}>
                    <CloseIcon fontSize='small' />
                  </IconButton>

                  <Tooltip title='Предпросмотр'>
                    <IconButton onClick={() => onClick(field.value)}>
                      <PanoramaIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};
