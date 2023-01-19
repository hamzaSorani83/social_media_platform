/** @jsxImportSource @emotion/react */
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/user/userSlice'
import UserPhoto from '../User/UserPhoto'
import { selectVarient } from '../../features/main/mainSlice'
import FormControl from '../../Formik/FormControl/FormControl'
import { Button } from '../../Formik';
import axios from '../axiosInstance/axios';
import { IComments } from '../../features/post/postSlice';

interface ICommentDataForm {
  comment: string;
  userId: number;
  userName?: string;
  postId: number;
}

interface IProps {
  postId: number;
  setNewestComment: (comment: IComments) => void
}

const AddComment: React.FC<IProps> = ({ postId, setNewestComment }) => {
  const user = useAppSelector(selectUser);
  const varient = useAppSelector(selectVarient);

  const initialValues: ICommentDataForm = {
    comment: '',
    userId: user?.userId,
    userName: user?.name,
    postId: postId,
  };

  const onSubmit = (data: ICommentDataForm, actions) => {
    axios.post('comments', data)
      .then(res => {
        setNewestComment({
          userId: res.data.userId,
          userName: res.data.userName,
          comment: res.data.comment,
        })
        actions.setSubmitting(false);
        actions.resetForm();
      }).catch(err => {
        console.log(err);
      })
  }

  const validationShape = {
    comment: Yup.string().required('Required!')
  }

  const validationSchema = Yup.object().shape(validationShape)
  return (
    <div className="row" tw='cursor-pointer'>
      <div className="avatar_comment col-md-1"> <UserPhoto id={user?.userId} /> </div>
      <div className="col-md-11">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {formik => {
            return (
              <Form>
                <FormControl control='textarea' name='comment' placeholder="Add a comment.." type="text" />
                <Button type='submit' varient={varient}>
                  post
                </Button>
              </Form>
            )
          }
          }
        </Formik>
      </div>
    </div>
  )
}

export default AddComment