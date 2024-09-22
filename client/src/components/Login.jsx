import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from '../store/store'

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        try {
            const response = await fetch('http://localhost:3000/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Signup successful! Please check your email for verification.');
                setUser(data);
                navigate('/home')
            } else {
                setError(data.error || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };


    return(
        <div className="max-w-sm w-full mx-auto">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 ">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Don't have an account yet?  
                    <Link className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" to={
                        "/signup"
                    }>
                    Sign up here
                    </Link>
                </p>
                </div>

                <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm mb-2 dark:text-white text-start">Email address</label>
                        <div className="relative">
                        <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error"
                        onChange={(e) =>  setEmail(e.target.value)}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                       
                        </div>
                        <div className="relative">
                        <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                    </div>

                    <div className="flex items-center">
                        <div className="flex">
                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value={true}/>
                        </div>
                        <div className="ms-3">
                        <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                        </div>
                    </div>
                    {
                        error && (
                            <p className="text-red-700 dark:text-red-400"> {error}</p>
                        )
                    }
                    {
                        success && (
                            <p className="text-green-700 dark:text-green-400">{success}</p>
                        )
                    }
                    <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}
