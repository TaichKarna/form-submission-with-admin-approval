import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUlr } from "../App";
export default function Signup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('/api/register', { 
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
                navigate('/signin')
            } else {
                console.log(data)
                setError(data.error.message || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };


    return(
        <div className="w-full mx-auto max-w-sm">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Already have an account?
                    <Link className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" to={'/signin'}>
                    Sign in here
                    </Link>
                </p>
                </div>
                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                    <div>
                        <label for="email" className="block text-sm mb-2 dark:text-white text-start">Email address</label>
                        <div className="relative">
                        <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error"
                            onChange={(e) => setEmail(e.target.value)}
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
                        <label for="password" className="block text-sm mb-2 dark:text-white text-start">Password</label>
                        <div className="relative">
                        <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error"
                            onChange={(e) => setPassword(e.target.value)} minLength={6} maxLength={20}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                    </div>
                    <div>
                        <label for="confirm-password" className="block text-sm mb-2 dark:text-white text-start">Confirm Password</label>
                        <div className="relative">
                        <input type="password" id="confirm-password" name="confirm-password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="confirm-password-error"
                            onChange={(e) => setConfirmPassword(e.target.value)} minLength={6} maxLength={20}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="confirm-password-error">Password does not match the password</p>
                    </div>

                    <div className="flex items-center">
                        <div className="flex">
                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           
                        />
                        </div>
                        <div className="ms-3">
                        <label for="remember-me" className="text-sm dark:text-white">I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a></label>
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
                    <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign up</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
    )
}
