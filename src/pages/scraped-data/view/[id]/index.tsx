import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getScrapedDataById } from 'apiSdk/scraped-data';
import { ScrapedDataInterface } from 'interfaces/scraped-data';

function ScrapedDataViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ScrapedDataInterface>(
    () => (id ? `/scraped-data/${id}` : null),
    () =>
      getScrapedDataById(id, {
        relations: ['topic', 'website'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Scraped Data',
              link: '/scraped-data',
            },
            {
              label: 'Scraped Data Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper wrapperProps={{ border: 'none', gap: 3, p: 0 }}>
              <Text
                sx={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  color: 'base.content',
                }}
              >
                Scraped Data Details
              </Text>
              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem label="Summary" text={data?.summary} />

                <FormListItem label="Link" text={data?.link} />

                <FormListItem label="Image" text={data?.image} />

                <FormListItem label="Text" text={data?.text} />

                <FormListItem
                  label="Created At"
                  text={format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy')}
                />

                <FormListItem
                  label="Updated At"
                  text={format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy')}
                />

                {hasAccess('topic', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Topic"
                    text={
                      <Link as={NextLink} href={`/topics/view/${data?.topic?.id}`}>
                        {data?.topic?.name}
                      </Link>
                    }
                  />
                )}
                {hasAccess('website', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Website"
                    text={
                      <Link as={NextLink} href={`/websites/view/${data?.website?.id}`}>
                        {data?.website?.url}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'scraped_data',
    operation: AccessOperationEnum.READ,
  }),
)(ScrapedDataViewPage);
