import { FC, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getProfilePreviewAvatar } from 'store/profile/selectors';
import { setProfilePreviewAvatar } from 'store/profile/slice';
import { getUserInfo } from 'store/user/selectors';

import { Avatar } from 'components/avatar/avatar';
import { PageWrapper } from 'components/page-wrapper';

import { PageEmptyPage } from './empty-page';
import { ProfileForm } from './form';
import { ProfileFormFields } from './form/type';
import { ProfileContainer } from './profile-styles';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const previewAvatar = useSelector(getProfilePreviewAvatar);
  const userData = useSelector(getUserInfo);
  const { avatar, login, email, id } = userData;

  const defaultValues: ProfileFormFields = {
    login: login,
    email: email,
    avatar: avatar,
  };

  const methods = useForm<ProfileFormFields>({
    defaultValues,
  });

  const { setValue } = methods;

  useEffect(() => {
    if (login && email) {
      setValue('login', login);
      setValue('email', email);
      setValue('avatar', avatar ?? '');
    }
  }, [avatar, login, email]);

  // Сбраываем превью аватарки при выходе из профиля
  useEffect(
    () => () => {
      dispatch(setProfilePreviewAvatar());
    },
    [],
  );

  return (
    <PageWrapper
      isLoading={false}
      isEmptySearch={!id}
      noDataFallback={<PageEmptyPage />}
    >
      <ProfileContainer>
        <Avatar
          src={previewAvatar ?? avatar ?? ''}
          noUrlText={login?.[0]}
          size={350}
          textSize='h1'
        />

        <FormProvider {...methods}>
          <ProfileForm />
        </FormProvider>
      </ProfileContainer>
    </PageWrapper>
  );
};
