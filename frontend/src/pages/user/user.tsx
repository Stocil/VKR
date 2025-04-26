import { FC } from 'react';

import { Avatar } from 'components/avatar';
import { PageWrapper } from 'components/page-wrapper';
import { VerticalStack } from 'components/stack';

import { UserEmptySearch } from './empty-search';
import { useFetchUserData } from './hooks/use-fetch-data';
import { UserInfoField } from './info-field';
import { UserContainer, UserCornerId } from './user-styles';

export const User: FC = () => {
  const { userData, isError, isLoading } = useFetchUserData();
  const { id, login, email, avatar } = userData; // TODO Показывать подвязанный gmail пользователя

  return (
    <PageWrapper
      isLoading={isLoading}
      isEmptySearch={isError}
      noDataFallback={<UserEmptySearch />}
    >
      <UserContainer>
        <Avatar
          src={avatar ?? ''}
          noUrlText={login?.[0]}
          size={350}
          textSize='h1'
        />

        <VerticalStack sx={{ alignItems: 'start' }} spacing={3}>
          <UserInfoField label='Логин' value={login} />
          <UserInfoField label='Email' value={email} />
        </VerticalStack>

        <UserCornerId>{id}</UserCornerId>
      </UserContainer>
    </PageWrapper>
  );
};
