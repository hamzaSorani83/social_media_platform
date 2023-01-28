/** @jsxImportSource @emotion/react */
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import tw from 'twin.macro';

import { useAppSelector } from '../../app/hooks/hooks';
import { selectVarient } from '../../features/main/mainSlice';
import FormControl from '../../Formik/FormControl/FormControl';
import Form from '../../Formik/FormComponent'
import { Loading } from '..';
import { selectUser } from '../../features/user/userSlice';
import { Button } from '../../Formik';
import { useNavigate, useParams } from 'react-router-dom';
import { IPostData } from './CreatePost';
import { useEditPost, useGetPost } from '../../app/hooks/useEditPost';

const TwBox = tw.section`w-full xl:w-7/12 border h-fit my-12 border-gray-100 dark:border-dim-200 pb-3`;
const TwTextarea = tw(FormControl)`p-2 border  dark:text-white text-gray-900 w-full h-16 focus:outline-none resize-none`
const TwIcons = tw.div`flex text-blue-500 gap-2`;


const Login: React.FC = () => {
  const user = useAppSelector(selectUser);
  const varient = useAppSelector(selectVarient);
  const params = useParams();
  const postId = parseInt(params.id || '0');
  const navigate = useNavigate();
  const { mutate: editPost, isLoading: isLoadingEditPost } = useEditPost();
  const { data: post, isLoading: isLoadingGetPost } = useGetPost(postId);
  
  let initialValues = {
    title: '',
    content: '',
    author: user?.name,
    authorId: user?.userId,
    img: '',
  }
  
  const onSubmit = (data: IPostData, actions: any) => {
    const updatedPost = {
      ...post,
      ...data,
      id: postId
    };
    editPost(updatedPost);
    navigate('/my-posts');
  }

  let validationShape = {
    title: Yup.string().required("Required!"),
    content: Yup.string().required('Required!'),
  };

  const validationSchema = Yup.object().shape(validationShape);

  return (
    <TwBox>
      <Formik
        initialValues={post?.data || initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {formik => {
          return (
            <>
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
                <Button type='submit' varient={varient}>
                  submit
                </Button>
              </div>
            </Form>
            <Loading isLoading={isLoadingGetPost || isLoadingEditPost} />
            </>
          )
        }
        }
      </Formik>
    </TwBox>
  )
}

export default Login
