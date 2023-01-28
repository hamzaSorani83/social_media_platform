/** @jsxImportSource @emotion/react */
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import tw from 'twin.macro';

import { useAppSelector } from '../../app/hooks/hooks';
import { selectVarient } from '../../features/main/mainSlice';
import FormControl from '../../Formik/FormControl/FormControl';
import Form from '../../Formik/FormComponent'
import { Alert, Loading } from '..';
import { selectUser } from '../../features/user/userSlice';
import { Button } from '../../Formik';
import { useCreatePostData } from '../../app/hooks/usePostsData';

const TwBox = tw.section`border-b border-gray-200 dark:border-dim-200 pb-3`;
const TwTextarea = tw(FormControl)`p-2 dark:text-white text-gray-900 w-full h-16 focus:outline-none resize-none`
const TwIcons = tw.div`flex text-blue-500 gap-2`;

export interface IPostData {
  title: string;
  content: string;
  author?: string;
  authorId: number;
  img: string;
}

const Login: React.FC = () => {
  const user = useAppSelector(selectUser);
  const varient = useAppSelector(selectVarient);
  const { isLoading, isSuccess, mutate: addPost } = useCreatePostData();

  const initialValues: IPostData = {
    title: '',
    content: '',
    author: user?.name,
    authorId: user?.userId,
    img: '',
  }

  const onSubmit = (data: IPostData, actions: any) => {
    addPost(data, { onSuccess: () => actions.resetForm() });
  }

  let validationShape = {
    title: Yup.string().required("Required!"),
    content: Yup.string().required('Required!'),
  };

  const validationSchema = Yup.object().shape(validationShape);
  return (
    <TwBox>
      <Loading isLoading={isLoading} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        reset
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
                <Button type='submit' varient={varient} disabled={!formik.isValid}>
                  submit
                </Button>
              </div>
              <Alert className={tw`block`} show={isSuccess} varient='success'>
                {'post created successfully'}
              </Alert>
            </Form>
          )
        }
        }
      </Formik>
    </TwBox>
  )
}

export default Login
