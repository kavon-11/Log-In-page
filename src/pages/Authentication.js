import AuthForm from '../components/AuthForm';
import { redirect } from 'react-router-dom';
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422) {
   
    return {
      errors: ['This email already exists. Please enter a new email.'],
      clear : true 
    };
  }

  if (!response.ok) {
    throw new Response('Could not authenticate user.', { status: 500 });
  }

  const resData = await response.json();//hena bnstna el response mn el backend birod b
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/');
}