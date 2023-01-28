/** @jsxImportSource @emotion/react */
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import React from 'react'
import { useAppSelector } from '../../app/hooks/hooks'
import { selectUser } from '../../features/user/userSlice'
import UserPhoto from '../User/UserPhoto'
import { selectVarient } from '../../features/main/mainSlice'
import FormControl from '../../Formik/FormControl/FormControl'
import { Button } from '../../Formik';
import { IComments } from '../../features/post/postSlice';
import { useAddComment } from '../../app/hooks/useComment';

export interface ICommentDataForm {
  comment: string;
  userId: number;
  userName?: string;
  postId: number;
}

interface IProps {
  postId: number;
}

const AddComment: React.FC<IProps> = ({ postId}) => {
  const user = useAppSelector(selectUser);
  const varient = useAppSelector(selectVarient);
  const { mutate: addComment } = useAddComment();

  const initialValues: ICommentDataForm = {
    comment: '',
    userId: user?.userId,
    userName: user?.name,
    postId: postId,
  };

  const onSubmit = (data: ICommentDataForm, actions) => {
    addComment(data);
    // axios.post('comments', data)
    //   .then(res => {
    //      const newComment:IComments = {
    //       userId: res.data.userId,
    //       userName: res.data.userName,
    //       comment: res.data.comment,
    //     }
    //     const updatedNewComments: IComments[] = [
    //       ...newestComment,
    //       newComment
    //     ]
    //     setNewestComment(updatedNewComments)
    //     actions.setSubmitting(false);
    //     actions.resetForm();
    //   }).catch(err => {
    //     console.log(err);
    //   })
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