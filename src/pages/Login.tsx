/** @jsxImportSource @emotion/react */
import { useState } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup';
import tw from 'twin.macro';

import { useAppDispatch, useAppSelector } from '../app/hooks/hooks';
import { selectVarient } from '../features/main/mainSlice';
import FormControl from '../Formik/FormControl/FormControl';
import Form from '../Formik/FormComponent'
import { Button } from '../Formik/FormControl/Controls';
import { Alert, Loading } from '../components';
import { setUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useLogin, useSignup, useSignupStep2 } from '../app/hooks/useLogin';

export const TwFormWrapper = tw.div`flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full gap-6 mb-24 mt-12`

export interface ILoginData {
  name: string;
  email: string,
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface IMessage {
  message: string;
  show: boolean;
  success: boolean;
}

interface IProps {
  loginMode?: boolean,
}

interface IUser {
  name: string;
  email: string,
  password: string;
  confirmPassword: string;
  phone: string;
  img: string;
  id: number;
}


interface iLoginDatasApi {
  data: IUser[];
}

interface iLoginDataApi {
  data: IUser;
}

const Login: React.FC<IProps> = ({ loginMode = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const varient = useAppSelector(selectVarient);
  const [msg, setMsg] = useState<IMessage>();

  const onSuccessLoggin = (data: iLoginDatasApi) => {
    if (!data.data.length) {
      setMsg({
        message: 'wrong email or password!',
        success: false,
        show: true,
      })
    } else {
      const user = data.data[0]
      dispatch(setUser({
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
      navigate('/');
    }
  }
  
  const onSuccessSignupStep2 = (data: iLoginDataApi) => {
    dispatch(setUser({
      userId: data.data.id,
      name: data.data.name,
      email: data.data.email,
      phone: data.data.phone,
    }));
    navigate('/');
  }
  
  const { mutate: signupStep2 } = useSignupStep2(onSuccessSignupStep2);

  const onSuccessSignup = (serverData: iLoginDatasApi, data: IUser) => {
    console.log(data)
    if (serverData.data.length) {
      setMsg({
        message: "you are already logged in!",
        success: false,
        show: true,
      });
    } else {
      signupStep2(data);
    }
  }


  let convert = loginMode ? 'signup' : 'login';
  const { mutate: login, isLoading: isLoadingLoggin } = useLogin(onSuccessLoggin);
  const { mutate: signup, isLoading: isLoadingSignup } = useSignup(onSuccessSignup);

  const initialValues: ILoginData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  }

  const onSubmit = (data: ILoginData) => {
    loginMode ? login(data) : signup(data);
  }


  let validationShape = {
    name: Yup.string(),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string(),
  };

  if (!loginMode) {
    validationShape.name = Yup.string().required();
    validationShape.confirmPassword = Yup.string().oneOf([Yup.ref('password'), ''], 'Password Do Not Match!').required("Required!")
  }

  const validationSchema = Yup.object().shape(validationShape);

  const handleNavigate = () => {
    navigate(`/${convert}`);
    setMsg(undefined);
  }

  return (
    <TwFormWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formik => {
          return (
            <>
              <Loading isLoading={isLoadingLoggin || isLoadingSignup} />
              <Form varient={varient}>
                {
                  !loginMode &&
                  <FormControl
                    control='input' name='name' placeholder="enter your name"
                    label='Name: ' type="text"
                  />
                }
                <FormControl
                  control='input' name='email' placeholder="email"
                  label='email: ' type="email"
                />
                <FormControl
                  control='input' name='password' placeholder="password"
                  label='password: ' type="password"
                />
                {
                  !loginMode &&
                  <FormControl
                    control='input' name='confirmPassword' placeholder="confirm password"
                    label='confirm password:' type="password"
                  />
                }
                {
                  !loginMode &&
                  <FormControl
                    control='input' name='phone' placeholder="phone"
                    label='enter your phone number' type="text"
                  />
                }
                <div tw='flex justify-between items-center'>
                  <Button type='submit' varient={varient}>
                    submit
                  </Button>
                  <Button type='button' varient={'warning'} onClick={handleNavigate}>
                    {loginMode ? 'sign up?' : 'login?'}
                  </Button>
                </div>
                {
                  msg && msg.show &&
                  <Alert className={tw`block`} varient={msg.success ? 'success' : 'danger'}>
                    {msg.message}
                  </Alert>
                }
              </Form>
            </>
          )
        }
        }
      </Formik>
    </TwFormWrapper>
  )
}

export default Login
