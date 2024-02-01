import { useParams } from 'react-router-dom';
import './style.scss';

const UserDetailPage = () => {
  const { email } = useParams();
  
  return (
    <div>{email}</div>
  )
}

export default UserDetailPage