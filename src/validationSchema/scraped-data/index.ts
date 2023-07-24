import * as yup from 'yup';

export const scrapedDataValidationSchema = yup.object().shape({
  summary: yup.string(),
  link: yup.string(),
  image: yup.string(),
  text: yup.string(),
  topic_id: yup.string().nullable(),
  website_id: yup.string().nullable(),
});
