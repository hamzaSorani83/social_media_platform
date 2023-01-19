/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'

import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import axios from '../axiosInstance/axios'
import tw from 'twin.macro';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectVarient, setLoading } from '../../features/main/mainSlice';
import FormControl from '../../Formik/FormControl/FormControl';
import Form from '../../Formik/FormComponent'
import { Alert } from '..';
import { selectUser } from '../../features/user/userSlice';
import { IMessage } from '../../pages/Login';
import { Button } from '../../Formik';
import { useNavigate, useParams } from 'react-router-dom';
import { IPostData } from './CreatePost';

const TwBox = tw.section`w-full xl:w-7/12 border h-fit my-12 border-gray-100 dark:border-dim-200 pb-3`;
const TwTextarea = tw(FormControl)`p-2 border  dark:text-white text-gray-900 w-full h-16 focus:outline-none resize-none`
const TwIcons = tw.div`flex text-blue-500 gap-2`;


const Login: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const varient = useAppSelector(selectVarient);
  const [msg, setMsg] = useState<IMessage>();
  const params = useParams();
  const [post, setPost] = useState<IPostData>();
  let initialValues = {
    title: '',
    content: '',
    author: user?.name,
    authorId: user?.userId,
    img: '',
  }

  useEffect(() => {
    axios.get(`posts/${params.id}`)
      .then(res => {
        console.log()
        setPost({
          ...res.data,
          img: ''
        });
      })
  }, [params.id])
  


  const onSubmit = (data: IPostData, actions: any) => {
    dispatch(setLoading(true));
    axios.put(`posts/${params.id}`, data)
      .then(res => {
        let message = 'Success!';
        setMsg({
          message,
          success: true,
          show: true,
        });
        actions.setSubmitting(false);
        actions.resetForm();
        navigate('/my-posts');
      }).catch(err => {
        let message: string;
        if (err.data) message = err.data;
        else message = 'something went wrong!'
        setMsg({
          message,
          success: false,
          show: true,
        });
      }).finally(() => {
        dispatch(setLoading(false));
      });
  }

  let validationShape = {
    title: Yup.string().required("Required!"),
    content: Yup.string().required('Required!'),
  };

  const validationSchema = Yup.object().shape(validationShape);
  return (
    <TwBox>
      <Formik
        initialValues={post || initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {formik => {
          return (
            <Form varient={varient} tw="!w-full !ml-0 ">
              <div tw="flex flex-col p-4">
                <FormControl
                  control='input' name='title' placeholder="title.."
                  type="text" tw='border border-gray-200' label='title'
                />
                <TwTextarea
                  control='textarea' name='content' placeholder="whats happening?"
                  type="text" tw='border border-gray-200' label='content'
                />
              </div>
              <div tw="flex p-4 w-full justify-between">
                <TwIcons>
                  <Field type="file" id="img" name="img" />
                </TwIcons>
                <Button type='submit' varient={varient} disabled={(!formik.isValid || formik.isSubmitting) && !(msg && msg.success === false)}>
                  submit
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
    </TwBox>
  )
}

export default Login
