import * as yup from 'yup';

export const websiteValidationSchema = yup.object().shape({
  url: yup.string().required(),
  client_id: yup.string().nullable(),
});
