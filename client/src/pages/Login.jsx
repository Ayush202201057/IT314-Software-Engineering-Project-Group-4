import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, clearError } from '../redux/user/userSlice.js';
import './Login.css';

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser,Error, Loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if (currentUser) {
        navigate("/");
      }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData(
        {
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setError(null);
            setLoading(false);
            dispatch(clearError());
            alert('Account Created Successfully!');
            window.location.reload();
        }catch(error){
            setLoading(false);
            setError(error.message);
        };
    };
    const handleSubmit2 = async (e) => {
      e.preventDefault();
      try{
          dispatch(signInStart());
          const formData2 = {
            email: formData.email2,
            password: formData.password2,
          };
          const res = await fetch('/api/auth/signin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData2), 
          });
          const data = await res.json();
          if (data.success === false) {
              dispatch(signInFailure(data.message));
              return;
          }
          dispatch(signInSuccess(data));
          navigate('/');
      }catch(Error){
          dispatch(signInFailure(Error.message));
      };
  };

  const handleRegisterClick = () => {
    setError(null);
    dispatch(clearError());
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setError(null);
    dispatch(clearError());
    setIsActive(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      marginTop: 75,
      padding: 0,
    }}>
    <div className={`login-page`}>
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="sign-up">
        <form onSubmit={handleSubmit}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ysGLsZfbPr6zprdlKrSSo30yCkac7NB9iw&s" alt="" className='img' />
          <h1>Estate Sphere</h1>
          <br />
          <h2>Create Account</h2>
          <input type="text" placeholder="Name" required id='username' maxLength='30' onChange={handleChange}/>
          <input type="text" placeholder="Email" required id='email' onChange={handleChange}/>
          <input type="password" placeholder="Password" required id='password' onChange={handleChange}/>
          <button disabled={loading} style={{width: 280, fontSize: 14,}}>{loading ? 'Loading...' : 'Sign Up'}</button>
        </form>
      </div>

      <div className="sign-in">
        <form onSubmit={handleSubmit2}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ysGLsZfbPr6zprdlKrSSo30yCkac7NB9iw&s" alt="" className='img' />
          <h1>Estate Sphere</h1>
          <br />
          <h2>Sign In</h2>
          <input type="text" placeholder="Email" required id='email2' onChange={handleChange}/>
          <input type="password" placeholder="Password" required id='password2' onChange={handleChange}/>
          <button disabled={Loading} style={{width: 280, fontSize: 14,}}>{loading ? 'Loading...' : 'Sign In'}</button>
        </form>
      </div>

      <div className="toogle-container">
        <div className="toogle">
          <div className="toogle-panel toogle-left">
            <h1>Hello There!</h1>
            <p>If you already have an account</p>
            <button id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className="toogle-panel toogle-right">
            <h1>Hello There!</h1>
            <p>If you do not have an account</p>
            <button id="register" onClick={handleRegisterClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    {error && <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 5,
      padding: 0,
    }}><p className='text-red-700'>{error}</p></div>}
    {Error && <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 5,
      padding: 0,
    }}><p className='text-red-700'>{Error}</p></div>}
    </div>
    </div>
  );
};