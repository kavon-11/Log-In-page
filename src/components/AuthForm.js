import { Form, NavLink } from 'react-router-dom';
import { useSearchParams, useActionData } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const data = useActionData();
  const isLogin = !searchParams.get('mode') || searchParams.get('mode') === 'login';

  const emailRef = useRef();
  const passwordRef = useRef();

  
  useEffect(() => {
    if (data?.clear) {
      emailRef.current.value = '';
      passwordRef.current.value = '';
    }
  }, [data]);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {data && data.errors && (
          <div className={classes.errors}>
            {data.errors.map((error, index) => (
              <p key={index} style={{ color: 'red' }}>{error}</p>
            ))}
          </div>
        )}

        <p>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" type="email" name="email" required />
        </p>

        <p>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} id="password" type="password" name="password" required />
        </p>

        <div className={classes.actions}>
          <NavLink to={isLogin ? '?mode=signup' : '?mode=login'}>
            {isLogin ? 'Create new user' : 'Login'}
          </NavLink>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
