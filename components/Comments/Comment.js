import { useEffect, useRef, useState } from 'react';

import AddReply from './AddReply';
import Card from '../Card';
import DeleteComment from './DeleteComment';
import DeleteIcon from '../Icons/DeleteIcon';
import EditIcon from '../Icons/EditIcon';
import MinusIcon from '../Icons/MinusIcon';
import PlusIcon from '../Icons/PlusIcon';
import ProfilePicture from '../ProfilePicture';
import ReplyIcon from '../Icons/ReplyIcon';
import TextArea from '../TextArea';
import Button from '../Button';

export default function Comment({
  replies = [],
  replyingTo = null,
  content,
  createdAt,
  currentUser,
  score,
  username,
  userImg,
}) {
  const editRef = useRef(null);
  const [showAddReply, setShowAddReply] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isCurrentUser = currentUser && currentUser.username === username;

  useEffect(() => {
    if (showEdit && editRef?.current) {
      const trueContentLength = content.length + 2 + replyingTo.length;
      editRef.current.focus();
      editRef.current.setSelectionRange(trueContentLength, trueContentLength);
      editRef.current.scrollTop = editRef.current.scrollHeight;
    }
  }, []);

  const onEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const onUpdate = () => {
    setShowEdit((prev) => !prev);
  };

  const onDelete = () => {
    setShowDelete(!showDelete);
  };

  const onReply = () => {
    setShowAddReply((prev) => !prev);
  };

  return (
    <>
      <Card className='mt-4 z-10 w-full'>
        {/* Votes */}
        <div>
          <div className='bg-gray-100 p-2 rounded-md text-center font-semibold text-violet-800 flex flex-col items-center'>
            <div className='cursor-pointer mb-2'>
              <PlusIcon />
            </div>
            <div className='mb-1 text-blue font-medium'>{score}</div>
            <div className='cursor-pointer mt-1'>
              <MinusIcon className="ml-1" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 ml-6 w-full'>
          {/* Title */}
          <div className='flex mb-3 items-center'>
            <ProfilePicture userImg={userImg} username={username} />
            <span className='ml-4 font-medium'>{username}</span>
            {isCurrentUser && (
              <div className='bg-blue px-2 ml-2 text-white rounded-md text-sm'>
                you
              </div>
            )}
            <span className='ml-4 font-light text-grayBlue flex-1'>
              {createdAt}
            </span>
            {/* Actions */}
            {isCurrentUser && (
              <>
                <button
                  className='text-softRed hover:opacity-50 cursor-pointer flex items-center'
                  onClick={onDelete}
                >
                  <DeleteIcon />
                  <span className='ml-2 font-medium'>Delete</span>
                </button>
                <button
                  className='text-darkBlue hover:opacity-50 cursor-pointer ml-4 flex items-center'
                  onClick={onEdit}
                >
                  <EditIcon />
                  <span className='ml-2 font-medium'>Edit</span>
                </button>
              </>
            )}
            {!isCurrentUser && (
              <button
                className='text-darkBlue hover:opacity-50 cursor-pointer flex items-center'
                onClick={onReply}
              >
                <ReplyIcon />
                <span className='ml-2 font-medium'>Reply</span>
              </button>
            )}
          </div>
          {/* Description */}
          <div className='text-grayBlue w-full'>
            {replyingTo && !showEdit && (
              <span className='text-darkBlue font-medium mr-1'>
                @{replyingTo}
              </span>
            )}
            {!showEdit && content}
            {showEdit && (
              <TextArea
                rows='4'
                className='flex-1'
                placeholder='Add a reply..'
                ref={editRef}
                value={`@${replyingTo} ${content}`}
                onChange={() => console.log('test')}
              />
            )}
          </div>
          {showEdit && (
            <div className='flex justify-end mt-2'>
              <Button onClick={onUpdate}>Update</Button>
            </div>
          )}
        </div>
      </Card>

      <AddReply willShow={showAddReply}></AddReply>

      {replies.map(({ id, createdAt, content, replyingTo, score, user }) => (
        <div className='flex w-full' key={id}>
          {/* Vertical Line */}
          <div>
            <div className='border-l-2 rounded-lg border-gray-200 h-full ml-10'></div>
          </div>
          <div className='ml-8 w-full'>
            <Comment
              key={id}
              createdAt={createdAt}
              content={content}
              currentUser={currentUser}
              score={score}
              username={user.username}
              userImg={user.image.webp}
              replyingTo={replyingTo}
            />
          </div>
        </div>
      ))}

      <DeleteComment isOpen={showDelete} onClose={() => setShowDelete(false)} />
    </>
  );
}
