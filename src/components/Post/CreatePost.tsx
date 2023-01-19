/** @jsxImportSource @emotion/react */
import { useState } from 'react'

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
import { IPost } from '../../features/post/postSlice';

const TwBox = tw.section`border-b border-gray-200 dark:border-dim-200 pb-3`;
const TwTextarea = tw(FormControl)`p-2 dark:text-white text-gray-900 w-full h-16 focus:outline-none resize-none`
const TwIcons = tw.div`flex text-blue-500 gap-2`;

interface IPostData {
  title: string;
  content: string;
  author?: string;
  authorId: string;
  img: string;
}

interface IProps {
  setNewestPost: (post: IPost) => void;
}

const Login: React.FC<IProps> = ({setNewestPost}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const varient = useAppSelector(selectVarient);
  const [msg, setMsg] = useState<IMessage>()

  const initialValues: IPostData = {
    title: '',
    content: '',
    author: user?.name,
    authorId: user?.userId,
    img: '',
  }

  const onSubmit = (data: IPostData, actions: any) => {
    dispatch(setLoading(true));
    axios.post("posts", data)
      .then(res => {
        let message = 'Success!';
        setMsg({
          message,
          success: true,
          show: true,
        });
        setNewestPost({
          ...res.data,
          reacts: [],
          comments: [],
        });
        actions.setSubmitting(false);
        actions.resetForm();
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
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formik => {
          return (
            <Form varient={varient} tw="!w-full !ml-0">
              <div tw="flex flex-col p-4">
                <FormControl
                  control='input' name='title' placeholder="title.."
                  type="text" tw='border-transparent'
                />
                <TwTextarea
                  control='textarea' name='content' placeholder="whats happening?"
                  type="text" tw='border-transparent'
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
