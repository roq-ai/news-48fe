import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getScrapedDataById, updateScrapedDataById } from 'apiSdk/scraped-data';
import { scrapedDataValidationSchema } from 'validationSchema/scraped-data';
import { ScrapedDataInterface } from 'interfaces/scraped-data';
import { TopicInterface } from 'interfaces/topic';
import { WebsiteInterface } from 'interfaces/website';
import { getTopics } from 'apiSdk/topics';
import { getWebsites } from 'apiSdk/websites';

function ScrapedDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ScrapedDataInterface>(
    () => (id ? `/scraped-data/${id}` : null),
    () => getScrapedDataById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ScrapedDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateScrapedDataById(id, values);
      mutate(updated);
      resetForm();
      router.push('/scraped-data');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ScrapedDataInterface>({
    initialValues: data,
    validationSchema: scrapedDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

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
              label: 'Update Scraped Data',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Scraped Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.summary}
            label={'Summary'}
            props={{
              name: 'summary',
              placeholder: 'Summary',
              value: formik.values?.summary,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.link}
            label={'Link'}
            props={{
              name: 'link',
              placeholder: 'Link',
              value: formik.values?.link,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.image}
            label={'Image'}
            props={{
              name: 'image',
              placeholder: 'Image',
              value: formik.values?.image,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.text}
            label={'Text'}
            props={{
              name: 'text',
              placeholder: 'Text',
              value: formik.values?.text,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<TopicInterface>
            formik={formik}
            name={'topic_id'}
            label={'Select Topic'}
            placeholder={'Select Topic'}
            fetcher={getTopics}
            labelField={'name'}
          />
          <AsyncSelect<WebsiteInterface>
            formik={formik}
            name={'website_id'}
            label={'Select Website'}
            placeholder={'Select Website'}
            fetcher={getWebsites}
            labelField={'url'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/scraped-data')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(ScrapedDataEditPage);
