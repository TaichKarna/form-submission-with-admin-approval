import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from '../store/store'

export default function FormData(){
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user } = useUserStore(state => state.user)
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      setError(''); 

      try {
          const response = await fetch('/api/submit-form', { 
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
              },
              body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (response.ok) {
      
              setSuccess('Form submitted successfully');
              navigate('/')
          } else {
              setError(data.error || 'Form submission failed. Try again later');
          }
      } catch (err) {
          setError('An error occurred. Please try again.');
      }
  };

    return(
        <div className="">
          <div className="max-w-3xl px-4 pb-10  sm:px-6 lg:px-8 lg:py-10 mx-auto">
            <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-900">
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <div className="sm:col-span-12">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                      Submit your data
                    </h2>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="full-name" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                      Full name
                    </label>
                  </div>

                  <div className="sm:col-span-9">
                    <div className="sm:flex">
                      <input id="first-name" type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        onChange={handleChange}
                      />
                      <input type="text" id="last-name" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                      Email
                    </label>
                  </div>

                  <div className="sm:col-span-9">
                    <input id="email" type="email" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <div className="inline-block">
                      <label htmlFor="phone" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                        Phone
                      </label>
                    </div>
                  </div>

                  <div className="sm:col-span-9">
                    <input id="phone" type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <div className="inline-block">
                      <label htmlFor="address" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                        Address
                      </label>
                    </div>
                  </div>

                  <div className="sm:col-span-9">
                    <input id="address" type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>
      

                <div className="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <div className="mt-5 flex">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="privacy-check"
                      onChange={handleChange}
                    />
                    <label htmlFor="privacy-check" className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Allow us to process your personal information.</label>
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
                <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                  Submit application
                </button>
              </form>
            </div>
          </div>
        </div>
    )
}
