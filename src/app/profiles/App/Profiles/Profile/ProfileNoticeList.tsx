import React from 'react';
import styled from 'styled-components';
import { Box, Title2 } from 'components/atoms';
import { Loading } from 'components/atoms/icons';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';

const ProfileNoticeList = styled.section`
  & > Box {
    margin-top: 20px;
  }
`;

export interface ProfileNoticeListProps {
  loading: trilean;
  notices: Notice[];
}

export const ProfileNoticeListContent = ({
  loading,
  notices = []
}: ProfileNoticeListProps) => {
  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (notices.length === 0) {
    return <div>Pas d&apos;autres contributions</div>;
  }

  return (
    <ProfileNoticeList>
      <Title2>Ses dernières contributions</Title2>
      {notices.map(notice => (
        <Box
          key={notice.id}
          dangerouslySetInnerHTML={{ __html: notice.message }}
        />
      ))}
    </ProfileNoticeList>
  );
};

export default ProfileNoticeListContent;
