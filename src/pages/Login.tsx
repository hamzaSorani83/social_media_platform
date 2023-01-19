/** @jsxImportSource @emotion/react */
import { useState } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup';
import axios from '../components/axiosInstance/axios'
import tw from 'twin.macro';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectVarient, setLoading } from '../features/main/mainSlice';
import FormControl from '../Formik/FormControl/FormControl';
import Form from '../Formik/FormComponent'
import { Button } from '../Formik/FormControl/Controls';
import { Alert } from '../components';
import { setUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const TwFormWrapper = tw.div`flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full gap-6 mb-24 mt-12`

interface IFormData {
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

const Login: React.FC<IProps> = ({ loginMode = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const varient = useAppSelector(selectVarient);
  const [msg, setMsg] = useState<IMessage>()
  let convert = loginMode ? 'signup' : 'login';

  const initialValues: IFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  }

  const onSubmit = (data: IFormData, actions: any) => {
    loginMode ? login(data, actions) : signup(data, actions);
  }

  let valudationShap = {
    name: Yup.string(),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password Do Not Match!').required("Required!"),
  };

  if (!loginMode) {
    valudationShap.name = Yup.string().required();
  }

  const validationSchema = Yup.object().shape(valudationShap);

  const handleNavigate = () => {
    navigate(`/${convert}`);
    setMsg(undefined);
  }

  const login = (data: IFormData, actions) => {
    dispatch(setLoading(true));
    axios.get(`users/?email=${data.email}&password=${data.password}`)
      .then(res => {
        if (!res.data.length) {
          setMsg({
            message: 'wrong email or password!',
            success: false,
            show: true,
          });
          return;
        }
        let message = 'Congratulations!';
        setMsg({
          message,
          success: true,
          show: true,
        });
        dispatch(setUser({
          userId: res.data[0].id,
          name: res.data[0].name,
          email: res.data[0].email,
          phone: res.data[0].phone,
        }));
        actions.setSubmitting(false);
        actions.resetForm();
        navigate('/');
      }).catch(err => {
        let message = 'something went wrong!';
        setMsg({
          message,
          success: false,
          show: true,
        });
      }).finally(() => {
        dispatch(setLoading(false));
      });
  }

  const signup = (data: IFormData, actions) => {
    dispatch(setLoading(true));
    axios.get(`users/?email=${data.email}`)
      .then(res => {
        if (res.data.length) {
          setMsg({
            message: "you are already logged in!",
            success: false,
            show: true,
          });
          actions.resetForm();
          dispatch(setLoading(false));
        } else {
          axios.post("users", data)
            .then(res => {
              let message = 'Congratulations!';
              let userId = res.data.id;
              setMsg({
                message,
                success: true,
                show: true,
              });
              dispatch(setUser({
                userId,
                name: data.name,
                email: data.email,
                phone: data.phone,
              }));
              actions.setSubmitting(false);
              actions.resetForm();
              navigate('/');
            }).catch(err => {
              let message = 'something went wrong!';
              setMsg({
                message,
                success: false,
                show: true,
              });
            }).finally(() => {
              dispatch(setLoading(false));
            });
        }
      })
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
              <FormControl
                control='input' name='confirmPassword' placeholder="confirm password"
                label='confirm password:' type="password"
              />
              {
                !loginMode &&
                <FormControl
                  control='input' name='phone' placeholder="phone"
                  label='enter your phone number' type="text"
                />
              }
              <div tw='flex justify-between'>
                <Button type='submit' varient={varient} disabled={(!formik.isValid || formik.isSubmitting )&& !(msg && msg.success===false)}>
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
          )
        }
        }
      </Formik>
    </TwFormWrapper>
  )
}

export default Login
