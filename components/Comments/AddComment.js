import { useUserContext } from '../../context/UserContext';
import Button from '../Button';
import Card from '../Card';

export default function AddComment({ sendText = 'send' }) {
  const userContext = useUserContext();

  return (
    <Card className='w-full flex mt-4'>
      <div>
        <img className='h-7 w-7' src={userContext.user.image.webp} />
      </div>
      <div className='flex-1 mx-4 h-24'>
        <textarea
          className='py-3 px-4 resize-none border border-gray-200 focus:outline-none focus:border-blue rounded-md w-full h-full flex-1'
          placeholder='Add a comment..'
        ></textarea>
      </div>
      <div>
        <Button>{sendText}</Button>
      </div>
    </Card>
  );
}