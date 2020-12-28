import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import {AuthContainer} from 'components';
import {Form, FormButton, FormInput} from 'components/FormComponents';
import {login} from 'dispatchers/app';
import {AppDispatch} from 'types/store';
import yup from 'utils/yup';

const initialValues = {
  email: '',
  password: '',
};

export type FormValues = typeof initialValues;

const SignIn: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async ({email, password}: FormValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log({email, password});
    await dispatch(login({email, password}));
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required('This field is required'),
    password: yup.string().required('This field is required'),
  });

  return (
    <AuthContainer heading="Sign In">
      <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <FormInput label="Email" name="email" placeholder="" />
        <FormInput label="Password" name="password" placeholder="" type="password" />
        <FormButton submitting={false} type="submit">
          Sign In
        </FormButton>
      </Form>
    </AuthContainer>
  );
};

export default SignIn;
